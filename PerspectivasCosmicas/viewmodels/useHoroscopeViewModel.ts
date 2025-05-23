// VIEWMODEL: Manages the state and logic for the HoroscopeView.
import { useState, useCallback } from 'react';
import { ZodiacSign, HoroscopePrediction } from '../types';
import { GeminiService } from '../services/GeminiService';
import { ZODIAC_SIGNS_ARRAY } from '../constants';

export interface HoroscopeViewModel {
  selectedSign: ZodiacSign | null;
  horoscope: HoroscopePrediction | null;
  isLoading: boolean;
  error: string | null;
  zodiacSigns: ZodiacSign[];
  selectSign: (sign: ZodiacSign) => void;
  fetchHoroscope: () => Promise<void>;
  clearHoroscope: () => void;
}

export const useHoroscopeViewModel = (): HoroscopeViewModel => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(ZODIAC_SIGNS_ARRAY[0] || null);
  const [horoscope, setHoroscope] = useState<HoroscopePrediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectSign = useCallback((sign: ZodiacSign) => {
    setSelectedSign(sign);
    setHoroscope(null); 
    setError(null); 
  }, []);

  const fetchHoroscope = useCallback(async () => {
    if (!selectedSign) {
      setError("Por favor, selecciona primero un signo zodiacal.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHoroscope(null);

    try {
      const predictionText = await GeminiService.fetchHoroscope(selectedSign);
      const today = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setHoroscope({
        sign: selectedSign,
        text: predictionText,
        date: `Para Hoy, ${today}`,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
      console.error("ViewModel fetchHoroscope error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSign]);

  const clearHoroscope = useCallback(() => {
    setHoroscope(null);
    setError(null); 
  }, []);

  return {
    selectedSign,
    horoscope,
    isLoading,
    error,
    zodiacSigns: ZODIAC_SIGNS_ARRAY,
    selectSign,
    fetchHoroscope,
    clearHoroscope,
  };
};