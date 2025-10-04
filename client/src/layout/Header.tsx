import { Bell, User, LogOut, Settings, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import finexaiLogo from '../assets/logo/finexai-logo.png';

interface HeaderProps {
  setLogoutPopup: (val: boolean) => void;
  toggleSidebar: () => void;
}

export default function Header({ setLogoutPopup, toggleSidebar }: HeaderProps) {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <header className="w-full h-16 bg-black/90 backdrop-blur-lg border-b border-violet-800 shadow-lg flex items-center justify-between px-4 md:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-violet-900/40"
        >
          <Menu size={22} className="text-gray-200" />
        </button>
        {/* <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
          FinexAI
        </h1> */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img 
            src={finexaiLogo} 
            alt="FinexAI Logo" 
            className="w-8 h-8 object-contain" 
          />
          <span className="text-2xl font-bold text-violet-500">FinexAI</span>
        </div>
      </div>

      {/* Center */}
      <h2 className="hidden md:block text-lg font-medium text-gray-200">
        Welcome back, <span className="text-violet-400 font-semibold">User 👋</span>
      </h2>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-violet-800/30 transition cursor-pointer">
          <Bell size={22} className="text-gray-300 hover:text-white transition" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full bg-violet-900/40 hover:bg-violet-800/60 transition border border-violet-700"
          >
            <User size={20} className="text-violet-300" />
            <span className="hidden sm:block text-sm text-gray-200">My Account</span>
          </button>

          <AnimatePresence>
            {openUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-violet-800 overflow-hidden"
              >
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-violet-900/40 transition">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={() => setLogoutPopup(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-violet-900/40 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
