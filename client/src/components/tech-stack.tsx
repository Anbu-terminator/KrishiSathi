import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

export default function TechStack() {
  const techStack = [
    { icon: "⚛️", name: "React", category: "Frontend", color: "blue-500" },
    { icon: "🟢", name: "Node.js", category: "Backend", color: "green-500" },
    { icon: "🍃", name: "MongoDB", category: "Database", color: "green-600" },
    { icon: "🧠", name: "OpenAI", category: "AI Chat", color: "purple-500" },
    { icon: "☁️", name: "Weather API", category: "Forecasts", color: "blue-600" },
    { icon: "🌿", name: "Plant.ID", category: "Disease ID", color: "orange-500" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="tech-stack-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-farmer-green to-farmer-brown bg-clip-text text-transparent" data-testid="tech-stack-title">
            Powered by Modern Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="tech-stack-description">
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
              whileHover={{ scale: 1.05, y: -5 }}
              data-testid={`tech-item-${index}`}
            >
              <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-farmer-green/20">
                <CardContent className="p-0">
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <h4 className={`font-semibold mb-2 text-${tech.color}`} data-testid={`tech-name-${index}`}>
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

        {/* Additional Tech Features */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "📱", title: "Mobile First", desc: "Optimized for smartphones", color: "farmer-green" },
            { icon: "🌐", title: "Multi-Language", desc: "Hindi, Tamil, English", color: "farmer-yellow" },
            { icon: "🔒", title: "Secure", desc: "Data privacy protected", color: "farmer-brown" },
            { icon: "⚡", title: "Fast & Reliable", desc: "Quick responses", color: "farmer-neon" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              data-testid={`tech-feature-${index}`}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className={`font-semibold mb-2 text-${feature.color}`} data-testid={`feature-title-${index}`}>
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid={`feature-desc-${index}`}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
