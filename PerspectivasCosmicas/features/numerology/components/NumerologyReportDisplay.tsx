import React from 'react';
import { NumerologyReport } from '../../../types';

interface NumerologyReportDisplayProps {
  report: NumerologyReport;
}

const NumerologyReportDisplay: React.FC<NumerologyReportDisplayProps> = ({ report }) => {
  return (
    <div className="mt-6 p-6 bg-celestial-blue/70 rounded-xl shadow-2xl border border-cosmic-lavender/20 transform transition-all duration-500 ease-out hover:scale-105">
      <h3 className="font-display text-3xl text-star-gold mb-3 text-center">
        Conexión entre "{report.inputs.input1}" y "{report.inputs.input2}"
      </h3>
      <p className="text-sm text-cosmic-lavender/80 mb-4 text-center">{report.analysisDate}</p>
      <div className="h-px bg-cosmic-lavender/30 my-4"></div>
      <p className="text-light-silver text-lg leading-relaxed whitespace-pre-wrap text-center">
        {report.reportText}
      </p>
    </div>
  );
};

export default NumerologyReportDisplay;
