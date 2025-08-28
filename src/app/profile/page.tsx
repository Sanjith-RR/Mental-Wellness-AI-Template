"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [activeDate, setActiveDate] = useState(() => new Date());

  const monthMeta = useMemo(() => {
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay(); // 0 (Sun) - 6 (Sat)
    const daysInMonth = lastDay.getDate();

    const days: Array<{ date: Date; inCurrentMonth: boolean }> = [];
    // Leading blanks from previous month
    for (let i = 0; i < startWeekday; i++) {
      const d = new Date(year, month, -i);
      days.unshift({ date: d, inCurrentMonth: false });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: new Date(year, month, d), inCurrentMonth: true });
    }
    // Trailing to fill 6 rows max (up to 42 cells)
    while (days.length % 7 !== 0) {
      const last = days[days.length - 1].date;
      const next = new Date(last);
      next.setDate(last.getDate() + 1);
      days.push({ date: next, inCurrentMonth: false });
    }

    const monthLabel = activeDate.toLocaleString(undefined, { month: "long", year: "numeric" });
    const today = new Date();
    const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    return { days, monthLabel, today, isSameDay };
  }, [activeDate]);

  function goPrevMonth() {
    setActiveDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function goNextMonth() {
    setActiveDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function formatDateYYYYMMDD(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function goToDate(d: Date) {
    router.push(`/date/${formatDateYYYYMMDD(d)}`);
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-3xl space-y-8">
        {/* Profile Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center">
          {/* Avatar placeholder */}
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center">
            <span className="text-gray-500 text-xl">Avatar</span>
          </div>

          {/* Name */}
          <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-900">Your Name</h1>

          {/* Description */}
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Brief description about the user goes here. This can include interests, a short bio, or anything they’d like to share.
          </p>

          {/* Personality Section */}
          <div className="mt-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900">Personality</h2>
            <p className="text-sm text-gray-600 mt-1">Based on assessments (e.g., 16PF → MBTI mapping)</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">MBTI</p>
                <p className="mt-1 text-2xl font-semibold text-indigo-600">INTJ</p>
                <p className="mt-1 text-xs text-gray-500">Architect</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Energy</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">Introverted</p>
                <p className="mt-1 text-xs text-gray-500">Focuses on inner world</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Decision</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">Thinking</p>
                <p className="mt-1 text-xs text-gray-500">Objective and logical</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goPrevMonth}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              aria-label="Previous month"
            >
              ◀
            </button>
            <h3 className="text-lg font-semibold text-gray-900">{monthMeta.monthLabel}</h3>
            <button
              type="button"
              onClick={goNextMonth}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              aria-label="Next month"
            >
              ▶
            </button>
          </div>
          <div className="mt-4 grid grid-cols-7 text-center text-xs font-medium text-gray-500">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {monthMeta.days.map(({ date, inCurrentMonth }, idx) => {
              const isToday = monthMeta.isSameDay(date, monthMeta.today);
              const base = "aspect-square rounded-xl flex items-center justify-center text-sm";
              const visual = inCurrentMonth
                ? isToday
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                : "bg-gray-50 text-gray-400 border border-gray-100";
              return (
                <button key={idx} type="button" onClick={() => goToDate(date)} className={`${base} ${visual}`} aria-label={`Select ${date.toDateString()}`}>
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


