import React, { useEffect } from 'react';
import { useTime } from '../hooks/useTime';
import { usePiP } from '../hooks/usePiP';
import { MonitorUp } from 'lucide-react';

const SystemClock: React.FC = () => {
  const time = useTime();
  const { canvasRef, isPiPActive, togglePiP } = usePiP({ width: 300, height: 150 });

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  // PiP Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions
    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#0f172a'; // zen-bg
    ctx.fillRect(0, 0, w, h);

    // Border (optional aesthetic)
    ctx.strokeStyle = '#1e293b'; // zen-surface
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, w, h);

    // Time Text
    ctx.fillStyle = '#f8fafc'; // zen-text
    ctx.font = 'bold 60px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${hours}:${minutes}`, w / 2, h / 2 - 15);

    // Seconds Text
    ctx.fillStyle = '#38bdf8'; // zen-highlight
    ctx.font = 'bold 24px "JetBrains Mono"';
    ctx.fillText(`${seconds}`, w / 2, h / 2 + 35);
    
  }, [time, hours, minutes, seconds]);

  return (
    <div className="flex flex-col items-center justify-center space-y-2 mb-8 md:mb-12 relative group w-full">
      
      {/* Hidden Canvas for PiP */}
      <canvas ref={canvasRef} width={300} height={150} className="hidden" />

      {/* Main Clock - Responsive Font Size */}
      <div className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-none font-bold font-mono tracking-tighter text-zen-text drop-shadow-2xl select-none tabular-nums flex items-baseline justify-center">
        <span>{hours}</span>
        <span className="animate-pulse text-zen-muted mx-1 md:mx-4">:</span>
        <span>{minutes}</span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 px-4 text-center">
         <span className="text-sm sm:text-xl md:text-2xl text-zen-muted font-light tracking-widest uppercase">{dateStr}</span>
         <span className="text-sm sm:text-lg md:text-xl text-zen-highlight font-mono bg-zen-surface px-2 py-0.5 md:px-3 md:py-1 rounded-md">{seconds}s</span>
         
         <button
          onClick={togglePiP}
          className={`p-2 rounded-lg transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 ${
            isPiPActive ? 'text-green-400 bg-green-400/10 opacity-100' : 'text-zen-muted hover:text-white hover:bg-white/5 opacity-100'
          }`}
          title="Pop out Clock"
          aria-label="Toggle Picture-in-Picture Clock"
        >
          <MonitorUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default SystemClock;