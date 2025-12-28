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
    <div className="flex flex-col items-center justify-center space-y-2 mb-12 relative group">
      
      {/* Hidden Canvas for PiP */}
      <canvas ref={canvasRef} width={300} height={150} className="hidden" />

      <div className="text-[12rem] leading-none font-bold font-mono tracking-tighter text-zen-text drop-shadow-2xl select-none tabular-nums flex">
        <span>{hours}</span>
        <span className="animate-pulse text-zen-muted">:</span>
        <span>{minutes}</span>
      </div>
      <div className="flex items-center space-x-4">
         <span className="text-2xl text-zen-muted font-light tracking-widest uppercase">{dateStr}</span>
         <span className="text-xl text-zen-highlight font-mono bg-zen-surface px-3 py-1 rounded-md">{seconds}s</span>
         
         <button
          onClick={togglePiP}
          className={`p-2 rounded-lg transition-all ml-4 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
            isPiPActive ? 'text-green-400 bg-green-400/10 opacity-100' : 'text-zen-muted hover:text-white hover:bg-white/5'
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