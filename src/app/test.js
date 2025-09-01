import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace this with your actual API key.
// The key you provided was: AIzaSyDwpm0-qzfxkxaJyT1eiuO2EqzDTUjqmNU
const YOUR_API_KEY = "AIzaSyDwpm0-qzfxkxaJyT1eiuO2EqzDTUjqmNU";

async function testGeminiAPI() {
  try {
    if (YOUR_API_KEY === "YOUR_API_KEY_HERE") {
      console.error("Error: Please replace 'YOUR_API_KEY_HERE' with your actual API key.");
      return;
    }

    const genAI = new GoogleGenerativeAI(YOUR_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "What is the capital of France?";
    console.log(`Sending request with prompt: "${prompt}"`);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("\n--- API Test Succeeded! ---");
    console.log("Gemini's response:");
    console.log(text);
    console.log("-------------------------\n");

  } catch (error) {
    console.error("\n--- API Test Failed ---");
    console.error("An error occurred while calling the Gemini API.");
    console.error("Full error details:", error);
    console.error("-----------------------\n");
  }
}

testGeminiAPI();