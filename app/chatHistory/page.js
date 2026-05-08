"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ChatHistory = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [historyCharts, setHistoryCharts] = useState([]);
  const [historyScales, setHistoryScales] = useState([]);

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
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      setHistoryLoading(true);
      try {
        const res = await fetch(`${API_URL}/chat-history`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setHistory(data.data || []);
        }
      } catch {
        setHistory([]);
      } finally {
        setHistoryLoading(false);
        setTimeout(() => setMounted(true), 50);
      }
    };
    fetchHistory();
  }, [user]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/chat-history/${deleteTarget._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setHistory((prev) => prev.filter((h) => h._id !== deleteTarget._id));
      }
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleDeleteAll = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/chat-history`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setHistory([]);
        setVisibleCount(6);
      }
    } finally {
      setDeleting(false);
      setDeleteAllOpen(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return null;

  const visible = history.slice(0, visibleCount);
  const expanded = visibleCount >= history.length;

  return (
    <>
      <Navbar />

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-backdrop {
          animation: modalFadeIn 0.22s ease;
        }
        .modal-card {
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="min-h-screen pt-[80px] bg-white px-6 py-12 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Chat History</h1>
              <p className="mt-2 text-gray-400 text-sm">
                {history.length} sessions recorded
              </p>
              <div className="mt-4 h-px bg-gradient-to-r from-blue-600 via-blue-300 to-transparent w-32" />
            </div>

            {history.length > 0 && (
              <button
                onClick={() => setDeleteAllOpen(true)}
                className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
              >
                Delete All
              </button>
            )}
          </div>

          {historyLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-50 h-48 animate-pulse" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-5xl opacity-20">💬</div>
              <p className="text-gray-300 mt-4">No history yet</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((item, i) => (
                  <div
                    key={item._id}
                    className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.4s ease ${i * 60}ms`,
                    }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <span className="text-xs text-blue-600 uppercase">
                          {item.business_industry}
                        </span>
                        <h2 className="text-gray-900 font-semibold">
                          {item.business_name}
                        </h2>
                      </div>

                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all duration-200"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18" stroke="currentColor" strokeWidth="2" />
                          <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" />
                          <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-3 text-gray-400 text-sm line-clamp-3">
                      {item.business_description}
                    </p>

                    <div className="mt-5 flex justify-between items-center">
                      <span className="text-xs text-gray-300">
                        {formatDate(item.createdAt)}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedHistory(item);
                          setHistoryCharts([
                            {
                              title: "Historical Performance",
                              subtitle: "Past 6 years",
                              data: item.ai_result?.past_yearly_analysis || [],
                            },
                            {
                              title: "Growth Projection",
                              subtitle: "Next 6 years",
                              data: item.ai_result?.yearly_analysis || [],
                            },
                          ]);
                          setHistoryScales([
                            { title: "Small Scale", data: item.ai_result?.scale?.small },
                            { title: "Medium Scale", data: item.ai_result?.scale?.medium },
                            { title: "Large Scale", data: item.ai_result?.scale?.large },
                          ]);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {history.length > 6 && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() =>
                      expanded ? setVisibleCount(6) : setVisibleCount(history.length)
                    }
                    className="text-sm text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    {expanded ? "View less" : "View more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedHistory && (
        <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-xl flex justify-center items-center modal-backdrop">
          <div className="w-full max-w-5xl bg-white rounded-3xl p-8 shadow-2xl modal-card">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedHistory.business_name}
              </h2>
              <button
                onClick={() => setSelectedHistory(null)}
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-500 mb-6">{selectedHistory.business_description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {historyCharts.map((c, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-400">{c.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {historyScales.map((s, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-gray-900">{s.title}</h4>
                  <p className="text-xs text-gray-500 mt-2">{JSON.stringify(s.data)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
          style={{ background: "rgba(0,0,0,0.06)", backdropFilter: "blur(10px)" }}>
          <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-xl modal-card">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "#fff5f5" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 6V4h8v2" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 6l-1 14H6L5 6" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              Delete this session?
            </h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              This chat entry will be permanently removed and cannot be recovered.
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-500 transition-all duration-200"
                style={{ background: "#f5f5f5" }}
                onMouseEnter={e => e.target.style.background = "#ececec"}
                onMouseLeave={e => e.target.style.background = "#f5f5f5"}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200"
                style={{ background: deleting ? "#aaa" : "#111" }}
                onMouseEnter={e => { if (!deleting) e.target.style.background = "#e53e3e"; }}
                onMouseLeave={e => { if (!deleting) e.target.style.background = "#111"; }}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteAllOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
          style={{ background: "rgba(0,0,0,0.06)", backdropFilter: "blur(10px)" }}>
          <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-xl modal-card">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "#fff5f5" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 17h.01" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              Clear all history?
            </h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Every chat session will be permanently erased. This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setDeleteAllOpen(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-500 transition-all duration-200"
                style={{ background: "#f5f5f5" }}
                onMouseEnter={e => e.target.style.background = "#ececec"}
                onMouseLeave={e => e.target.style.background = "#f5f5f5"}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                disabled={deleting}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200"
                style={{ background: deleting ? "#aaa" : "#111" }}
                onMouseEnter={e => { if (!deleting) e.target.style.background = "#e53e3e"; }}
                onMouseLeave={e => { if (!deleting) e.target.style.background = "#111"; }}
              >
                {deleting ? "Deleting…" : "Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ChatHistory;