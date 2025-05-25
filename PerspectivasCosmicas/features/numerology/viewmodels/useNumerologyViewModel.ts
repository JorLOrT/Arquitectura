import { useState, useCallback } from 'react';
import { NumerologyInput, NumerologyReport } from '../../../types';
import { NumerologyService } from '../services/NumerologyService';

export interface NumerologyViewModel {
  input1: string;
  input2: string;
  numerologyReport: NumerologyReport | null;
  isLoading: boolean;
  error: string | null;
  setInput1: (value: string) => void;
  setInput2: (value: string) => void;
  fetchNumerologyReport: () => Promise<void>;
  clearReport: () => void;
}

export const useNumerologyViewModel = (): NumerologyViewModel => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [numerologyReport, setNumerologyReport] = useState<NumerologyReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetInput1 = useCallback((value: string) => {
    setInput1(value);
    setNumerologyReport(null);
    setError(null);
  }, []);

  const handleSetInput2 = useCallback((value: string) => {
    setInput2(value);
    setNumerologyReport(null);
    setError(null);
  }, []);

  const fetchReport = useCallback(async () => {
    if (!input1.trim() || !input2.trim()) {
      setError("Por favor, ingresa ambos valores para el análisis.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setNumerologyReport(null);

    const currentInputs: NumerologyInput = { input1, input2 };

    try {
      const reportText = await NumerologyService.fetchNumerologyReport(currentInputs);
      const today = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setNumerologyReport({
        inputs: currentInputs,
        reportText: reportText,
        analysisDate: `Análisis del ${today}`,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Ocurrió un error inesperado al generar el análisis numerológico.");
      }
      console.error("ViewModel fetchNumerologyReport error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [input1, input2]);

  const clearReport = useCallback(() => {
    setNumerologyReport(null);
    setError(null);
  }, []);

  return {
    input1,
    input2,
    numerologyReport,
    isLoading,
    error,
    setInput1: handleSetInput1,
    setInput2: handleSetInput2,
    fetchNumerologyReport: fetchReport,
    clearReport,
  };
};
