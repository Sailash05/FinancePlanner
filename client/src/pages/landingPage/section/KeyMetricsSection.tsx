// KeyMetricsCenterAnimated.tsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaUsers, FaWallet, FaLightbulb, FaChartLine } from "react-icons/fa";

const metrics = [
  {
    label: "Users",
    value: 12000,
    icon: <FaUsers size={24} />,
    description: "Trusted by thousands of users worldwide.",
  },
  {
    label: "Money Saved",
    value: 540000,
    icon: <FaWallet size={24} />,
    description: "Helping users save over half a million dollars collectively.",
  },
  {
    label: "Insights Generated",
    value: 35000,
    icon: <FaLightbulb size={24} />,
    description: "AI generates actionable insights to optimize spending.",
  },
  {
    label: "Investments Optimized",
    value: 8700,
    icon: <FaChartLine size={24} />,
    description: "Track and improve investment strategies effortlessly.",
  },
];

// Hook for number counting animation
const useCountUp = (end: number, start = 0, duration = 1500, trigger = false) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;

    let current = start;
    const stepTime = 20;
    const increment = Math.ceil((end - start) / (duration / stepTime));

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setCount(current);
    }, stepTime);

    return () => clearInterval(interval);
  }, [end, start, duration, trigger]);

  return count;
};

const KeyMetricsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();

  const counts = metrics.map((metric) => useCountUp(metric.value, 0, 1500, isInView));

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id="impact" ref={ref} className="py-20 md:py-32 bg-black text-white text-center px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-500 mb-10 sm:mb-12">
        FinexAI Impact at a Glance
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-3 sm:space-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="text-violet-500">{metrics[0].icon}</span>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-violet-500">
              {counts[0].toLocaleString()}
            </p>
          </div>
          <p className="text-gray-300 font-semibold text-sm sm:text-base">{metrics[0].label}</p>
          <p className="text-gray-400 text-xs sm:text-sm">{metrics[0].description}</p>
        </div>

        {/* Center Column */}
        <div className="col-span-1 order-first lg:order-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={controls}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-violet-600"
          >
            {counts.reduce((a, b) => a + b, 0).toLocaleString()}
          </motion.div>
          <p className="text-gray-300 mt-2 font-semibold text-sm sm:text-base">Total Impact</p>
          <p className="text-gray-400 mt-1 text-xs sm:text-sm max-w-xs mx-auto">
            The collective achievements of all our users, from money saved to optimized investments.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-6 sm:space-y-8 text-left">
          {metrics.slice(1).map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-violet-500">{metric.icon}</span>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-500">
                  {counts[i + 1].toLocaleString()}
                </p>
              </div>
              <p className="text-gray-300 font-semibold text-sm sm:text-base">{metric.label}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyMetricsSection;
