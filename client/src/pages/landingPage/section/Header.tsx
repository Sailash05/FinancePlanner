import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] bg-violet-800/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 px-4 py-1 bg-violet-600 text-white rounded-full text-sm font-medium"
      >
        AI-Powered Finance Planner
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-extrabold text-violet-500 leading-tight"
      >
        Take Control of Your Finances <br /> with FinexAI
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-white max-w-2xl"
      >
        Track, predict, and grow your wealth using AI-driven insights and
        intelligent financial planning tools.
      </motion.p>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-4 flex-wrap justify-center"
      >
        <Link to={'/login'} className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-violet-900/50 transition-transform hover:scale-105">
          Get Started
        </Link>
        <button className="border cursor-pointer border-violet-500 text-violet-400 hover:bg-violet-900 px-6 py-3 rounded-2xl transition-transform hover:scale-105">
          Learn More
        </button>
      </motion.div>

      {/* Hero Illustration */}
<div className="mt-16 w-full max-w-5xl h-96 bg-gray-900 rounded-2xl relative overflow-hidden shadow-xl">
  {/* Background floating gradient circles */}
  <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-700/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl"></div>

  {/* Main floating blocks */}
  <motion.div
    initial={{ x: -300, y: -50, opacity: 0, rotate: -20 }}
    animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
    transition={{ duration: 1 }}
    className="absolute left-8 top-12 w-28 h-28 bg-violet-600 rounded-lg shadow-lg shadow-violet-900/50"
  />
  <motion.div
    initial={{ x: 300, y: 50, opacity: 0, rotate: 20 }}
    animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="absolute right-8 bottom-12 w-36 h-36 bg-violet-500 rounded-lg shadow-lg shadow-violet-900/50"
  />
  <motion.div
    initial={{ y: 200, opacity: 0, rotate: 10 }}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    transition={{ duration: 1, delay: 0.6 }}
    className="absolute left-1/2 top-1/2 w-44 h-44 bg-violet-400 rounded-lg -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-violet-900/50"
  />

  {/* Animated mini bar charts */}
  {[...Array(6)].map((_, i) => (
    <motion.div
      key={i}
      initial={{ y: 100, opacity: 0, scaleY: 0 }}
      animate={{ y: 0, opacity: 0.7, scaleY: 1 }}
      transition={{ duration: 1, delay: i * 0.15, repeat: Infinity, repeatType: "reverse" }}
      className="absolute w-2 bg-violet-300 rounded"
      style={{
        height: `${30 + i * 15}px`,
        top: `${20 + i * 10}%`,
        left: `${15 + i * 12}%`,
        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
      }}
    />
  ))}

  {/* Moving glowing dots */}
  {[...Array(8)].map((_, i) => (
    <motion.div
      key={i + 10}
      initial={{ x: -50, y: -50, opacity: 0 }}
      animate={{ x: [0, 20, 0], y: [0, -20, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, repeatType: "loop" }}
      className="absolute w-3 h-3 bg-white rounded-full shadow-lg shadow-violet-500/80"
      style={{
        top: `${10 + i * 10}%`,
        left: `${10 + i * 10}%`,
      }}
    />
  ))}

  {/* Connecting lines (optional, for AI network look) */}
  <svg className="absolute w-full h-full pointer-events-none">
    <line x1="20%" y1="30%" x2="70%" y2="60%" stroke="rgba(139,92,246,0.3)" strokeWidth="2" />
    <line x1="30%" y1="70%" x2="60%" y2="20%" stroke="rgba(139,92,246,0.3)" strokeWidth="2" />
    <line x1="50%" y1="10%" x2="80%" y2="80%" stroke="rgba(139,92,246,0.3)" strokeWidth="2" />
  </svg>
</div>

    </header>
  );
}
