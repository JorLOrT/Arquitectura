// VIEW: Responsible for rendering the UI and handling user interactions.
import React, { useEffect } from 'react';
import { useHoroscopeViewModel } from '../viewmodels/useHoroscopeViewModel';
import ZodiacSignSelector from './ZodiacSignSelector';
import HoroscopeDisplay from './HoroscopeDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

const HoroscopeView: React.FC = () => {
  const {
    selectedSign,
    horoscope,
    isLoading,
    error,
    zodiacSigns,
    selectSign,
    fetchHoroscope,
    clearHoroscope,
  } = useHoroscopeViewModel();

  useEffect(() => {
    if (selectedSign && !horoscope && !isLoading && !error) { 
      fetchHoroscope();
    }
  }, [selectedSign, horoscope, isLoading, error, fetchHoroscope]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-cosmic-lavender/20">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-star-gold via-cosmic-lavender to-star-gold">
          Perspectivas Cósmicas
        </h1>
        <p className="text-cosmic-lavender/80 mt-2 text-sm md:text-base">Tu horóscopo del amor diario, adivinado desde las estrellas digitales.</p>
      </header>

      <main>
        <ZodiacSignSelector
          signs={zodiacSigns}
          selectedSign={selectedSign}
          onSignSelect={(sign) => {
            selectSign(sign);
          }}
        />

        {selectedSign && (
          <div className="text-center my-6">
             <button
              onClick={fetchHoroscope}
              disabled={isLoading}
              className="px-8 py-3 bg-star-gold text-celestial-blue font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
              aria-live="polite"
            >
              {isLoading ? 'Consultando Estrellas...' : `Revelar Destino Amoroso para ${selectedSign}`}
            </button>
            {horoscope && (
               <button
                onClick={clearHoroscope}
                disabled={isLoading}
                className="ml-4 px-6 py-3 bg-transparent text-cosmic-lavender border border-cosmic-lavender/50 font-semibold rounded-lg shadow-sm hover:bg-celestial-blue/50 hover:border-cosmic-lavender transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cosmic-lavender/50"
              >
                Limpiar
              </button>
            )}
          </div>
        )}
        
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorDisplay message={error} />}
        
        {!isLoading && !error && horoscope && (
          <HoroscopeDisplay horoscope={horoscope} />
        )}
        
        {!isLoading && !error && !horoscope && selectedSign && (
          <p className="text-center text-cosmic-lavender/70 mt-8" role="status">
            Haz clic en el botón de arriba para revelar tu horóscopo del amor para {selectedSign}.
          </p>
        )}
         {!selectedSign && (
          <p className="text-center text-cosmic-lavender/70 mt-8" role="status">
            Por favor, selecciona un signo zodiacal para comenzar tu viaje cósmico amoroso.
          </p>
        )}
         {/* Informational message if API key is missing from environment and an error occurred */}
        {error && error.includes("Clave API de Gemini no está configurada") && (
            <p className="text-center text-yellow-300/80 mt-4 text-sm" role="status">
                La configuración de la aplicación parece estar incompleta (falta la Clave API). Por favor, contacta al administrador del sitio.
            </p>
        )}
      </main>
       <footer className="text-center mt-12 text-xs text-cosmic-lavender/50">
        <p>&copy; {new Date().getFullYear()} Perspectivas Cósmicas. Impulsado por Magia Celestial.</p>
      </footer>
    </div>
  );
};

export default HoroscopeView;