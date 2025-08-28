"use client";
import React, { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function PocketPauseChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/pocketpause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-50 flex flex-col items-center py-6">
      <div className="w-full max-w-3xl flex flex-col flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 py-5 px-6 flex justify-center items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
            PocketPause
          </h1>
        </header>

        {/* Chat messages */}
        <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4" style={{ maxHeight: "65vh" }}>
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-400 mt-8 text-base">
              Start a conversation with <span className="font-medium">PocketPause</span>.
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl px-5 py-4 max-w-[80%] text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
                }`}
              >
                <span className="block text-xs text-gray-400 mb-1">
                  {msg.role === "user" ? "You" : "PocketPause"}
                </span>
                <span>{msg.content}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-5 py-3 bg-gray-100 text-gray-500 shadow-sm animate-pulse">
                PocketPause is thinking...
              </div>
            </div>
          )}
        </main>

        {/* Input */}
<form
  onSubmit={sendMessage}
  className="flex items-center gap-3 p-5 border-t border-gray-200 bg-white"
>
  <input
    className="flex-1 border border-gray-300 rounded-2xl px-6 py-4 
               bg-gray-50 text-gray-900 text-base shadow-sm 
               focus:outline-none focus:border-blue-500 
               focus:ring-2 focus:ring-blue-500 
               placeholder-gray-400 transition-all"
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type your message..."
    disabled={loading}
    autoFocus
  />
  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 
               rounded-2xl font-medium shadow-md transition-all 
               disabled:opacity-50"
    type="submit"
    disabled={loading || !input.trim()}
  >
    Send
  </button>
</form>

      </div>
    </div>
  );
}