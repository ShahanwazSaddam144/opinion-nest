"use client";

import React from "react";
import { motion } from "framer-motion";

const trends = [
  {
    title: "AI-Powered Business Intelligence",
    highlight: "Smart Insights",
    description:
      "Discover advanced AI-generated market analysis, customer behavior tracking, and predictive business intelligence for smarter growth.",
  },
  {
    title: "Startup & Company Reviews",
    highlight: "Trusted Ratings",
    description:
      "Explore authentic AI-powered business reviews, company trust scores, and detailed startup evaluations in real time.",
  },
  {
    title: "SEO & Digital Visibility",
    highlight: "Search Growth",
    description:
      "Improve online reach with intelligent SEO trends, keyword strategies, and digital optimization insights for businesses.",
  },
  {
    title: "Future Market Predictions",
    highlight: "Market Trends",
    description:
      "Track emerging industries, future opportunities, and business trend forecasting powered by modern AI systems.",
  },
];

const MarketTrends = () => {
  return (
    <section className="mt-24 px-6 md:px-14 lg:px-24 overflow-hidden mb-10" id="marketTrends">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <span className="text-blue-600 font-semibold tracking-[3px] uppercase mb-4">
            Opinion Nest Insights
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 max-w-4xl">
            AI Driven{" "}
            <span className="text-blue-600">
              Business Trends
            </span>{" "}
            & Smart Market Analysis
          </h1>

          <p className="mt-6 text-gray-500 text-lg max-w-2xl leading-relaxed">
            Explore intelligent business reviews, startup insights, SEO
            analytics, and future market opportunities with sleek AI-powered
            recommendations.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {trends.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10">
                <span className="text-sm font-semibold tracking-widest uppercase text-blue-600">
                  {item.highlight}
                </span>

                <h2 className="mt-4 text-2xl font-bold text-gray-900 leading-snug">
                  {item.title}
                </h2>

                <p className="mt-5 text-gray-500 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-6 w-14 h-[3px] bg-blue-600 rounded-full group-hover:w-24 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketTrends;