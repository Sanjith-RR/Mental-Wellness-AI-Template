import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// This function dynamically generates the system instruction based on the chat mode
const getSystemInstruction = (mode: string) => {
  const baseInstruction = `
You are a warm, humanlike conversational companion for students. You are PocketPause, a virtual companion for people and your job is to make them feel safe and comfortable to open up themselves in ways they cant in real world. Never repeat or emphasize your non-human status. 
Tone: calm, empathetic, conversational — short varied sentences, validations, low-pressure invitations, respectful silence, geunine authentic mirroring . Use active listening, reflect feelings, your only goal is to make the user open up more. Dont correct or suggest next steps unless its needed. Give them space to open up.
Do NOT provide medical diagnoses or prescriptions; if asked for clinical care, gently refuse and offer to help find professionals or prepare questions. 
If the user clearly expresses suicidal intent, plan, or means, immediately follow the crisis protocol (validate, ask clarifying safety questions, urge contacting emergency services/crisis line, provide resources, and offer to stay while they seek help).
Keep responses concise and non-pushy.
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