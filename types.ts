export enum TimerMode {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
  STOPWATCH = 'STOPWATCH'
}

export interface TimerState {
  timeLeft: number; // in seconds
  isActive: boolean;
  mode: TimerMode;
  totalTime: number; // For progress calculation
}