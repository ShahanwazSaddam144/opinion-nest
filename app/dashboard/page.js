"use client"

import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Chatbot from "../Chatbot/Chatbot";
import MainBusinessPage from "../BusinessAnalysis/Main";
import MarketTrends from "../components/marketTrends";
import Footer from "../components/Footer";
import ReportsPage from "../components/reports/Reports";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard = () => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Auth check failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

    if (loading) return null;

    return(
        <>
        <Navbar />
        <Hero />
        <Chatbot />
        <MainBusinessPage />
        <MarketTrends />
        <ReportsPage />
        <Footer />
        </>
    )
}

export default Dashboard;