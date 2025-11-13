'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Plus, 
  Play, 
  Info,
  Star,
  Clock,
  Target,
  Dumbbell
} from 'lucide-react';
import { 
  EXERCISES_DATABASE, 
  MUSCLE_GROUPS, 
  EQUIPMENT_TYPES, 
  ExerciseTemplate,
  getExercisesByMuscleGroup,
  searchExercises 
} from '@/lib/exercises-database';

interface ExerciseSelectorProps {
  onSelectExercise: (exercise: ExerciseTemplate) => void;
  onClose: () => void;
}

export default function ExerciseSelector({ onSelectExercise, onClose }: ExerciseSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | null>(null);

  // Filtrar exercícios baseado nos critérios selecionados
  const filteredExercises = EXERCISES_DATABASE.filter(exercise => {
    const matchesSearch = !searchQuery || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMuscleGroup = !selectedMuscleGroup || exercise.muscleGroup === selectedMuscleGroup;
    const matchesEquipment = !selectedEquipment || exercise.equipment === selectedEquipment;
    const matchesDifficulty = !selectedDifficulty || exercise.difficulty === selectedDifficulty;

    return matchesSearch && matchesMuscleGroup && matchesEquipment && matchesDifficulty;
  });

  const handleAddExercise = (exercise: ExerciseTemplate) => {
    onSelectExercise(exercise);
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-[#1FBF75] text-white';
      case 'Intermediário': return 'bg-[#FF9F1A] text-white';
      case 'Avançado': return 'bg-[#E10600] text-white';
      default: return 'bg-[#0A0A0A] text-[#FFC300]';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border-2 border-[#E6C85C] shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFC300] to-[#FFB800] p-6 border-b-2 border-[#E6C85C]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2">Biblioteca de Exercícios</h2>
              <p className="text-[#4A4A4A] font-medium">Escolha exercícios com demonstrações visuais para seu treino</p>
            </div>
            <Button 
              onClick={onClose}
              className="bg-[#E10600] hover:bg-[#C00000] text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300"
            >
              Fechar
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar com filtros */}
          <div className="w-80 bg-[#FFF3C4] border-r-2 border-[#E6C85C] p-6 overflow-y-auto">
            {/* Busca */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar exercícios..."
                  className="pl-10 font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] rounded-xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300]"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="space-y-6">
              {/* Grupo Muscular */}
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#FFC300]" />
                  Grupo Muscular
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => setSelectedMuscleGroup('')}
                    className={`w-full justify-start font-bold rounded-xl transition-all duration-300 ${
                      !selectedMuscleGroup 
                        ? 'bg-[#E10600] text-white' 
                        : 'bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A]'
                    }`}
                    size="sm"
                  >
                    Todos
                  </Button>
                  {MUSCLE_GROUPS.map((group) => (
                    <Button
                      key={group}
                      onClick={() => setSelectedMuscleGroup(group)}
                      className={`w-full justify-start font-bold rounded-xl transition-all duration-300 ${
                        selectedMuscleGroup === group 
                          ? 'bg-[#E10600] text-white' 
                          : 'bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A]'
                      }`}
                      size="sm"
                    >
                      {group}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Equipamento */}
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-[#FFC300]" />
                  Equipamento
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => setSelectedEquipment('')}
                    className={`w-full justify-start font-bold rounded-xl transition-all duration-300 ${
                      !selectedEquipment 
                        ? 'bg-[#E10600] text-white' 
                        : 'bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A]'
                    }`}
                    size="sm"
                  >
                    Todos
                  </Button>
                  {EQUIPMENT_TYPES.map((equipment) => (
                    <Button
                      key={equipment}
                      onClick={() => setSelectedEquipment(equipment)}
                      className={`w-full justify-start font-bold rounded-xl transition-all duration-300 ${
                        selectedEquipment === equipment 
                          ? 'bg-[#E10600] text-white' 
                          : 'bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A]'
                      }`}
                      size="sm"
                    >
                      {equipment}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Dificuldade */}
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#FFC300]" />
                  Dificuldade
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => setSelectedDifficulty('')}
                    className={`w-full justify-start font-bold rounded-xl transition-all duration-300 ${
                      !selectedDifficulty 
                        ? 'bg-[#E10600] text-white' 
                        : 'bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A]'
                    }`}
                    size="sm"
                  >
                    Todas
                  </Button>
                  {['Iniciante', 'Intermediário', 'Avançado'].map((difficulty) => (
                    <Button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`w-full justify-start font-bold rounded-xl transition-all duration-300 ${
                        selectedDifficulty === difficulty 
                          ? 'bg-[#E10600] text-white' 
                          : 'bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A]'
                      }`}
                      size="sm"
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de exercícios */}
          <div className="flex-1 flex">
            {/* Grid de exercícios */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-[#0A0A0A] text-lg">
                  {filteredExercises.length} exercícios encontrados
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise) => (
                  <Card 
                    key={exercise.id} 
                    className={`bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                      selectedExercise?.id === exercise.id ? 'ring-4 ring-[#FFC300]' : ''
                    }`}
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <CardContent className="p-4">
                      {/* GIF do exercício */}
                      <div className="relative mb-4 rounded-xl overflow-hidden bg-[#FFF3C4] aspect-video">
                        <img 
                          src={exercise.gifUrl} 
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Info do exercício */}
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-[#0A0A0A] text-lg mb-1">{exercise.name}</h4>
                          <p className="text-[#4A4A4A] text-sm font-medium line-clamp-2">{exercise.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-3 py-1 rounded-xl">
                            {exercise.muscleGroup}
                          </Badge>
                          <Badge className={`font-bold px-3 py-1 rounded-xl ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </Badge>
                        </div>

                        <div className="text-xs text-[#4A4A4A] font-bold">
                          {exercise.equipment}
                        </div>

                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddExercise(exercise);
                          }}
                          className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-bold py-2 rounded-xl transition-all duration-300"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar ao Treino
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredExercises.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-[#4A4A4A] mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-bold mb-2">Nenhum exercício encontrado</p>
                    <p className="text-sm font-medium">Tente ajustar os filtros ou termo de busca</p>
                  </div>
                </div>
              )}
            </div>

            {/* Painel de detalhes do exercício selecionado */}
            {selectedExercise && (
              <div className="w-96 bg-[#FFF3C4] border-l-2 border-[#E6C85C] p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] text-xl mb-2">{selectedExercise.name}</h3>
                    <p className="text-[#4A4A4A] font-medium mb-4">{selectedExercise.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-3 py-1 rounded-xl">
                        {selectedExercise.muscleGroup}
                      </Badge>
                      <Badge className={`font-bold px-3 py-1 rounded-xl ${getDifficultyColor(selectedExercise.difficulty)}`}>
                        {selectedExercise.difficulty}
                      </Badge>
                      <Badge className="bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold px-3 py-1 rounded-xl">
                        {selectedExercise.equipment}
                      </Badge>
                    </div>
                  </div>

                  {/* GIF grande */}
                  <div className="rounded-xl overflow-hidden bg-white border-2 border-[#E6C85C]">
                    <img 
                      src={selectedExercise.gifUrl} 
                      alt={selectedExercise.name}
                      className="w-full aspect-video object-cover"
                    />
                  </div>

                  {/* Instruções */}
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#FFC300]" />
                      Como Executar
                    </h4>
                    <ol className="space-y-2">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-6 h-6 bg-[#FFC300] text-[#0A0A0A] text-sm font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-[#0A0A0A] font-medium text-sm">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Dicas */}
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#FFC300]" />
                      Dicas Importantes
                    </h4>
                    <ul className="space-y-2">
                      {selectedExercise.tips.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-2 h-2 bg-[#FFC300] rounded-full flex-shrink-0 mt-2"></span>
                          <span className="text-[#0A0A0A] font-medium text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Variações */}
                  {selectedExercise.variations && selectedExercise.variations.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-3">Variações</h4>
                      <div className="space-y-2">
                        {selectedExercise.variations.map((variation, index) => (
                          <div key={index} className="bg-white p-3 rounded-xl border border-[#E6C85C]">
                            <span className="text-[#0A0A0A] font-medium text-sm">{variation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botão de adicionar */}
                  <Button 
                    onClick={() => handleAddExercise(selectedExercise)}
                    className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-bold py-3 rounded-2xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Adicionar ao Treino
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}