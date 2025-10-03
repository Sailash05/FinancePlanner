// HowItWorksSection.tsx
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaUserCircle, FaWallet, FaBrain, FaChartLine, FaShieldAlt } from "react-icons/fa";

const steps = [
  { icon: <FaWallet size={20} />, title: "Connect Accounts", description: "Securely link your bank and expense accounts to FinexAI." },
  { icon: <FaBrain size={20} />, title: "AI Categorization", description: "Automatically categorize all your spending to understand where your money goes." },
  { icon: <FaChartLine size={20} />, title: "Predictive Budgeting", description: "AI forecasts future expenses and provides actionable recommendations." },
  { icon: <FaShieldAlt size={20} />, title: "Secure & Private", description: "Your data is encrypted and stored securely, ensuring total privacy." },
  { icon: <FaUserCircle size={20} />, title: "Track & Grow", description: "Monitor your progress with detailed dashboards and reports." },
];

const HowItWorksSection = ({ offsetY }: { offsetY: number }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id="how" ref={ref} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: offsetY * 0.1 }}
        className="absolute top-0 left-0 w-48 h-48 bg-violet-700/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: offsetY * -0.1 }}
        className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto md:flex md:items-start md:space-x-12">
        {/* Left content */}


<div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left z-10">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ delay: 0, duration: 0.6, type: "spring", stiffness: 120 }}
    className="text-violet-500 font-extrabold uppercase tracking-wide text-xs md:text-sm mb-2"
  >
    Get Started
  </motion.p>

  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 120 }}
    className="text-3xl md:text-4xl font-bold text-violet-500 leading-tight mb-4"
  >
    Take Control of Your Finances
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 120 }}
    className="text-gray-300 text-sm md:text-base mb-6"
  >
    FinexAI helps you track, plan, and grow your wealth using AI-powered insights.
    Follow these simple steps to get started.
  </motion.p>

  <motion.button
    onClick={() => navigate('/login')}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139,92,246,0.7)" }}
    transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 120 }}
    className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-violet-900/50 transition-all cursor-pointer"
  >
    Start Free Trial
  </motion.button>
</div>


        {/* Right steps */}
        <div className="md:w-1/2 relative pl-12">
  {/* Connector line */}
  <div className="absolute top-0 left-6 w-1 bg-violet-500 h-full rounded-full z-0" />

  <div className="space-y-12">
    {steps.map((step, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }} // triggers every time section enters viewport
        transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 120 }}
        className="relative group hover:scale-105 transform transition-transform cursor-pointer z-10"
      >
        <span className="absolute -left-12 top-0 md:-left-10 bg-violet-500 text-white rounded-full p-3 shadow-lg z-10">
          {step.icon}
        </span>
        <h3 className="text-xl font-semibold text-white mb-1 ml-4 md:ml-6">{i + 1}. {step.title}</h3>
        <p className="text-gray-300 text-sm ml-4 md:ml-6">{step.description}</p>
      </motion.div>
    ))}
  </div>
</div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
