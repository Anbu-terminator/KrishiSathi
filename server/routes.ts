import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import multer from "multer";
import { z } from "zod";
import { insertSoilDataSchema } from "@shared/schema";
import fs from "fs";

// Extend Request for multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
const upload = multer({ dest: "uploads/" });

// ✅ OpenRouter client (OpenAI-compatible)
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: process.env.OPENROUTER_API_BASE || "https://openrouter.ai/api/v1",
});

// Custom fallback tips
function customFallbackResponse(query: string) {
  if (query.toLowerCase().includes("soil")) {
    return "🌱 Tip: Enhance soil fertility by using compost, crop rotation, and organic manure.";
  }
  if (query.toLowerCase().includes("pest")) {
    return "🐛 Tip: Use natural pest repellents like neem oil or intercropping with pest-resistant plants.";
  }
  if (query.toLowerCase().includes("water")) {
    return "💧 Tip: Conserve water using drip irrigation and mulching to retain soil moisture.";
  }
  return "🤖 Our AI systems are busy. General tip: Practice sustainable farming with organic inputs and smart irrigation.";
}

// ================== REGISTER ROUTES ==================
export async function registerRoutes(app: Express): Promise<Server> {
  // 🌾 AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    const { query, language = "en" } = req.body;
    if (!query) return res.status(400).json({ error: "Message is required" });

    try {
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free", // ✅ Free model on OpenRouter
        messages: [
          {
            role: "system",
            content:
              language === "hi"
                ? "आप एक विशेषज्ञ कृषि सलाहकार हैं जो भारतीय किसानों की मदद करते हैं।"
                : language === "ta"
                ? "நீங்கள் இந்திய விவசாயிகளுக்கு உதவும் ஒரு நிபுண விவசாய ஆலோசகர்."
                : "You are an expert agricultural advisor helping Indian farmers.",
          },
          { role: "user", content: query },
        ],
      });

      return res.json({
        response:
          completion.choices[0].message?.content || "No response from OpenRouter.",
      });
    } catch (err) {
      console.error("OpenRouter chat error:", err);
      return res.status(429).json({
        response: process.env.OPENROUTER_API_KEY
          ? "Apologies, our AI systems are busy. " + customFallbackResponse(query)
          : "Please add your OpenRouter API key for reliable access. " + customFallbackResponse(query)
      });
    }
  });

  // 🌿 Plant Doctor endpoint
  app.post("/api/plant", upload.single("image"), async (req: MulterRequest, res) => {
    try {
      if (req.file) {
        const imageBuffer = fs.readFileSync(req.file.path);
        const base64Image = imageBuffer.toString("base64");
        let diagnosis;

        try {
          const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini", // can swap to free model if needed
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Analyze this plant image and provide JSON { plantName, isHealthy, diseases, recommendations }",
                  },
                  {
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                  },
                ],
              },
            ],
            response_format: { type: "json_object" },
            max_tokens: 800,
          });

          try {
            diagnosis = JSON.parse(response.choices[0].message.content || "{}");
          } catch {
            diagnosis = {
              plantName: "Plant (Analysis Limited)",
              isHealthy: false,
              diseases: ["Unclear image analysis"],
              recommendations: [
                "General tip: Ensure sunlight, proper watering, and neem oil for pests.",
              ],
            };
          }
        } catch (err) {
          console.error("OpenRouter Vision error:", err);
          diagnosis = {
            plantName: "Plant (Analysis Limited)",
            isHealthy: false,
            diseases: ["Unable to perform detailed analysis"],
            recommendations: [
              "General tip: Ensure sunlight, proper watering, and neem oil for pests.",
            ],
          };
        }

        fs.unlinkSync(req.file.path);
        return res.json(diagnosis);
      } else {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: "Query or image is required" });

        try {
          const completion = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b:free",
            messages: [
              { role: "system", content: "You are a plant doctor." },
              { role: "user", content: query },
            ],
          });

          return res.json({
            response:
              completion.choices[0].message?.content || "No response from OpenRouter.",
          });
        } catch (err) {
          console.error("OpenRouter plant text error:", err);
          return res.json({
            response:
              "🌿 Plant Doctor Tip: Ensure sunlight, avoid overwatering, and check leaves for early signs of pests.",
          });
        }
      }
    } catch (error) {
      console.error("Plant detection error:", error);
      res.status(500).json({ error: "Failed to analyze plant input" });
    }
  });

  // ☁️ Weather endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude required" });
      }
      const apiKey =
        process.env.OPENWEATHER_API_KEY || "cd81c0ca27ba43bead299707e76f33a0";

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.statusText}`);
      }

      const weatherData = await weatherResponse.json();
      const forecast = weatherData.list.slice(0, 7).map((item: any) => ({
        date: item.dt * 1000, // Return timestamp for client-side formatting
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        rainfall: item.rain?.["3h"] || 0,
      }));

      res.json({
        location: weatherData.city.name,
        forecast,
        alerts: forecast
          .filter((day: any) => day.rainfall > 5)
          .map(
            (day: any) =>
              `⚠️ Heavy rainfall expected on ${day.date}. Consider protecting crops.`
          ),
      });
    } catch (error) {
      console.error("Weather error:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // 🌱 Soil data endpoints
  app.post("/api/soil", async (req, res) => {
    try {
      const validatedData = insertSoilDataSchema.parse(req.body);
      const userId = "default-user";
      const soilData = await storage.createSoilData({ ...validatedData, userId });
      res.json(soilData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: "Invalid soil data format", details: error.errors });
      }
      res.status(500).json({ error: "Failed to save soil data" });
    }
  });

  app.get("/api/soil", async (req, res) => {
    try {
      const userId = "default-user";
      const soilData = await storage.getSoilDataByUser(userId);
      res.json(soilData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch soil data" });
    }
  });

  // ✅ Return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
