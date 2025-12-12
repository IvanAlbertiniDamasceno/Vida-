import { GoogleGenAI } from "@google/genai";
import { ActivityType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthTip = async (category: ActivityType): Promise<string> => {
  try {
    const prompt = `Forneça uma dica curta, motivadora e cientificamente embasada (máximo 50 palavras) sobre ${category.toLowerCase()} para alguém que está tentando melhorar seus hábitos de saúde. Responda em Português do Brasil.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Mantenha-se consistente para ver resultados!";
  } catch (error) {
    console.error("Error fetching health tip:", error);
    return "Lembre-se: pequenos passos levam a grandes mudanças.";
  }
};

export const analyzeMood = async (moodValue: number, note: string): Promise<string> => {
  try {
    const prompt = `O usuário registrou um humor nível ${moodValue}/5 com a nota: "${note}". Aja como um terapeuta empático e dê um conselho curto (uma frase) de apoio. Responda em Português do Brasil.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Obrigado por compartilhar. Cuide-se.";
  } catch (error) {
    return "Seu bem-estar é importante. Continue monitorando.";
  }
};
