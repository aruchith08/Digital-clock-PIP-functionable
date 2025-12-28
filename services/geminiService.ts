import { GoogleGenAI } from "@google/genai";

export const getMotivationTip = async (mode: string, timeLeft: number): Promise<string> => {
  try {
    // Initialize Gemini AI lazily inside the function.
    // This prevents the application from crashing on startup if the API key is missing.
    // The apiKey is injected by Vite at build time via process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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