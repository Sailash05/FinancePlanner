// LandingPage.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./section/TopNavBar";
import Header from "./section/Header";
import FeaturesSection from "./section/FeaturesSection";
import { motion } from "framer-motion";
import HowItWorksSection from "./section/HowItWorksSection";
import KeyMetricsSection from "./section/KeyMetricsSection";
import AIInsightsSection from "./section/AIInsightsSection";
import SecurityTrustSection from "./section/SecurityTrustSection";
// import FeatureWalkthroughSection from "./section/FeatureWalkthroughSection";
import Footer from "./section/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="home" className="bg-black text-white relative overflow-x-hidden ">
      <TopNavbar />

      {/* Hero Section with Parallax Shapes */}
      <section className="relative overflow-hidden">
        <Header />
        {/* Hero floating shapes */}
        <motion.div
          style={{ y: offsetY * 0.3 }}
          className="absolute top-20 left-10 w-32 h-32 bg-violet-600 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          style={{ y: offsetY * -0.2 }}
          className="absolute top-1/2 right-10 w-48 h-48 bg-violet-500 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          style={{ y: offsetY * 0.15 }}
          className="absolute bottom-10 left-1/2 w-40 h-40 bg-violet-400 rounded-full opacity-30 blur-3xl -translate-x-1/2"
        />
      </section>

      {/* Features Section */}
      <FeaturesSection />

        <HowItWorksSection offsetY={offsetY} />

      <KeyMetricsSection />

      <AIInsightsSection />

      <SecurityTrustSection />

      {/* <FeatureWalkthroughSection /> */}

      

      {/* Call to Action */}
<section id="pricing" className="py-20 px-6 bg-black text-center relative overflow-hidden">
  {/* Animated background blobs */}
  <motion.div
    style={{ y: offsetY * 0.1 }}
    className="absolute top-10 left-1/3 w-64 h-64 bg-violet-700/20 rounded-full blur-3xl animate-blob -translate-x-1/2"
  />
  <motion.div
    style={{ y: offsetY * 0.15 }}
    className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"
  />
  
  {/* Main heading */}
  <motion.h2 
    initial={{ y: 50, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }} 
    transition={{ duration: 0.8 }}
    className="text-3xl md:text-4xl font-bold text-violet-500 relative z-10"
  >
    Take Control of Your Finances Today
  </motion.h2>

  {/* Subtitle */}
  <motion.p 
    initial={{ y: 30, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }} 
    transition={{ duration: 0.8, delay: 0.2 }}
    className="mt-4 text-white max-w-2xl mx-auto relative z-10 text-lg"
  >
    Join thousands who are already using <span className="font-semibold text-violet-400">FinexAI</span> to predict, plan, and prosper.
  </motion.p>

  {/* CTA Button */}
  <motion.button
    onClick={() => navigate('/login')}
    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.6)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="mt-8 bg-violet-500 cursor-pointer hover:bg-violet-600 text-white px-8 py-4 rounded-2xl shadow-lg shadow-violet-900/50 relative z-10 font-semibold text-lg transition-colors"
  >
    Start Free Trial
  </motion.button>

  {/* Micro-copy for social proof */}
  <motion.p 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 1, delay: 0.4 }}
    className="mt-4 text-gray-400 text-sm relative z-10"
  >
    No credit card required • Trusted by over 12,000 users
  </motion.p>
</section>


      <Footer />
    </div>
  );
}
