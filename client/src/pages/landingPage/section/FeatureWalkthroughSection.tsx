// FeatureWalkthroughSection.tsx
import { motion } from "framer-motion";

const steps = [
  { title: "Connect Accounts", description: "Securely link your bank and expense accounts." },
  { title: "AI Categorization", description: "Automatically categorize all your spending." },
  { title: "Predictive Budgeting", description: "AI forecasts future expenses and provides tips." },
  { title: "Track & Grow", description: "Monitor your progress with detailed dashboards." },
];

const FeatureWalkthroughSection = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-violet-500 text-center mb-12">
        Step-by-Step Walkthrough
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2 space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3, duration: 0.6, type: "spring", stiffness: 120 }}
              className="p-6 bg-black border border-violet-500 rounded-2xl shadow-lg shadow-violet-700"
            >
              <h3 className="text-xl font-semibold text-violet-500 mb-2">{i + 1}. {step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:w-1/2">
          <motion.img
            src="/images/feature-demo.gif" // replace with actual demo GIF
            alt="Feature Demo"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-lg shadow-violet-700"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureWalkthroughSection;
