'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  Clock,
  Zap,
  Swords,
  Target,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'lucide-react';

type TimerMode = 'clock' | 'stopwatch' | 'countdown' | 'hiit' | 'tabata' | 'rounds' | 'running';
type TimerState = 'idle' | 'running' | 'paused';
type Phase = 'work' | 'rest' | 'round' | 'break' | 'blockBreak' | 'finished';

interface Preset {
  name: string;
  mode: TimerMode;
  config: any;
}

interface TimerModuleProps {
  userRole?: 'trainer' | 'student';
}

export default function TimerModule({ userRole }: TimerModuleProps) {
  const [mode, setMode] = useState<TimerMode>('stopwatch');
  const [state, setState] = useState<TimerState>('idle');
  const [time, setTime] = useState(0);
  const [showMilliseconds, setShowMilliseconds] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [visualEnabled, setVisualEnabled] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  // Configurações por modo
  const [countdownTime, setCountdownTime] = useState(300); // 5 minutos em segundos
  const [hiitWork, setHiitWork] = useState(30);
  const [hiitRest, setHiitRest] = useState(15);
  const [hiitSets, setHiitSets] = useState(8);
  const [hiitBlocks, setHiitBlocks] = useState(1);
  const [hiitBlockBreak, setHiitBlockBreak] = useState(60);
  const [tabataWork, setTabataWork] = useState(20);
  const [tabataRest, setTabataRest] = useState(10);
  const [tabataSets, setTabataSets] = useState(8);
  const [tabataBlocks, setTabataBlocks] = useState(1);
  const [roundTime, setRoundTime] = useState(180);
  const [breakTime, setBreakTime] = useState(60);
  const [rounds, setRounds] = useState(3);
  const [runningTime, setRunningTime] = useState(30);
  const [runningIntervalWork, setRunningIntervalWork] = useState(60);
  const [runningIntervalRest, setRunningIntervalRest] = useState(30);
  const [runningIntervalSets, setRunningIntervalSets] = useState(5);
  const [runningMode, setRunningMode] = useState<'simple' | 'interval'>('simple');

  // Estado do timer
  const [phase, setPhase] = useState<Phase>('work');
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentBlock, setCurrentBlock] = useState(1);

  // Presets
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [presetName, setPresetName] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Carregar presets do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('orbian.timer.presets.v1');
    if (stored) {
      try {
        setPresets(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar presets:', e);
      }
    }

    // Inicializar áudio
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/beep.mp3');
    }
  }, []);

  // Salvar presets no localStorage
  useEffect(() => {
    if (presets.length > 0) {
      localStorage.setItem('orbian.timer.presets.v1', JSON.stringify(presets));
    }
  }, [presets]);

  // Timer principal
  useEffect(() => {
    if (state === 'running') {
      if (mode === 'clock') {
        intervalRef.current = setInterval(() => {
          setTime(Date.now());
        }, 1000);
      } else if (mode === 'stopwatch') {
        intervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTimeRef.current + pausedTimeRef.current;
          setTime(elapsed);
        }, showMilliseconds ? 10 : 100);
      } else if (mode === 'countdown') {
        intervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTimeRef.current;
          const remaining = countdownTime * 1000 - elapsed - pausedTimeRef.current;
          if (remaining <= 0) {
            setTime(0);
            handleTimerComplete();
          } else {
            setTime(remaining);
          }
        }, showMilliseconds ? 10 : 100);
      } else if (mode === 'hiit' || mode === 'tabata') {
        handleIntervalTimer();
      } else if (mode === 'rounds') {
        handleRoundsTimer();
      } else if (mode === 'running') {
        if (runningMode === 'simple') {
          intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = runningTime * 60 * 1000 - elapsed - pausedTimeRef.current;
            if (remaining <= 0) {
              setTime(0);
              handleTimerComplete();
            } else {
              setTime(remaining);
            }
          }, showMilliseconds ? 10 : 100);
        } else {
          handleRunningIntervalTimer();
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state, mode, showMilliseconds, currentSet, currentRound, currentBlock, phase]);

  const handleIntervalTimer = () => {
    const isTabata = mode === 'tabata';
    const workTime = isTabata ? tabataWork : hiitWork;
    const restTime = isTabata ? tabataRest : hiitRest;
    const totalSets = isTabata ? tabataSets : hiitSets;
    const totalBlocks = isTabata ? tabataBlocks : hiitBlocks;
    const blockBreak = isTabata ? 0 : hiitBlockBreak;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      let currentTime = elapsed;

      // Calcular fase atual
      const cycleTime = (workTime + restTime) * 1000;
      const setsPerBlock = totalSets === 0 ? 999999 : totalSets;
      const blockTime = cycleTime * setsPerBlock + (blockBreak * 1000);

      const currentBlockIndex = Math.floor(currentTime / blockTime);
      const timeInBlock = currentTime % blockTime;

      if (totalBlocks > 0 && currentBlockIndex >= totalBlocks) {
        handleTimerComplete();
        return;
      }

      setCurrentBlock(currentBlockIndex + 1);

      // Verificar se está em pausa entre blocos
      if (timeInBlock >= cycleTime * setsPerBlock) {
        setPhase('blockBreak');
        const remaining = blockTime - timeInBlock;
        setTime(remaining);
        return;
      }

      const currentCycle = Math.floor(timeInBlock / cycleTime);
      const timeInCycle = timeInBlock % cycleTime;

      setCurrentSet(currentCycle + 1);

      if (timeInCycle < workTime * 1000) {
        if (phase !== 'work') {
          setPhase('work');
          playBeep();
          flash();
        }
        setTime(workTime * 1000 - timeInCycle);
      } else {
        if (phase !== 'rest') {
          setPhase('rest');
          playBeep();
          flash();
        }
        setTime(restTime * 1000 - (timeInCycle - workTime * 1000));
      }
    }, showMilliseconds ? 10 : 100);
  };

  const handleRoundsTimer = () => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const cycleTime = (roundTime + breakTime) * 1000;
      const totalRounds = rounds === 0 ? 999999 : rounds;

      const currentCycle = Math.floor(elapsed / cycleTime);

      if (rounds > 0 && currentCycle >= totalRounds) {
        handleTimerComplete();
        return;
      }

      setCurrentRound(currentCycle + 1);

      const timeInCycle = elapsed % cycleTime;

      if (timeInCycle < roundTime * 1000) {
        if (phase !== 'round') {
          setPhase('round');
          playBeep();
          flash();
        }
        setTime(roundTime * 1000 - timeInCycle);
      } else {
        if (phase !== 'break') {
          setPhase('break');
          playBeep();
          flash();
        }
        setTime(breakTime * 1000 - (timeInCycle - roundTime * 1000));
      }
    }, showMilliseconds ? 10 : 100);
  };

  const handleRunningIntervalTimer = () => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const cycleTime = (runningIntervalWork + runningIntervalRest) * 1000;
      const totalSets = runningIntervalSets === 0 ? 999999 : runningIntervalSets;

      const currentCycle = Math.floor(elapsed / cycleTime);

      if (runningIntervalSets > 0 && currentCycle >= totalSets) {
        handleTimerComplete();
        return;
      }

      setCurrentSet(currentCycle + 1);

      const timeInCycle = elapsed % cycleTime;

      if (timeInCycle < runningIntervalWork * 1000) {
        if (phase !== 'work') {
          setPhase('work');
          playBeep();
          flash();
        }
        setTime(runningIntervalWork * 1000 - timeInCycle);
      } else {
        if (phase !== 'rest') {
          setPhase('rest');
          playBeep();
          flash();
        }
        setTime(runningIntervalRest * 1000 - (timeInCycle - runningIntervalWork * 1000));
      }
    }, showMilliseconds ? 10 : 100);
  };

  const handleTimerComplete = () => {
    setState('idle');
    setPhase('finished');
    playBeep();
    flash();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const playBeep = () => {
    if (soundEnabled && audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } catch (e) {
        console.log('Audio error:', e);
      }
    }
  };

  const flash = () => {
    if (visualEnabled) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);
    }
  };

  const handleStart = () => {
    if (state === 'idle') {
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
      setCurrentSet(1);
      setCurrentRound(1);
      setCurrentBlock(1);
      setPhase('work');
      
      if (mode === 'countdown') {
        setTime(countdownTime * 1000);
      } else if (mode === 'running' && runningMode === 'simple') {
        setTime(runningTime * 60 * 1000);
      } else {
        setTime(0);
      }
    }
    setState('running');
  };

  const handlePause = () => {
    if (state === 'running') {
      setState('paused');
      if (mode === 'stopwatch') {
        pausedTimeRef.current = time;
      } else if (mode === 'countdown' || (mode === 'running' && runningMode === 'simple')) {
        pausedTimeRef.current += (countdownTime * 1000 - time);
      }
    }
  };

  const handleResume = () => {
    if (state === 'paused') {
      startTimeRef.current = Date.now();
      setState('running');
    }
  };

  const handleStop = () => {
    setState('idle');
    setTime(0);
    setPhase('work');
    setCurrentSet(1);
    setCurrentRound(1);
    setCurrentBlock(1);
    pausedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    handleStop();
  };

  const handleModeChange = (newMode: TimerMode) => {
    handleStop();
    setMode(newMode);
  };

  const formatTime = (ms: number): string => {
    if (mode === 'clock') {
      const date = new Date(ms);
      return date.toLocaleTimeString('pt-BR');
    }

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    if (hours > 0) {
      return showMilliseconds
        ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
        : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return showMilliseconds
      ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
      : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (): string => {
    const date = new Date();
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPhaseLabel = (): string => {
    switch (phase) {
      case 'work': return 'TRABALHO';
      case 'rest': return 'DESCANSO';
      case 'round': return 'ROUND';
      case 'break': return 'INTERVALO';
      case 'blockBreak': return 'PAUSA ENTRE BLOCOS';
      case 'finished': return 'FINALIZADO';
      default: return '';
    }
  };

  const getPhaseColor = (): string => {
    switch (phase) {
      case 'work': return 'text-green-600';
      case 'rest': return 'text-blue-600';
      case 'round': return 'text-red-600';
      case 'break': return 'text-yellow-600';
      case 'blockBreak': return 'text-purple-600';
      case 'finished': return 'text-gray-600';
      default: return 'text-gray-900';
    }
  };

  const savePreset = () => {
    if (!presetName.trim()) {
      alert('Digite um nome para o preset');
      return;
    }

    const config = {
      countdownTime,
      hiitWork,
      hiitRest,
      hiitSets,
      hiitBlocks,
      hiitBlockBreak,
      tabataWork,
      tabataRest,
      tabataSets,
      tabataBlocks,
      roundTime,
      breakTime,
      rounds,
      runningTime,
      runningIntervalWork,
      runningIntervalRest,
      runningIntervalSets,
      runningMode
    };

    const newPreset: Preset = {
      name: presetName,
      mode,
      config
    };

    setPresets([...presets, newPreset]);
    setPresetName('');
    alert('Preset salvo com sucesso!');
  };

  const loadPreset = (presetId: string) => {
    const preset = presets.find((p, i) => i.toString() === presetId);
    if (preset) {
      setMode(preset.mode);
      const config = preset.config;
      setCountdownTime(config.countdownTime || 300);
      setHiitWork(config.hiitWork || 30);
      setHiitRest(config.hiitRest || 15);
      setHiitSets(config.hiitSets || 8);
      setHiitBlocks(config.hiitBlocks || 1);
      setHiitBlockBreak(config.hiitBlockBreak || 60);
      setTabataWork(config.tabataWork || 20);
      setTabataRest(config.tabataRest || 10);
      setTabataSets(config.tabataSets || 8);
      setTabataBlocks(config.tabataBlocks || 1);
      setRoundTime(config.roundTime || 180);
      setBreakTime(config.breakTime || 60);
      setRounds(config.rounds || 3);
      setRunningTime(config.runningTime || 30);
      setRunningIntervalWork(config.runningIntervalWork || 60);
      setRunningIntervalRest(config.runningIntervalRest || 30);
      setRunningIntervalSets(config.runningIntervalSets || 5);
      setRunningMode(config.runningMode || 'simple');
      handleStop();
    }
  };

  const deletePreset = (index: number) => {
    if (confirm('Deseja excluir este preset?')) {
      setPresets(presets.filter((_, i) => i !== index));
      setSelectedPreset('');
    }
  };

  return (
    <Card className={`bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl transition-all duration-300 ${isFlashing ? 'ring-4 ring-yellow-400' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
          <Timer className="w-7 h-7 text-[#FFC300]" />
          Cronômetros de Treino
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tabs de Modos */}
        <Tabs value={mode} onValueChange={(v) => handleModeChange(v as TimerMode)}>
          <TabsList className="grid w-full grid-cols-7 bg-[#FFF3C4] rounded-xl p-1">
            <TabsTrigger value="clock" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Relógio</span>
            </TabsTrigger>
            <TabsTrigger value="stopwatch" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">Cronômetro</span>
            </TabsTrigger>
            <TabsTrigger value="countdown" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Timer</span>
            </TabsTrigger>
            <TabsTrigger value="hiit" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">HIIT</span>
            </TabsTrigger>
            <TabsTrigger value="tabata" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Tabata</span>
            </TabsTrigger>
            <TabsTrigger value="rounds" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Swords className="w-4 h-4" />
              <span className="hidden sm:inline">Lutas</span>
            </TabsTrigger>
            <TabsTrigger value="running" className="flex items-center gap-1 data-[state=active]:bg-white rounded-lg">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Corrida</span>
            </TabsTrigger>
          </TabsList>

          {/* Display Principal */}
          <div className="mt-6 p-8 bg-gradient-to-br from-[#FFF3C4] to-[#FFE8A3] rounded-2xl border-2 border-[#E6C85C]">
            {mode !== 'clock' && state !== 'idle' && (
              <div className={`text-center mb-4 text-xl font-bold ${getPhaseColor()}`}>
                {getPhaseLabel()}
              </div>
            )}

            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold text-[#0A0A0A] mb-4 font-mono">
                {mode === 'clock' ? formatTime(time) : formatTime(Math.abs(time))}
              </div>

              {mode === 'clock' && (
                <div className="text-xl text-[#4A4A4A] capitalize">
                  {formatDate()}
                </div>
              )}

              {/* Indicadores de progresso */}
              {(mode === 'hiit' || mode === 'tabata') && state !== 'idle' && (
                <div className="flex justify-center gap-6 text-lg text-[#4A4A4A]">
                  <span>Série: {currentSet}/{mode === 'hiit' ? (hiitSets === 0 ? '∞' : hiitSets) : (tabataSets === 0 ? '∞' : tabataSets)}</span>
                  {(mode === 'hiit' ? hiitBlocks : tabataBlocks) > 1 && (
                    <span>Bloco: {currentBlock}/{mode === 'hiit' ? hiitBlocks : tabataBlocks}</span>
                  )}
                </div>
              )}

              {mode === 'rounds' && state !== 'idle' && (
                <div className="text-lg text-[#4A4A4A]">
                  Round: {currentRound}/{rounds === 0 ? '∞' : rounds}
                </div>
              )}

              {mode === 'running' && runningMode === 'interval' && state !== 'idle' && (
                <div className="text-lg text-[#4A4A4A]">
                  Série: {currentSet}/{runningIntervalSets === 0 ? '∞' : runningIntervalSets}
                </div>
              )}
            </div>
          </div>

          {/* Controles */}
          {mode !== 'clock' && (
            <div className="flex justify-center gap-4 mt-6">
              {state === 'idle' && (
                <Button
                  onClick={handleStart}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Iniciar
                </Button>
              )}

              {state === 'running' && (
                <Button
                  onClick={handlePause}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-6 text-lg rounded-xl"
                  size="lg"
                >
                  <Pause className="w-6 h-6 mr-2" />
                  Pausar
                </Button>
              )}

              {state === 'paused' && (
                <Button
                  onClick={handleResume}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Retomar
                </Button>
              )}

              {state !== 'idle' && (
                <Button
                  onClick={handleStop}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl"
                  size="lg"
                >
                  <Square className="w-6 h-6 mr-2" />
                  Parar
                </Button>
              )}

              {state === 'idle' && time !== 0 && (
                <Button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-6 text-lg rounded-xl"
                  size="lg"
                >
                  <RotateCcw className="w-6 h-6 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          )}

          <Separator className="my-6" />

          {/* Configurações e Presets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configurações */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A0A0A]">Configurações</h3>

              <TabsContent value="countdown" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="countdown-time">Tempo (segundos)</Label>
                  <Input
                    id="countdown-time"
                    type="number"
                    min="0"
                    value={countdownTime}
                    onChange={(e) => setCountdownTime(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="hiit" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hiit-work">Trabalho (s)</Label>
                    <Input
                      id="hiit-work"
                      type="number"
                      min="0"
                      value={hiitWork}
                      onChange={(e) => setHiitWork(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hiit-rest">Descanso (s)</Label>
                    <Input
                      id="hiit-rest"
                      type="number"
                      min="0"
                      value={hiitRest}
                      onChange={(e) => setHiitRest(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hiit-sets">Séries (0 = ∞)</Label>
                    <Input
                      id="hiit-sets"
                      type="number"
                      min="0"
                      value={hiitSets}
                      onChange={(e) => setHiitSets(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hiit-blocks">Blocos</Label>
                    <Input
                      id="hiit-blocks"
                      type="number"
                      min="1"
                      value={hiitBlocks}
                      onChange={(e) => setHiitBlocks(Math.max(1, parseInt(e.target.value) || 1))}
                      className="mt-1"
                    />
                  </div>
                  {hiitBlocks > 1 && (
                    <div className="col-span-2">
                      <Label htmlFor="hiit-block-break">Pausa entre blocos (s)</Label>
                      <Input
                        id="hiit-block-break"
                        type="number"
                        min="0"
                        value={hiitBlockBreak}
                        onChange={(e) => setHiitBlockBreak(Math.max(0, parseInt(e.target.value) || 0))}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tabata" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tabata-work">Trabalho (s)</Label>
                    <Input
                      id="tabata-work"
                      type="number"
                      min="0"
                      value={tabataWork}
                      onChange={(e) => setTabataWork(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tabata-rest">Descanso (s)</Label>
                    <Input
                      id="tabata-rest"
                      type="number"
                      min="0"
                      value={tabataRest}
                      onChange={(e) => setTabataRest(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tabata-sets">Séries (0 = ∞)</Label>
                    <Input
                      id="tabata-sets"
                      type="number"
                      min="0"
                      value={tabataSets}
                      onChange={(e) => setTabataSets(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tabata-blocks">Blocos</Label>
                    <Input
                      id="tabata-blocks"
                      type="number"
                      min="1"
                      value={tabataBlocks}
                      onChange={(e) => setTabataBlocks(Math.max(1, parseInt(e.target.value) || 1))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rounds" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="round-time">Tempo Round (s)</Label>
                    <Input
                      id="round-time"
                      type="number"
                      min="0"
                      value={roundTime}
                      onChange={(e) => setRoundTime(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="break-time">Intervalo (s)</Label>
                    <Input
                      id="break-time"
                      type="number"
                      min="0"
                      value={breakTime}
                      onChange={(e) => setBreakTime(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="rounds">Rounds (0 = ∞)</Label>
                    <Input
                      id="rounds"
                      type="number"
                      min="0"
                      value={rounds}
                      onChange={(e) => setRounds(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="running" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="running-mode">Modo</Label>
                  <Select value={runningMode} onValueChange={(v) => setRunningMode(v as 'simple' | 'interval')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simples</SelectItem>
                      <SelectItem value="interval">Intervalado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {runningMode === 'simple' ? (
                  <div>
                    <Label htmlFor="running-time">Tempo Total (minutos)</Label>
                    <Input
                      id="running-time"
                      type="number"
                      min="0"
                      value={runningTime}
                      onChange={(e) => setRunningTime(Math.max(0, parseInt(e.target.value) || 0))}
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="running-work">Corrida (s)</Label>
                      <Input
                        id="running-work"
                        type="number"
                        min="0"
                        value={runningIntervalWork}
                        onChange={(e) => setRunningIntervalWork(Math.max(0, parseInt(e.target.value) || 0))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="running-rest">Caminhada (s)</Label>
                      <Input
                        id="running-rest"
                        type="number"
                        min="0"
                        value={runningIntervalRest}
                        onChange={(e) => setRunningIntervalRest(Math.max(0, parseInt(e.target.value) || 0))}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="running-sets">Séries (0 = ∞)</Label>
                      <Input
                        id="running-sets"
                        type="number"
                        min="0"
                        value={runningIntervalSets}
                        onChange={(e) => setRunningIntervalSets(Math.max(0, parseInt(e.target.value) || 0))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Opções Globais */}
              {mode !== 'clock' && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="milliseconds" className="flex items-center gap-2">
                      {showMilliseconds ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      Milissegundos
                    </Label>
                    <Switch
                      id="milliseconds"
                      checked={showMilliseconds}
                      onCheckedChange={setShowMilliseconds}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound" className="flex items-center gap-2">
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      Som
                    </Label>
                    <Switch
                      id="sound"
                      checked={soundEnabled}
                      onCheckedChange={setSoundEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="visual" className="flex items-center gap-2">
                      {visualEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      Alerta Visual
                    </Label>
                    <Switch
                      id="visual"
                      checked={visualEnabled}
                      onCheckedChange={setVisualEnabled}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A0A0A]">Presets</h3>

              {presets.length > 0 && (
                <div>
                  <Label htmlFor="preset-select">Carregar Preset</Label>
                  <div className="flex gap-2 mt-1">
                    <Select value={selectedPreset} onValueChange={(v) => {
                      setSelectedPreset(v);
                      loadPreset(v);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um preset" />
                      </SelectTrigger>
                      <SelectContent>
                        {presets.map((preset, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {preset.name} ({preset.mode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPreset && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deletePreset(parseInt(selectedPreset))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="preset-name">Salvar Preset Atual</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="preset-name"
                    placeholder="Nome do preset"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                  />
                  <Button
                    onClick={savePreset}
                    className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>

              {presets.length > 0 && (
                <div className="mt-4 p-4 bg-[#FFF3C4] rounded-xl">
                  <h4 className="font-semibold text-sm text-[#0A0A0A] mb-2">Presets Salvos:</h4>
                  <div className="space-y-2">
                    {presets.map((preset, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-[#4A4A4A]">
                          {preset.name} <span className="text-xs">({preset.mode})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
