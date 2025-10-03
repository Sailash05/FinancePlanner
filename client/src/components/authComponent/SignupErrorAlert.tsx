import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // icon for close button

type Props = {
  message: string;
  onClose: () => void;
};

export default function SignupErrorAlert({ message, onClose }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-red-600/80 to-red-800/80 text-white border border-red-500 shadow-lg shadow-red-900/50 px-5 py-3 rounded-xl backdrop-blur-md relative">
            {/* Icon */}
            <span className="text-red-300 text-xl">⚠️</span>
            <p className="text-sm font-medium mr-3">{message}</p>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-red-200 hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
