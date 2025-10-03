// AIInsightsSection.tsx
import { motion } from "framer-motion";
import dashboardImage from '../../../assets/images/image.png';

const AIInsightsSection = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-violet-500 mb-12">
        See AI Insights in Action
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <img
            src={dashboardImage} // replace with real GIF or screenshot
            alt="Dashboard Preview"
            className="rounded-2xl shadow-lg shadow-violet-700"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <p className="text-gray-300 mb-4">
            Our AI analyzes your spending, forecasts your future budget, and gives actionable recommendations instantly.
          </p>
          <p className="text-gray-300 mb-4">
            Visual dashboards let you track your progress and optimize investments with ease.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIInsightsSection;
