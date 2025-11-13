'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Timer, 
  CheckCircle,
  Info,
  Star,
  Target,
  Dumbbell
} from 'lucide-react';
import { Exercise } from '@/lib/types';

interface ExerciseViewerProps {
  exercises: Exercise[];
  onClose: () => void;
}

export default function ExerciseViewer({ exercises, onClose }: ExerciseViewerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [showInstructions, setShowInstructions] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowInstructions(false);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setShowInstructions(false);
    }
  };

  const markAsCompleted = () => {
    const newCompleted = new Set(completedExercises);
    if (completedExercises.has(currentExerciseIndex)) {
      newCompleted.delete(currentExerciseIndex);
    } else {
      newCompleted.add(currentExerciseIndex);
    }
    setCompletedExercises(newCompleted);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-[#1FBF75] text-white';
      case 'Intermediário': return 'bg-[#FF9F1A] text-white';
      case 'Avançado': return 'bg-[#E10600] text-white';
      default: return 'bg-[#0A0A0A] text-[#FFC300]';
    }
  };

  const completedCount = completedExercises.size;
  const progressPercentage = (completedCount / exercises.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border-2 border-[#E6C85C] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header com progresso */}
        <div className="bg-gradient-to-r from-[#FFC300] to-[#FFB800] p-6 border-b-2 border-[#E6C85C]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1">Executando Treino</h2>
              <p className="text-[#4A4A4A] font-medium">
                Exercício {currentExerciseIndex + 1} de {exercises.length}
              </p>
            </div>
            <Button 
              onClick={onClose}
              className="bg-[#E10600] hover:bg-[#C00000] text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300"
            >
              Finalizar
            </Button>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-white/30 rounded-full h-3 mb-2">
            <div 
              className="bg-[#E10600] h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-[#0A0A0A] font-bold text-sm">
            {completedCount} de {exercises.length} exercícios concluídos
          </p>
        </div>

        <div className="flex h-[calc(90vh-180px)]">
          {/* Exercício atual */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Cabeçalho do exercício */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#0A0A0A] mb-3">{currentExercise.name}</h3>
                <p className="text-[#4A4A4A] font-medium text-lg mb-4">{currentExercise.description}</p>
                
                <div className="flex justify-center gap-3 mb-6">
                  {currentExercise.muscleGroup && (
                    <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-4 py-2 rounded-xl text-sm">
                      <Target className="w-4 h-4 mr-2" />
                      {currentExercise.muscleGroup}
                    </Badge>
                  )}
                  {currentExercise.difficulty && (
                    <Badge className={`font-bold px-4 py-2 rounded-xl text-sm ${getDifficultyColor(currentExercise.difficulty)}`}>
                      <Star className="w-4 h-4 mr-2" />
                      {currentExercise.difficulty}
                    </Badge>
                  )}
                  {currentExercise.equipment && (
                    <Badge className="bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-4 py-2 rounded-xl text-sm">
                      <Dumbbell className="w-4 h-4 mr-2" />
                      {currentExercise.equipment}
                    </Badge>
                  )}
                </div>
              </div>

              {/* GIF do exercício */}
              {currentExercise.gifUrl && (
                <div className="flex justify-center">
                  <div className="rounded-2xl overflow-hidden bg-[#FFF3C4] border-4 border-[#E6C85C] shadow-2xl">
                    <img 
                      src={currentExercise.gifUrl} 
                      alt={currentExercise.name}
                      className="w-full max-w-md h-80 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Parâmetros do exercício */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-2xl">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-[#E10600] mb-1">{currentExercise.sets}</div>
                    <div className="text-[#0A0A0A] font-bold text-sm">Séries</div>
                  </CardContent>
                </Card>

                <Card className="bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-2xl">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-[#E10600] mb-1">{currentExercise.reps}</div>
                    <div className="text-[#0A0A0A] font-bold text-sm">Repetições</div>
                  </CardContent>
                </Card>

                {currentExercise.weight && (
                  <Card className="bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-2xl">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-[#E10600] mb-1">{currentExercise.weight}</div>
                      <div className="text-[#0A0A0A] font-bold text-sm">kg</div>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-2xl">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-[#E10600] mb-1">{currentExercise.restTime}</div>
                    <div className="text-[#0A0A0A] font-bold text-sm">segundos</div>
                  </CardContent>
                </Card>
              </div>

              {/* Instruções (se disponíveis) */}
              {currentExercise.instructions && currentExercise.instructions.length > 0 && (
                <div>
                  <Button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="w-full bg-[#FFC300] hover:bg-[#FFB800] text-[#0A0A0A] font-bold py-3 rounded-2xl transition-all duration-300 mb-4"
                  >
                    <Info className="w-5 h-5 mr-2" />
                    {showInstructions ? 'Ocultar' : 'Ver'} Instruções
                  </Button>

                  {showInstructions && (
                    <Card className="bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-2xl">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#0A0A0A] mb-4 text-lg">Como Executar:</h4>
                        <ol className="space-y-3">
                          {currentExercise.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="w-8 h-8 bg-[#FFC300] text-[#0A0A0A] text-sm font-bold rounded-full flex items-center justify-center flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-[#0A0A0A] font-medium">{instruction}</span>
                            </li>
                          ))}
                        </ol>

                        {currentExercise.tips && currentExercise.tips.length > 0 && (
                          <div className="mt-6">
                            <h5 className="font-bold text-[#0A0A0A] mb-3">Dicas Importantes:</h5>
                            <ul className="space-y-2">
                              {currentExercise.tips.map((tip, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="w-2 h-2 bg-[#FFC300] rounded-full flex-shrink-0 mt-2"></span>
                                  <span className="text-[#0A0A0A] font-medium text-sm">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Controles */}
              <div className="flex gap-4 justify-center pt-6">
                <Button
                  onClick={previousExercise}
                  disabled={currentExerciseIndex === 0}
                  className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-6 py-3 rounded-2xl transition-all duration-300 disabled:opacity-50"
                >
                  <SkipBack className="w-5 h-5 mr-2" />
                  Anterior
                </Button>

                <Button
                  onClick={markAsCompleted}
                  className={`font-bold px-8 py-3 rounded-2xl transition-all duration-300 ${
                    completedExercises.has(currentExerciseIndex)
                      ? 'bg-[#1FBF75] hover:bg-green-600 text-white'
                      : 'bg-[#E10600] hover:bg-[#C00000] text-white'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {completedExercises.has(currentExerciseIndex) ? 'Concluído' : 'Marcar como Concluído'}
                </Button>

                <Button
                  onClick={nextExercise}
                  disabled={currentExerciseIndex === exercises.length - 1}
                  className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-6 py-3 rounded-2xl transition-all duration-300 disabled:opacity-50"
                >
                  Próximo
                  <SkipForward className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de exercícios lateral */}
          <div className="w-80 bg-[#FFF3C4] border-l-2 border-[#E6C85C] p-6 overflow-y-auto">
            <h4 className="font-bold text-[#0A0A0A] mb-4 text-lg">Lista de Exercícios</h4>
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <Card 
                  key={exercise.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    index === currentExerciseIndex 
                      ? 'bg-[#E10600] text-white border-2 border-[#E10600]' 
                      : completedExercises.has(index)
                      ? 'bg-[#1FBF75] text-white border-2 border-[#1FBF75]'
                      : 'bg-white border-2 border-[#E6C85C] hover:bg-[#FFF3C4]'
                  } rounded-xl`}
                  onClick={() => {
                    setCurrentExerciseIndex(index);
                    setShowInstructions(false);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 text-sm font-bold rounded-full flex items-center justify-center ${
                        index === currentExerciseIndex 
                          ? 'bg-white text-[#E10600]'
                          : completedExercises.has(index)
                          ? 'bg-white text-[#1FBF75]'
                          : 'bg-[#FFC300] text-[#0A0A0A]'
                      }`}>
                        {completedExercises.has(index) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </span>
                      <div className="flex-1">
                        <div className={`font-bold text-sm ${
                          index === currentExerciseIndex || completedExercises.has(index) 
                            ? 'text-white' 
                            : 'text-[#0A0A0A]'
                        }`}>
                          {exercise.name}
                        </div>
                        <div className={`text-xs ${
                          index === currentExerciseIndex || completedExercises.has(index) 
                            ? 'text-white/80' 
                            : 'text-[#4A4A4A]'
                        }`}>
                          {exercise.sets}x{exercise.reps} • {exercise.restTime}s
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}