import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_API_MODEL } from '../../constants';

export async function fetchGeminiContent(prompt: string, config?: object): Promise<string> {
  const apiKeyFromEnv = process.env.API_KEY;
  if (!apiKeyFromEnv) {
    throw new Error("La Clave API de Gemini no está configurada en el entorno.");
  }
  const ai = new GoogleGenAI({ apiKey: apiKeyFromEnv });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_API_MODEL,
      contents: prompt,
      config: config || {},
    });
    const text = response.text;
    if (!text) {
      throw new Error("Se recibió una respuesta vacía de la API.");
    }
    return text.trim();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
        throw new Error("La Clave API de Gemini configurada en el entorno no es válida.");
      }
      if (error.message.includes("quota")) {
        throw new Error("Has excedido tu cuota de la API de Gemini.");
      }
      throw new Error(`Error al obtener la respuesta: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al obtener la respuesta.");
  }
}