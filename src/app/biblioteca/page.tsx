"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Clock, TrendingUp, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  equipment: string;
  description: string;
  instructions: string[];
  sets?: string;
  reps?: string;
  videoUrl?: string;
}

const exerciseDatabase: Exercise[] = [
  {
    id: "1",
    name: "Supino Reto",
    category: "Peito",
    muscleGroup: "Peitoral Maior",
    difficulty: "Intermediário",
    equipment: "Barra e Banco",
    description: "Exercício fundamental para desenvolvimento do peitoral",
    instructions: [
      "Deite-se no banco com os pés firmes no chão",
      "Segure a barra com pegada um pouco mais larga que os ombros",
      "Desça a barra controladamente até o peito",
      "Empurre a barra de volta à posição inicial"
    ],
    sets: "3-4",
    reps: "8-12"
  },
  {
    id: "2",
    name: "Agachamento Livre",
    category: "Pernas",
    muscleGroup: "Quadríceps, Glúteos",
    difficulty: "Avançado",
    equipment: "Barra",
    description: "Exercício composto essencial para membros inferiores",
    instructions: [
      "Posicione a barra nas costas, apoiada nos trapézios",
      "Pés na largura dos ombros",
      "Desça controladamente até as coxas ficarem paralelas ao chão",
      "Suba empurrando pelos calcanhares"
    ],
    sets: "4-5",
    reps: "6-10"
  },
  {
    id: "3",
    name: "Remada Curvada",
    category: "Costas",
    muscleGroup: "Dorsais, Trapézio",
    difficulty: "Intermediário",
    equipment: "Barra",
    description: "Excelente para desenvolvimento das costas",
    instructions: [
      "Incline o tronco para frente mantendo as costas retas",
      "Segure a barra com pegada pronada",
      "Puxe a barra em direção ao abdômen",
      "Controle a descida"
    ],
    sets: "3-4",
    reps: "8-12"
  },
  {
    id: "4",
    name: "Desenvolvimento com Halteres",
    category: "Ombros",
    muscleGroup: "Deltoides",
    difficulty: "Intermediário",
    equipment: "Halteres",
    description: "Desenvolvimento completo dos ombros",
    instructions: [
      "Sente-se com as costas apoiadas",
      "Halteres na altura dos ombros",
      "Empurre os halteres para cima até estender os braços",
      "Desça controladamente"
    ],
    sets: "3-4",
    reps: "10-12"
  },
  {
    id: "5",
    name: "Rosca Direta",
    category: "Bíceps",
    muscleGroup: "Bíceps Braquial",
    difficulty: "Iniciante",
    equipment: "Barra",
    description: "Exercício clássico para bíceps",
    instructions: [
      "Fique em pé com a barra nas mãos",
      "Cotovelos próximos ao corpo",
      "Flexione os cotovelos levantando a barra",
      "Desça controladamente"
    ],
    sets: "3",
    reps: "10-15"
  },
  {
    id: "6",
    name: "Tríceps Testa",
    category: "Tríceps",
    muscleGroup: "Tríceps Braquial",
    difficulty: "Intermediário",
    equipment: "Barra W",
    description: "Isolamento eficaz do tríceps",
    instructions: [
      "Deite-se no banco segurando a barra",
      "Braços estendidos perpendiculares ao corpo",
      "Flexione apenas os cotovelos descendo a barra em direção à testa",
      "Estenda os braços de volta"
    ],
    sets: "3-4",
    reps: "10-12"
  },
  {
    id: "7",
    name: "Leg Press 45°",
    category: "Pernas",
    muscleGroup: "Quadríceps, Glúteos",
    difficulty: "Iniciante",
    equipment: "Leg Press",
    description: "Exercício seguro para iniciantes trabalharem pernas",
    instructions: [
      "Sente-se no aparelho com as costas apoiadas",
      "Pés na plataforma na largura dos ombros",
      "Empurre a plataforma estendendo as pernas",
      "Desça controladamente sem travar os joelhos"
    ],
    sets: "3-4",
    reps: "12-15"
  },
  {
    id: "8",
    name: "Pulldown",
    category: "Costas",
    muscleGroup: "Dorsais",
    difficulty: "Iniciante",
    equipment: "Polia Alta",
    description: "Ótimo para iniciantes desenvolverem as costas",
    instructions: [
      "Sente-se no aparelho e segure a barra",
      "Puxe a barra em direção ao peito",
      "Mantenha o peito estufado",
      "Controle a subida da barra"
    ],
    sets: "3",
    reps: "10-12"
  },
  {
    id: "9",
    name: "Elevação Lateral",
    category: "Ombros",
    muscleGroup: "Deltoides Lateral",
    difficulty: "Iniciante",
    equipment: "Halteres",
    description: "Isolamento do deltoide lateral",
    instructions: [
      "Fique em pé com halteres nas mãos",
      "Braços ao lado do corpo",
      "Eleve os braços lateralmente até a altura dos ombros",
      "Desça controladamente"
    ],
    sets: "3-4",
    reps: "12-15"
  },
  {
    id: "10",
    name: "Abdominal Crunch",
    category: "Abdômen",
    muscleGroup: "Reto Abdominal",
    difficulty: "Iniciante",
    equipment: "Peso Corporal",
    description: "Exercício básico para abdômen",
    instructions: [
      "Deite-se de costas com joelhos flexionados",
      "Mãos atrás da cabeça",
      "Contraia o abdômen elevando o tronco",
      "Desça controladamente"
    ],
    sets: "3",
    reps: "15-20"
  },
  {
    id: "11",
    name: "Stiff",
    category: "Pernas",
    muscleGroup: "Posteriores de Coxa",
    difficulty: "Intermediário",
    equipment: "Barra ou Halteres",
    description: "Excelente para posteriores de coxa e glúteos",
    instructions: [
      "Fique em pé segurando a barra",
      "Pernas levemente flexionadas",
      "Incline o tronco para frente mantendo as costas retas",
      "Volte à posição inicial contraindo glúteos"
    ],
    sets: "3-4",
    reps: "10-12"
  },
  {
    id: "12",
    name: "Crucifixo Inclinado",
    category: "Peito",
    muscleGroup: "Peitoral Superior",
    difficulty: "Intermediário",
    equipment: "Halteres e Banco Inclinado",
    description: "Isolamento do peitoral superior",
    instructions: [
      "Deite-se no banco inclinado com halteres",
      "Braços estendidos acima do peito",
      "Abra os braços em arco até sentir alongamento",
      "Volte à posição inicial"
    ],
    sets: "3",
    reps: "10-12"
  }
];

export default function BibliotecaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const categories = ["all", ...Array.from(new Set(exerciseDatabase.map(ex => ex.category)))];
  const difficulties = ["all", "Iniciante", "Intermediário", "Avançado"];

  const filteredExercises = exerciseDatabase.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Iniciante": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediário": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Avançado": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Biblioteca de Exercícios</h1>
              <p className="text-gray-400 mt-1">Explore nossa coleção completa de exercícios</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total de Exercícios</p>
                  <p className="text-3xl font-bold text-white mt-1">{exerciseDatabase.length}</p>
                </div>
                <Dumbbell className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categorias</p>
                  <p className="text-3xl font-bold text-white mt-1">{categories.length - 1}</p>
                </div>
                <Filter className="w-12 h-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Resultados</p>
                  <p className="text-3xl font-bold text-white mt-1">{filteredExercises.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar exercício ou músculo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat === "all" ? "Todas as Categorias" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff} className="text-white">
                      {diff === "all" ? "Todas as Dificuldades" : diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Card 
              key={exercise.id}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedExercise(exercise)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getDifficultyColor(exercise.difficulty)} border`}>
                    {exercise.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-gray-700 text-gray-300">
                    {exercise.category}
                  </Badge>
                </div>
                <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                  {exercise.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {exercise.muscleGroup}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{exercise.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{exercise.sets} séries</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{exercise.reps} reps</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">Equipamento: {exercise.equipment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhum exercício encontrado</h3>
              <p className="text-gray-400">Tente ajustar os filtros ou buscar por outro termo</p>
            </CardContent>
          </Card>
        )}

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExercise(null)}
          >
            <Card 
              className="bg-gray-900 border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <Badge className={`${getDifficultyColor(selectedExercise.difficulty)} border`}>
                      {selectedExercise.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-gray-700 text-gray-300">
                      {selectedExercise.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedExercise(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
                <CardTitle className="text-2xl text-white">{selectedExercise.name}</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  {selectedExercise.muscleGroup}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Descrição</h4>
                  <p className="text-gray-300">{selectedExercise.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Séries</p>
                    <p className="text-white text-xl font-bold">{selectedExercise.sets}</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Repetições</p>
                    <p className="text-white text-xl font-bold">{selectedExercise.reps}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Instruções</h4>
                  <ol className="space-y-2">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3 text-gray-300">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Equipamento Necessário</p>
                  <p className="text-white font-semibold">{selectedExercise.equipment}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
