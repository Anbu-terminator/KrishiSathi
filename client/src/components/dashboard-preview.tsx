import { motion } from "framer-motion";
import { User, MapPin, Bot, Send, Camera, Save } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DashboardPreview() {
  const { language, t } = useLanguage();

  const mockChatMessages = [
    {
      role: "assistant",
      content: language === "hi" 
        ? "नमस्ते! मैं आपका AI कृषि सलाहकार हूं। आप अपनी फसल के बारे में कोई भी सवाल पूछ सकते हैं।"
        : language === "ta"
        ? "வணக்கம்! நான் உங்கள் AI விவசாய ஆலோசகர். நீங்கள் உங்கள் பயிர்களைப் பற்றி எந்தக் கேள்வியும் கேட்கலாம்."
        : "Hello! I'm your AI agricultural advisor. You can ask me any questions about your crops."
    },
    {
      role: "user",
      content: language === "hi"
        ? "मेरे खेत में टमाटर की फसल के लिए कौन सा उर्वरक सबसे अच्छा है?"
        : language === "ta" 
        ? "எனது வயலில் தக்காளி பயிருக்கு எந்த உரம் சிறந்தது?"
        : "What is the best fertilizer for tomato crops in my field?"
    },
    {
      role: "assistant", 
      content: language === "hi"
        ? "टमाटर की फसल के लिए NPK (20:20:20) उर्वरक का उपयोग करें। रोपाई के बाद 15 दिन में पहली खुराक दें..."
        : language === "ta"
        ? "தக்காளி பயிருக்கு NPK (20:20:20) உரத்தைப் பயன்படுத்துங்கள். நடவு செய்த 15 நாட்களுக்குப் பிறகு முதல் அளவைக் கொடுங்கள்..."
        : "For tomato crops, use NPK (20:20:20) fertilizer. Give the first dose 15 days after transplanting..."
    }
  ];

  const mockWeatherData = [
    { day: "Today", icon: "☀️", temp: "28°C" },
    { day: "Tomorrow", icon: "🌧️", temp: "25°C" },  
    { day: "Day 3", icon: "☁️", temp: "27°C" }
  ];

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20" data-testid="dashboard-preview">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-farmer-green to-farmer-neon bg-clip-text text-transparent" data-testid="dashboard-preview-title">
            Your Farming Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="dashboard-preview-description">
            All your agricultural tools in one comprehensive, easy-to-use dashboard designed for Indian farmers
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-farmer-green/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          data-testid="dashboard-mockup"
        >
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-farmer-green to-farmer-neon p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg" data-testid="mock-user-name">
                    {language === "hi" ? "राम कुमार" : language === "ta" ? "ராம் குமார்" : "Ram Kumar"}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span data-testid="mock-user-location">Punjab, India</span>
                  </div>
                </div>
              </div>
              <div className="text-white text-right">
                <p className="text-sm opacity-80">Today's Weather</p>
                <p className="text-lg font-semibold" data-testid="mock-weather-temp">28°C</p>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: "🌱", title: t('cropAdvice'), desc: "Ask AI Expert", color: "farmer-green" },
                    { icon: "🌤️", title: t('checkWeather'), desc: "7-day forecast", color: "farmer-yellow" },
                    { icon: "📷", title: t('identifyDisease'), desc: "Upload Image", color: "red-500" }
                  ].map((action, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-card border rounded-xl hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      data-testid={`mock-action-${index}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-${action.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-sm">{action.icon}</span>
                        </div>
                        <div>
                          <h4 className={`font-semibold text-${action.color}`}>{action.title}</h4>
                          <p className="text-sm text-muted-foreground">{action.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Interface Preview */}
                <Card className="bg-muted/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Bot className="w-5 h-5 text-farmer-green mr-2" />
                      <h4 className="font-semibold text-farmer-green">{t('aiAssistant')}</h4>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="space-y-4 mb-4 h-64 overflow-y-auto" data-testid="mock-chat-messages">
                      {mockChatMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          className={`flex space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 bg-farmer-green rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className={`rounded-lg p-3 max-w-xs ${
                            message.role === 'user' 
                              ? 'bg-farmer-green text-white' 
                              : 'bg-card border'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Chat Input */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder={t('chatPlaceholder')}
                        className="flex-1"
                        disabled
                        data-testid="mock-chat-input"
                      />
                      <Button size="icon" disabled className="bg-farmer-green">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Weather Widget */}
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="mr-2">🌤️</span>
                      <h4 className="font-semibold">{t('weatherForecast')}</h4>
                    </div>
                    <div className="space-y-3" data-testid="mock-weather-forecast">
                      {mockWeatherData.map((day, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-sm">{day.day}</span>
                          <span className="flex items-center">
                            <span className="mr-1">{day.icon}</span>
                            {day.temp}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Soil Data Form */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="mr-2">🌱</span>
                      <h4 className="font-semibold text-farmer-brown">{t('soilData')}</h4>
                    </div>
                    <div className="space-y-4" data-testid="mock-soil-form">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">{t('phLevel')}</label>
                          <Input type="number" placeholder="6.5" disabled />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">{t('temperature')}</label>
                          <Input type="number" placeholder="25" disabled />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">{t('nitrogen')}</label>
                          <Input type="number" placeholder="40" disabled />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">{t('phosphorus')}</label>
                          <Input type="number" placeholder="30" disabled />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">{t('potassium')}</label>
                          <Input type="number" placeholder="20" disabled />
                        </div>
                      </div>
                      <Button disabled className="w-full bg-farmer-brown text-white">
                        <Save className="w-4 h-4 mr-2" />
                        {t('saveSoilData')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Chart Preview */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="mr-2">📊</span>
                      <h4 className="font-semibold text-farmer-green">{t('soilAnalytics')}</h4>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-farmer-green/20 to-farmer-neon/20 rounded-lg flex items-center justify-center" data-testid="mock-chart">
                      <p className="text-sm text-muted-foreground">📊 NPK Levels Chart</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
