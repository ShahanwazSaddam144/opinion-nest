"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Auth = () => {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isSignup &&
      formData.password !== formData.confirmPassword
    ) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);
    setMessage("");

    const url = isSignup
      ? `${API_URL}/auth/signin`
      : `${API_URL}/auth/login`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          isSignup
            ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
              }
            : {
                email: formData.email,
                password: formData.password,
              }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage(data.message);

        setTimeout(() => {
          router.push("/dashboard");
        }, 300);
      }
    } catch (err) {
      setMessage("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          if (window.location.pathname === "/") {
            router.push("/dashboard");
          }
        } else {
          if (window.location.pathname === "/dashboard") {
            router.push("/");
          }
        }
      } catch (err) {
        if (window.location.pathname === "/dashboard") {
          router.push("/");
        }
      }
    };

    checkAuth();
  }, [router]);

  return (
    <>
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white px-6">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-40" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-200 rounded-full blur-3xl opacity-30" />

      <motion.form
        initial={{ opacity: 0, y: 70, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-2xl border border-gray-200 rounded-[34px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-44 h-44 bg-blue-100 rounded-full blur-3xl opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-200">
            <BrainCircuit className="text-white" size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Opinion <span className="text-blue-600">Nest</span>
          </h1>

          <p className="mt-3 text-gray-500 text-center leading-relaxed">
            AI-powered business insights and smart digital experiences.
          </p>
        </motion.div>

        <div className="mt-8 relative z-10">
          <AnimatePresence mode="wait">
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full mb-4 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative mb-4"
              >
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                >
                  {showConfirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl shadow-blue-200 transition-all duration-300 disabled:opacity-70"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </motion.button>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600"
              >
                <ShieldCheck size={16} />
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Sparkles size={15} className="text-blue-600" />

            <span>
              {isSignup
                ? "Already have an account?"
                : "New user?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
              }}
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              {isSignup ? "Login" : "Create Account"}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
    <Footer />
    </>
  );
};

export default Auth;