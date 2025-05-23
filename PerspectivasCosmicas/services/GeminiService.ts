// MODEL: Handles data fetching and business logic for horoscopes.
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ZodiacSign } from '../types';
import { GEMINI_API_MODEL } from '../constants';

export class GeminiService {
  static async fetchHoroscope(sign: ZodiacSign): Promise<string> {
    const apiKeyFromEnv = process.env.API_KEY;

    if (!apiKeyFromEnv) {
      throw new Error("La Clave API de Gemini no está configurada en el entorno. Por favor, asegúrate de que la variable de entorno API_KEY esté definida y accesible para la aplicación.");
    }

    const ai = new GoogleGenAI({ apiKey: apiKeyFromEnv });

    const prompt = `Genera un horóscopo diario conciso y positivo enfocado en el amor para ${sign} en español. El horóscopo debe ser alentador, perspicaz y de unas 50-75 palabras. Concéntrate en las relaciones, los sentimientos y las oportunidades románticas para hoy.`;

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_API_MODEL,
        contents: prompt,
        config: {
          temperature: 0.75, 
          topP: 0.9,
          topK: 40,
        }
      });
      
      const text = response.text;
      if (!text) {
        throw new Error("Se recibió una respuesta vacía de la API. Verifica la configuración de tu clave API y las cuotas.");
      }
      return text.trim();
    } catch (error) {
      console.error("Error fetching horoscope from Gemini API:", error);
      if (error instanceof Error) {
        if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
            throw new Error("La Clave API de Gemini configurada en el entorno no es válida. Por favor, revísala.");
        }
        if (error.message.includes("quota")) {
            throw new Error("Has excedido tu cuota de la API de Gemini. Inténtalo más tarde.");
        }
         throw new Error(`Error al obtener el horóscopo: ${error.message}`);
      }
      throw new Error("Ocurrió un error desconocido al obtener el horóscopo.");
    }
  }
}