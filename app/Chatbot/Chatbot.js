"use client";

import React, { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.chatbot.buttnetworks.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error. Try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition"
      >
        💬
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-end p-4 sm:p-6">
          <div className="w-full sm:w-[340px] h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-200">

            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
              <h1 className="font-semibold">AI Agent</h1>
              <button onClick={() => setOpen(false)} className="text-xl">
                ✕
              </button>
            </div>

            <div
              ref={chatRef}
              className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50"
            >
              {messages.length === 0 && !loading && (
                <div className="text-center text-sm text-gray-400 mt-10">
                  👋 Hi! I am your AI Assistant. Ask me anything about business ideas, trends, or analytics.
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm max-w-[80%] ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="text-sm text-gray-500">Typing...</div>
              )}
            </div>

            <div className="p-3 border-t flex gap-2 bg-white">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 rounded-lg text-sm hover:bg-blue-700"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;