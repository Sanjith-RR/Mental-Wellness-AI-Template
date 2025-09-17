"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send } from 'lucide-react';

const CRISIS_DISCLAIMER = `
**Please read this carefully:** I am an AI chatbot, and my purpose is to provide a safe space for conversation and companionship. However, I am not a substitute for professional medical or mental health advice. If you are experiencing a crisis, please seek immediate help from a qualified professional.

**You are not alone.** Please consider reaching out to a professional who can provide a lifeline.
- **National Suicide Prevention Lifeline (US):** Dial **988**
- **AASRA (India):** +91 9820466726
- **Samaritans (UK):** 116 123
`;

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, messages]);

  const handleBack = () => {
    router.push("/landing");
  };

  const getPlaceholderText = () => {
    switch (mode) {
      case "vent":
        return "Vent about what's on your mind...";
      case "advice":
        return "Ask for some advice...";
      case "company":
        return "Say hi to your companion...";
      default:
        return "Type your message...";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ messages: newMessages, mode: mode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Add a check here to ensure response.body is not null
      if (!response.body) {
          console.error("Error: Response body is null.");
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'assistant', content: '⚠️ Sorry, the server returned an empty response.' },
          ]);
          return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

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
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
        <motion.button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </motion.button>
        <h1 className="text-xl font-bold text-gray-900 capitalize">
          {mode} Chat
        </h1>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex justify-center mt-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-yellow-100 text-yellow-800 p-4 rounded-xl max-w-xl shadow-sm text-sm"
            >
              <p className="font-bold mb-2">Important Safety Information</p>
              <p className="whitespace-pre-line">{CRISIS_DISCLAIMER}</p>
            </motion.div>
          </div>
        )}
        
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4">
          {messages.map((m, index) => (
            <motion.div
              key={index}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-3 rounded-xl shadow-md max-w-xl ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                <p className="whitespace-pre-line">{m.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex items-center space-x-2">
          <input
            ref={inputRef}
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={input}
            placeholder={getPlaceholderText()}
            onChange={handleInputChange}
            disabled={isLoading}
            autoFocus
          />
          <motion.button
            type="submit"
            className={`p-3 rounded-full text-white font-semibold transition-all duration-200 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}