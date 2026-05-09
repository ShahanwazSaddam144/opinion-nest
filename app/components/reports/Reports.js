"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reports = [
  { id: 1, title: "Customer Growth Q1", date: "Feb 12, 2024", owner: "Alice", status: "Completed", score: 88, pages: 14, category: "Growth", summary: "Detailed breakdown of customer acquisition channels with cohort retention analysis across all major product lines." },
  { id: 2, title: "Revenue Analysis", date: "May 03, 2024", owner: "Bob", status: "In Progress", score: 72, pages: 22, category: "Finance", summary: "Comprehensive revenue mapping by region, segment and product tier including MRR trend and churn impact projections." },
  { id: 3, title: "Market Sentiment", date: "Jul 21, 2024", owner: "Clara", status: "Completed", score: 95, pages: 9, category: "Research", summary: "NLP-driven sentiment analysis across 40k+ social mentions, review platforms and support tickets this quarter." },
  { id: 4, title: "Risk Assessment", date: "Jan 12, 2025", owner: "Dan", status: "Draft", score: 64, pages: 31, category: "Operations", summary: "Enterprise-level risk matrix covering operational, financial and compliance exposure with mitigation playbooks." },
  { id: 5, title: "Product Roadmap Review", date: "Mar 08, 2025", owner: "Eva", status: "In Progress", score: 79, pages: 17, category: "Product", summary: "Q2–Q4 feature prioritisation framework aligned to OKRs, incorporating user research and competitive benchmarking." },
  { id: 6, title: "Churn Prediction Model", date: "Apr 01, 2025", owner: "Felix", status: "Completed", score: 91, pages: 11, category: "Data", summary: "ML-based churn prediction achieving 87% accuracy on holdout set with actionable early-warning signals per segment." },
];

const statusMeta = {
  "Completed":   { bg: "#e8f5ee", text: "#15803d", dot: "#16a34a" },
  "In Progress": { bg: "#fef9ec", text: "#b45309", dot: "#f59e0b" },
  "Draft":       { bg: "#f1f5f9", text: "#475569", dot: "#94a3b8" },
};

const categoryColor = {
  "Growth":     "#2563eb",
  "Finance":    "#16a34a",
  "Research":   "#7c3aed",
  "Operations": "#dc2626",
  "Product":    "#ea580c",
  "Data":       "#0891b2",
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
};

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(r => {
      if (filter === "completed" && r.status !== "Completed") return false;
      if (filter === "inprogress" && r.status !== "In Progress") return false;
      if (filter === "draft" && r.status !== "Draft") return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
    });
  }, [query, filter]);

  const totalReports = reports.length;
  const avgScore = Math.round(reports.reduce((s, r) => s + r.score, 0) / reports.length);
  const activeProjects = reports.filter(r => r.status !== "Completed").length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f4f6f9", paddingTop: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" 
      id="reports"/>

      <style>{`
        .swiper-slide { height: auto; }
        .nav-btn { width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .nav-btn:hover { background: #2563eb; border-color: #2563eb; color: #fff; transform: scale(1.08); }
        .nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .nav-btn:disabled:hover { background: #fff; border-color: #e2e8f0; color: #0f172a; transform: none; }
        .swiper-pagination-bullet { width: 6px !important; height: 6px !important; background: #cbd5e1 !important; opacity: 1 !important; transition: all 0.3s !important; }
        .swiper-pagination-bullet-active { background: #2563eb !important; width: 22px !important; border-radius: 3px !important; }
        .filter-pill { padding: 7px 18px; border-radius: 50px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 13px; font-weight: 500; color: #64748b; cursor: pointer; transition: all 0.18s; font-family: inherit; }
        .filter-pill.active { background: #2563eb; border-color: #2563eb; color: #fff; }
        .filter-pill:hover:not(.active) { border-color: #2563eb; color: #2563eb; }
        input:focus { outline: none; border-color: #2563eb !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 6px" }}>Analytics</p>
              <h1 style={{ fontSize: 32, fontWeight: 600, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.03em" }}>Reports</h1>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, fontWeight: 300 }}>Generated reports and performance summaries</p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Reports", value: totalReports, color: "#2563eb", icon: "📄" },
            { label: "Avg. Score", value: `${avgScore}%`, color: "#16a34a", icon: "📊" },
            { label: "Active Projects", value: activeProjects, color: "#f97316", icon: "⚡" },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 1} style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 24px rgba(37,99,235,0.05)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "0 18px 0 80px", background: `${s.color}08` }} />
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 10px" }}>{s.label}</p>
              <p style={{ fontSize: 30, fontWeight: 600, color: "#0f172a", margin: "0 0 14px", letterSpacing: "-0.04em" }}>{s.value}</p>
              <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${s.color} 0%, ${s.color}22 100%)` }} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 24px rgba(37,99,235,0.05)", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
            <div style={{ position: "relative" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search reports, owner, category…" style={{ paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, fontSize: 14, border: "1.5px solid #e2e8f0", borderRadius: 12, fontFamily: "inherit", fontWeight: 300, color: "#0f172a", width: 280, transition: "border-color 0.2s", background: "#f8fafd" }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["all", "All"], ["completed", "Completed"], ["inprogress", "In Progress"], ["draft", "Draft"]].map(([val, label]) => (
                <button key={val} className={`filter-pill${filter === val ? " active" : ""}`} onClick={() => setFilter(val)}>{label}</button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${query}-${filter}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 14 }}>No reports match your search.</div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{filtered.length} report{filtered.length !== 1 ? "s" : ""}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="swiper-pagination-reports" style={{ display: "flex", alignItems: "center", gap: 4 }} />
                      <button ref={prevRef} className="nav-btn" aria-label="Previous">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button ref={nextRef} className="nav-btn" aria-label="Next">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </div>
                  </div>

                  <Swiper
                    key={`${query}-${filter}`}
                    modules={[Pagination, Navigation]}
                    spaceBetween={16}
                    slidesPerView={1}
                    onSwiper={swiper => { swiperRef.current = swiper; }}
                    onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    onBeforeInit={swiper => {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    pagination={{ clickable: true, el: ".swiper-pagination-reports" }}
                    breakpoints={{ 640: { slidesPerView: 2 }, 960: { slidesPerView: 3 } }}
                    style={{ paddingBottom: 4 }}
                  >
                    {filtered.map((r, i) => (
                      <SwiperSlide key={r.id}>
                        <PaperReportCard report={r} index={i} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 24px rgba(37,99,235,0.05)" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 18 }}>All Reports</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  {["Title", "Owner", "Date", "Category", "Score", "Status"].map(h => (
                    <th key={h} style={{ textAlign: "left", paddingBottom: 12, fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94a3b8", borderBottom: "1.5px solid #f1f5f9" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const sm = statusMeta[r.status];
                  const cc = categoryColor[r.category];
                  return (
                    <motion.tr key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }} style={{ borderBottom: "1px solid #f8fafd" }}>
                      <td style={{ padding: "14px 0", fontWeight: 500, color: "#0f172a" }}>{r.title}</td>
                      <td style={{ padding: "14px 12px", color: "#64748b" }}>{r.owner}</td>
                      <td style={{ padding: "14px 12px", color: "#64748b", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{r.date}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: cc, background: `${cc}12`, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em" }}>{r.category}</span>
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#f1f5f9", minWidth: 56 }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${r.score}%` }} transition={{ delay: i * 0.05 + 0.3, duration: 0.6, ease: "easeOut" }} style={{ height: "100%", borderRadius: 2, background: r.score >= 85 ? "#16a34a" : r.score >= 70 ? "#f59e0b" : "#dc2626" }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", minWidth: 28 }}>{r.score}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 0" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: sm.bg, color: sm.text, display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: sm.dot, display: "inline-block" }} />
                          {r.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function PaperReportCard({ report: r, index }) {
  const sm = statusMeta[r.status];
  const cc = categoryColor[r.category];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index * 0.5}
      style={{
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        position: "absolute",
        top: 6,
        left: 10,
        right: 10,
        height: "100%",
        borderRadius: 16,
        background: "#e8edf2",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute",
        top: 3,
        left: 6,
        right: 6,
        height: "100%",
        borderRadius: 16,
        background: "#f0f3f7",
        zIndex: 1,
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        background: "#fff",
        borderRadius: 16,
        padding: "22px 20px",
        border: "1px solid #e8edf2",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: cc, background: `${cc}12`, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em" }}>{r.category}</span>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: sm.bg, color: sm.text, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: sm.dot }} />
            {r.status}
          </span>
        </div>

        <div style={{ borderTop: "1.5px dashed #e8edf2", margin: "0 -20px", paddingTop: 14, paddingLeft: 20, paddingRight: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{r.title}</h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.65, fontWeight: 300 }}>{r.summary}</p>
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8" }}>
            <span>{r.owner}</span>
            <span style={{ fontFamily: "'DM Mono', monospace" }}>{r.date}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, marginRight: 12 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#f1f5f9" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.score}%` }}
                  transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 2, background: r.score >= 85 ? "#16a34a" : r.score >= 70 ? "#f59e0b" : "#dc2626" }}
                />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>{r.score}%</span>
            </div>
            <span style={{ fontSize: 11, color: "#cbd5e1", fontFamily: "'DM Mono', monospace" }}>{r.pages}p</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
