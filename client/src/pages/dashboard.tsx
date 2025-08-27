import { useEffect } from "react";
import { motion } from "framer-motion";
import { User, MapPin } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import Navbar from "../components/navbar";
import ChatInterface from "../components/chat-interface";
import WeatherWidget from "../components/weather-widget";
import DiseaseDetection from "../components/disease-detection";
import SoilForm from "../components/soil-form";
import SoilChart from "../components/soil-chart";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const { t } = useLanguage();

  // Smooth scroll to sections when hash changes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-page">
      <Navbar />
      
      <main className="pt-16">
        {/* Dashboard Header */}
        <motion.section
          className="bg-gradient-to-r from-farmer-green to-farmer-neon p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          data-testid="dashboard-header"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  data-testid="user-avatar"
                >
                  <User className="w-6 h-6" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold" data-testid="user-greeting">
                    Welcome, Farmer
                  </h1>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span data-testid="user-location">India</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Today's Status</p>
                <p className="text-lg font-semibold" data-testid="dashboard-status">
                  All Systems Active
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <section className="py-8 px-4 sm:px-6 lg:px-8" data-testid="quick-actions">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                className="p-6 h-auto bg-farmer-green/10 hover:bg-farmer-green/20 text-farmer-green border border-farmer-green/20 hover:border-farmer-green/40 transition-all duration-300"
                variant="outline"
                onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="action-crop-advice"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-farmer-green rounded-lg flex items-center justify-center">
                    <span className="text-white">🌱</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{t('cropAdvice')}</h3>
                    <p className="text-sm opacity-70">Ask AI Expert</p>
                  </div>
                </div>
              </Button>

              <Button
                className="p-6 h-auto bg-farmer-yellow/10 hover:bg-farmer-yellow/20 text-farmer-yellow border border-farmer-yellow/20 hover:border-farmer-yellow/40 transition-all duration-300"
                variant="outline"
                onClick={() => document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="action-weather"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-farmer-yellow rounded-lg flex items-center justify-center">
                    <span className="text-white">🌤️</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{t('checkWeather')}</h3>
                    <p className="text-sm opacity-70">7-day forecast</p>
                  </div>
                </div>
              </Button>

              <Button
                className="p-6 h-auto bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                variant="outline"
                onClick={() => document.getElementById('disease')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="action-disease"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">📷</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{t('identifyDisease')}</h3>
                    <p className="text-sm opacity-70">Upload Image</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8" data-testid="dashboard-content">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* AI Chat Section */}
                <motion.div
                  id="chat"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="h-[600px]"
                  data-testid="chat-section"
                >
                  <ChatInterface />
                </motion.div>

                {/* Disease Detection */}
                <motion.div
                  id="disease"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  data-testid="disease-section"
                >
                  <DiseaseDetection />
                </motion.div>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Weather Widget */}
                <motion.div
                  id="weather"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  data-testid="weather-section"
                >
                  <WeatherWidget />
                </motion.div>

                {/* Soil Data Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  data-testid="soil-form-section"
                >
                  <SoilForm />
                </motion.div>

                {/* Soil Analytics Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  data-testid="soil-chart-section"
                >
                  <SoilChart />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
