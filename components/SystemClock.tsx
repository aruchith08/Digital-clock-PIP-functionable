import React, { useEffect } from 'react';
import { MonitorUp } from 'lucide-react';
import { useTime } from '../hooks/useTime';
import { usePiP } from '../hooks/usePiP';

const SystemClock: React.FC = () => {
  const time = useTime();
  const { canvasRef, isPiPActive, togglePiP, draw } = usePiP({ width: 300, height: 300 });

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  useEffect(() => {
    // Update PiP canvas whenever time changes
    draw(
      `${hours}:${minutes}`, 
      `:${seconds}`, 
      time.getSeconds() / 60, 
      '#38bdf8' // zen-highlight
    );
  }, [time, hours, minutes, seconds, draw]);

  return (
    <div className="flex flex-col items-center justify-center space-y-2 mb-12 relative">
      {/* Hidden Canvas for PiP generation */}
      <canvas ref={canvasRef} width={300} height={300} className="hidden" />

      <div className="text-[12rem] leading-none font-bold font-mono tracking-tighter text-zen-text drop-shadow-2xl select-none tabular-nums flex">
        <span>{hours}</span>
        <span className="animate-pulse text-zen-muted">:</span>
        <span>{minutes}</span>
      </div>
      
      <div className="flex items-center space-x-4 relative">
         <span className="text-2xl text-zen-muted font-light tracking-widest uppercase">{dateStr}</span>
         <span className="text-xl text-zen-highlight font-mono bg-zen-surface px-3 py-1 rounded-md">{seconds}s</span>
         
         <div className="w-px h-6 bg-zen-surface mx-2"></div>

         <button
            onClick={togglePiP}
            className={`p-2 rounded-lg transition-all border border-transparent ${
              isPiPActive 
                ? 'text-green-400 bg-green-400/10 border-green-400/20' 
                : 'text-zen-muted hover:text-white hover:bg-white/10'
            }`}
            title="Pop out System Clock"
          >
            <MonitorUp size={20} />
          </button>
      </div>

      {isPiPActive && (
         <div className="absolute -bottom-8 text-xs text-green-400/50 uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Clock PiP Active
         </div>
      )}
    </div>
  );
};

export default SystemClock;