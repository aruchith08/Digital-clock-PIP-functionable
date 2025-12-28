import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, MonitorUp, Sparkles, Coffee, Brain, Timer } from 'lucide-react';
import { TimerMode, TimerState } from '../types';
import { usePiP } from '../hooks/usePiP';
import { getMotivationTip } from '../services/geminiService';

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const MODES = [
  { id: TimerMode.POMODORO, label: 'Focus', minutes: 25, icon: Brain, color: '#38bdf8' },
  { id: TimerMode.SHORT_BREAK, label: 'Short Break', minutes: 5, icon: Coffee, color: '#818cf8' },
  { id: TimerMode.LONG_BREAK, label: 'Long Break', minutes: 15, icon: Coffee, color: '#c084fc' },
];

const FocusControls: React.FC = () => {
  const [state, setState] = useState<TimerState>({
    timeLeft: 25 * 60,
    isActive: false,
    mode: TimerMode.POMODORO,
    totalTime: 25 * 60,
  });

  const [motivation, setMotivation] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  // Initialize PiP hook
  const { canvasRef, isPiPActive, togglePiP, draw } = usePiP({ width: 400, height: 400 });

  // Timer Logic
  useEffect(() => {
    let interval: number | undefined;

    if (state.isActive && state.timeLeft > 0) {
      interval = window.setInterval(() => {
        setState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      setState(prev => ({ ...prev, isActive: false }));
      // Optional: Play sound here
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.timeLeft]);

  // PiP Update Loop
  useEffect(() => {
    const activeModeConfig = MODES.find(m => m.id === state.mode);
    const progress = state.timeLeft / state.totalTime;
    const timeString = formatTime(state.timeLeft);
    const statusString = state.isActive ? 'RUNNING' : 'PAUSED';
    const color = activeModeConfig?.color || '#38bdf8';

    draw(timeString, statusString, progress, color);
  }, [state.timeLeft, state.isActive, state.mode, state.totalTime, draw]);

  const switchMode = (mode: TimerMode) => {
    const config = MODES.find(m => m.id === mode);
    if (config) {
      setState({
        mode,
        timeLeft: config.minutes * 60,
        totalTime: config.minutes * 60,
        isActive: false,
      });
      setMotivation(""); // Clear motivation on mode switch
    }
  };

  const toggleTimer = () => setState(prev => ({ ...prev, isActive: !prev.isActive }));
  
  const resetTimer = () => {
    const config = MODES.find(m => m.id === state.mode);
    if (config) {
      setState(prev => ({
        ...prev,
        timeLeft: config.minutes * 60,
        isActive: false,
      }));
    }
  };

  const fetchMotivation = async () => {
    setLoadingAi(true);
    const tip = await getMotivationTip(state.mode, state.timeLeft);
    setMotivation(tip);
    setLoadingAi(false);
  };

  const activeColor = MODES.find(m => m.id === state.mode)?.color;

  return (
    <div className="w-full max-w-2xl bg-zen-surface/50 backdrop-blur-lg rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
       {/* Background Accent Glow */}
       <div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
        style={{ color: activeColor }}
       />

      {/* Hidden Canvas for PiP */}
      <canvas ref={canvasRef} width={400} height={400} className="hidden" />

      {/* Mode Selectors */}
      <div className="flex justify-center space-x-2 mb-8">
        {MODES.map((m) => {
          const Icon = m.icon;
          const isActive = state.mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-white/10 text-white shadow-lg scale-105 ring-1 ring-white/20' 
                  : 'text-zen-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              <span className="font-medium">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Timer Display */}
      <div className="text-center mb-8 relative group">
        <div className="text-[6rem] font-mono font-bold leading-none tracking-tight tabular-nums relative z-10 transition-colors duration-500" style={{ color: activeColor }}>
          {formatTime(state.timeLeft)}
        </div>
        
        {/* Progress Bar (Visual) */}
        <div className="h-1 w-full bg-zen-bg rounded-full mt-6 overflow-hidden">
          <div 
            className="h-full transition-all duration-1000 ease-linear"
            style={{ 
              width: `${(state.timeLeft / state.totalTime) * 100}%`,
              backgroundColor: activeColor
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={toggleTimer}
          className="group relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-95 ring-1 ring-white/10"
        >
          {state.isActive ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-1" />}
        </button>

        <button
          onClick={resetTimer}
          className="p-4 rounded-xl text-zen-muted hover:text-white hover:bg-white/5 transition-all"
          title="Reset Timer"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={togglePiP}
          className={`p-4 rounded-xl transition-all border border-white/5 ${
            isPiPActive ? 'text-green-400 bg-green-400/10' : 'text-zen-muted hover:text-white hover:bg-white/5'
          }`}
          title="Toggle Picture-in-Picture Mode"
        >
          <MonitorUp size={24} />
        </button>
        
         <button
          onClick={fetchMotivation}
          disabled={loadingAi}
          className={`p-4 rounded-xl transition-all border border-white/5 ${
            loadingAi ? 'animate-pulse text-yellow-400' : 'text-zen-muted hover:text-yellow-300 hover:bg-yellow-400/10'
          }`}
          title="Get AI Motivation"
        >
          <Sparkles size={24} />
        </button>
      </div>
      
      {/* Motivation Section */}
      {motivation && (
        <div className="mt-8 text-center animate-fade-in px-4 py-3 bg-white/5 rounded-lg border border-white/5">
            <p className="text-zen-highlight italic font-light">"{motivation}"</p>
        </div>
      )}
      
      {/* PiP Instructions if active */}
      {isPiPActive && (
         <div className="mt-4 text-center">
            <span className="text-xs text-green-400/80 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Mini Clock Active
            </span>
         </div>
      )}
    </div>
  );
};

export default FocusControls;