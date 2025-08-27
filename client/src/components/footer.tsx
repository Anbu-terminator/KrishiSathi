import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('home'), href: "/" },
    { name: t('features'), href: "/#features" },
    { name: t('dashboard'), href: "/dashboard" },
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" }
  ];

  const supportLinks = [
    "Help Center",
    "Contact Us", 
    "Privacy Policy",
    "Terms of Service",
    "FAQs"
  ];

  const socialLinks = [
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "YouTube", icon: "📺", href: "#" }
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "ta", name: "தமிழ்" }
  ];

  return (
    <footer id="contact" className="bg-farmer-dark-green text-farmer-cream py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-farmer-green to-farmer-neon rounded-full flex items-center justify-center animate-pulse-neon">
                <span className="text-white text-xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-farmer-green to-farmer-neon bg-clip-text text-transparent" data-testid="footer-brand">
                KrishiSathi
              </h3>
            </motion.div>
            
            <motion.p 
              className="text-farmer-cream/80 mb-6 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              data-testid="footer-description"
            >
              Empowering Indian farmers with AI-powered tools for better crop management, weather forecasting, and disease detection. Your digital companion for modern agriculture.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-farmer-green/20 hover:bg-farmer-neon/30 rounded-full flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`social-${social.name.toLowerCase()}`}
                >
                  <span className="text-farmer-neon text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-farmer-neon" data-testid="footer-links-title">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-farmer-cream/80 hover:text-farmer-neon transition-colors duration-300 text-sm"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-farmer-neon" data-testid="footer-support-title">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-farmer-cream/80 hover:text-farmer-neon transition-colors duration-300 text-sm"
                    data-testid={`footer-support-${index}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-farmer-green/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-farmer-cream/60 text-sm" data-testid="footer-copyright">
            © 2024 KrishiSathi. All rights reserved. Made with ❤️ for Indian farmers.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-farmer-cream/60 text-sm">Available in:</span>
            <div className="flex space-x-2" data-testid="footer-languages">
              {languages.map((lang, index) => (
                <motion.span 
                  key={lang.code}
                  className="px-2 py-1 bg-farmer-green/20 rounded text-xs text-farmer-cream/80"
                  whileHover={{ scale: 1.05, backgroundColor: "var(--farmer-green)" }}
                  data-testid={`footer-lang-${lang.code}`}
                >
                  {lang.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
