"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (loading) return null;

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const handleLogout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setProfileOpen(false);
    setShowLogoutConfirm(false);
    router.push("/");
  };

  const NavButton = ({ label, path, delay = "0ms" }) => (
    <button
      onClick={() => router.push(path)}
      style={{ animationDelay: delay }}
      className="relative group text-gray-600 font-medium text-sm transition-colors duration-200 hover:text-blue-600 animate-fade-up opacity-0 [animation-fill-mode:forwards]"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out group-hover:w-full" />
    </button>
  );

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPop {
          from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes shimmer {
          0%, 100% { left: -60%; }
          50% { left: 120%; }
        }
        @keyframes scanLine {
          0%, 100% { left: -40%; }
          50% { left: 100%; }
        }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        }
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .nav-animate { animation: navSlideDown 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-fade-up { animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .icon-pop { animation: iconPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.05s both; }

        .brand-icon-shimmer::after {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: shimmer 3.5s ease-in-out infinite;
        }

        .scan-line {
          position: absolute; bottom: 0; left: -40%; width: 40%; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,0.3), rgba(37,99,235,0.7), rgba(37,99,235,0.3), transparent);
          animation: scanLine 5s ease-in-out infinite;
          pointer-events: none;
        }

        .avatar-pulse { animation: avatarPulse 2.8s ease-in-out infinite; }
        .status-blink { animation: statusBlink 2s ease-in-out infinite; }
        .drawer-animate { animation: drawerIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .modal-animate { animation: modalIn 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        .overlay-animate { animation: overlayIn 0.25s ease both; }

        .logout-modal-scan::after {
          content: '';
          position: absolute;
          bottom: 0; left: -40%; width: 40%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent);
          animation: scanLine 4s ease-in-out infinite;
        }
      `}</style>

      {showLogoutConfirm && (
        <div className="overlay-animate fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="modal-animate logout-modal-scan relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(37,99,235,0.15)] border border-gray-100 w-full max-w-sm p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center relative overflow-hidden brand-icon-shimmer">
                <span className="text-2xl">👋</span>
              </div>

              <div>
                <h2 className="text-[17px] font-bold text-gray-800 tracking-tight">Sign out of Opinion-Nest?</h2>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">Your analysis session will end. You can always sign back in.</p>
              </div>

              <div className="flex gap-3 w-full mt-1">
                <button
                  onClick={() => { setShowLogoutConfirm(false); setProfileOpen(false); }}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors duration-150"
                >
                  Stay
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-sm transition-all duration-150 active:scale-95"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="nav-animate flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-[0_1px_16px_rgba(37,99,235,0.06)] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scan-line" />
        </div>

        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="icon-pop w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white relative overflow-hidden brand-icon-shimmer">
            O
          </div>
          <div>
            <h1 className="animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:150ms] text-[17px] font-bold text-gray-800 tracking-tight">
              Opinion-Nest
            </h1>
            <p className="animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:220ms] text-[11px] text-gray-400 tracking-widest uppercase">
              ButtNetworks
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavButton label="Analyze Idea" path="/dashboard" delay="250ms" />
          <NavButton label="Market Trends" path="/trends" delay="300ms" />
          <NavButton label="AI Insights" path="/insights" delay="350ms" />
          <NavButton label="Reports" path="/reports" delay="400ms" />

          {user ? (
            <div className="animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:450ms] relative z-50">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="avatar-pulse w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-105 transition-transform duration-200 relative"
              >
                {initials}
                <span className="status-blink absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>

              <div
                className={`absolute right-0 mt-3 w-36 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] transform transition-all duration-200 origin-top-right ${
                  profileOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
              >
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/Auth")}
              className="animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:450ms] text-sm text-blue-600 font-semibold hover:underline underline-offset-2 transition"
            >
              Login
            </button>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-2xl text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          ☰
        </button>
      </nav>

      <div
        className={`fixed inset-0 bg-black/25 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white border-l border-gray-100 z-50 shadow-[-8px_0_40px_rgba(0,0,0,0.08)] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0 drawer-animate" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white relative overflow-hidden brand-icon-shimmer">
                O
              </div>
              <div>
                <h1 className="text-[17px] font-bold text-gray-800 tracking-tight">Opinion-Nest</h1>
                <p className="text-[11px] text-gray-400 tracking-widest uppercase">ButtNetworks</p>
              </div>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-xl text-gray-400 hover:text-red-500 transition-colors duration-200 hover:rotate-90 transform transition-transform"
            >
              ✕
            </button>
          </div>

          {user ? (
            <div className="mt-2">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer mb-3 relative avatar-pulse"
              >
                {initials}
                <span className="status-blink absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>

              <div
                className={`transition-all duration-200 overflow-hidden ${
                  profileOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <button
                  onClick={() => { setShowLogoutConfirm(true); setMenuOpen(false); }}
                  className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/Auth")}
              className="text-sm text-blue-600 font-semibold hover:underline underline-offset-2"
            >
              Login
            </button>
          )}

          <hr className="border-gray-100" />

          {[
            { label: "Analyze Idea", path: "/dashboard" },
            { label: "Market Trends", path: "/trends" },
            { label: "AI Insights", path: "/insights" },
            { label: "Reports", path: "/reports" },
          ].map(({ label, path }, i) => (
            <button
              key={path}
              onClick={() => { router.push(path); setMenuOpen(false); }}
              style={{ animationDelay: `${i * 50 + 100}ms` }}
              className="animate-fade-up opacity-0 [animation-fill-mode:forwards] relative group text-left text-gray-600 font-medium text-sm hover:text-blue-600 transition-colors duration-200"
            >
              {label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;