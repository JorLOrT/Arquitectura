import { NumerologyInput } from '../../../types';
import { fetchGeminiContent } from '../../../components/common/GeminiApiHelper';

export class NumerologyService {
  static async fetchNumerologyReport(inputs: NumerologyInput): Promise<string> {
    const prompt = `Actúa como un numerólogo experto. Recibirás dos entradas (pueden ser nombres, fechas de nacimiento o una combinación). Basándote en estas dos entradas: '${inputs.input1}' y '${inputs.input2}', genera un análisis de compatibilidad numerológica conciso (aproximadamente 75-100 palabras) y positivo en español. Enfócate en su posible armonía, sinergias, fortalezas compartidas y cualquier consejo sutil para una mejor conexión. No expliques los métodos de cálculo numerológico; simplemente proporciona la interpretación y el análisis de la conexión. A su vez indícales sus números para hoy.`;
    return fetchGeminiContent(prompt, {
      temperature: 0.7,
      topP: 0.9,
      topK: 35,
    });
  }
}