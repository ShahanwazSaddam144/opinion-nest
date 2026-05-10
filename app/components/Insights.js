import React, { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const sentimentData = [
  { month: "Jan", positive: 72, negative: 18, neutral: 10 },
  { month: "Feb", positive: 68, negative: 22, neutral: 10 },
  { month: "Mar", positive: 80, negative: 12, neutral: 8 },
  { month: "Apr", positive: 76, negative: 14, neutral: 10 },
  { month: "May", positive: 84, negative: 10, neutral: 6 },
  { month: "Jun", positive: 79, negative: 13, neutral: 8 },
];

const complaints = [
  { text: "Slow response time", count: 342, pct: 87 },
  { text: "UI navigation confusion", count: 289, pct: 73 },
  { text: "Missing dark mode", count: 201, pct: 51 },
  { text: "Export limitations", count: 178, pct: 45 },
  { text: "Notification overload", count: 134, pct: 34 },
];

const positives = [
  { text: "Intuitive onboarding", count: 512, pct: 92 },
  { text: "AI accuracy praised", count: 478, pct: 86 },
  { text: "Clean design language", count: 401, pct: 72 },
  { text: "Fast data loading", count: 367, pct: 66 },
  { text: "Excellent support team", count: 298, pct: 54 },
];

const segments = [
  { label: "Enterprise", value: 38, color: "#2563eb" },
  { label: "SMB", value: 29, color: "#60a5fa" },
  { label: "Startup", value: 21, color: "#93c5fd" },
  { label: "Individual", value: 12, color: "#dbeafe" },
];

const words = [
  { word: "Intuitive", size: 2.2 }, { word: "Fast", size: 1.8 }, { word: "Clean", size: 2.0 },
  { word: "Reliable", size: 1.6 }, { word: "Modern", size: 1.9 }, { word: "Smooth", size: 1.4 },
  { word: "Powerful", size: 1.7 }, { word: "Helpful", size: 2.1 }, { word: "Accurate", size: 1.5 },
  { word: "Beautiful", size: 1.3 }, { word: "Responsive", size: 1.6 }, { word: "Insightful", size: 1.8 },
  { word: "Efficient", size: 1.4 }, { word: "Seamless", size: 1.9 }, { word: "Smart", size: 2.0 },
];

const recommendations = [
  { icon: "⚡", title: "Optimize Response Time", desc: "87% of complaints cite latency. Implement edge caching to reduce TTFB by ~40%.", priority: "High" },
  { icon: "🗺️", title: "Revamp Navigation", desc: "73% struggle with nav flows. A persistent sidebar with breadcrumbs would reduce friction significantly.", priority: "High" },
  { icon: "🌙", title: "Introduce Dark Mode", desc: "51% of users explicitly requested dark mode. A simple system-preference toggle could boost retention.", priority: "Medium" },
  { icon: "📤", title: "Expand Export Options", desc: "45% hit export limits. Adding CSV + raw JSON endpoints satisfies power users instantly.", priority: "Medium" },
  { icon: "🔔", title: "Smarter Notifications", desc: "34% feel overwhelmed. Digest mode and priority filters can recover attention bandwidth.", priority: "Low" },
];

const navItems = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "sentiment", label: "Sentiment Trends", icon: "📈" },
  { id: "summary", label: "AI Summary", icon: "🤖" },
  { id: "complaints", label: "Common Complaints", icon: "⚠️" },
  { id: "positive", label: "Positive Mentions", icon: "✨" },
  { id: "segments", label: "User Segments", icon: "👥" },
  { id: "wordcloud", label: "Word Cloud", icon: "☁️" },
  { id: "charts", label: "Charts", icon: "📉" },
  { id: "recommendations", label: "AI Recommendations", icon: "💡" },
];

const BarChart = () => {
  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView();
  useEffect(() => { if (inView) setTimeout(() => setAnimated(true), 150); }, [inView]);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "150px", padding: "0 4px" }}>
      {sentimentData.map((d, i) => (
        <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "2px" }}>
            {[{ v: d.positive, c: "#2563eb" }, { v: d.negative, c: "#fca5a5" }, { v: d.neutral, c: "#e2e8f0" }].map((bar, bi) => (
              <div key={bi} style={{ width: "100%", background: bar.c, borderRadius: "3px 3px 0 0", height: animated ? `${(bar.v / 100) * 100}px` : "0px", transition: `height 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07 + bi * 0.04}s` }} />
            ))}
          </div>
          <span style={{ fontSize: "10px", color: "#9ca3af" }}>{d.month}</span>
        </div>
      ))}
    </div>
  );
};

const DonutChart = () => {
  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView();
  useEffect(() => { if (inView) setTimeout(() => setAnimated(true), 250); }, [inView]);
  const r = 52, cx = 64, cy = 64, circ = 2 * Math.PI * r;
  let acc = 0;
  const slices = segments.map(s => { const start = acc; acc += s.value; return { ...s, start }; });
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
      <svg width="128" height="128" viewBox="0 0 128 128" style={{ flexShrink: 0 }}>
        {slices.map((s, i) => {
          const dashLen = (s.value / 100) * circ;
          const offset = circ - (s.start / 100) * circ;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="20"
              strokeDasharray={`${animated ? dashLen : 0} ${circ}`}
              strokeDashoffset={offset}
              style={{ transition: `stroke-dasharray 0.85s cubic-bezier(0.34,1.1,0.64,1) ${i * 0.1}s`, transformOrigin: "center", transform: "rotate(-90deg)" }} />
          );
        })}
        <text x="64" y="69" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="600" fontFamily="inherit">Users</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: "13px", color: "#374151" }}>{s.label}</span>
            <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: "700", marginLeft: "auto", paddingLeft: "16px" }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ pct, color = "#2563eb", delay = 0 }) => {
  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView();
  useEffect(() => { if (inView) setTimeout(() => setAnimated(true), delay * 1000 + 150); }, [inView]);
  return (
    <div ref={ref} style={{ height: "5px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden" }}>
      <div style={{ height: "100%", background: color, borderRadius: "99px", width: animated ? `${pct}%` : "0%", transition: `width 0.85s cubic-bezier(0.34,1.1,0.64,1)` }} />
    </div>
  );
};

const StatCard = ({ value, label, trend, delay, icon }) => (
  <FadeIn delay={delay}>
    <div className="stat-card" style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", padding: "20px 22px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}>
      <div style={{ position: "absolute", top: "14px", right: "16px", fontSize: "22px", opacity: 0.1 }}>{icon}</div>
      <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px", fontWeight: "500" }}>{label}</div>
      {trend !== undefined && (
        <div style={{ fontSize: "11px", color: trend > 0 ? "#16a34a" : "#dc2626", marginTop: "8px", fontWeight: "700", display: "flex", alignItems: "center", gap: "3px" }}>
          <span>{trend > 0 ? "▲" : "▼"}</span>
          <span>{Math.abs(trend)}% vs last period</span>
        </div>
      )}
    </div>
  </FadeIn>
);

const SectionPanel = ({ id, activeId, children }) => (
  <div style={{ display: activeId === id ? "block" : "none" }}>{children}</div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: "20px" }}>
    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#111827", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{title}</h3>
    <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{subtitle}</p>
  </div>
);

const Insights = () => {
  const [activeId, setActiveId] = useState("overview");
  const [exportPulse, setExportPulse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleExport = () => {
    setExportPulse(true);
    setTimeout(() => setExportPulse(false), 700);
  };

  const activeNav = navItems.find(n => n.id === activeId);

  return (
    <section className="mt-20" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }} id="ai-insights">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0.22);}50%{box-shadow:0 0 0 7px rgba(37,99,235,0);} }
        @keyframes contentIn { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }
        .nav-btn { transition: background 0.16s, border-color 0.16s, color 0.16s !important; }
        .nav-btn:hover { background: #eff6ff !important; }
        .stat-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.09) !important; transform: translateY(-2px); }
        .rec-card { transition: border-color 0.18s, background 0.18s !important; }
        .rec-card:hover { border-color: #dbeafe !important; background: #f0f6ff !important; }
        .word-chip { transition: color 0.18s, transform 0.18s; display: inline-block; cursor: default; }
        .word-chip:hover { color: #2563eb !important; transform: scale(1.08); }
        .export-btn { transition: background 0.18s, transform 0.15s, box-shadow 0.18s !important; }
        .export-btn:hover { background: #1d4ed8 !important; transform: translateY(-1px) !important; box-shadow: 0 6px 18px rgba(37,99,235,0.28) !important; }
        .period-btn { transition: all 0.15s; }
        .period-btn:hover { border-color: #93c5fd !important; color: #2563eb !important; }
        .mobile-nav-item { transition: background 0.14s; }
        .mobile-nav-item:hover { background: #eff6ff !important; }
        .content-panel { animation: contentIn 0.3s ease both; }
      `}</style>

      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 20px" }}>

        <FadeIn delay={0}>
          <div style={{ marginBottom: "28px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2563eb", animation: "pulse 2.2s infinite" }} />
                <span style={{ fontSize: "11px", color: "#2563eb", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>Live · Updated just now</span>
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>AI Insights Dashboard</h2>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "6px", fontWeight: "500" }}>Powered by 94,200 user responses · Last 6 months</p>
            </div>
            <div style={{ display: "flex", gap: "7px" }}>
              {["Q1", "Q2", "6M", "1Y"].map((p, i) => (
                <button key={p} className="period-btn"
                  style={{ padding: "6px 14px", fontSize: "12px", fontWeight: "600", borderRadius: "8px", border: "1px solid", borderColor: i === 2 ? "#2563eb" : "#e5e7eb", background: i === 2 ? "#eff6ff" : "#fff", color: i === 2 ? "#2563eb" : "#6b7280", cursor: "pointer", fontFamily: "inherit" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>

            {isMobile ? (
              <div style={{ width: "100%", background: "#fff", border: "1px solid #f1f5f9", borderRadius: "12px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <button onClick={() => setMobileNavOpen(v => !v)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "16px" }}>{activeNav?.icon}</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>{activeNav?.label}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: mobileNavOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.28s" }}>
                    <path d="M2.5 5l4.5 4.5L11.5 5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {mobileNavOpen && (
                  <div style={{ borderTop: "1px solid #f1f5f9", animation: "slideDown 0.2s ease" }}>
                    {navItems.map(item => (
                      <button key={item.id} onClick={() => { setActiveId(item.id); setMobileNavOpen(false); }}
                        className="mobile-nav-item"
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "11px 18px", background: activeId === item.id ? "#eff6ff" : "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                        <span style={{ fontSize: "15px" }}>{item.icon}</span>
                        <span style={{ fontSize: "13px", fontWeight: activeId === item.id ? "600" : "500", color: activeId === item.id ? "#2563eb" : "#374151" }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ width: "214px", flexShrink: 0, background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", overflow: "hidden", position: "sticky", top: "24px" }}>
                <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #f8fafc" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#c4c9d4", textTransform: "uppercase", letterSpacing: "0.09em" }}>Sections</span>
                </div>
                {navItems.map(item => (
                  <button key={item.id} onClick={() => setActiveId(item.id)}
                    className="nav-btn"
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: activeId === item.id ? "#eff6ff" : "transparent", border: "none", borderLeft: `3px solid ${activeId === item.id ? "#2563eb" : "transparent"}`, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                    <span style={{ fontSize: "14px", lineHeight: 1 }}>{item.icon}</span>
                    <span style={{ fontSize: "12.5px", fontWeight: activeId === item.id ? "600" : "500", color: activeId === item.id ? "#2563eb" : "#6b7280", lineHeight: 1.25 }}>{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div key={activeId} className="content-panel"
                style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", padding: isMobile ? "20px" : "28px", minHeight: "360px" }}>

                <SectionPanel id="overview" activeId={activeId}>
                  <SectionHeader title="Overview" subtitle="High-level performance snapshot" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "14px" }}>
                    <StatCard value="94.2k" label="Total Responses" trend={12} delay={0} icon="📊" />
                    <StatCard value="79%" label="Positive Sentiment" trend={4.3} delay={0.06} icon="😊" />
                    <StatCard value="13%" label="Negative Mentions" trend={-2.1} delay={0.12} icon="⚠️" />
                    <StatCard value="4.6/5" label="Avg. Satisfaction" trend={0.8} delay={0.18} icon="⭐" />
                  </div>
                  <div style={{ marginTop: "20px", padding: "18px", background: "#f8fafc", borderRadius: "12px", display: "flex", gap: "28px", flexWrap: "wrap", border: "1px solid #f1f5f9" }}>
                    {[{ l: "Response Rate", v: "94%" }, { l: "Avg. Response Time", v: "1.2s" }, { l: "Active Users", v: "18.4k" }].map(m => (
                      <div key={m.l}>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#111827", letterSpacing: "-0.03em" }}>{m.v}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px", fontWeight: "500" }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="sentiment" activeId={activeId}>
                  <SectionHeader title="Sentiment Trends" subtitle="6-month sentiment distribution" />
                  <div style={{ display: "flex", gap: "16px", marginBottom: "18px", flexWrap: "wrap" }}>
                    {[{ c: "#2563eb", l: "Positive" }, { c: "#fca5a5", l: "Negative" }, { c: "#e2e8f0", l: "Neutral" }].map(b => (
                      <div key={b.l} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: b.c }} />
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{b.l}</span>
                      </div>
                    ))}
                  </div>
                  <BarChart />
                  <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {[{ l: "Positivity growth", v: "+12%", bg: "#eff6ff", fc: "#2563eb", sc: "#60a5fa" }, { l: "Complaints drop", v: "-8%", bg: "#fef2f2", fc: "#dc2626", sc: "#f87171" }, { l: "Peak (May)", v: "84%", bg: "#f8fafc", fc: "#374151", sc: "#9ca3af" }].map(m => (
                      <div key={m.l} style={{ flex: 1, minWidth: "90px", padding: "12px 14px", background: m.bg, borderRadius: "10px" }}>
                        <div style={{ fontSize: "17px", fontWeight: "700", color: m.fc, letterSpacing: "-0.02em" }}>{m.v}</div>
                        <div style={{ fontSize: "11px", color: m.sc, marginTop: "3px" }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="summary" activeId={activeId}>
                  <SectionHeader title="AI Summary" subtitle="Auto-generated analysis from all responses" />
                  <div style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)", borderRadius: "12px", padding: "22px", border: "1px solid #dbeafe", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "16px" }}>🤖</span>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.07em" }}>AI Generated</span>
                    </div>
                    <p style={{ color: "#374151", lineHeight: "1.75", fontSize: "14px", margin: 0 }}>
                      Across <strong style={{ color: "#111827" }}>94,200 responses</strong> over 6 months, user sentiment shows a <strong style={{ color: "#2563eb" }}>consistent upward trend</strong>, peaking at 84% positivity in May. The primary satisfaction driver is AI accuracy and onboarding experience. Critical friction clusters around performance and discoverability — both addressable with targeted engineering. Retention risk is moderate, primarily among SMB users citing missing features.
                    </p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
                    {[{ label: "Confidence Score", val: "97.4%" }, { label: "Analyzed Topics", val: "312" }, { label: "Key Themes", val: "8" }, { label: "Data Sources", val: "6" }].map(m => (
                      <div key={m.label} style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
                        <div style={{ fontSize: "17px", fontWeight: "700", color: "#111827", letterSpacing: "-0.02em" }}>{m.val}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="complaints" activeId={activeId}>
                  <SectionHeader title="Common Complaints" subtitle="Top friction points from user feedback" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {complaints.map((c, i) => (
                      <FadeIn key={i} delay={i * 0.06}>
                        <div style={{ padding: "14px 16px", background: "#fef2f2", borderRadius: "10px", border: "1px solid #fee2e2" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "13px", color: "#374151", fontWeight: "600" }}>{c.text}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                              <span style={{ fontSize: "11px", color: "#9ca3af" }}>{c.count.toLocaleString()}</span>
                              <span style={{ fontSize: "11px", fontWeight: "700", color: "#dc2626" }}>{c.pct}%</span>
                            </div>
                          </div>
                          <ProgressBar pct={c.pct} color="#f87171" delay={i * 0.06} />
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="positive" activeId={activeId}>
                  <SectionHeader title="Positive Mentions" subtitle="What users love most about the product" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {positives.map((p, i) => (
                      <FadeIn key={i} delay={i * 0.06}>
                        <div style={{ padding: "14px 16px", background: "#f0fdf4", borderRadius: "10px", border: "1px solid #dcfce7" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "13px", color: "#374151", fontWeight: "600" }}>{p.text}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                              <span style={{ fontSize: "11px", color: "#9ca3af" }}>{p.count.toLocaleString()}</span>
                              <span style={{ fontSize: "11px", fontWeight: "700", color: "#16a34a" }}>{p.pct}%</span>
                            </div>
                          </div>
                          <ProgressBar pct={p.pct} color="#22c55e" delay={i * 0.06} />
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="segments" activeId={activeId}>
                  <SectionHeader title="User Segments" subtitle="Breakdown by customer type" />
                  <DonutChart />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px", marginTop: "20px" }}>
                    {segments.map((s, i) => (
                      <div key={i} style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: "10px", borderTop: `3px solid ${s.color}` }}>
                        <div style={{ fontSize: "19px", fontWeight: "700", color: "#111827", letterSpacing: "-0.03em" }}>{s.value}%</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="wordcloud" activeId={activeId}>
                  <SectionHeader title="Word Cloud" subtitle="Most frequent terms in user feedback" />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "center", padding: "22px 16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                    {words.map((w, i) => (
                      <FadeIn key={i} delay={i * 0.04}>
                        <span className="word-chip"
                          style={{ fontSize: `${w.size * 0.72}rem`, color: i % 3 === 0 ? "#2563eb" : i % 3 === 1 ? "#111827" : "#93c5fd", fontWeight: i % 2 === 0 ? "700" : "500", letterSpacing: "-0.01em", padding: "2px 4px" }}>
                          {w.word}
                        </span>
                      </FadeIn>
                    ))}
                  </div>
                </SectionPanel>

                <SectionPanel id="charts" activeId={activeId}>
                  <SectionHeader title="Charts" subtitle="Visual overview of key metrics" />
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "18px", border: "1px solid #f1f5f9" }}>
                      <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>Sentiment Over Time</p>
                      <BarChart />
                    </div>
                    <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "18px", border: "1px solid #f1f5f9" }}>
                      <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>Segment Breakdown</p>
                      <DonutChart />
                    </div>
                  </div>
                </SectionPanel>

                <SectionPanel id="recommendations" activeId={activeId}>
                  <SectionHeader title="AI Recommendations" subtitle="Prioritized actions based on user insights" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {recommendations.map((r, i) => (
                      <FadeIn key={i} delay={i * 0.07}>
                        <div className="rec-card" style={{ display: "flex", gap: "14px", padding: "16px 18px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#fff", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                            {r.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "700", color: "#111827", letterSpacing: "-0.01em" }}>{r.title}</span>
                              <span style={{ fontSize: "10px", fontWeight: "700", padding: "3px 9px", borderRadius: "99px", flexShrink: 0, background: r.priority === "High" ? "#fef2f2" : r.priority === "Medium" ? "#fffbeb" : "#f0fdf4", color: r.priority === "High" ? "#dc2626" : r.priority === "Medium" ? "#d97706" : "#16a34a", border: `1px solid ${r.priority === "High" ? "#fecaca" : r.priority === "Medium" ? "#fde68a" : "#bbf7d0"}` }}>
                                {r.priority}
                              </span>
                            </div>
                            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, lineHeight: "1.65" }}>{r.desc}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </SectionPanel>

              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Insights;
