import React, { useState } from 'react';
import HoroscopeView from './features/horoscope/views/HoroscopeView';
import NumerologyView from './features/numerology/views/NumerologyView';

type ViewMode = 'horoscope' | 'numerology';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('horoscope');

  const navButtonBaseClasses = "px-6 py-2 rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 text-sm sm:text-base";
  const activeNavButtonClasses = "bg-star-gold text-celestial-blue shadow-lg ring-star-gold";
  const inactiveNavButtonClasses = "bg-celestial-blue/30 text-cosmic-lavender hover:bg-celestial-blue/50 hover:text-star-gold ring-cosmic-lavender/50";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 text-light-silver">
      <nav className="mb-8 flex space-x-2 sm:space-x-4 p-2 bg-slate-900/30 backdrop-blur-sm rounded-lg shadow-md">
        <button
          onClick={() => setCurrentView('horoscope')}
          className={`${navButtonBaseClasses} ${currentView === 'horoscope' ? activeNavButtonClasses : inactiveNavButtonClasses}`}
          aria-pressed={currentView === 'horoscope'}
        >
          Horóscopo Diario
        </button>
        <button
          onClick={() => setCurrentView('numerology')}
          className={`${navButtonBaseClasses} ${currentView === 'numerology' ? activeNavButtonClasses : inactiveNavButtonClasses}`}
          aria-pressed={currentView === 'numerology'}
        >
          Conexiones Numerológicas
        </button>
      </nav>

      {currentView === 'horoscope' && <HoroscopeView />}
      {currentView === 'numerology' && <NumerologyView />}
    </div>
  );
};

export default App;
