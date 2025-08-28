"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id?: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function ChatPage({ params, searchParams }: ChatPageProps) {
  const chatId = params?.id;
  if (!chatId) return notFound();
  const mode = ((searchParams?.mode as string) || "").toLowerCase();
  const router = useRouter();

  const modeTitle =
    mode === "vent" ? "Venting"
    : mode === "advice" ? "Advice"
    : mode === "company" ? "Company"
    : "Chat";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Placeholder past chats (match landing/sidebar behavior)
  const pastChats = useMemo(() => [
    { id: "c1", name: "Chat 1" },
    { id: "c2", name: "Chat 2" },
    { id: "c3", name: "Chat 3" },
    { id: "c4", name: "Chat 4" },
  ], []);
  
  const slugify = useMemo(() => (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  }, []);

  const starter = useMemo(() => {
    if (mode === "vent") return "I’m here. Let it all out when you’re ready.";
    if (mode === "advice") return "Share what’s going on — I’ll offer some suggestions.";
    if (mode === "company") return "I’m here to keep you company. What’s on your mind?";
    return "How can I help today?";
  }, [mode]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: starter }]);
  }, [starter]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length]);

  function buildMockReply(userText: string): string {
    if (mode === "vent") {
      return `That sounds really tough. It’s okay to feel this way. Would you like to unpack a specific part of “${userText}”?`;
    }
    if (mode === "advice") {
      return `Here are a couple of ideas you might try: 1) Break “${userText}” into small steps, 2) Add a short daily routine to regain control. Want more options?`;
    }
    if (mode === "company") {
      return `I’m here with you. Tell me more about “${userText}”. I’m listening.`;
    }
    return `Thanks for sharing: “${userText}”. How would you like to proceed?`;
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Typing effect for assistant
    const full = buildMockReply(trimmed);
    setIsTyping(true);

    // Use a more efficient typing effect
    let current = "";
    const chunkSize = Math.max(1, Math.floor(full.length / 20));
    
    const typeNextChunk = () => {
      if (current.length < full.length) {
        current = full.slice(0, current.length + chunkSize);
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: "assistant", content: current };
          return newMessages;
        });
        setTimeout(typeNextChunk, 30);
      } else {
        setIsTyping(false);
      }
    };

    // Add empty assistant message and start typing
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setTimeout(typeNextChunk, 100);
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden sm:flex sm:flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Past Chats</h2>
          <p className="text-xs text-gray-500 mt-1">Locked for your privacy</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1 px-2">
            {pastChats.map(({ id, name }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => router.push(`/chat/${id}/${slugify(name)}`)}
                  className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
                >
                  <span className="truncate">{name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gray-500" aria-hidden>
                    <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8H9V6a3 3 0 116 0v3z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
                 </nav>
         <div className="px-3 py-3 border-t border-gray-200">
           <button
             type="button"
             onClick={() => router.push("/profile")}
             className="w-full flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-left hover:bg-gray-50"
             aria-label="Open profile"
           >
             <div className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs text-gray-600">
               YN
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-gray-900 truncate">Your Name</p>
               <p className="text-xs text-gray-500 truncate">View profile</p>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gray-400">
               <path d="M9.29 6.71a1 1 0 011.42 0L16 12l-5.29 5.29a1 1 0 01-1.42-1.42L13.17 12 9.29 8.12a1 1 0 010-1.41z" />
             </svg>
           </button>
         </div>
       </aside>

      {/* Chat Main */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-3xl flex flex-col bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{modeTitle}</h1>
              <span className="text-xs text-gray-500">ID: {chatId}</span>
            </div>
          </header>

                     {/* Messages */}
           <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4" style={{ maxHeight: "65vh" }}>
             {messages.map((m, i) => (
               <div key={`${m.role}-${i}-${m.content.slice(0, 10)}`} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                 <div
                   className={`rounded-2xl px-5 py-4 max-w-[80%] text-[15px] leading-relaxed shadow-sm ${
                     m.role === "user"
                       ? "bg-blue-600 text-white rounded-br-none"
                       : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
                   }`}
                 >
                   <span className="block text-xs text-gray-400 mb-1">{m.role === "user" ? "You" : "Assistant"}</span>
                   <span>{m.content}</span>
                 </div>
               </div>
             ))}

                         {isTyping && (
               <div className="flex justify-start">
                 <div className="rounded-2xl px-5 py-3 bg-gray-100 text-gray-500 shadow-sm">
                   <div className="flex items-center gap-2">
                     <div className="flex gap-1">
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                     </div>
                     <span className="text-sm">Assistant is typing...</span>
                   </div>
                 </div>
               </div>
             )}
            <div ref={scrollRef} />
          </main>

          {/* Input */}
          <form onSubmit={sendMessage} className="flex items-center gap-3 p-5 border-t border-gray-200 bg-white">
            <input
              className="flex-1 border border-gray-300 rounded-2xl px-6 py-4 bg-gray-50 text-gray-900 text-base shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              autoFocus
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium shadow-md transition-all disabled:opacity-50"
              type="submit"
              disabled={!input.trim() || isTyping}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


