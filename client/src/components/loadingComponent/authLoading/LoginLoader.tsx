import { motion } from "framer-motion";

export default function LoginLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-violet-900/50 to-black/70 border border-violet-700 shadow-2xl shadow-violet-800/40"
      >
        {/* Glowing Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-violet-400 border-t-transparent animate-spin" />
          <div className="absolute inset-0 rounded-full blur-xl bg-violet-400/30 animate-ping" />
        </div>

        {/* Animated Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-medium text-gray-200 text-center"
        >
          Logging you in
          <span className="inline-flex">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="mx-0.5"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="mx-0.5"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
              className="mx-0.5"
            >
              .
            </motion.span>
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
