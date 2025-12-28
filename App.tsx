import React from 'react';
import SystemClock from './components/SystemClock';
import FocusControls from './components/FocusControls';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zen-bg text-zen-text flex flex-col items-center justify-center p-4 selection:bg-zen-highlight selection:text-zen-bg overflow-hidden relative">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[128px] pointer-events-none" />

      {/* Header / Brand */}
      <header className="absolute top-6 left-6 flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-3 h-3 bg-zen-highlight rounded-full" />
        <h1 className="font-sans font-bold tracking-widest text-sm uppercase">ZenFocus</h1>
      </header>
      
      <main className="z-10 w-full max-w-4xl flex flex-col items-center">
        <SystemClock />
        <FocusControls />
      </main>

      {/* Footer Info */}
      <footer className="absolute bottom-6 text-zen-muted text-xs font-mono text-center w-full opacity-40">
        <p>Use the PiP button to keep the timer visible while you study.</p>
        <p className="mt-1">Built with React</p>
      </footer>
    </div>
  );
};

export default App;