"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const pastChats = [
    { id: "c1", name: "Chat 1" },
    { id: "c2", name: "Chat 2" },
    { id: "c3", name: "Chat 3" },
    { id: "c4", name: "Chat 4" },
  ]; // placeholder

  function generateChatId() {
    return Math.random().toString(36).slice(2, 10);
  }

  function startChat(mode: "vent" | "advice" | "company") {
    const id = generateChatId();
    router.push(`/chat/${id}?mode=${mode}`);
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
            {pastChats.map(({ id, name }) => {
              const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");
              return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => router.push(`/chat/${id}/${slug}`)}
                  className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
                >
                  <span className="truncate">{name}</span>
                  {/* Lock icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-gray-500"
                    aria-hidden
                  >
                    <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8H9V6a3 3 0 116 0v3z" />
                  </svg>
                </button>
              </li>
            );})}
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

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            What’s on your mind?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Start a new conversation or pick from your past chats on the left.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => startChat("vent")}
              className="w-full rounded-2xl px-6 py-6 text-lg font-semibold text-white bg-rose-600 shadow-md hover:bg-rose-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
              aria-label="Start a venting chat"
            >
              VENT
            </button>
            <button
              type="button"
              onClick={() => startChat("advice")}
              className="w-full rounded-2xl px-6 py-6 text-lg font-semibold text-white bg-indigo-600 shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              aria-label="Start an advice chat"
            >
              ADVICE
            </button>
            <button
              type="button"
              onClick={() => startChat("company")}
              className="w-full rounded-2xl px-6 py-6 text-lg font-semibold text-white bg-emerald-600 shadow-md hover:bg-emerald-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              aria-label="Start a company chat"
            >
              COMPANY
            </button>
          </div>
        </div>
      </main>


    </div>
  );
}


