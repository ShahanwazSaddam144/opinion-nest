"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ModelUi = () => {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        "https://api.business-model.buttnetworks.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="w-full px-8 py-10 space-y-10">

      {/* INPUT */}
      <div className="max-w-3xl border rounded-2xl p-6 bg-white">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Business Analysis
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Business Name"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            name="industry"
            placeholder="Industry (tech, food, factory...)"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <textarea
            name="description"
            rows={4}
            placeholder="Describe your business idea..."
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "AI is thinking..." : "Analyze Business"}
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >

          {/* SUMMARY */}
          <div className="border rounded-2xl p-6 bg-white space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Overview
            </h2>

            <p className="text-gray-700">{result.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Investment" value={result.investment} />
              <Stat label="Workers" value={result.workers} />
              <Stat label="Profit" value={result.profit.range} />
              <Stat label="Risk" value={result.risk} />
            </div>
          </div>

          {/* PAST ANALYSIS */}
          <div className="border rounded-2xl p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Past 6 Years Performance
            </h3>
            <Chart data={result.past_yearly_analysis} />
          </div>

          {/* FUTURE ANALYSIS */}
          <div className="border rounded-2xl p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Future Prediction (6 Years)
            </h3>
            <Chart data={result.yearly_analysis} />
          </div>

          {/* SCALE */}
          <div className="border rounded-2xl p-6 bg-white">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">
              Scale Comparison
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <ScaleCard title="Small Scale" data={result.scale.small} />
              <ScaleCard title="Medium Scale" data={result.scale.medium} />
              <ScaleCard title="Large Scale" data={result.scale.large} />
            </div>
          </div>
        </motion.div>
      )}

      {/* ERROR TOAST */}
      {error && (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

/* SMALL COMPONENTS */

const Stat = ({ label, value }) => (
  <div className="border rounded-lg p-4">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-blue-600 font-semibold">{value}</p>
  </div>
);

const ScaleCard = ({ title, data }) => (
  <div className="border rounded-xl p-4">
    <h4 className="text-gray-900 font-semibold mb-3">{title}</h4>
    <p className="text-gray-600 text-sm">Workers: {data.workers}</p>
    <p className="text-gray-600 text-sm">Investment: {data.investment}</p>
    <p className="text-gray-600 text-sm">Revenue: {data.revenue}</p>
    <p className="text-gray-600 text-sm">Profit: {data.profit}</p>
  </div>
);

const Chart = ({ data }) => (
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
        <Line type="monotone" dataKey="profit" stroke="#16a34a" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ModelUi;