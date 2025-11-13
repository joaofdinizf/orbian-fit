export type TimerType = 'running' | 'intervals' | 'fighting' | 'tabata';

export type TimerPhase = 'work' | 'rest' | 'round' | 'break' | 'finished';

export interface RunningTimerConfig {
  type: 'simple' | 'interval';
  totalTime?: number; // em segundos, para modo simples
  intervals?: {
    workTime: number; // tempo de corrida forte em segundos
    restTime: number; // tempo de corrida leve em segundos
    sets: number; // número de repetições
  };
}

export interface IntervalTimerConfig {
  workTime: number; // tempo de esforço em segundos
  restTime: number; // tempo de descanso em segundos
  sets: number; // número de séries
  blocks?: number; // número de blocos (opcional)
}

export interface FightingTimerConfig {
  roundTime: number; // duração do round em segundos
  breakTime: number; // intervalo entre rounds em segundos
  rounds: number; // número de rounds
}

export interface TabataTimerConfig {
  workTime: number; // tempo de trabalho em segundos
  restTime: number; // tempo de descanso em segundos
  sets: number; // número de séries
  blocks?: number; // número de blocos (opcional)
}

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentTime: number;
  totalTime: number;
  currentPhase: TimerPhase;
  currentSet: number;
  totalSets: number;
  currentBlock?: number;
  totalBlocks?: number;
  currentRound?: number;
  totalRounds?: number;
}

export interface TimerPreset {
  id: string;
  name: string;
  type: TimerType;
  config: RunningTimerConfig | IntervalTimerConfig | FightingTimerConfig | TabataTimerConfig;
  description?: string;
  createdBy?: string; // ID do professor que criou
  associatedWorkouts?: string[]; // IDs dos treinos associados
}

export interface TimerAlert {
  type: 'sound' | 'visual' | 'both';
  enabled: boolean;
  soundType?: 'beep' | 'whistle' | 'bell';
  visualType?: 'flash' | 'color-change' | 'pulse';
}

export interface TimerSettings {
  alerts: TimerAlert;
  autoStart: boolean;
  showMilliseconds: boolean;
  theme: 'light' | 'dark' | 'colorful';
}