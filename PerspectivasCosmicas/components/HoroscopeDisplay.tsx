
import React from 'react';
import { HoroscopePrediction } from '../types';

interface HoroscopeDisplayProps {
  horoscope: HoroscopePrediction;
}

const HoroscopeDisplay: React.FC<HoroscopeDisplayProps> = ({ horoscope }) => {
  return (
    <div className="mt-6 p-6 bg-celestial-blue/70 rounded-xl shadow-2xl border border-cosmic-lavender/20 transform transition-all duration-500 ease-out hover:scale-105">
      <h3 className="font-display text-3xl text-star-gold mb-3 text-center">{horoscope.sign}</h3>
      <p className="text-sm text-cosmic-lavender/80 mb-4 text-center">{horoscope.date}</p>
      <div className="h-px bg-cosmic-lavender/30 my-4"></div>
      <p className="text-light-silver text-lg leading-relaxed whitespace-pre-wrap text-center">
        {horoscope.text}
      </p>
    </div>
  );
};

export default HoroscopeDisplay;
