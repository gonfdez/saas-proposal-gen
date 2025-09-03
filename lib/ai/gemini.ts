import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    const generatedContentResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt
    });

    const response = generatedContentResponse.text?.trim() || "";
    if (response.length === 0) {
      throw new Error('AI response with empty content')
    }
    
    return response;
  } catch (error) {
    console.error('Error generating with Gemini:', error);
    throw new Error('Failed to generate content with AI');
  }
}