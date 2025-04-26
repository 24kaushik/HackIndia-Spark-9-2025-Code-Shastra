import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const enhance = (context, query) => {
  return new Promise(async (resolve, reject) => {
    try {
        const prompt = `
        You are a helpful assistant.
        
        Greet the user naturally.
        
        Then, based on the following context:
        
        ${context}
        
        Answer the query below in a concise and friendly manner:
        
        ${query}
        
        - If the context contains relevant information, briefly summarize it in your response.
        - If no relevant information is found in the context, answer yourself.
        Do not mention that this response is AI-generated. Keep it conversational and helpful.
        `;
        

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const output = result?.response?.text || result?.text || 'No response text found.';
      resolve(output);
    } catch (error) {
      console.error("AI Error:", error.message);
      reject(error);
    }
  });
};
