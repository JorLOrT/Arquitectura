import React from 'react';
import { useNumerologyViewModel } from '../viewmodels/useNumerologyViewModel';
import NumerologyReportDisplay from '../components/NumerologyReportDisplay';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorDisplay from '../../../components/common/ErrorDisplay';

const NumerologyView: React.FC = () => {
  const {
    input1,
    input2,
    numerologyReport,
    isLoading,
    error,
    setInput1,
    setInput2,
    fetchNumerologyReport,
    clearReport,
  } = useNumerologyViewModel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNumerologyReport();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-cosmic-lavender/20">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-star-gold via-cosmic-lavender to-star-gold">
          Conexiones Numerológicas
        </h1>
        <p className="text-cosmic-lavender/80 mt-2 text-sm md:text-base">Descubre la sinfonía numérica entre dos almas o momentos.</p>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <label htmlFor="input1" className="block text-sm font-medium text-cosmic-lavender mb-1">
              Nombre o Dato 1 (ej: "Briyit", "15/03/1990")
            </label>
            <input
              type="text"
              id="input1"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Ingresa el primer nombre o dato"
              className="w-full p-3 bg-celestial-blue/60 border border-cosmic-lavender/40 rounded-lg text-light-silver focus:ring-2 focus:ring-star-gold focus:border-star-gold outline-none placeholder-cosmic-lavender/50"
              aria-label="Primer nombre o dato para análisis numerológico"
              required
            />
          </div>
          <div>
            <label htmlFor="input2" className="block text-sm font-medium text-cosmic-lavender mb-1">
              Nombre o Dato 2 (ej: "Jhordan", "22/11/1988")
            </label>
            <input
              type="text"
              id="input2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Ingresa el segundo nombre o dato"
              className="w-full p-3 bg-celestial-blue/60 border border-cosmic-lavender/40 rounded-lg text-light-silver focus:ring-2 focus:ring-star-gold focus:border-star-gold outline-none placeholder-cosmic-lavender/50"
              aria-label="Segundo nombre o dato para análisis numerológico"
              required
            />
          </div>
          <div className="text-center flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              type="submit"
              disabled={isLoading || !input1.trim() || !input2.trim()}
              className="px-8 py-3 w-full sm:w-auto bg-star-gold text-celestial-blue font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
              aria-live="polite"
            >
              {isLoading ? 'Analizando Conexión...' : 'Analizar Conexión'}
            </button>
            {numerologyReport && (
              <button
                type="button"
                onClick={clearReport}
                disabled={isLoading}
                className="px-6 py-3 w-full sm:w-auto bg-transparent text-cosmic-lavender border border-cosmic-lavender/50 font-semibold rounded-lg shadow-sm hover:bg-celestial-blue/50 hover:border-cosmic-lavender transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cosmic-lavender/50"
              >
                Limpiar Análisis
              </button>
            )}
          </div>
        </form>

        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorDisplay message={error} />}
        
        {!isLoading && !error && numerologyReport && (
          <NumerologyReportDisplay report={numerologyReport} />
        )}
        
        {!isLoading && !error && !numerologyReport && !input1 && !input2 && (
          <p className="text-center text-cosmic-lavender/70 mt-8" role="status">
            Ingresa dos nombres o datos para explorar su conexión numerológica.
          </p>
        )}
        {error && error.includes("Clave API de Gemini no está configurada") && (
            <p className="text-center text-yellow-300/80 mt-4 text-sm" role="status">
                La configuración de la aplicación parece estar incompleta (falta la Clave API). Por favor, contacta al administrador del sitio.
            </p>
        )}
      </main>
       <footer className="text-center mt-12 text-xs text-cosmic-lavender/50">
        <p>&copy; {new Date().getFullYear()} Conexiones Numerológicas. Perspicacia impulsada por la API de Gemini.</p>
      </footer>
    </div>
  );
};

export default NumerologyView;
