"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

const CRISIS_DISCLAIMER = `
**Please read this carefully:** I am an AI chatbot, and my purpose is to provide a safe space for conversation and companionship. However, I am not a substitute for professional medical or mental health advice. If you are experiencing a crisis, please seek immediate help from a qualified professional.

**You are not alone.** Please consider reaching out to a professional who can provide a lifeline.
- **National Suicide Prevention Lifeline (US):** Dial **988**
- **AASRA (India):** +91 9820466726
- **Samaritans (UK):** 116 123
`;

export default function ChatPage() {
  const params = useParams();
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Pass the selected mode to the API route
        body: JSON.stringify({ messages: newMessages, mode: mode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      // Stream the response
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantResponse += decoder.decode(value);
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.role === 'assistant') {
            return [
              ...prevMessages.slice(0, -1),
              { ...lastMessage, content: assistantResponse },
            ];
          }
          return [...prevMessages, { role: 'assistant', content: assistantResponse }];
        });
      }
    } catch (error) {
      console.error("Error with API call:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: '⚠️ Sorry, something went wrong. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <main className="flex-1 overflow-y-auto flex flex-col p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          PocketPause Chatbot
        </h1>

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          {/* Initial Disclaimer Message */}
          <div className="flex justify-start">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl max-w-xl shadow-sm text-sm">
              <p className="font-bold mb-2">Important Safety Information</p>
              <p className="whitespace-pre-line">{CRISIS_DISCLAIMER}</p>
            </div>
          </div>
          
          {/* Render chat messages */}
          {messages.map((m, index) => (
            <div key={index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-xl shadow-md max-w-xl ${m.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <p className="whitespace-pre-line">{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <input
          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
          value={input}
          placeholder={`Message as User...`}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`p-3 rounded-full text-white font-semibold transition-all duration-200 ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}