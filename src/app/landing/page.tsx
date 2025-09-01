"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  function startChat(mode: "vent" | "advice" | "company") {
    // Navigate to the dynamic chat page with the selected mode in the URL
    router.push(`/landing/${mode}`);
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
          What’s on your mind?
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Select a mode to start a new conversation.
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
    </div>
  );
}