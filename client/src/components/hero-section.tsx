import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bot, Play, Leaf, CloudSun, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { Button } from "./ui/button";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" data-testid="hero-section">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-gradient-to-r from-farmer-dark-green/90 via-farmer-green/70 to-farmer-dark-green/90"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-farmer-dark-green/80 via-farmer-green/60 to-farmer-dark-green/80"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="hero-title"
          >
            <span className="block text-white mb-2">{t('heroTitle')}</span>
            <span className="block neon-text animate-glow text-3xl sm:text-4xl lg:text-5xl">
              {t('heroSubtitle')}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-farmer-cream/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="hero-description"
          >
            {t('heroDescription')}
          </motion.p>

          {/* Main CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/dashboard">
              <Button 
                size="lg"
                className="group relative px-8 py-4 bg-gradient-to-r from-farmer-green to-farmer-neon text-white font-semibold rounded-full hover:shadow-lg hover:shadow-farmer-neon/50 transition-all duration-300 transform hover:scale-105 animate-pulse-neon"
                data-testid="button-get-started"
              >
                <Bot className="w-5 h-5 mr-2" />
                {t('getStarted')}
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 border-2 border-farmer-neon text-farmer-cream hover:bg-farmer-neon/10 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 neon-border"
              data-testid="button-watch-demo"
            >
              <Play className="w-5 h-5 mr-2" />
              {t('watchDemo')}
            </Button>
          </motion.div>

          {/* Feature Preview Icons */}
          <motion.div 
            className="flex justify-center space-x-8 sm:space-x-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Leaf, label: t('cropAdvice'), delay: 0 },
              { icon: CloudSun, label: t('checkWeather'), delay: 0.5 },
              { icon: Search, label: t('identifyDisease'), delay: 1 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center animate-float" 
                style={{ animationDelay: `${item.delay}s` }}
                whileHover={{ scale: 1.1 }}
                data-testid={`preview-icon-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-2 bg-farmer-green/20 rounded-full flex items-center justify-center hover:bg-farmer-neon/30 transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-farmer-neon" />
                </div>
                <p className="text-sm text-farmer-cream/80">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        data-testid="scroll-indicator"
      >
        <ChevronDown className="w-8 h-8 text-farmer-neon" />
      </motion.div>
    </section>
  );
}
