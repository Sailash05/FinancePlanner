import { NavLink, useLocation } from "react-router-dom";
import { Home, Activity, PieChart, Lightbulb, MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

interface SideNavBarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function SideNavBar({ isOpen, setIsOpen }: SideNavBarProps) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/home", icon: Home },
    { name: "Transaction", path: "/transaction", icon: Activity },
    { name: "Analytics", path: "/analytics", icon: PieChart },
    { name: "Recommendations", path: "/smart-recommendation", icon: Lightbulb },
    { name: "Chatbot", path: "/chatbot", icon: MessageCircle },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 130, damping: 25 }}
        className="fixed md:hidden top-0 left-0 w-64 h-full bg-black/95 backdrop-blur-lg border-r border-violet-800 z-50 flex flex-col p-6"
      >
        <div className="flex items-center justify-between mb-10">
  {/* Brand */}
  <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-fuchsia-500">
    FinexAI
  </h1>

  {/* Close Button */}
  <button
    onClick={() => setIsOpen(false)}
    className="p-2 rounded-md hover:bg-violet-900/40 transition"
  >
    <X size={22} className="text-gray-200" />
  </button>
</div>


        {/* Navigation */}
        <nav className="flex flex-col gap-3 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // auto-close on navigation
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-violet-900/90 text-white font-semibold shadow-lg shadow-violet-700/50"
                    : "text-gray-300 hover:bg-violet-800 hover:text-white hover:scale-105"
                }`}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 25 }}
        className="hidden md:flex w-64 h-screen bg-black/95 backdrop-blur-lg border-r border-violet-800 shadow-2xl flex-col p-6"
      >
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-fuchsia-500 mb-12 animate-pulse">
          FinexAI
        </h1>
        <nav className="flex flex-col gap-3 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-violet-900/90 text-white font-semibold shadow-lg shadow-violet-700/50"
                    : "text-gray-300 hover:bg-violet-800 hover:text-white hover:scale-105"
                }`}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto text-gray-400 text-sm text-center py-4 border-t border-violet-800">
          © {new Date().getFullYear()} FinexAI
        </div>
      </motion.div>
    </>
  );
}
