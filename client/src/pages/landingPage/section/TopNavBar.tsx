import { useState } from "react";
import { Link } from "react-router-dom";
import finexaiLogo from '../../../assets/logo/finexai-logo.png'

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black fixed top-0 left-0 z-50 border-b border-violet-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-2 cursor-pointer animate-pulse">
          <img 
            src={finexaiLogo} 
            alt="FinexAI Logo" 
            className="w-8 h-8 object-contain" 
          />
          <span className="text-2xl font-bold text-violet-500">FinexAI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          <a href="#home" className="hover:text-violet-400 transition-colors">Home</a>
          <a href="#features" className="hover:text-violet-400 transition-colors">Features</a>
          <a href="#how" className="hover:text-violet-400 transition-colors">How it Works</a>
          <a href="#impact" className="hover:text-violet-400 transition-colors">Impact</a>
          <a href="#security" className="hover:text-violet-400 transition-colors">Security</a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to={'/login'} className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-colors">
            Login
          </Link>
          <Link to={'/signup'} className="border border-violet-500 text-violet-400 hover:bg-violet-900 px-4 py-2 rounded-lg transition-colors">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
{isOpen && (
  <div
    className="md:hidden absolute top-full left-0 w-full bg-black border-t border-violet-700 z-50
               animate-slideDown"
  >
    <a
      href="#features"
      className="block px-4 sm:px-6 py-3 text-white hover:bg-violet-900 transition-colors"
    >
      Features
    </a>
    <a
      href="#how"
      className="block px-4 sm:px-6 py-3 text-white hover:bg-violet-900 transition-colors"
    >
      How it Works
    </a>
    <a
      href="#testimonials"
      className="block px-4 sm:px-6 py-3 text-white hover:bg-violet-900 transition-colors"
    >
      Testimonials
    </a>
    <a
      href="#pricing"
      className="block px-4 sm:px-6 py-3 text-white hover:bg-violet-900 transition-colors"
    >
      Pricing
    </a>

    <div className="px-4 sm:px-6 py-2 flex flex-col gap-2">
      <Link
        to={"/login"}
        className="w-full bg-violet-500 text-white py-3 rounded-lg text-center hover:bg-violet-600 transition-colors"
      >
        Login
      </Link>
      <Link
        to={"/signup"}
        className="w-full border border-violet-500 text-violet-400 py-3 rounded-lg text-center hover:bg-violet-900 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  </div>
)}

    </nav>
  );
}
