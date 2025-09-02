"use client";

import React from "react";
import Link from "next/link";

export default function BasePage() {
  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-3xl w-full text-center bg-white rounded-3xl shadow-xl border border-gray-200 px-6 md:px-10 py-10 md:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Welcome to <span className="text-indigo-600">PocketPause</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Casual, on-demand anytime, anywhere. Take a Pause.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-medium bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Get Started"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}


