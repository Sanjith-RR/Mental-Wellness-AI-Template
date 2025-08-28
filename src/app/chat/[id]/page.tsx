import React from "react";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: { id?: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ChatPage({ params, searchParams }: ChatPageProps) {
  const chatId = params?.id;
  if (!chatId) return notFound();
  const mode = (searchParams?.mode as string) || "";

  const modeTitle =
    mode === "vent" ? "Venting"
    : mode === "advice" ? "Advice"
    : mode === "company" ? "Company"
    : "Chat";

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{modeTitle}</h1>
        <p className="mt-2 text-sm text-gray-600">Chat ID: {chatId}</p>
        <p className="mt-6 text-gray-700">This is a placeholder for the chat UI.</p>
      </div>
    </div>
  );
}


