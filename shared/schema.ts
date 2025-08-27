import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const soilData = pgTable("soil_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  ph: real("ph").notNull(),
  temperature: real("temperature").notNull(),
  nitrogen: real("nitrogen").notNull(),
  phosphorus: real("phosphorus").notNull(),
  potassium: real("potassium").notNull(),
  humidity: real("humidity"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response").notNull(),
  language: text("language").default("en"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const diseaseDetections = pgTable("disease_detections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  imagePath: text("image_path"),
  plantType: text("plant_type"),
  diseaseInfo: json("disease_info"),
  recommendations: text("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSoilDataSchema = createInsertSchema(soilData).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertDiseaseDetectionSchema = createInsertSchema(diseaseDetections).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SoilData = typeof soilData.$inferSelect;
export type InsertSoilData = z.infer<typeof insertSoilDataSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type DiseaseDetection = typeof diseaseDetections.$inferSelect;
export type InsertDiseaseDetection = z.infer<typeof insertDiseaseDetectionSchema>;
