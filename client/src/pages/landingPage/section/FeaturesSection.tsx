// FeaturesSection.tsx
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useRef, useEffect } from "react";
import { Wallet, LineChart, Brain, BarChart3, PieChart, ShieldCheck } from "lucide-react";

const features = [
  { icon: <Wallet className="w-10 h-10 mx-auto text-violet-500" />, title: "Smart Tracking", description: "Automatically categorize your expenses with AI." },
  { icon: <LineChart className="w-10 h-10 mx-auto text-violet-500" />, title: "Predictive Budgeting", description: "Forecast future expenses and avoid overspending." },
  { icon: <Brain className="w-10 h-10 mx-auto text-violet-500" />, title: "AI Insights", description: "Get intelligent summaries and actionable financial tips." },
  { icon: <BarChart3 className="w-10 h-10 mx-auto text-violet-500" />, title: "Visual Dashboard", description: "Stunning charts and reports to see your money clearly." },
  { icon: <PieChart className="w-10 h-10 mx-auto text-violet-500" />, title: "Investment Analyzer", description: "AI evaluates your investments and suggests optimizations." },
  { icon: <ShieldCheck className="w-10 h-10 mx-auto text-violet-500" />, title: "Secure & Private", description: "Bank-level security ensures your data stays private." },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 120 },
  }),
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const controls = useAnimation();

  // Observe section visibility without "once: true" so animation replays
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      // Reset animation when section goes out of view
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section id="features" className="relative bg-black py-32 px-6" ref={ref}>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-violet-500">
        Why Choose FinexAI?
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate={controls}
            variants={itemVariants}
            className="bg-black border border-violet-500 rounded-2xl shadow-lg shadow-violet-700 p-6 text-center transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-violet-500/50 cursor-pointer"
          >
            {feature.icon}
            <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-gray-300 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
