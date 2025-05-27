import { ZodiacSign } from '../../../types';
import { fetchGeminiContent } from '../../../components/common/GeminiApiHelper';

export class HoroscopeService {
  static async fetchHoroscope(sign: ZodiacSign): Promise<string> {
    const prompt = `Genera un horóscopo diario conciso y positivo enfocado en el amor para ${sign} en español. El horóscopo debe ser alentador, perspicaz y de unas 50-75 palabras. Concéntrate en las relaciones, los sentimientos y las oportunidades románticas para hoy.`;
    return fetchGeminiContent(prompt, {
      temperature: 0.75, 
      topP: 0.9,
      topK: 40,
    });
  }
}