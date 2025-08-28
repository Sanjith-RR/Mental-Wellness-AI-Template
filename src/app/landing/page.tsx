"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const pastChats = ["Chat 1", "Chat 2", "Chat 3", "Chat 4"]; // placeholder

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
            {pastChats.map((chat) => (
              <li key={chat}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
                >
                  <span className="truncate">{chat}</span>
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
            ))}
          </ul>
        </nav>
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

      {/* Bottom Navigation (mobile-first) */}
      <nav className="fixed bottom-0 inset-x-0 sm:hidden bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-3xl flex items-center justify-around px-6 py-3">
          <button
            type="button"
            className="inline-flex flex-col items-center text-gray-600 hover:text-gray-900"
            onClick={() => router.push("/profile")}
            aria-label="Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}


