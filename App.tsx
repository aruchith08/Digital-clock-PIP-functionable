import React from 'react';
import SystemClock from './components/SystemClock';
import FocusControls from './components/FocusControls';
import { useWallpaper } from './hooks/useWallpaper';
import { Image as ImageIcon } from 'lucide-react';

const ZenLogo = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 rounded-lg shadow-lg shadow-cyan-500/20" aria-label="ZenFocus Logo">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="25" fill="url(#logoGradient)" />
    {/* Stopwatch Ring */}
    <circle cx="50" cy="55" r="30" stroke="white" strokeWidth="6" fill="none" />
    {/* Stopwatch Top Button */}
    <rect x="45" y="14" width="10" height="8" fill="white" />
    <rect x="47" y="8" width="6" height="6" fill="white" />
    {/* Diagonal Ticker */}
    <path d="M72 22 L78 28" stroke="white" strokeWidth="6" strokeLinecap="round" />
    {/* Hourglass Inside */}
    <path d="M50 55 L40 45 H60 L50 55 Z M50 55 L40 65 H60 L50 55 Z" fill="white" />
  </svg>
);

const App: React.FC = () => {
  const { wallpaper, nextWallpaper } = useWallpaper();

  return (
    <div className="min-h-screen bg-zen-bg text-zen-text flex flex-col p-4 selection:bg-zen-highlight selection:text-zen-bg overflow-y-auto relative">
      
      {/* Background Wallpaper */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out bg-zen-bg"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay for Readability */}
      <div className="fixed inset-0 z-0 bg-slate-950/60 backdrop-blur-sm" />

      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[128px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[128px] pointer-events-none z-0" />

      {/* Header / Brand & Controls */}
      <header className="relative w-full max-w-4xl mx-auto flex justify-between items-center py-4 z-10 mb-8 sm:mb-0">
        <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-default">
          <ZenLogo />
          <h1 className="font-sans font-bold tracking-widest text-sm uppercase text-white drop-shadow-md">ZenFocus</h1>
        </div>

        <button 
          onClick={nextWallpaper}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-mono text-zen-muted hover:text-white"
          title="Change Wallpaper"
          aria-label="Change Background Image"
        >
          <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shuffle Scene</span>
          <ImageIcon size={16} />
        </button>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center">
        <SystemClock />
        <FocusControls />
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full text-zen-muted text-xs font-mono text-center opacity-60 mix-blend-screen py-8 mt-4">
        <p>Use the PiP button to keep the timer visible while you study.</p>
        <p className="mt-1">
          Built with React by <a href="https://github.com/aruchith08" target="_blank" rel="noopener noreferrer" className="hover:text-white underline decoration-white/30 hover:decoration-white transition-all">A.Ruchith</a>
        </p>
      </footer>
    </div>
  );
};

export default App;