import { useState } from "react";
import { Link } from "wouter";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { useLanguage } from "../hooks/use-language";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-effect border-b border-farmer-green/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-farmer-green to-farmer-neon rounded-full flex items-center justify-center animate-pulse-neon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="logo"
            >
              <span className="text-white text-lg">🌱</span>
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-farmer-green to-farmer-neon bg-clip-text text-transparent" data-testid="brand-name">
              {t('heroTitle')}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-farmer-neon transition-colors duration-300" data-testid="link-home">
              {t('home')}
            </Link>
            <Link href="/#features" className="hover:text-farmer-neon transition-colors duration-300" data-testid="link-features">
              {t('features')}
            </Link>
            <Link href="/dashboard" className="hover:text-farmer-neon transition-colors duration-300" data-testid="link-dashboard">
              {t('dashboard')}
            </Link>
            <Link href="/#contact" className="hover:text-farmer-neon transition-colors duration-300" data-testid="link-contact">
              {t('contact')}
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={(value) => setLanguage(value as any)} data-testid="language-selector">
              <SelectTrigger className="w-20 bg-transparent border-farmer-green/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 EN</SelectItem>
                <SelectItem value="hi">🇮🇳 हि</SelectItem>
                <SelectItem value="ta">🇮🇳 த</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-farmer-green/10"
              data-testid="theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-farmer-green" />
              ) : (
                <Sun className="h-5 w-5 text-farmer-yellow" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover:bg-farmer-green/10"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-farmer-green" />
              ) : (
                <Menu className="h-5 w-5 text-farmer-green" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-farmer-green/20"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/" 
                className="block py-2 hover:text-farmer-neon transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-home"
              >
                {t('home')}
              </Link>
              <Link 
                href="/#features" 
                className="block py-2 hover:text-farmer-neon transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-features"
              >
                {t('features')}
              </Link>
              <Link 
                href="/dashboard" 
                className="block py-2 hover:text-farmer-neon transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-dashboard"
              >
                {t('dashboard')}
              </Link>
              <Link 
                href="/#contact" 
                className="block py-2 hover:text-farmer-neon transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-link-contact"
              >
                {t('contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
