import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bot, CloudSun, Camera, CheckCircle, ArrowRight, Smartphone, Globe, Shield } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function FeaturesSection() {
  const { t } = useLanguage();

  const mainFeatures = [
    {
      icon: Bot,
      title: t('cropAdvice'),
      description: "AI-powered personalized crop recommendations based on soil conditions, weather patterns, and regional best practices",
      benefits: [
        "Personalized crop selection",
        "Optimal planting schedules", 
        "Fertilizer recommendations"
      ],
      color: "from-farmer-green to-farmer-neon",
      buttonColor: "from-farmer-green to-farmer-neon",
      shadowColor: "farmer-neon/30",
      link: "/dashboard#chat"
    },
    {
      icon: CloudSun,
      title: t('checkWeather'),
      description: "Accurate weather forecasts and agricultural alerts to help you plan farming activities and protect your crops",
      benefits: [
        "7-day detailed forecast",
        "Rainfall predictions",
        "Farming activity alerts"
      ],
      color: "from-farmer-yellow to-farmer-brown",
      buttonColor: "from-farmer-yellow to-farmer-brown",
      shadowColor: "farmer-yellow/30",
      link: "/dashboard#weather"
    },
    {
      icon: Camera,
      title: t('identifyDisease'),
      description: "Upload plant images for instant AI-powered disease detection with treatment recommendations",
      benefits: [
        "Instant image analysis",
        "Treatment recommendations",
        "Prevention tips"
      ],
      color: "from-red-500 to-orange-500",
      buttonColor: "from-red-500 to-orange-500", 
      shadowColor: "red-500/30",
      link: "/dashboard#disease"
    }
  ];

  const additionalFeatures = [
    { icon: Bot, title: "Soil Analytics", desc: "NPK and pH monitoring", color: "farmer-green" },
    { icon: Smartphone, title: "Mobile Friendly", desc: "Works on all devices", color: "farmer-yellow" },
    { icon: Globe, title: "Multi-Language", desc: "Hindi, Tamil, English", color: "blue-500" },
    { icon: Shield, title: "Secure & Private", desc: "Your data is protected", color: "purple-500" }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="features-section">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-farmer-green to-farmer-brown bg-clip-text text-transparent" data-testid="features-title">
            Revolutionizing Agriculture with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="features-description">
            Comprehensive digital tools designed specifically for Indian farmers to increase productivity and make informed decisions
          </p>
        </motion.div>

        {/* Main Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              data-testid={`feature-card-${index}`}
            >
              <Card className="group relative h-full shadow-xl hover:shadow-2xl transition-all duration-500 neon-border border-opacity-0 hover:border-opacity-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color.replace('from-', 'from-').replace('to-', 'to-')}/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardContent className="relative z-10 p-8">
                  <motion.div 
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center animate-float`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold mb-4 text-center`} data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-center mb-6 leading-relaxed" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className={`w-4 h-4 mr-2`} style={{ color: `var(--farmer-${feature.color.includes('red') ? 'green' : feature.color.includes('yellow') ? 'yellow' : 'green'})` }} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <Link href={feature.link}>
                    <Button 
                      className={`w-full py-3 bg-gradient-to-r ${feature.buttonColor} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                      style={{ 
                        boxShadow: `0 4px 15px var(--${feature.shadowColor})` 
                      }}
                      data-testid={`feature-button-${index}`}
                    >
                      {index === 0 ? "Start Chat" : index === 1 ? "View Forecast" : "Upload Image"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Showcase */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -5 }}
              data-testid={`additional-feature-${index}`}
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-${feature.color}/20 rounded-full flex items-center justify-center`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h4 className={`font-semibold mb-2 text-${feature.color}`} data-testid={`additional-feature-title-${index}`}>
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid={`additional-feature-desc-${index}`}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
