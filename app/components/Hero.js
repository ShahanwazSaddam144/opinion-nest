"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const images = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
];

const Hero = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  return (
    <div className="relative overflow-hidden bg-white min-h-[85vh] flex items-center justify-center px-4">

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.2; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-40px); opacity: 0; }
        }

        .float-item {
          position: absolute;
          background: rgba(59,130,246,0.15);
          border-radius: 9999px;
          animation: float 6s infinite ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes slide {
          0% { opacity: 0; transform: scale(1.05); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.1); }
        }

        .slide-img {
          animation: slide 4s ease-in-out infinite;
        }
      `}</style>

      <div className="float-item w-6 h-6 top-10 left-10" />
      <div className="float-item w-10 h-10 top-20 right-20" style={{ animationDelay: "1s" }} />
      <div className="float-item w-8 h-8 bottom-20 left-1/3" style={{ animationDelay: "2s" }} />
      <div className="float-item w-12 h-12 bottom-10 right-10" style={{ animationDelay: "3s" }} />

      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">

        <div className="text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 fade-in">
            AI-Powered  <span className="text-blue-600">Business Insights</span>
          </h1>

          <p className="text-gray-500 mt-4 fade-in" style={{ animationDelay: "200ms" }}>
            Predict market trends, analyze ideas, and build future-ready businesses with Opinion-Nest AI.
          </p>

          <p className="text-gray-400 mt-3 text-sm fade-in" style={{ animationDelay: "300ms" }}>
            Get data-driven predictions for startups, e-commerce, SaaS, freelancing, and emerging digital markets.
            Our AI evaluates demand, competition, scalability, and risk in seconds.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start fade-in" style={{ animationDelay: "350ms" }}>
            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">Market Analysis</span>
            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">AI Prediction</span>
            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">Business Scoring</span>
            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">Trend Forecast</span>
          </div>

          <div className="mt-6 flex gap-4 justify-center md:justify-start fade-in" style={{ animationDelay: "400ms" }}>
            <Link href={"#dashboard"}>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Start Analysis
            </button>
            </Link>

            <button
              onClick={() => router.push("/about")}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600 transition"
            >
              Learn More
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-5 fade-in" style={{ animationDelay: "500ms" }}>
            Trusted AI model for early-stage business validation and market research insights.
          </p>
        </div>

        <div className="relative w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl fade-in">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="AI Business"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100 slide-img" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-lg text-sm text-gray-700">
            AI Market Vision
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;