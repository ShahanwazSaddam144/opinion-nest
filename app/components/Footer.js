"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  return (
    <section className="mt-28 border-t border-gray-200 bg-white overflow-hidden">
      <footer className="max-w-7xl mx-auto px-6 md:px-14 lg:px-24 py-16">
        {/* Top Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-14">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg">
                <BrainCircuit size={24} />
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Opinion <span className="text-blue-600">Nest</span>
              </h1>
            </div>

            <p className="mt-6 text-gray-500 leading-relaxed text-lg">
              AI-powered business insights, smart reviews, SEO intelligence,
              and future market analysis designed to help modern businesses
              make smarter decisions with confidence.
            </p>

            {/* Elegant line */}
            <div className="mt-8 w-24 h-[3px] bg-blue-600 rounded-full" />
          </motion.div>

          {/* Right Minimal Links */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3 group">
                <Sparkles className="text-blue-600 group-hover:rotate-12 transition duration-300" />
                <span className="text-gray-700 font-medium hover:text-blue-600 transition duration-300 cursor-pointer">
                  AI Reviews
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <TrendingUp className="text-blue-600 group-hover:-translate-y-1 transition duration-300" />
                <span className="text-gray-700 font-medium hover:text-blue-600 transition duration-300 cursor-pointer">
                  Market Trends
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3 group">
                <ShieldCheck className="text-blue-600 group-hover:scale-110 transition duration-300" />
                <span className="text-gray-700 font-medium hover:text-blue-600 transition duration-300 cursor-pointer">
                  Trust Score
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <BrainCircuit className="text-blue-600 group-hover:rotate-6 transition duration-300" />
                <span className="text-gray-700 font-medium hover:text-blue-600 transition duration-300 cursor-pointer">
                  Smart Insights
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-5"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2026 Opinion Nest. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Crafted with</span>

            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
              }}
              className="text-blue-600"
            >
              ✦
            </motion.span>

            <span>Modern AI Experience</span>
          </div>
        </motion.div>
      </footer>
    </section>
  );
};

export default Footer;