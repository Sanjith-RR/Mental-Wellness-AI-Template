"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const quizQuestion = {
  question: "How do you prefer to handle things when you’re feeling down?",
  options: [
    { text: "I just need to vent and have someone listen.", value: "venting" },
    { text: "I like to talk things through and get some advice.", value: "advice" },
    { text: "I prefer to talk about other things to feel less alone.", value: "company" },
  ],
};

export default function QuizPage() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer || isSubmitting) return;
    setIsSubmitting(true);

    // Simulate saving the quiz result and redirect
    console.log("Quiz submitted. Personality preference:", selectedAnswer);
    setTimeout(() => {
      router.push("/landing");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 sm:p-10">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Tell us about yourself
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Answer one question to help us understand you better.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8 text-left">
          <div>
            <h3 className="text-lg font-medium text-gray-800">{quizQuestion.question}</h3>
            <div className="mt-4 space-y-3">
              {quizQuestion.options.map((option, oIndex) => (
                <motion.label
                  key={oIndex}
                  className="flex items-center p-3 rounded-xl border-2 border-gray-200 cursor-pointer transition-all duration-200"
                  htmlFor={`option-${oIndex}`}
                  whileHover={{ scale: 1.02, borderColor: '#6366f1' }}
                  initial={false}
                  animate={{ 
                    backgroundColor: selectedAnswer === option.value ? '#eef2ff' : '#ffffff',
                    borderColor: selectedAnswer === option.value ? '#6366f1' : '#e5e7eb'
                  }}
                >
                  <input
                    type="radio"
                    name="personality"
                    id={`option-${oIndex}`}
                    value={option.value}
                    checked={selectedAnswer === option.value}
                    onChange={() => setSelectedAnswer(option.value)}
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{option.text}</span>
                </motion.label>
              ))}
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-xl shadow transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            disabled={isSubmitting || !selectedAnswer}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
          >
            {isSubmitting ? 'Submitting...' : 'Finish Quiz'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}