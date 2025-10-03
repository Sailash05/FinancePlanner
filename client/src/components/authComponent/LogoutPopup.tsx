import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoutPopupProps {
  setLogoutPopup: (value: boolean) => void;
}

export default function LogoutPopup({ setLogoutPopup }: LogoutPopupProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const removeItems: string[] = ["JwtToken", "UserId"];
    removeItems.forEach((item) => localStorage.removeItem(item));
    navigate("/");
    setLogoutPopup(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm bg-black/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl border border-violet-800"
        >
          <AlertTriangle size={60} className="text-violet-500 animate-pulse" />
          <h3 className="text-2xl font-extrabold text-white">Logout</h3>
          <p className="text-gray-300 text-center">
            Are you sure you want to logout?
          </p>

          <div className="flex gap-4 mt-4 w-full">
            <button
              onClick={() => setLogoutPopup(false)}
              className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 cursor-pointer bg-violet-600 hover:bg-violet-800 text-white font-semibold py-2 rounded-xl transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
