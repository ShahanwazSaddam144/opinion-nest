"use client";

import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="w-full px-8 py-12 flex flex-col items-start justify-start">
      
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
      >
        Try Our{" "}
        <span className="text-blue-600 relative inline-block">
          Business Analysis
          
          {/* Animated underline */}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-0 -bottom-1 h-[3px] bg-blue-600 rounded-full"
          />
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-4 text-lg text-gray-600 max-w-xl"
      >
        AI-powered insights to analyze, predict, and scale your business with precision and data-driven decisions.
      </motion.p>

      {/* Bottom Accent Line */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "80px" }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6 h-1 bg-blue-600 rounded-full"
      />
      
    </header>
  );
};

export default Header;