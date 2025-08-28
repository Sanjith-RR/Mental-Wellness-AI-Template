"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";

interface DatePageProps {
  params: { date?: string };
}

function isValidYYYYMMDD(s: string) {
  const m = /^\d{4}-\d{2}-\d{2}$/.test(s);
  if (!m) return false;
  const [y, mo, d] = s.split("-").map(Number);
  const dt = new Date(y, mo - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d;
}

export default function DatePage({ params }: DatePageProps) {
  const dateStr = params.date;
  if (!dateStr || !isValidYYYYMMDD(dateStr)) return notFound();
  const readable = new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const moods = [
    { id: 1, label: "Very Bad", emoji: "😞" },
    { id: 2, label: "Bad", emoji: "🙁" },
    { id: 3, label: "Neutral", emoji: "😐" },
    { id: 4, label: "Good", emoji: "🙂" },
    { id: 5, label: "Very Good", emoji: "😄" },
  ];

  // Load any existing local data for this date
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`day:${dateStr}`);
      if (raw) {
        const parsed = JSON.parse(raw) as { mood?: number | null; note?: string };
        if (typeof parsed.mood === "number") setMood(parsed.mood);
        if (typeof parsed.note === "string") setNote(parsed.note);
      }
    } catch {}
  }, [dateStr]);

  // Save on changes
  useEffect(() => {
    try {
      const payload = JSON.stringify({ mood, note });
      localStorage.setItem(`day:${dateStr}`, payload);
      setSavedAt(new Date());
    } catch {}
  }, [dateStr, mood, note]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{readable}</h1>
          <p className="mt-2 text-sm text-gray-600">Entries and reflections for this day.</p>
        </div>

        <section className="mt-8">
          <h2 className="text-base sm:text-lg font-medium text-gray-900 text-center">How did you feel?</h2>
          <div className="mt-4 grid grid-cols-5 gap-3 sm:gap-4">
            {moods.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  className={`flex flex-col items-center justify-center rounded-2xl border px-3 py-4 sm:py-5 transition-colors shadow-sm ${
                    active ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                  aria-label={`${m.label} mood`}
                >
                  <span className="text-2xl sm:text-3xl">{m.emoji}</span>
                  <span className="mt-2 text-xs sm:text-sm text-gray-700 text-center">{m.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <label htmlFor="note" className="block text-sm sm:text-base font-medium text-gray-900 text-center">
              Notes
            </label>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 text-center">Add any thoughts you want to remember.</p>
            <div className="mt-3">
              <textarea
                id="note"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your note for the day..."
              />
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              {savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : "Not saved yet"}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


