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
        setHistory((prev) =>
          prev.filter((h) => h._id !== deleteTarget._id)
        );

        if (visibleCount > 6 && history.length - 1 <= visibleCount) {
          setVisibleCount((v) => Math.max(6, v - 1));
        }
      }
    } catch {
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
    } catch {
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
  const hasMore = visibleCount < history.length;
  const expanded = visibleCount >= history.length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-[80px] bg-white px-6 py-12 md:px-16">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Chat History
              </h1>
              <p className="mt-2 text-gray-400 text-sm tracking-wide">
                {history.length} session{history.length !== 1 ? "s" : ""} recorded
              </p>
              <div className="mt-4 h-px bg-gradient-to-r from-blue-600 via-blue-300 to-transparent w-32" />
            </div>

            {history.length > 0 && (
              <button
                onClick={() => setDeleteAllOpen(true)}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
              >
                Delete All
              </button>
            )}
          </div>

          {historyLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-gray-50 h-48 animate-pulse"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-5xl mb-4 opacity-20">💬</div>
              <p className="text-gray-300 text-lg font-light tracking-widest uppercase">
                No history yet
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((item, i) => (
                  <div
                    key={item._id}
                    className="group relative bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms, background 0.2s ease`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                          {item.business_industry}
                        </span>
                        <h2 className="text-gray-900 font-semibold text-lg leading-snug truncate">
                          {item.business_name}
                        </h2>
                      </div>

                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 flex-shrink-0 mt-0.5"
                        aria-label="Delete"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-3 text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {item.business_description}
                    </p>

                    <div className="mt-5 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-60" />
                      <span className="text-xs text-gray-300 tracking-wide">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {history.length > 6 && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() =>
                      expanded
                        ? setVisibleCount(6)
                        : setVisibleCount(history.length)
                    }
                    className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span>{expanded ? "View less" : "View more"}</span>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            style={{
              animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>

            <h3 className="text-gray-900 font-semibold text-lg text-center">
              Delete this session?
            </h3>

            <p className="mt-2 text-gray-400 text-sm text-center leading-relaxed">
              <span className="font-medium text-gray-600">
                {deleteTarget.business_name}
              </span>{" "}
              will be permanently removed.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/>
                    <path d="M21 12a9 9 0 00-9-9" />
                  </svg>
                ) : null}

                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteAllOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            style={{
              animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>

            <h3 className="text-gray-900 font-semibold text-lg text-center">
              Delete all sessions?
            </h3>

            <p className="mt-2 text-gray-400 text-sm text-center leading-relaxed">
              All chat history will be permanently removed.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeleteAllOpen(false)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAll}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/>
                    <path d="M21 12a9 9 0 00-9-9" />
                  </svg>
                ) : null}

                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <Footer />
    </>
  );
};

export default ChatHistory;