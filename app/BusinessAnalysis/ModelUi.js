"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Header from "./Header";
import { fadeUp } from "./animations";

const ModelUi = () => {
  const [form, setForm] = useState({ name: "", industry: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("https://api.business-model.buttnetworks.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f8f9fb", padding: "48px 32px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <Header />

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={1}
          style={{ background: "#fff", borderRadius: 20, padding: "36px 40px", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(37,99,235,0.06)", marginBottom: 32 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field>
                <Label>Business Name</Label>
                <Input name="name" placeholder="e.g. NovaBrew" onChange={handleChange} />
              </Field>
              <Field>
                <Label>Industry</Label>
                <Input name="industry" placeholder="e.g. tech, food, manufacturing" onChange={handleChange} />
              </Field>
            </div>

            <Field>
              <Label>Business Description</Label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe your business idea in detail..."
                onChange={handleChange}
                style={{
                  width: "100%", padding: "12px 16px", fontSize: 14, color: "#0f172a",
                  background: "#f8fafd", border: "1.5px solid #e2e8f0", borderRadius: 12,
                  outline: "none", resize: "none", fontFamily: "inherit", fontWeight: 300,
                  transition: "border-color 0.2s", boxSizing: "border-box", lineHeight: 1.6,
                }}
                onFocus={e => e.target.style.borderColor = "#2563eb"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </Field>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: "15px 24px", borderRadius: 12, border: "none",
                background: loading ? "#94a3b8" : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#fff", fontSize: 15, fontWeight: 500, fontFamily: "inherit",
                cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.01em",
                transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
              onMouseEnter={e => { if (!loading) e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 8px 24px rgba(37,99,235,0.3)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Analyzing...
                </>
              ) : "Analyze Business"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
                style={{ background: "#fff", borderRadius: 20, padding: "32px 40px", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(37,99,235,0.06)" }}>
                <SectionLabel>Overview</SectionLabel>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>{result.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                  <StatCard label="Investment" value={result.investment} color="#2563eb" />
                  <StatCard label="Workers" value={result.workers} color="#0f172a" />
                  <StatCard label="Profit Range" value={result.profit?.range} color="#16a34a" />
                  <StatCard label="Risk Level" value={result.risk} color="#dc2626" />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

                <ChartCard title="Historical Performance" subtitle="Past 6 years" data={result.past_yearly_analysis} />
                <ChartCard title="Growth Projection" subtitle="Next 6 years" data={result.yearly_analysis} />
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
                style={{ background: "#fff", borderRadius: 20, padding: "32px 40px", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(37,99,235,0.06)" }}>
                <SectionLabel>Scale Comparison</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 8 }}>
                  <ScaleCard title="Small Scale" data={result.scale?.small} accent="#64748b" />
                  <ScaleCard title="Medium Scale" data={result.scale?.medium} accent="#2563eb" featured />
                  <ScaleCard title="Large Scale" data={result.scale?.large} accent="#0f172a" />
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              style={{
                position: "fixed", bottom: 24, right: 24,
                background: "#0f172a", color: "#fff",
                padding: "14px 20px", borderRadius: 12, fontSize: 14,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)", maxWidth: 320,
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171", flexShrink: 0 }} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          input::placeholder, textarea::placeholder { color: #94a3b8; }
        `}</style>
      </div>
    </div>
  );
};

const Field = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>{children}</div>
);

const Label = ({ children }) => (
  <label style={{ fontSize: 12, fontWeight: 500, color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase" }}>{children}</label>
);

const Input = ({ name, placeholder, onChange }) => (
  <input
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    style={{
      width: "100%", padding: "12px 16px", fontSize: 14, color: "#0f172a",
      background: "#f8fafd", border: "1.5px solid #e2e8f0", borderRadius: 12,
      outline: "none", fontFamily: "inherit", fontWeight: 300, boxSizing: "border-box",
      transition: "border-color 0.2s",
    }}
    onFocus={e => e.target.style.borderColor = "#2563eb"}
    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
  />
);

const SectionLabel = ({ children }) => (
  <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16, marginTop: 0 }}>
    {children}
  </h3>
);

const StatCard = ({ label, value, color }) => (
  <div style={{ background: "#f8fafd", borderRadius: 14, padding: "18px 20px" }}>
    <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</p>
    <p style={{ fontSize: 20, fontWeight: 600, color, margin: 0, letterSpacing: "-0.02em" }}>{value}</p>
  </div>
);

const ChartCard = ({ title, subtitle, data }) => (
  <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(37,99,235,0.06)" }}>
    <SectionLabel>{subtitle}</SectionLabel>
    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 24px", letterSpacing: "-0.01em" }}>{title}</h3>
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 13, fontFamily: "DM Sans" }}
            cursor={{ stroke: "#e2e8f0" }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#2563eb" }} />
          <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#16a34a" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
      <LegendItem color="#2563eb" label="Revenue" />
      <LegendItem color="#16a34a" label="Profit" />
    </div>
  </div>
);

const LegendItem = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
    <span style={{ width: 24, height: 2.5, background: color, borderRadius: 2, display: "inline-block" }} />
    <span style={{ fontSize: 12, color: "#64748b", fontWeight: 400 }}>{label}</span>
  </div>
);

const ScaleCard = ({ title, data, accent, featured }) => (
  <div style={{
    borderRadius: 16, padding: "24px 24px",
    background: featured ? "#eff6ff" : "#f8fafd",
    outline: featured ? "2px solid #2563eb" : "none",
    position: "relative", transition: "transform 0.2s",
  }}>
    {featured && (
      <span style={{
        position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
        background: "#2563eb", color: "#fff", fontSize: 10, fontWeight: 600,
        padding: "3px 12px", borderRadius: 20, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>Recommended</span>
    )}
    <h4 style={{ fontSize: 14, fontWeight: 600, color: accent, marginBottom: 16, letterSpacing: "-0.01em" }}>{title}</h4>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <ScaleRow label="Workers" value={data?.workers} />
      <ScaleRow label="Investment" value={data?.investment} />
      <ScaleRow label="Revenue" value={data?.revenue} />
      <ScaleRow label="Profit" value={data?.profit} />
    </div>
  </div>
);

const ScaleRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{value}</span>
  </div>
);

export default ModelUi;
