import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!});

export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({ 
      model: "gemini-2.0-flash-lite",
      contents: prompt
     });
    return response.text || "";
  } catch (error) {
    console.error('Error generating with Gemini:', error);
    throw new Error('Failed to generate content with AI');
  }
}