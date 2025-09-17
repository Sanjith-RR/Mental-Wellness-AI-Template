PocketPause: A Privacy-First AI Chatbot Template
Project Overview
PocketPause is an open-source, privacy-first chatbot template that helps developers and students quickly build and deploy a mental wellness companion. This project is not a final product but a robust starting point, designed with a focus on ease of use and user data security.

The project showcases a powerful, plug-and-play architecture that allows for quick setup and seamless integration with the Google Gemini API.

Key Features
Privacy-First Design: By default, no user data or chat history is stored. The application is stateless, ensuring conversations remain private and anonymous.

Real-time AI Integration: Integrates with the Google Gemini API to provide real-time streaming responses, enhancing the conversational experience.

Safe-by-Design: The chatbot's system prompt includes a crucial safety disclaimer, directing users to professional helplines for crises.

Modular Next.js Architecture: The code is structured as a clear, plug-and-play template, making it easy to understand, modify, and extend.

Backend Independence: While the template provides an interface for user authentication and data storage (e.g., a calendar), developers must implement their own backend solution (such as Supabase or Firestore) to persist data.

Type-Safe Backend: The API route is built with TypeScript, ensuring robust, predictable code and preventing common runtime errors.

Project Structure
The core of the application is located in the src/app directory, following Next.js App Router conventions.

src/app/signup/page.tsx: A template for a sign-up and login interface.

src/app/quiz/page.tsx: A simple quiz interface designed to be part of the user onboarding flow.

src/app/landing/page.tsx: The main chat interface where users select a mode and begin a conversation.

src/app/date/[date]/page.tsx: A dynamic route for a user to create diary entries or notes for a specific date, with a client-side implementation using localStorage. This is an interface; developers should connect it to a database for persistence.

src/app/api/chat/route.ts: The secure back-end API route that handles all communication with the Google Gemini API.

Getting Started
Follow these steps to get a local copy of the project up and running.

Prerequisites
You'll need a Google Gemini API key. You can get one for free at the Google AI Studio.

Installation
Clone the repository:

git clone [https://github.com/Sanjith-RR/Mental-Wellness-AI-Template.git](https://github.com/Sanjith-RR/Mental-Wellness-AI-Template.git)
cd Mental-Wellness-AI-Template

Install dependencies:

npm install

Set up the Gemini API key:
Create a file named .env.local in the root of your project and add your Gemini API key:

GEMINI_API_KEY="YOUR_API_KEY_HERE"

Replace YOUR_API_KEY_HERE with your actual key.

Run the application:

npm run dev

Open http://localhost:3000/signup in your browser to see the result.

Author
Sanjith RR

License
This project is licensed under the MIT License.