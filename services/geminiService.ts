import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini AI
// Note: In a real production app, you might want to proxy this through a backend
// to avoid exposing the key if not using a secure environment variable injection.
// For this frontend-only demo, we assume the environment is secure or user-provided.
const ai = new GoogleGenAI({ apiKey });

export const getMotivationTip = async (mode: string, timeLeft: number): Promise<string> => {
  if (!apiKey) {
    return "Keep pushing! You're doing great. (Add API Key for AI tips)";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const minutes = Math.floor(timeLeft / 60);
    
    const prompt = `
      You are a supportive study coach. Give me a very short, punchy, 1-sentence motivation tip for a student.
      Context: They are currently in "${mode}" mode.
      Time remaining: ${minutes} minutes.
      Tone: Zen, calm, encouraging.
      Max words: 15.
      Do not use quotes.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || "Focus on the present moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Breathe in, breathe out. Focus.";
  }
};
