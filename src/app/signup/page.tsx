"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      {/* Illustration Area - stacks above card on mobile */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative mb-8 md:mb-0 md:mr-8">
        {/* Gradient background blob with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-indigo-200/30 to-pink-200/40 rounded-full blur-3xl scale-150"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="w-full max-w-md text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="w-full max-w-lg text-center relative z-10">
            <motion.div
              className="mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex flex-col items-center justify-center border border-blue-200 shadow-xl p-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <svg
                className="w-28 h-28 text-blue-600 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13h-2v-2h2v2zm0-4h-2V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2z" />
              </svg>

              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Welcome to PocketPause
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Your safe space for <span className="font-medium text-gray-800">mental wellness</span> and <span className="font-medium text-gray-800">support</span>
              </p>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Auth Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Create your PocketPause account</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Join our community for mental wellness and support</p>

          <div className="mt-8 space-y-4">
            <motion.div
              whileHover={{ y: -3 }}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/quiz"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-xl shadow transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:shadow-lg"
                aria-label="Create new PocketPause account"
                role="button"
                tabIndex={0}
              >
                New user — Sign up
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/landing"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                aria-label="Sign in to existing PocketPause account"
                role="button"
                tabIndex={0}
              >
                Have account — Login
              </Link>
            </motion.div>
            {/* Continue as guest link */}
            <div className="mt-2">
              <Link
                href="/landing"
                className="text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded px-1"
                aria-label="Continue as guest"
              >
                Continue as guest
              </Link>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <motion.button
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium bg-white text-gray-800 rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              aria-label="Continue with Google OAuth"
              whileHover={{ y: -1 }}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.243 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z" />
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.357 16.063 18.82 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 10.273-1.977 14.029-5.657l-6.486-5.487C29.471 34.896 26.828 36 24 36c-5.202 0-9.642-3.738-10.974-8.768l-6.58 5.066C9.772 39.556 16.41 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.089 3.243-3.5 5.79-6.76 7.149l6.486 5.487C38.246 38.126 40 31.62 40 24c0-1.341-.138-2.651-.389-3.917z" />
              </svg>
              Continue with Google
            </motion.button>
          </div>
          {/* Legal footnote */}
          <p className="mt-8 text-xs text-gray-400">
            By continuing, you agree to our{' '}
            <Link href="#" className="underline hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="underline hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}