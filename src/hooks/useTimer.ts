'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerState, TimerPhase, TimerType, TimerAlert } from '@/lib/types/timer';

export function useTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentTime: 0,
    totalTime: 0,
    currentPhase: 'work',
    currentSet: 1,
    totalSets: 1,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Função para criar sons de alerta
  const playAlert = useCallback((alert: TimerAlert) => {
    if (!alert.enabled) return;

    if (alert.type === 'sound' || alert.type === 'both') {
      // Criar contexto de áudio se não existir
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Configurar som baseado no tipo
      switch (alert.soundType) {
        case 'beep':
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
          break;
        case 'whistle':
          oscillator.frequency.setValueAtTime(2000, ctx.currentTime);
          oscillator.frequency.setValueAtTime(1500, ctx.currentTime + 0.2);
          break;
        case 'bell':
          oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
          oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.15);
          break;
        default:
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      }

      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    }

    if (alert.type === 'visual' || alert.type === 'both') {
      // Trigger visual alert (será implementado no componente)
      document.dispatchEvent(new CustomEvent('timerVisualAlert', { 
        detail: { visualType: alert.visualType } 
      }));
    }
  }, []);

  // Função para iniciar o timer
  const startTimer = useCallback((config: {
    totalTime: number;
    phase: TimerPhase;
    sets: number;
    blocks?: number;
    rounds?: number;
  }) => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      currentTime: config.totalTime,
      totalTime: config.totalTime,
      currentPhase: config.phase,
      totalSets: config.sets,
      totalBlocks: config.blocks,
      totalRounds: config.rounds,
    }));
  }, []);

  // Função para pausar/retomar
  const togglePause = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  // Função para parar
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentTime: 0,
    }));
  }, []);

  // Função para resetar
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentTime: prev.totalTime,
      currentSet: 1,
      currentBlock: 1,
      currentRound: 1,
      currentPhase: 'work',
    }));
  }, []);

  // Função para avançar para próxima fase
  const nextPhase = useCallback((alert: TimerAlert) => {
    setTimerState(prev => {
      let newPhase = prev.currentPhase;
      let newSet = prev.currentSet;
      let newBlock = prev.currentBlock;
      let newRound = prev.currentRound;
      let newTime = 0;

      // Lógica para determinar próxima fase baseada no tipo de timer
      if (prev.currentPhase === 'work') {
        newPhase = 'rest';
      } else if (prev.currentPhase === 'rest') {
        newSet += 1;
        if (newSet <= prev.totalSets) {
          newPhase = 'work';
        } else {
          if (prev.totalBlocks && prev.currentBlock && prev.currentBlock < prev.totalBlocks) {
            newBlock = (prev.currentBlock || 0) + 1;
            newSet = 1;
            newPhase = 'work';
          } else {
            newPhase = 'finished';
          }
        }
      } else if (prev.currentPhase === 'round') {
        newPhase = 'break';
      } else if (prev.currentPhase === 'break') {
        newRound = (prev.currentRound || 0) + 1;
        if (newRound <= (prev.totalRounds || 0)) {
          newPhase = 'round';
        } else {
          newPhase = 'finished';
        }
      }

      // Tocar alerta na mudança de fase
      if (newPhase !== prev.currentPhase) {
        playAlert(alert);
      }

      return {
        ...prev,
        currentPhase: newPhase,
        currentSet: newSet,
        currentBlock: newBlock,
        currentRound: newRound,
        currentTime: newTime,
      };
    });
  }, [playAlert]);

  // Effect para gerenciar o countdown
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused && timerState.currentTime > 0) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          currentTime: prev.currentTime - 1,
        }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState.isRunning, timerState.isPaused, timerState.currentTime]);

  // Cleanup do contexto de áudio
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    timerState,
    startTimer,
    togglePause,
    stopTimer,
    resetTimer,
    nextPhase,
  };
}