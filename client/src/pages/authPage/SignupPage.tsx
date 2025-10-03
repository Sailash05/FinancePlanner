import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../service/auth.service"; // uncomment when using backend
import CreatingAccountLoader from "../../components/loadingComponent/authLoading/CreatingAccountLoader";
import SignupErrorAlert from "../../components/authComponent/SignupErrorAlert";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!form.name.trim()) newErrors.name = "Full name is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email)) newErrors.email = "Email is invalid";

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!form.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be at least 8 characters long and include one letter, one number, and one special character";

    // Confirm password
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await AuthService.signup(form);
      const data = response.data;
      localStorage.setItem('UserId', data.data.userId);
      localStorage.setItem('JwtToken', data.data.jwtToken);
      navigate('/home');
    }
    catch (err: any) {
      if (err.response && err.response.data) {
        // backend failure response
        setErrorMessage(err.response.data.message || "Something went wrong");
      } else {
        // network or unexpected error
        setErrorMessage("Unable to connect. Please try again.");
      }
      setResponseError(true);
      setTimeout(() => setResponseError(false), 3000);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-violet-800 bg-black/70 backdrop-blur-md z-20">
        <Link to="/" className="text-2xl font-extrabold text-violet-400">FinexAI</Link>
        <Link to="/" className="text-sm px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition">Home</Link>
      </header>

      <div className="flex flex-1">
        {/* Left Side */}
        <div className="flex-1 hidden lg:flex flex-col justify-center items-end px-12 bg-gradient-to-br from-violet-900/30 to-black/80 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <h1 className="text-5xl font-extrabold text-violet-400 mb-6">
              Join FinexAI Today
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Create your free account and experience the future of finance with{" "}
              <span className="text-violet-400 font-semibold">AI-driven predictions</span>.  
              Gain insights, optimize investments, and secure your financial journey.
            </p>

            <div className="mt-10">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  🚀 Quick & easy signup
                </li>
                <li className="flex items-center gap-3">
                  🔒 Bank-level security
                </li>
                <li className="flex items-center gap-3">
                  🌍 Trusted by thousands globally
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-left p-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-violet-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-violet-700"
          >
            <h2 className="text-3xl font-bold text-violet-400 text-center mb-6">Create Your Account</h2>

            <form className="space-y-4" onSubmit={createUser}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg shadow-md transition"
              >
                Sign Up
              </button>
            </form>

            <div className="flex justify-center items-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="ml-2 text-violet-400 hover:underline">Login</Link>
            </div>
          </motion.div>
        </div>
      </div>
      {
        isLoading && <CreatingAccountLoader />
      }
      {
        responseError && <SignupErrorAlert message={errorMessage} onClose={() => setResponseError(false)} />
      }
    </div>
  );
};

export default SignupPage;
