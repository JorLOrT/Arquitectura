
import React from 'react';
import HoroscopeView from './components/HoroscopeView';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-light-silver">
      <HoroscopeView />
    </div>
  );
};

export default App;
