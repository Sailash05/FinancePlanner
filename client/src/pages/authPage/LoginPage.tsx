import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../service/auth.service"; // uncomment when backend ready
import LoginLoader from "../../components/loadingComponent/authLoading/LoginLoader";
import SignupErrorAlert from "../../components/authComponent/SignupErrorAlert";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ✅ frontend validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ handle login
  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await AuthService.login(form); // make sure login is defined in AuthService
      const data = response.data;
      console.log(data);

      // store token & userId
      localStorage.setItem("UserId", data.data.userId);
      localStorage.setItem("JwtToken", data.data.jwtToken);
      navigate('/home');
      // you can navigate to dashboard here
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || "Invalid credentials");
      } else {
        setErrorMessage("Unable to connect. Please try again.");
      }
      setResponseError(true);
      setTimeout(() => setResponseError(false), 3000); // auto dismiss
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-violet-800 bg-black/70 backdrop-blur-md z-20">
        <Link to="/" className="text-2xl font-extrabold text-violet-400">
          FinexAI
        </Link>
        <Link
          to="/"
          className="text-sm px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition"
        >
          Home
        </Link>
      </header>

      <div className="flex flex-1">
        {/* Left Side - Welcome */}
        <div className="flex-1 items-end hidden lg:flex flex-col justify-center px-12 bg-gradient-to-br from-violet-900/30 to-black/80 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <h1 className="text-5xl font-extrabold text-violet-400 mb-6">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sign in to{" "}
              <span className="text-violet-400 font-semibold">FinexAI</span>{" "}
              and unlock powerful AI-driven financial insights. Predict, plan,
              and prosper with confidence.
            </p>

            <div className="mt-10">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">✅ Real-time predictions</li>
                <li className="flex items-center gap-3">✅ AI-powered risk management</li>
                <li className="flex items-center gap-3">✅ Trusted by thousands worldwide</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-left p-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-violet-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-violet-700"
          >
            <h2 className="text-3xl font-bold text-violet-400 text-center mb-6">
              Login to Your Account
            </h2>

            <form className="space-y-4" onSubmit={loginUser}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg shadow-md transition"
              >
                Sign In
              </button>
            </form>

            <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
              <a href="/forgot-password" className="hover:text-violet-400">
                Forgot Password?
              </a>
              <Link to="/signup" className="text-violet-400 hover:underline">
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loader & Error */}
      {isLoading && <LoginLoader />}
      {responseError && (
        <SignupErrorAlert
          message={errorMessage}
          onClose={() => setResponseError(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;
