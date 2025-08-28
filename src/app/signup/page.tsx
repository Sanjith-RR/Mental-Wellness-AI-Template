import React from "react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Welcome</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Choose an option to continue</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="space-y-3">
            <Link
              href="/quiz"
              className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-medium bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Signup"
            >
              New User? Signup
            </Link>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium bg-white text-gray-800 rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Continue with Google for signup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.243 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.357 16.063 18.82 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 10.273-1.977 14.029-5.657l-6.486-5.487C29.471 34.896 26.828 36 24 36c-5.202 0-9.642-3.738-10.974-8.768l-6.58 5.066C9.772 39.556 16.41 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.089 3.243-3.5 5.79-6.76 7.149l6.486 5.487C38.246 38.126 40 31.62 40 24c0-1.341-.138-2.651-.389-3.917z"/>
              </svg>
              Continue with Google
            </button>
          </div>
          <div className="space-y-3">
            <Link
              href="/landing"
              className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-medium bg-gray-100 text-gray-800 rounded-xl shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              aria-label="Login"
            >
              Have Account? Login
            </Link>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium bg-white text-gray-800 rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Continue with Google for login"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.243 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.357 16.063 18.82 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 10.273-1.977 14.029-5.657l-6.486-5.487C29.471 34.896 26.828 36 24 36c-5.202 0-9.642-3.738-10.974-8.768l-6.58 5.066C9.772 39.556 16.41 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.089 3.243-3.5 5.79-6.76 7.149l6.486 5.487C38.246 38.126 40 31.62 40 24c0-1.341-.138-2.651-.389-3.917z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


