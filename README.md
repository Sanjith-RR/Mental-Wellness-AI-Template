PocketPause: A Mental Wellness Chatbot
Project Overview
PocketPause is a responsive, web-based mental wellness chatbot designed to provide a safe and supportive space for users. The application is built with Next.js and Tailwind CSS for the front end and integrates with the Google Gemini API to offer empathetic, curated conversational support.

PocketPause is designed with user safety as a top priority. The chatbot offers three distinct modes—Vent, Advice, and Company—allowing users to choose the type of support they need. The application includes a prominent safety disclaimer and is programmed to respond with professional mental health resources if a user expresses thoughts of self-harm or crisis.

Key Features:

Curated AI Responses: The Gemini API's responses are tailored based on the user's selected mode (Vent, Advice, or Company).

Secure API Handling: The Google Gemini API key is securely stored as an environment variable and accessed via a server-side API route, ensuring it is never exposed to the client.

Real-time Streaming: The chatbot's responses are streamed in real-time, providing a smooth and natural conversational experience.

Minimalist Interface: A clean, modern, and user-friendly interface built with Next.js and styled with Tailwind CSS, designed for clarity and ease of use.

Type-safe Backend: The API route is built with TypeScript, ensuring robust, predictable code and preventing common runtime errors.

Technologies Used
Front-end: Next.js, React, Tailwind CSS, Framer Motion

Back-end: Next.js API Routes (Serverless Functions)

AI Model: Google Gemini 1.5 Flash

Authentication (MVP): None (Future scope for a login system)

Getting Started
Follow these steps to get a local copy of the project up and running.

Prerequisites
You'll need a Google Gemini API key. You can get one for free at the Google AI Studio.

Installation
Clone the repository:

git clone [https://github.com/your-username/pocketpause.git](https://github.com/your-username/pocketpause.git)
cd pocketpause

Install the project dependencies:

npm install

Set up your environment variables:
Create a file named .env.local in the root of your project and add your Gemini API key:

GEMINI_API_KEY="YOUR_API_KEY_HERE"

Replace YOUR_API_KEY_HERE with your actual key.

Run the development server:

npm run dev

Open http://localhost:3000/signup in your browser to see the result.

Project Structure
The core of the application is located in the src/app directory, following Next.js's App Router conventions.

src/app/signup/page.tsx: The landing page for new users.

src/app/quiz/page.tsx: A simple quiz to determine a user's conversational preference.

src/app/landing/page.tsx: The main chat interface where users select a mode and start a conversation.

src/app/api/chat/route.ts: The secure back-end API route that handles all communication with the Google Gemini API.

Contributions
This is an open-source project created as part of my portfolio. While not actively seeking contributions, I welcome any feedback or suggestions. Feel free to open an issue to discuss.

Author
Sanjith RR

License
This project is licensed under the MIT License.