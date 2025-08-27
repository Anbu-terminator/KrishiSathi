import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import FeaturesSection from "../components/features-section";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  const techStack = [
    { icon: "⚛️", name: "React", category: "Frontend" },
    { icon: "🟢", name: "Node.js", category: "Backend" },
    { icon: "🍃", name: "MongoDB", category: "Database" },
    { icon: "🧠", name: "OpenAI", category: "AI Chat" },
    { icon: "☁️", name: "Weather API", category: "Forecasts" },
    { icon: "🌿", name: "Plant.ID", category: "Disease ID" }
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        
        {/* Technology Stack Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="tech-stack-section">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-farmer-green to-farmer-brown bg-clip-text text-transparent" data-testid="tech-title">
                Powered by Modern Technology
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="tech-description">
                Built with cutting-edge AI and web technologies to provide the best experience for farmers
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  data-testid={`tech-item-${index}`}
                >
                  <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-4xl mb-4">{tech.icon}</div>
                      <h4 className="font-semibold text-farmer-green" data-testid={`tech-name-${index}`}>
                        {tech.name}
                      </h4>
                      <p className="text-sm text-muted-foreground" data-testid={`tech-category-${index}`}>
                        {tech.category}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-farmer-dark-green text-farmer-cream py-16" data-testid="footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-farmer-green to-farmer-neon rounded-full flex items-center justify-center animate-pulse-neon">
                    <span className="text-white text-xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-farmer-green to-farmer-neon bg-clip-text text-transparent" data-testid="footer-brand">
                    KrishiSathi
                  </h3>
                </div>
                <p className="text-farmer-cream/80 mb-6 max-w-md leading-relaxed" data-testid="footer-description">
                  Empowering Indian farmers with AI-powered tools for better crop management, weather forecasting, and disease detection. Your digital companion for modern agriculture.
                </p>
                <div className="flex space-x-4">
                  {["twitter", "facebook", "instagram", "youtube"].map((social, index) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-farmer-green/20 hover:bg-farmer-neon/30 rounded-full flex items-center justify-center transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`social-${social}`}
                    >
                      <span className="text-farmer-neon">📱</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-6 text-farmer-neon" data-testid="footer-links-title">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: "Home", href: "#home" },
                    { name: "Features", href: "#features" },
                    { name: "Dashboard", href: "/dashboard" },
                    { name: "About Us", href: "#" },
                    { name: "Blog", href: "#" }
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-farmer-cream/80 hover:text-farmer-neon transition-colors duration-300"
                        data-testid={`footer-link-${index}`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold mb-6 text-farmer-neon" data-testid="footer-support-title">
                  Support
                </h4>
                <ul className="space-y-3">
                  {[
                    "Help Center",
                    "Contact Us",
                    "Privacy Policy",
                    "Terms of Service",
                    "FAQs"
                  ].map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-farmer-cream/80 hover:text-farmer-neon transition-colors duration-300"
                        data-testid={`footer-support-${index}`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-farmer-green/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-farmer-cream/60 text-sm" data-testid="footer-copyright">
                © 2024 KrishiSathi. All rights reserved. Made with ❤️ for Indian farmers.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-farmer-cream/60 text-sm">Available in:</span>
                <div className="flex space-x-2" data-testid="footer-languages">
                  {["English", "हिंदी", "தமிழ்"].map((lang, index) => (
                    <span key={index} className="px-2 py-1 bg-farmer-green/20 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
