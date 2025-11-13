'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Save, 
  Users,
  Clock,
  Repeat,
  Weight,
  Play,
  Library,
  Eye
} from 'lucide-react';
import { Exercise, Workout } from '@/lib/types';
import { ExerciseTemplate } from '@/lib/exercises-database';
import ExerciseSelector from '@/components/ExerciseSelector';
import ExerciseViewer from '@/components/ExerciseViewer';

interface WorkoutBuilderProps {
  userRole: 'trainer' | 'student';
}

interface SortableExerciseProps {
  exercise: Exercise;
  onUpdate: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

function SortableExercise({ exercise, onUpdate, onDelete }: SortableExerciseProps) {
  const [showGif, setShowGif] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-2xl border-2 border-[#E6C85C] p-6 space-y-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div {...attributes} {...listeners} className="cursor-grab hover:cursor-grabbing p-2 rounded-xl hover:bg-[#FFF3C4] transition-colors">
            <GripVertical className="w-5 h-5 text-[#4A4A4A]" />
          </div>
          <Input
            value={exercise.name}
            onChange={(e) => onUpdate({ ...exercise, name: e.target.value })}
            placeholder="Nome do exercício"
            className="font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
          />
        </div>
        <div className="flex items-center gap-2">
          {exercise.gifUrl && (
            <Button
              onClick={() => setShowGif(!showGif)}
              className="bg-[#FFC300] hover:bg-[#FFB800] text-[#0A0A0A] p-2 rounded-xl transition-all duration-300"
              size="sm"
            >
              {showGif ? <Eye className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          )}
          <Button
            onClick={() => onDelete(exercise.id)}
            className="bg-[#E10600] hover:bg-[#C00000] text-white p-2 rounded-xl transition-all duration-300"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* GIF do exercício */}
      {showGif && exercise.gifUrl && (
        <div className="rounded-xl overflow-hidden bg-[#FFF3C4] border-2 border-[#E6C85C]">
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      <Textarea
        value={exercise.description}
        onChange={(e) => onUpdate({ ...exercise, description: e.target.value })}
        placeholder="Descrição do exercício"
        className="text-sm text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] resize-none"
        rows={2}
      />

      {/* Badges de informação */}
      {(exercise.muscleGroup || exercise.equipment || exercise.difficulty) && (
        <div className="flex flex-wrap gap-2">
          {exercise.muscleGroup && (
            <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-3 py-1 rounded-xl">
              {exercise.muscleGroup}
            </Badge>
          )}
          {exercise.difficulty && (
            <Badge className={`font-bold px-3 py-1 rounded-xl ${
              exercise.difficulty === 'Iniciante' ? 'bg-[#1FBF75] text-white' :
              exercise.difficulty === 'Intermediário' ? 'bg-[#FF9F1A] text-white' :
              'bg-[#E10600] text-white'
            }`}>
              {exercise.difficulty}
            </Badge>
          )}
          {exercise.equipment && (
            <Badge className="bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-3 py-1 rounded-xl">
              {exercise.equipment}
            </Badge>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label className="text-xs font-bold text-[#4A4A4A] mb-2 block">Séries</Label>
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4 text-[#FFC300]" />
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) => onUpdate({ ...exercise, sets: parseInt(e.target.value) || 0 })}
              className="text-sm font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
              min="1"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-bold text-[#4A4A4A] mb-2 block">Repetições</Label>
          <Input
            type="number"
            value={exercise.reps}
            onChange={(e) => onUpdate({ ...exercise, reps: parseInt(e.target.value) || 0 })}
            className="text-sm font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
            min="1"
          />
        </div>

        <div>
          <Label className="text-xs font-bold text-[#4A4A4A] mb-2 block">Peso (kg)</Label>
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4 text-[#FFC300]" />
            <Input
              type="number"
              value={exercise.weight || ''}
              onChange={(e) => onUpdate({ ...exercise, weight: parseFloat(e.target.value) || undefined })}
              placeholder="Opcional"
              className="text-sm font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-bold text-[#4A4A4A] mb-2 block">Descanso (s)</Label>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FFC300]" />
            <Input
              type="number"
              value={exercise.restTime}
              onChange={(e) => onUpdate({ ...exercise, restTime: parseInt(e.target.value) || 0 })}
              className="text-sm font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
              min="0"
              step="15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutBuilder({ userRole }: WorkoutBuilderProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [showExerciseViewer, setShowExerciseViewer] = useState(false);
  const [selectedWorkoutForViewing, setSelectedWorkoutForViewing] = useState<Exercise[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Treino de Peito e Tríceps',
      description: 'Foco em desenvolvimento do peitoral e tríceps',
      exercises: [
        {
          id: '1',
          name: 'Supino Reto',
          description: 'Exercício básico para peitoral',
          sets: 4,
          reps: 12,
          weight: 80,
          restTime: 90,
          muscleGroup: 'Peito',
          equipment: 'Barra',
          difficulty: 'Intermediário',
          gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: '2',
          name: 'Tríceps Pulley',
          description: 'Isolamento do tríceps',
          sets: 3,
          reps: 15,
          weight: 30,
          restTime: 60,
          muscleGroup: 'Tríceps',
          equipment: 'Cabo',
          difficulty: 'Iniciante',
          gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ],
      trainerId: 'trainer1',
      studentId: 'student1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      description: '',
      sets: 3,
      reps: 12,
      restTime: 60
    };
    setExercises([...exercises, newExercise]);
  };

  const addExerciseFromTemplate = (template: ExerciseTemplate) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: template.name,
      description: template.description,
      sets: 3,
      reps: 12,
      restTime: 60,
      muscleGroup: template.muscleGroup,
      equipment: template.equipment,
      difficulty: template.difficulty,
      gifUrl: template.gifUrl,
      instructions: template.instructions,
      tips: template.tips
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (updatedExercise: Exercise) => {
    setExercises(exercises.map(ex => 
      ex.id === updatedExercise.id ? updatedExercise : ex
    ));
  };

  const deleteExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setExercises((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) return;
    
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      description: workoutDescription,
      exercises: exercises,
      trainerId: 'trainer1',
      studentId: 'student1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setSavedWorkouts([...savedWorkouts, newWorkout]);
    
    // Reset form
    setWorkoutName('');
    setWorkoutDescription('');
    setExercises([]);
  };

  const startWorkout = (workoutExercises: Exercise[]) => {
    setSelectedWorkoutForViewing(workoutExercises);
    setShowExerciseViewer(true);
  };

  if (userRole === 'student') {
    return (
      <div className="space-y-8">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <Users className="w-6 h-6 text-[#FFC300]" />
              Meus Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {savedWorkouts.map((workout) => (
                <Card key={workout.id} className="bg-white border-l-4 border-l-[#FFC300] border border-[#E6C85C] rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-[#0A0A0A] text-xl mb-2">{workout.name}</h3>
                        <p className="text-[#4A4A4A] text-sm font-medium">{workout.description}</p>
                      </div>
                      <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-4 py-2 rounded-xl">
                        {workout.exercises.length} exercícios
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {workout.exercises.map((exercise, index) => (
                        <div key={exercise.id} className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-[#FFC300] text-[#0A0A0A] text-sm font-bold rounded-full flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-[#0A0A0A]">{exercise.name}</span>
                              {exercise.gifUrl && (
                                <Play className="w-4 h-4 text-[#FFC300]" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-[#4A4A4A] font-bold">
                            <span>{exercise.sets}x{exercise.reps}</span>
                            {exercise.weight && <span>{exercise.weight}kg</span>}
                            <span>{exercise.restTime}s</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button 
                        onClick={() => startWorkout(workout.exercises)}
                        className="flex-1 bg-[#E10600] hover:bg-[#C00000] text-white font-bold py-3 rounded-2xl transition-all duration-300"
                      >
                        Iniciar Treino
                      </Button>
                      <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-6 py-3 rounded-2xl transition-all duration-300">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Workout Builder */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Plus className="w-6 h-6 text-[#FFC300]" />
            Criar Novo Treino
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="workout-name" className="text-sm font-bold text-[#0A0A0A] mb-2 block">Nome do Treino</Label>
              <Input
                id="workout-name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Ex: Treino de Peito e Tríceps"
                className="font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
              />
            </div>
            <div>
              <Label htmlFor="workout-description" className="text-sm font-bold text-[#0A0A0A] mb-2 block">Descrição</Label>
              <Input
                id="workout-description"
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
                placeholder="Breve descrição do treino"
                className="font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0A0A0A]">Exercícios</h3>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowExerciseSelector(true)} 
                  className="bg-[#FFC300] hover:bg-[#FFB800] text-[#0A0A0A] font-bold px-6 py-2 rounded-2xl transition-all duration-300"
                  size="sm"
                >
                  <Library className="w-4 h-4 mr-2" />
                  Biblioteca de Exercícios
                </Button>
                <Button 
                  onClick={addExercise} 
                  className="bg-[#E10600] hover:bg-[#C00000] text-white font-bold px-6 py-2 rounded-2xl transition-all duration-300"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Exercício Personalizado
                </Button>
              </div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={exercises} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {exercises.map((exercise) => (
                    <SortableExercise
                      key={exercise.id}
                      exercise={exercise}
                      onUpdate={updateExercise}
                      onDelete={deleteExercise}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {exercises.length === 0 && (
              <div className="text-center py-12 text-[#4A4A4A] bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                <Library className="w-16 h-16 mx-auto mb-4 text-[#FFC300]" />
                <p className="text-lg font-bold mb-2">Nenhum exercício adicionado ainda.</p>
                <p className="text-sm font-medium mb-4">Escolha exercícios da biblioteca ou crie personalizados.</p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={() => setShowExerciseSelector(true)} 
                    className="bg-[#FFC300] hover:bg-[#FFB800] text-[#0A0A0A] font-bold px-6 py-2 rounded-2xl transition-all duration-300"
                  >
                    <Library className="w-4 h-4 mr-2" />
                    Abrir Biblioteca
                  </Button>
                  <Button 
                    onClick={addExercise} 
                    className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-6 py-2 rounded-2xl transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Personalizado
                  </Button>
                </div>
              </div>
            )}
          </div>

          {exercises.length > 0 && (
            <div className="flex justify-end pt-6 border-t-2 border-[#E6C85C]">
              <Button 
                onClick={saveWorkout}
                disabled={!workoutName.trim()}
                className="bg-[#1FBF75] hover:bg-green-600 text-white font-bold px-8 py-3 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:ring-offset-2"
              >
                <Save className="w-5 h-5 mr-3" />
                Salvar Treino
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Workouts */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Users className="w-6 h-6 text-[#FFC300]" />
            Treinos Criados ({savedWorkouts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {savedWorkouts.map((workout) => (
              <Card key={workout.id} className="bg-white border-l-4 border-l-[#E10600] border border-[#E6C85C] rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-[#0A0A0A] text-xl mb-2">{workout.name}</h3>
                      <p className="text-[#4A4A4A] text-sm font-medium">{workout.description}</p>
                    </div>
                    <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-4 py-2 rounded-xl">
                      {workout.exercises.length} exercícios
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {workout.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={exercise.id} className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-[#E10600] text-white text-sm font-bold rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#0A0A0A]">{exercise.name}</span>
                            {exercise.gifUrl && (
                              <Play className="w-4 h-4 text-[#FFC300]" />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-[#4A4A4A] font-bold">
                          <span>{exercise.sets}x{exercise.reps}</span>
                          {exercise.weight && <span>{exercise.weight}kg</span>}
                        </div>
                      </div>
                    ))}
                    {workout.exercises.length > 3 && (
                      <p className="text-sm text-[#4A4A4A] text-center font-bold py-2">
                        +{workout.exercises.length - 3} exercícios adicionais
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-4 py-2 rounded-xl transition-all duration-300" size="sm">
                      Editar
                    </Button>
                    <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-4 py-2 rounded-xl transition-all duration-300" size="sm">
                      Duplicar
                    </Button>
                    <Button className="bg-[#E10600] hover:bg-[#C00000] text-white font-bold px-4 py-2 rounded-xl transition-all duration-300" size="sm">
                      Atribuir a Aluno
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exercise Selector Modal */}
      {showExerciseSelector && (
        <ExerciseSelector
          onSelectExercise={addExerciseFromTemplate}
          onClose={() => setShowExerciseSelector(false)}
        />
      )}

      {/* Exercise Viewer Modal */}
      {showExerciseViewer && (
        <ExerciseViewer
          exercises={selectedWorkoutForViewing}
          onClose={() => setShowExerciseViewer(false)}
        />
      )}
    </div>
  );
}