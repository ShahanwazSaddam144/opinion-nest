"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: <BrainCircuit size={28} />,
    title: "AI Business Intelligence",
    desc: "Advanced AI systems delivering smart market analysis, business insights, and predictive strategies.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Trusted Company Reviews",
    desc: "Discover authentic ratings, trust scores, and intelligent reviews for businesses and startups.",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Future Market Trends",
    desc: "Track growing industries, digital transformation, and future opportunities powered by AI.",
  },
];

const LearnMore = () => {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-white pt-[120px] pb-24 px-6 md:px-14 lg:px-24">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-40" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-200 rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.header
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-center text-center"
          >
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full">
              <Sparkles size={16} className="text-blue-600" />

              <span className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Opinion Nest Intelligence
              </span>
            </div>

            <h1 className="mt-8 text-4xl md:text-6xl font-bold text-gray-900 leading-[1.2] max-w-5xl">
              Learn More About the Future of
              <span className="text-blue-600">
                {" "}
                AI-Powered Business Intelligence
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl leading-relaxed text-gray-500 max-w-3xl">
              Explore how Opinion Nest transforms business decisions with
              AI-powered insights, trusted reviews, and intelligent market
              analysis.
              <br className="hidden md:block" />
              Discover smarter strategies, future trends, and data-driven
              innovation built for modern businesses.
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-10 h-[4px] bg-blue-600 rounded-full"
            />
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-gray-200 rounded-[30px] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                    {item.icon}
                  </div>

                  <h2 className="mt-7 text-2xl font-bold text-gray-900">
                    {item.title}
                  </h2>

                  <p className="mt-5 text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-7 w-14 h-[3px] bg-blue-600 rounded-full group-hover:w-24 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-[35px] p-10 md:p-16 text-center shadow-2xl shadow-blue-200"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Smarter Decisions Start With
              <br />
              AI-Driven Insights
            </h2>

            <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Unlock intelligent business reviews, market predictions, and
              powerful digital insights with a sleek modern AI experience.
            </p>

            <button className="mt-10 px-8 py-4 rounded-2xl bg-white text-blue-600 font-semibold hover:scale-105 transition-all duration-300 shadow-xl">
              Explore Insights
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LearnMore;