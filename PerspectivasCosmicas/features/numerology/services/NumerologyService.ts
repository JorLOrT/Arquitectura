import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { NumerologyInput } from '../../../types';
import { GEMINI_API_MODEL } from '../../../constants';

export class NumerologyService {
  static async fetchNumerologyReport(inputs: NumerologyInput): Promise<string> {
    const apiKeyFromEnv = process.env.API_KEY;

    if (!apiKeyFromEnv) {
      throw new Error("La Clave API de Gemini no está configurada en el entorno. Por favor, asegúrate de que la variable de entorno API_KEY esté definida y accesible para la aplicación.");
    }

    const ai = new GoogleGenAI({ apiKey: apiKeyFromEnv });

    const prompt = `Actúa como un numerólogo experto. Recibirás dos entradas (pueden ser nombres, fechas de nacimiento o una combinación). Basándote en estas dos entradas: '${inputs.input1}' y '${inputs.input2}', genera un análisis de compatibilidad numerológica conciso (aproximadamente 75-100 palabras) y positivo en español. Enfócate en su posible armonía, sinergias, fortalezas compartidas y cualquier consejo sutil para una mejor conexión. No expliques los métodos de cálculo numerológico; simplemente proporciona la interpretación y el análisis de la conexión. A su vez indícales sus números para hoy.`;

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_API_MODEL,
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.9,
          topK: 35,
        }
      });
      
      const text = response.text;
      if (!text) {
        throw new Error("Se recibió una respuesta vacía de la API para el análisis numerológico. Verifica la configuración de tu clave API y las cuotas.");
      }
      return text.trim();
    } catch (error) {
      console.error("Error fetching numerology report from Gemini API:", error);
      if (error instanceof Error) {
        if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
            throw new Error("La Clave API de Gemini configurada en el entorno no es válida. Por favor, revísala.");
        }
        if (error.message.includes("quota")) {
            throw new Error("Has excedido tu cuota de la API de Gemini. Inténtalo más tarde.");
        }
         throw new Error(`Error al obtener el análisis numerológico: ${error.message}`);
      }
      throw new Error("Ocurrió un error desconocido al obtener el análisis numerológico.");
    }
  }
}
