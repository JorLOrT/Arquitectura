import React from 'react';
import { ZodiacSign } from '../../../types';

interface ZodiacSignSelectorProps {
  signs: ZodiacSign[];
  selectedSign: ZodiacSign | null;
  onSignSelect: (sign: ZodiacSign) => void;
}

const ZodiacSignSelector: React.FC<ZodiacSignSelectorProps> = ({ signs, selectedSign, onSignSelect }) => {
  const zodiacIcons: Record<ZodiacSign, React.ReactNode> = {
    [ZodiacSign.ARIES]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m-7 7h14m-7 7V3" />, 
    [ZodiacSign.TAURUS]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v5" />, 
    [ZodiacSign.GEMINI]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M4 9h16M4 15h16" />, 
    [ZodiacSign.CANCER]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9a3 3 0 013-3m-3 9a3 3 0 003 3" />, 
    [ZodiacSign.LEO]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a8 8 0 00-8-8m0 13a8 8 0 008-8m0 0a8 8 0 008 8m-1.5-7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />, 
    [ZodiacSign.VIRGO]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />, 
    [ZodiacSign.LIBRA]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M3 7l3 1m6.001 0l3-1m-2.001 0l-2-1m5-3l-3-1m0 0l-2 1m5 3l-3 1M3 7l3 1" />, 
    [ZodiacSign.SCORPIO]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5-2.707-7.207" />, 
    [ZodiacSign.SAGITTARIUS]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />, 
    [ZodiacSign.CAPRICORN]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a4 4 0 00-5.656 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L11 8" />, 
    [ZodiacSign.AQUARIUS]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-2-3m-2 3l-2-3m0 0l-2 3m2-3l2 3M5 15l2-3m2 3l2-3m0 0l2 3m2-3l-2-3" />, 
    [ZodiacSign.PISCES]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-9 4h14" />, 
  };
  
  const getIcon = (sign: ZodiacSign) => {
    const icon = zodiacIcons[sign];
    if (icon) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 group-hover:text-star-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>;
    }
    return <span className="mr-2 text-lg group-hover:text-star-gold transition-colors">✨</span>;
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-display text-star-gold text-center mb-6">Selecciona Tu Signo Zodiacal</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {signs.map((sign) => (
          <button
            key={sign}
            onClick={() => onSignSelect(sign)}
            className={`group p-3 rounded-lg border-2 transition-all duration-300 ease-in-out
                        flex items-center justify-center text-sm sm:text-base
                        ${selectedSign === sign 
                          ? 'bg-star-gold text-celestial-blue border-star-gold shadow-lg scale-105' 
                          : 'bg-celestial-blue/50 text-light-silver border-cosmic-lavender/30 hover:border-star-gold hover:bg-celestial-blue'
                        }`}
            aria-label={`Seleccionar signo ${sign}`}
          >
            {getIcon(sign)}
            {sign}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ZodiacSignSelector;
