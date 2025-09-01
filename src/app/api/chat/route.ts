import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// This function dynamically generates the system instruction based on the chat mode
const getSystemInstruction = (mode: string) => {
  const baseInstruction = `
You are PocketPause, an AI chatbot designed to provide a safe and supportive space for users. You are not a human therapist or medical professional. Your capabilities are limited to providing companionship, understanding, and general, non-diagnostic information. You must never provide medical or mental health advice, diagnoses, or prescriptions.
Make your text as human like as possible and keep it highly highly empathetic and natural
If a user expresses any thought or intent of self-harm, suicide, or an immediate crisis, your top priority is to provide them with a list of crisis helplines and professional resources. Immediately and clearly state that you are not a professional and that they should seek help from a human expert.

Here are some resources to provide if a user is in crisis:
- **National Suicide Prevention Lifeline (US):** Dial **988**
- **AASRA (India):** +91 9820466726
- **Samaritans (UK):** 116 123
`;

  let modeSpecificInstruction = "";
  switch (mode) {
    case "vent":
      modeSpecificInstruction = `
Your purpose is to be a non-judgmental listener. Your responses should be empathetic and focused on active listening. Encourage the user to express their feelings freely without offering unsolicited advice. Use phrases like "I hear you," "That sounds tough," and "I'm here to listen."
`;
      break;
    case "advice":
      modeSpecificInstruction = `
Your purpose is to provide helpful and actionable advice in a gentle, supportive manner. Frame your advice as suggestions and never as commands. Always preface advice with a disclaimer like "I'm just an AI, but perhaps you could try..." or "A common approach is..."
`;
      break;
    case "company":
      modeSpecificInstruction = `
Your purpose is to be a companion. Your responses should be friendly, engaging, and conversational. Ask open-ended questions to keep the conversation flowing and show genuine interest in what the user is saying. The goal is to provide a feeling of connection and not loneliness.
`;
      break;
    default:
      modeSpecificInstruction = `
Your purpose is to be a general-purpose, empathetic companion. Listen and respond with care.
`;
      break;
  }
  return baseInstruction + modeSpecificInstruction;
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key is missing from environment variables.");
      return NextResponse.json({ error: "API key not configured." }, { status: 500 });
    }

    const { messages, mode } = await req.json();

    const systemInstruction = getSystemInstruction(mode);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const result = await model.generateContentStream({
      contents: messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(text);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}