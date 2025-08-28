"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const [about, setAbout] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ about: string; interests: string[] } | null>(null);

  const interestOptions = useMemo(
    () => ["Stress", "Work", "Friends", "Studies"],
    []
  );

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newAnswers = { about, interests: selectedInterests };
    setAnswers(newAnswers);
    router.push("/landing");
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Help us understand you better
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Don’t worry, it’s anonymous! Your responses help tailor your experience.
          </p>
        </div>

        {/* Future: MCQ questions list fetched from backend */}
        <section className="mt-8 sm:mt-10">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Questions</h2>
          <p className="mt-1 text-sm text-gray-600">
            We’ll start with a few simple multiple-choice questions, then an open prompt.
          </p>
          <div className="mt-4 grid gap-3 sm:gap-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 px-4 py-3 text-sm">
              MCQ questions will appear here shortly.
            </div>
          </div>
        </section>

        {/* Interests (placeholder for future DB-driven questions) */}
        <section className="mt-8 sm:mt-10">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Pick your interests</h2>
          <p className="mt-1 text-sm text-gray-600">Select all that apply.</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {interestOptions.map((interest) => {
              const checked = selectedInterests.includes(interest);
              return (
                <label
                  key={interest}
                  className={`cursor-pointer select-none rounded-xl border px-3 py-2 text-sm text-gray-800 shadow-sm transition-colors ${
                    checked
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 align-middle accent-blue-600"
                    checked={checked}
                    onChange={() => toggleInterest(interest)}
                  />
                  {interest}
                </label>
              );
            })}
          </div>
        </section>

        {/* Open-ended prompt */}
        <section className="mt-8 sm:mt-10">
          <label htmlFor="about" className="block text-sm sm:text-base font-medium text-gray-900">
            Tell us about yourself briefly
          </label>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            Share anything you’re comfortable with. We keep your data safe and private.
          </p>
          <form className="mt-4" onSubmit={handleSubmit}>
            <textarea
              id="about"
              name="about"
              rows={5}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="I’m usually... I enjoy... Lately I’ve been feeling..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-xs text-gray-500">
                {answers ? "Answers saved. Redirecting..." : "Your data is safe with us."}
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}


