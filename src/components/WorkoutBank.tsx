'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus,
  Save,
  Copy,
  Edit,
  Trash2,
  Users,
  Calendar,
  Target,
  Dumbbell,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  BookOpen,
  Zap,
  Activity,
  User,
  Settings
} from 'lucide-react';

const objectives = [
  { value: 'hypertrophy', label: 'Hipertrofia' },
  { value: 'weight_loss', label: 'Emagrecimento' },
  { value: 'strength', label: 'Força' },
  { value: 'performance', label: 'Performance' },
  { value: 'health', label: 'Saúde' },
];

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  restTime: string;
  intensificationMethod?: string;
  notes?: string;
  muscleGroup: string;
  equipment: string;
}

interface Workout {
  id: string;
  name: string;
  objective: string;
  type: 'individual' | 'template';
  exercises: Exercise[];
  assignedStudents?: string[];
  createdAt: Date;
  updatedAt: Date;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  notes?: string;
}

interface PeriodizationCycle {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weeks: PeriodizationWeek[];
  students: string[];
  objective: string;
  notes?: string;
}

interface PeriodizationWeek {
  weekNumber: number;
  workoutId: string;
  volume: number;
  intensity: number;
  focus: string;
  notes?: string;
}

interface WorkoutHistory {
  id: string;
  studentId: string;
  workoutId: string;
  cycleId?: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'paused';
  progress: number;
}

interface WorkoutBankProps {
  userRole: 'trainer' | 'student';
}

export default function WorkoutBank({ userRole }: WorkoutBankProps) {
  const [activeTab, setActiveTab] = useState('workouts');
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Treino A - Hipertrofia',
      objective: 'hipertrofia',
      type: 'template',
      exercises: [
        {
          id: '1',
          name: 'Supino Reto',
          sets: 4,
          reps: '8-12',
          weight: '80kg',
          restTime: '90s',
          intensificationMethod: 'Drop Set',
          muscleGroup: 'Peito',
          equipment: 'Barra'
        },
        {
          id: '2',
          name: 'Agachamento',
          sets: 4,
          reps: '10-15',
          weight: '100kg',
          restTime: '120s',
          muscleGroup: 'Pernas',
          equipment: 'Barra'
        }
      ],
      assignedStudents: ['João', 'Maria', 'Carlos'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      duration: 60,
      difficulty: 'intermediate',
      tags: ['hipertrofia', 'força', 'peito', 'pernas']
    },
    {
      id: '2',
      name: 'Full Body Iniciante',
      objective: 'condicionamento',
      type: 'template',
      exercises: [
        {
          id: '3',
          name: 'Flexão de Braços',
          sets: 3,
          reps: '8-15',
          weight: 'Peso corporal',
          restTime: '60s',
          muscleGroup: 'Peito',
          equipment: 'Peso corporal'
        },
        {
          id: '4',
          name: 'Agachamento Livre',
          sets: 3,
          reps: '12-20',
          weight: 'Peso corporal',
          restTime: '60s',
          muscleGroup: 'Pernas',
          equipment: 'Peso corporal'
        }
      ],
      assignedStudents: ['Ana', 'Pedro'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      duration: 45,
      difficulty: 'beginner',
      tags: ['iniciante', 'funcional', 'corpo todo']
    }
  ]);

  const [cycles, setCycles] = useState<PeriodizationCycle[]>([
    {
      id: '1',
      name: 'Mesociclo 1 - Base',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-28'),
      weeks: [
        { weekNumber: 1, workoutId: '1', volume: 70, intensity: 60, focus: 'Adaptação' },
        { weekNumber: 2, workoutId: '1', volume: 80, intensity: 70, focus: 'Volume' },
        { weekNumber: 3, workoutId: '1', volume: 90, intensity: 80, focus: 'Intensidade' },
        { weekNumber: 4, workoutId: '2', volume: 60, intensity: 50, focus: 'Recuperação' }
      ],
      students: ['João', 'Maria'],
      objective: 'Construção de base muscular',
      notes: 'Foco em técnica e adaptação'
    }
  ]);

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([
    {
      id: '1',
      studentId: 'João',
      workoutId: '1',
      cycleId: '1',
      startDate: new Date('2024-02-01'),
      status: 'active',
      progress: 75
    }
  ]);

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterObjective, setFilterObjective] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Biblioteca de exercícios simulada
  const exerciseLibrary = [
    { id: '1', name: 'Supino Reto', muscleGroup: 'Peito', equipment: 'Barra' },
    { id: '2', name: 'Supino Inclinado', muscleGroup: 'Peito', equipment: 'Barra' },
    { id: '3', name: 'Agachamento', muscleGroup: 'Pernas', equipment: 'Barra' },
    { id: '4', name: 'Leg Press', muscleGroup: 'Pernas', equipment: 'Máquina' },
    { id: '5', name: 'Puxada Frontal', muscleGroup: 'Costas', equipment: 'Cabo' },
    { id: '6', name: 'Remada Curvada', muscleGroup: 'Costas', equipment: 'Barra' },
    { id: '7', name: 'Desenvolvimento', muscleGroup: 'Ombros', equipment: 'Halteres' },
    { id: '8', name: 'Rosca Bíceps', muscleGroup: 'Bíceps', equipment: 'Halteres' },
    { id: '9', name: 'Tríceps Pulley', muscleGroup: 'Tríceps', equipment: 'Cabo' },
    { id: '10', name: 'Prancha', muscleGroup: 'Core', equipment: 'Peso corporal' }
  ];

  const students = ['João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa', 'Pedro Ferreira'];

  const objectives = [
    { value: 'hipertrofia', label: 'Hipertrofia' },
    { value: 'forca', label: 'Força' },
    { value: 'emagrecimento', label: 'Emagrecimento' },
    { value: 'condicionamento', label: 'Condicionamento' },
    { value: 'reabilitacao', label: 'Reabilitação' },
    { value: 'performance', label: 'Performance Esportiva' }
  ];

  const intensificationMethods = [
    'Drop Set',
    'Rest-Pause',
    'Superset',
    'Triset',
    'Giant Set',
    'Cluster Set',
    'Tempo Controlado',
    'Isométrico',
    '21s',
    'Pirâmide'
  ];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesObjective = filterObjective === 'all' || workout.objective === filterObjective;
    const matchesType = filterType === 'all' || workout.type === filterType;
    
    return matchesSearch && matchesObjective && matchesType;
  });

  const createNewWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: 'Novo Treino',
      objective: 'hipertrofia',
      type: 'template',
      exercises: [],
      assignedStudents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      difficulty: 'beginner',
      tags: []
    };
    setSelectedWorkout(newWorkout);
    setIsCreating(true);
  };

  const saveWorkout = (workout: Workout) => {
    if (isCreating) {
      setWorkouts([...workouts, workout]);
      setIsCreating(false);
    } else {
      setWorkouts(workouts.map(w => w.id === workout.id ? { ...workout, updatedAt: new Date() } : w));
    }
    setSelectedWorkout(null);
  };

  const duplicateWorkout = (workout: Workout) => {
    const duplicated: Workout = {
      ...workout,
      id: Date.now().toString(),
      name: `${workout.name} (Cópia)`,
      assignedStudents: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setWorkouts([...workouts, duplicated]);
  };

  const deleteWorkout = (workoutId: string) => {
    setWorkouts(workouts.filter(w => w.id !== workoutId));
    if (selectedWorkout?.id === workoutId) {
      setSelectedWorkout(null);
    }
  };

  const assignWorkoutToStudents = (workoutId: string, studentIds: string[]) => {
    setWorkouts(workouts.map(w => 
      w.id === workoutId 
        ? { ...w, assignedStudents: studentIds, updatedAt: new Date() }
        : w
    ));
  };

  const updateTemplateForAllStudents = (workoutId: string, updatedWorkout: Workout) => {
    // Simula atualização do template para todos os alunos vinculados
    setWorkouts(workouts.map(w => w.id === workoutId ? updatedWorkout : w));
    
    // Aqui você adicionaria lógica para notificar alunos sobre a atualização
    alert(`Template "${updatedWorkout.name}" atualizado para ${updatedWorkout.assignedStudents?.length || 0} aluno(s)`);
  };

  if (selectedWorkout) {
    return <WorkoutEditor 
      workout={selectedWorkout}
      isCreating={isCreating}
      exerciseLibrary={exerciseLibrary}
      students={students}
      objectives={objectives}
      intensificationMethods={intensificationMethods}
      onSave={saveWorkout}
      onCancel={() => {
        setSelectedWorkout(null);
        setIsCreating(false);
      }}
    />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Banco de Treinos</h1>
          <p className="text-white/80">Gerencie treinos, templates e periodização</p>
        </div>
        {userRole === 'trainer' && (
          <Button
            onClick={createNewWorkout}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] font-semibold rounded-2xl px-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Treino
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
          <TabsTrigger 
            value="workouts" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Dumbbell className="w-4 h-4" />
            Treinos
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <BookOpen className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="periodization" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Calendar className="w-4 h-4" />
            Periodização
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Clock className="w-4 h-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* Treinos */}
        <TabsContent value="workouts" className="space-y-6">
          {/* Filtros e Busca */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
                  <Input
                    placeholder="Buscar treinos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-[#E6C85C] rounded-xl"
                  />
                </div>
                <select
                  value={filterObjective}
                  onChange={(e) => setFilterObjective(e.target.value)}
                  className="px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white"
                >
                  <option value="all">Todos os objetivos</option>
                  {objectives.map(obj => (
                    <option key={obj.value} value={obj.value}>{obj.label}</option>
                  ))}
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="template">Templates</option>
                  <option value="individual">Individuais</option>
                </select>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#4A4A4A]" />
                  <span className="text-sm text-[#4A4A4A]">
                    {filteredWorkouts.length} treino(s)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Treinos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                userRole={userRole}
                onEdit={() => setSelectedWorkout(workout)}
                onDuplicate={() => duplicateWorkout(workout)}
                onDelete={() => deleteWorkout(workout.id)}
                onAssignStudents={(studentIds) => assignWorkoutToStudents(workout.id, studentIds)}
                students={students}
              />
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-12 text-center">
                <Dumbbell className="w-16 h-16 text-[#4A4A4A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                  Nenhum treino encontrado
                </h3>
                <p className="text-[#4A4A4A] mb-6">
                  {searchTerm || filterObjective !== 'all' || filterType !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Crie seu primeiro treino para começar'
                  }
                </p>
                {userRole === 'trainer' && (
                  <Button
                    onClick={createNewWorkout}
                    className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold rounded-2xl px-6"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Criar Primeiro Treino
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <TemplateManager
            workouts={workouts.filter(w => w.type === 'template')}
            students={students}
            onUpdateTemplate={updateTemplateForAllStudents}
            onAssignToMultiple={assignWorkoutToStudents}
          />
        </TabsContent>

        {/* Periodização */}
        <TabsContent value="periodization" className="space-y-6">
          <PeriodizationManager
            cycles={cycles}
            workouts={workouts}
            students={students}
            onUpdateCycles={setCycles}
          />
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="history" className="space-y-6">
          <WorkoutHistoryView
            history={workoutHistory}
            workouts={workouts}
            cycles={cycles}
            students={students}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente do Card de Treino
function WorkoutCard({ 
  workout, 
  userRole, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onAssignStudents,
  students 
}: {
  workout: Workout;
  userRole: 'trainer' | 'student';
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onAssignStudents: (studentIds: string[]) => void;
  students: string[];
}) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>(workout.assignedStudents || []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-[#1FBF75] text-white';
      case 'intermediate': return 'bg-[#FFC300] text-[#0A0A0A]';
      case 'advanced': return 'bg-[#E10600] text-white';
      default: return 'bg-[#4A4A4A] text-white';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return 'Não definido';
    }
  };

  return (
    <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-[#0A0A0A] mb-2">
              {workout.name}
            </CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={getDifficultyColor(workout.difficulty)}>
                {getDifficultyLabel(workout.difficulty)}
              </Badge>
              <Badge className="bg-[#FFF3C4] text-[#0A0A0A] border border-[#E6C85C]">
                {workout.type === 'template' ? 'Template' : 'Individual'}
              </Badge>
            </div>
          </div>
          {userRole === 'trainer' && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#FFC300]" />
            <span className="text-[#4A4A4A] capitalize">
              {objectives.find(obj => obj.value === workout.objective)?.label || workout.objective}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FFC300]" />
            <span className="text-[#4A4A4A]">
              {workout.exercises.length} exercícios
            </span>
          </div>
          {workout.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFC300]" />
              <span className="text-[#4A4A4A]">{workout.duration} min</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#FFC300]" />
            <span className="text-[#4A4A4A]">
              {workout.assignedStudents?.length || 0} aluno(s)
            </span>
          </div>
        </div>

        {workout.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {workout.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index}
                className="bg-[#0A0A0A] text-[#FFC300] text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {workout.tags.length > 3 && (
              <Badge className="bg-[#4A4A4A] text-white text-xs px-2 py-1">
                +{workout.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {userRole === 'trainer' && (
          <div className="flex gap-2 pt-2 border-t border-[#E6C85C]">
            <Button
              onClick={onEdit}
              size="sm"
              className="flex-1 bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
            >
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              onClick={onDuplicate}
              size="sm"
              variant="outline"
              className="border-[#E6C85C] text-[#0A0A0A] hover:bg-[#FFF3C4] rounded-xl"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setShowAssignModal(true)}
              size="sm"
              variant="outline"
              className="border-[#E6C85C] text-[#0A0A0A] hover:bg-[#FFF3C4] rounded-xl"
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>
        )}

        {userRole === 'student' && (
          <Button
            className="w-full bg-[#1FBF75] hover:bg-[#1AA366] text-white font-medium rounded-xl"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Iniciar Treino
          </Button>
        )}
      </CardContent>

      {/* Modal de Atribuição */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#0A0A0A]">
                Atribuir Treino aos Alunos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-2">
                {students.map((student) => (
                  <label key={student} className="flex items-center gap-3 p-2 hover:bg-[#FFF3C4] rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, student]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(s => s !== student));
                        }
                      }}
                      className="w-4 h-4 text-[#FFC300] rounded"
                    />
                    <span className="text-[#0A0A0A]">{student}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t border-[#E6C85C]">
                <Button
                  onClick={() => {
                    onAssignStudents(selectedStudents);
                    setShowAssignModal(false);
                  }}
                  className="flex-1 bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => setShowAssignModal(false)}
                  variant="outline"
                  className="border-[#E6C85C] text-[#0A0A0A] hover:bg-[#FFF3C4] rounded-xl"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}

// Componente Editor de Treino
function WorkoutEditor({
  workout,
  isCreating,
  exerciseLibrary,
  students,
  objectives,
  intensificationMethods,
  onSave,
  onCancel
}: {
  workout: Workout;
  isCreating: boolean;
  exerciseLibrary: any[];
  students: string[];
  objectives: any[];
  intensificationMethods: string[];
  onSave: (workout: Workout) => void;
  onCancel: () => void;
}) {
  const [editedWorkout, setEditedWorkout] = useState<Workout>(workout);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const addExercise = (exercise: any) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exercise.name,
      sets: 3,
      reps: '8-12',
      weight: '',
      restTime: '90s',
      muscleGroup: exercise.muscleGroup,
      equipment: exercise.equipment
    };
    
    setEditedWorkout({
      ...editedWorkout,
      exercises: [...editedWorkout.exercises, newExercise]
    });
    setShowExerciseLibrary(false);
  };

  const updateExercise = (exerciseId: string, updates: Partial<Exercise>) => {
    setEditedWorkout({
      ...editedWorkout,
      exercises: editedWorkout.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      )
    });
  };

  const removeExercise = (exerciseId: string) => {
    setEditedWorkout({
      ...editedWorkout,
      exercises: editedWorkout.exercises.filter(ex => ex.id !== exerciseId)
    });
  };

  const handleSave = () => {
    if (!editedWorkout.name.trim()) {
      alert('Nome do treino é obrigatório');
      return;
    }
    
    if (editedWorkout.exercises.length === 0) {
      alert('Adicione pelo menos um exercício');
      return;
    }

    onSave(editedWorkout);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isCreating ? 'Criar Novo Treino' : 'Editar Treino'}
          </h1>
          <p className="text-white/80">Configure os detalhes e exercícios do treino</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#0A0A0A] rounded-2xl px-6"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] font-semibold rounded-2xl px-6"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar Treino
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <Card className="lg:col-span-1 bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#FFC300]" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#0A0A0A] font-medium">Nome do Treino</Label>
              <Input
                id="name"
                value={editedWorkout.name}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, name: e.target.value })}
                placeholder="Ex: Treino A - Hipertrofia"
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
              />
            </div>

            <div>
              <Label htmlFor="objective" className="text-[#0A0A0A] font-medium">Objetivo</Label>
              <select
                id="objective"
                value={editedWorkout.objective}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, objective: e.target.value })}
                className="w-full px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white mt-1"
              >
                {objectives.map(obj => (
                  <option key={obj.value} value={obj.value}>{obj.label}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="type" className="text-[#0A0A0A] font-medium">Tipo</Label>
              <select
                id="type"
                value={editedWorkout.type}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, type: e.target.value as 'individual' | 'template' })}
                className="w-full px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white mt-1"
              >
                <option value="template">Template (Reutilizável)</option>
                <option value="individual">Individual</option>
              </select>
            </div>

            <div>
              <Label htmlFor="difficulty" className="text-[#0A0A0A] font-medium">Dificuldade</Label>
              <select
                id="difficulty"
                value={editedWorkout.difficulty}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                className="w-full px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white mt-1"
              >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>

            <div>
              <Label htmlFor="duration" className="text-[#0A0A0A] font-medium">Duração (minutos)</Label>
              <Input
                id="duration"
                type="number"
                value={editedWorkout.duration || ''}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, duration: parseInt(e.target.value) || undefined })}
                placeholder="60"
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-[#0A0A0A] font-medium">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={editedWorkout.tags.join(', ')}
                onChange={(e) => setEditedWorkout({ 
                  ...editedWorkout, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                })}
                placeholder="hipertrofia, peito, força"
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-[#0A0A0A] font-medium">Observações</Label>
              <Textarea
                id="notes"
                value={editedWorkout.notes || ''}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, notes: e.target.value })}
                placeholder="Observações sobre o treino..."
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Exercícios */}
        <Card className="lg:col-span-2 bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-[#FFC300]" />
                Exercícios ({editedWorkout.exercises.length})
              </CardTitle>
              <Button
                onClick={() => setShowExerciseLibrary(true)}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Exercício
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editedWorkout.exercises.length === 0 ? (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-[#4A4A4A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                  Nenhum exercício adicionado
                </h3>
                <p className="text-[#4A4A4A] mb-4">
                  Adicione exercícios da biblioteca para criar seu treino
                </p>
                <Button
                  onClick={() => setShowExerciseLibrary(true)}
                  className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Exercício
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {editedWorkout.exercises.map((exercise, index) => (
                  <ExerciseEditor
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    intensificationMethods={intensificationMethods}
                    onUpdate={(updates) => updateExercise(exercise.id, updates)}
                    onRemove={() => removeExercise(exercise.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal da Biblioteca de Exercícios */}
      {showExerciseLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[80vh] bg-white rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-[#E6C85C]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0A0A0A]">
                  Biblioteca de Exercícios
                </CardTitle>
                <Button
                  onClick={() => setShowExerciseLibrary(false)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exerciseLibrary.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className="border border-[#E6C85C] hover:border-[#FFC300] cursor-pointer transition-colors rounded-xl"
                    onClick={() => addExercise(exercise)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-[#0A0A0A] mb-2">
                        {exercise.name}
                      </h4>
                      <div className="space-y-1 text-sm text-[#4A4A4A]">
                        <p><strong>Grupo:</strong> {exercise.muscleGroup}</p>
                        <p><strong>Equipamento:</strong> {exercise.equipment}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Componente Editor de Exercício
function ExerciseEditor({
  exercise,
  index,
  intensificationMethods,
  onUpdate,
  onRemove
}: {
  exercise: Exercise;
  index: number;
  intensificationMethods: string[];
  onUpdate: (updates: Partial<Exercise>) => void;
  onRemove: () => void;
}) {
  return (
    <Card className="border border-[#E6C85C] rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300] rounded-full flex items-center justify-center text-[#0A0A0A] font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <h4 className="font-semibold text-[#0A0A0A]">{exercise.name}</h4>
              <p className="text-sm text-[#4A4A4A]">
                {exercise.muscleGroup} • {exercise.equipment}
              </p>
            </div>
          </div>
          <Button
            onClick={onRemove}
            variant="ghost"
            size="sm"
            className="text-[#E10600] hover:bg-[#E10600]/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-xs text-[#4A4A4A]">Séries</Label>
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) => onUpdate({ sets: parseInt(e.target.value) || 0 })}
              className="border border-[#E6C85C] rounded-lg text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-[#4A4A4A]">Repetições</Label>
            <Input
              value={exercise.reps}
              onChange={(e) => onUpdate({ reps: e.target.value })}
              placeholder="8-12"
              className="border border-[#E6C85C] rounded-lg text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-[#4A4A4A]">Carga</Label>
            <Input
              value={exercise.weight}
              onChange={(e) => onUpdate({ weight: e.target.value })}
              placeholder="80kg"
              className="border border-[#E6C85C] rounded-lg text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-[#4A4A4A]">Descanso</Label>
            <Input
              value={exercise.restTime}
              onChange={(e) => onUpdate({ restTime: e.target.value })}
              placeholder="90s"
              className="border border-[#E6C85C] rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label className="text-xs text-[#4A4A4A]">Método de Intensificação</Label>
            <select
              value={exercise.intensificationMethod || ''}
              onChange={(e) => onUpdate({ intensificationMethod: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-[#E6C85C] rounded-lg bg-white text-sm"
            >
              <option value="">Nenhum</option>
              {intensificationMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-[#4A4A4A]">Observações</Label>
            <Input
              value={exercise.notes || ''}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              placeholder="Observações específicas..."
              className="border border-[#E6C85C] rounded-lg text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente Gerenciador de Templates
function TemplateManager({
  workouts,
  students,
  onUpdateTemplate,
  onAssignToMultiple
}: {
  workouts: Workout[];
  students: string[];
  onUpdateTemplate: (workoutId: string, updatedWorkout: Workout) => void;
  onAssignToMultiple: (workoutId: string, studentIds: string[]) => void;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showMassAssign, setShowMassAssign] = useState(false);

  const handleMassAssign = () => {
    if (!selectedTemplate || selectedStudents.length === 0) {
      alert('Selecione um template e pelo menos um aluno');
      return;
    }
    
    onAssignToMultiple(selectedTemplate, selectedStudents);
    setShowMassAssign(false);
    setSelectedTemplate('');
    setSelectedStudents([]);
    alert(`Template atribuído para ${selectedStudents.length} aluno(s) com sucesso!`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FFC300]" />
              Gerenciamento de Templates
            </CardTitle>
            <Button
              onClick={() => setShowMassAssign(true)}
              className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
            >
              <Users className="w-4 h-4 mr-2" />
              Atribuição em Massa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((template) => (
              <Card key={template.id} className="border border-[#E6C85C] rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-[#0A0A0A] mb-1">
                        {template.name}
                      </h4>
                      <p className="text-sm text-[#4A4A4A] capitalize">
                        {template.objective}
                      </p>
                    </div>
                    <Badge className="bg-[#FFC300] text-[#0A0A0A]">
                      Template
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-[#4A4A4A] mb-4">
                    <div className="flex items-center justify-between">
                      <span>Exercícios:</span>
                      <span className="font-medium">{template.exercises.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Alunos vinculados:</span>
                      <span className="font-medium">{template.assignedStudents?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Última atualização:</span>
                      <span className="font-medium">
                        {template.updatedAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {template.assignedStudents && template.assignedStudents.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-[#4A4A4A] mb-2">Alunos vinculados:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.assignedStudents.slice(0, 3).map((student, index) => (
                          <Badge key={index} className="bg-[#0A0A0A] text-[#FFC300] text-xs">
                            {student}
                          </Badge>
                        ))}
                        {template.assignedStudents.length > 3 && (
                          <Badge className="bg-[#4A4A4A] text-white text-xs">
                            +{template.assignedStudents.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#1FBF75] hover:bg-[#1AA366] text-white rounded-lg"
                      onClick={() => {
                        if (template.assignedStudents && template.assignedStudents.length > 0) {
                          const confirm = window.confirm(
                            `Atualizar template "${template.name}" para todos os ${template.assignedStudents.length} aluno(s) vinculados?`
                          );
                          if (confirm) {
                            onUpdateTemplate(template.id, template);
                          }
                        } else {
                          alert('Este template não possui alunos vinculados');
                        }
                      }}
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Atualizar Todos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Atribuição em Massa */}
      {showMassAssign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#0A0A0A]">
                Atribuição em Massa de Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-[#0A0A0A] font-medium mb-2 block">
                  Selecionar Template
                </Label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white"
                >
                  <option value="">Escolha um template...</option>
                  {workouts.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name} ({template.exercises.length} exercícios)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-[#0A0A0A] font-medium mb-2 block">
                  Selecionar Alunos ({selectedStudents.length} selecionados)
                </Label>
                <div className="max-h-60 overflow-y-auto border-2 border-[#E6C85C] rounded-xl p-4 space-y-2">
                  <div className="flex gap-2 mb-3">
                    <Button
                      size="sm"
                      onClick={() => setSelectedStudents(students)}
                      className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-lg"
                    >
                      Selecionar Todos
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedStudents([])}
                      variant="outline"
                      className="border-[#E6C85C] text-[#0A0A0A] hover:bg-[#FFF3C4] rounded-lg"
                    >
                      Limpar Seleção
                    </Button>
                  </div>
                  {students.map((student) => (
                    <label key={student} className="flex items-center gap-3 p-2 hover:bg-[#FFF3C4] rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(s => s !== student));
                          }
                        }}
                        className="w-4 h-4 text-[#FFC300] rounded"
                      />
                      <span className="text-[#0A0A0A]">{student}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#E6C85C]">
                <Button
                  onClick={handleMassAssign}
                  className="flex-1 bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
                  disabled={!selectedTemplate || selectedStudents.length === 0}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Atribuir Template ({selectedStudents.length} alunos)
                </Button>
                <Button
                  onClick={() => setShowMassAssign(false)}
                  variant="outline"
                  className="border-[#E6C85C] text-[#0A0A0A] hover:bg-[#FFF3C4] rounded-xl"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Componente Gerenciador de Periodização
function PeriodizationManager({
  cycles,
  workouts,
  students,
  onUpdateCycles
}: {
  cycles: PeriodizationCycle[];
  workouts: Workout[];
  students: string[];
  onUpdateCycles: (cycles: PeriodizationCycle[]) => void;
}) {
  const [selectedCycle, setSelectedCycle] = useState<PeriodizationCycle | null>(null);
  const [isCreatingCycle, setIsCreatingCycle] = useState(false);

  const createNewCycle = () => {
    const newCycle: PeriodizationCycle = {
      id: Date.now().toString(),
      name: 'Novo Mesociclo',
      startDate: new Date(),
      endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 4 semanas
      weeks: [
        { weekNumber: 1, workoutId: '', volume: 70, intensity: 60, focus: 'Adaptação' },
        { weekNumber: 2, workoutId: '', volume: 80, intensity: 70, focus: 'Volume' },
        { weekNumber: 3, workoutId: '', volume: 90, intensity: 80, focus: 'Intensidade' },
        { weekNumber: 4, workoutId: '', volume: 60, intensity: 50, focus: 'Recuperação' }
      ],
      students: [],
      objective: 'Desenvolvimento geral'
    };
    setSelectedCycle(newCycle);
    setIsCreatingCycle(true);
  };

  const saveCycle = (cycle: PeriodizationCycle) => {
    if (isCreatingCycle) {
      onUpdateCycles([...cycles, cycle]);
      setIsCreatingCycle(false);
    } else {
      onUpdateCycles(cycles.map(c => c.id === cycle.id ? cycle : c));
    }
    setSelectedCycle(null);
  };

  if (selectedCycle) {
    return (
      <PeriodizationEditor
        cycle={selectedCycle}
        isCreating={isCreatingCycle}
        workouts={workouts}
        students={students}
        onSave={saveCycle}
        onCancel={() => {
          setSelectedCycle(null);
          setIsCreatingCycle(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FFC300]" />
              Periodização de Treinos
            </CardTitle>
            <Button
              onClick={createNewCycle}
              className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Mesociclo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {cycles.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-[#4A4A4A] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                Nenhum ciclo de periodização criado
              </h3>
              <p className="text-[#4A4A4A] mb-4">
                Crie mesociclos para organizar os treinos por semanas e meses
              </p>
              <Button
                onClick={createNewCycle}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Mesociclo
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cycles.map((cycle) => (
                <Card key={cycle.id} className="border border-[#E6C85C] rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">
                          {cycle.name}
                        </h3>
                        <p className="text-[#4A4A4A] mb-2">{cycle.objective}</p>
                        <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                          <span>
                            <strong>Período:</strong> {cycle.startDate.toLocaleDateString()} - {cycle.endDate.toLocaleDateString()}
                          </span>
                          <span>
                            <strong>Alunos:</strong> {cycle.students.length}
                          </span>
                          <span>
                            <strong>Semanas:</strong> {cycle.weeks.length}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedCycle(cycle)}
                        size="sm"
                        className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-lg"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                    </div>

                    {/* Visualização das Semanas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {cycle.weeks.map((week) => {
                        const workout = workouts.find(w => w.id === week.workoutId);
                        return (
                          <Card key={week.weekNumber} className="border border-[#FFF3C4] bg-[#FFF3C4]/30">
                            <CardContent className="p-4">
                              <div className="text-center mb-3">
                                <h4 className="font-semibold text-[#0A0A0A]">
                                  Semana {week.weekNumber}
                                </h4>
                                <p className="text-sm text-[#4A4A4A]">{week.focus}</p>
                              </div>
                              
                              {workout && (
                                <div className="text-center mb-3">
                                  <Badge className="bg-[#0A0A0A] text-[#FFC300] text-xs">
                                    {workout.name}
                                  </Badge>
                                </div>
                              )}

                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-[#4A4A4A]">Volume:</span>
                                  <span className="font-medium text-[#0A0A0A]">{week.volume}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#4A4A4A]">Intensidade:</span>
                                  <span className="font-medium text-[#0A0A0A]">{week.intensity}%</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {cycle.students.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#E6C85C]">
                        <p className="text-sm text-[#4A4A4A] mb-2">Alunos vinculados:</p>
                        <div className="flex flex-wrap gap-2">
                          {cycle.students.map((student, index) => (
                            <Badge key={index} className="bg-[#1FBF75] text-white">
                              {student}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Componente Editor de Periodização
function PeriodizationEditor({
  cycle,
  isCreating,
  workouts,
  students,
  onSave,
  onCancel
}: {
  cycle: PeriodizationCycle;
  isCreating: boolean;
  workouts: Workout[];
  students: string[];
  onSave: (cycle: PeriodizationCycle) => void;
  onCancel: () => void;
}) {
  const [editedCycle, setEditedCycle] = useState<PeriodizationCycle>(cycle);

  const updateWeek = (weekNumber: number, updates: Partial<PeriodizationWeek>) => {
    setEditedCycle({
      ...editedCycle,
      weeks: editedCycle.weeks.map(week => 
        week.weekNumber === weekNumber ? { ...week, ...updates } : week
      )
    });
  };

  const addWeek = () => {
    const newWeek: PeriodizationWeek = {
      weekNumber: editedCycle.weeks.length + 1,
      workoutId: '',
      volume: 70,
      intensity: 60,
      focus: 'Desenvolvimento'
    };
    setEditedCycle({
      ...editedCycle,
      weeks: [...editedCycle.weeks, newWeek]
    });
  };

  const removeWeek = (weekNumber: number) => {
    setEditedCycle({
      ...editedCycle,
      weeks: editedCycle.weeks.filter(week => week.weekNumber !== weekNumber)
        .map((week, index) => ({ ...week, weekNumber: index + 1 }))
    });
  };

  const handleSave = () => {
    if (!editedCycle.name.trim()) {
      alert('Nome do mesociclo é obrigatório');
      return;
    }
    
    if (editedCycle.weeks.length === 0) {
      alert('Adicione pelo menos uma semana');
      return;
    }

    onSave(editedCycle);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isCreating ? 'Criar Novo Mesociclo' : 'Editar Mesociclo'}
          </h1>
          <p className="text-white/80">Configure a periodização e organize os treinos por semanas</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#0A0A0A] rounded-2xl px-6"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] font-semibold rounded-2xl px-6"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar Mesociclo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <Card className="lg:col-span-1 bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#FFC300]" />
              Informações do Mesociclo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cycleName" className="text-[#0A0A0A] font-medium">Nome do Mesociclo</Label>
              <Input
                id="cycleName"
                value={editedCycle.name}
                onChange={(e) => setEditedCycle({ ...editedCycle, name: e.target.value })}
                placeholder="Ex: Mesociclo 1 - Base"
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
              />
            </div>

            <div>
              <Label htmlFor="objective" className="text-[#0A0A0A] font-medium">Objetivo</Label>
              <Input
                id="objective"
                value={editedCycle.objective}
                onChange={(e) => setEditedCycle({ ...editedCycle, objective: e.target.value })}
                placeholder="Ex: Construção de base muscular"
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-[#0A0A0A] font-medium">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={editedCycle.startDate.toISOString().split('T')[0]}
                  onChange={(e) => setEditedCycle({ ...editedCycle, startDate: new Date(e.target.value) })}
                  className="border-2 border-[#E6C85C] rounded-xl mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-[#0A0A0A] font-medium">Data de Término</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={editedCycle.endDate.toISOString().split('T')[0]}
                  onChange={(e) => setEditedCycle({ ...editedCycle, endDate: new Date(e.target.value) })}
                  className="border-2 border-[#E6C85C] rounded-xl mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-[#0A0A0A] font-medium mb-2 block">
                Alunos Vinculados ({editedCycle.students.length} selecionados)
              </Label>
              <div className="max-h-40 overflow-y-auto border-2 border-[#E6C85C] rounded-xl p-3 space-y-2">
                {students.map((student) => (
                  <label key={student} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedCycle.students.includes(student)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditedCycle({
                            ...editedCycle,
                            students: [...editedCycle.students, student]
                          });
                        } else {
                          setEditedCycle({
                            ...editedCycle,
                            students: editedCycle.students.filter(s => s !== student)
                          });
                        }
                      }}
                      className="w-4 h-4 text-[#FFC300] rounded"
                    />
                    <span className="text-[#0A0A0A] text-sm">{student}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-[#0A0A0A] font-medium">Observações</Label>
              <Textarea
                id="notes"
                value={editedCycle.notes || ''}
                onChange={(e) => setEditedCycle({ ...editedCycle, notes: e.target.value })}
                placeholder="Observações sobre o mesociclo..."
                className="border-2 border-[#E6C85C] rounded-xl mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Planejamento das Semanas */}
        <Card className="lg:col-span-2 bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FFC300]" />
                Planejamento Semanal ({editedCycle.weeks.length} semanas)
              </CardTitle>
              <Button
                onClick={addWeek}
                size="sm"
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Semana
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editedCycle.weeks.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-[#4A4A4A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                  Nenhuma semana planejada
                </h3>
                <p className="text-[#4A4A4A] mb-4">
                  Adicione semanas para estruturar seu mesociclo
                </p>
                <Button
                  onClick={addWeek}
                  className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeira Semana
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {editedCycle.weeks.map((week) => (
                  <Card key={week.weekNumber} className="border border-[#E6C85C] rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-[#0A0A0A]">
                          Semana {week.weekNumber}
                        </h4>
                        <Button
                          onClick={() => removeWeek(week.weekNumber)}
                          size="sm"
                          variant="ghost"
                          className="text-[#E10600] hover:bg-[#E10600]/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-[#4A4A4A]">Treino</Label>
                          <select
                            value={week.workoutId}
                            onChange={(e) => updateWeek(week.weekNumber, { workoutId: e.target.value })}
                            className="w-full px-3 py-2 border border-[#E6C85C] rounded-lg bg-white text-sm"
                          >
                            <option value="">Selecione um treino</option>
                            {workouts.map(workout => (
                              <option key={workout.id} value={workout.id}>
                                {workout.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="text-xs text-[#4A4A4A]">Volume (%)</Label>
                          <Input
                            type="number"
                            value={week.volume}
                            onChange={(e) => updateWeek(week.weekNumber, { volume: parseInt(e.target.value) || 0 })}
                            min="0"
                            max="100"
                            className="border border-[#E6C85C] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-[#4A4A4A]">Intensidade (%)</Label>
                          <Input
                            type="number"
                            value={week.intensity}
                            onChange={(e) => updateWeek(week.weekNumber, { intensity: parseInt(e.target.value) || 0 })}
                            min="0"
                            max="100"
                            className="border border-[#E6C85C] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-[#4A4A4A]">Foco</Label>
                          <Input
                            value={week.focus}
                            onChange={(e) => updateWeek(week.weekNumber, { focus: e.target.value })}
                            placeholder="Ex: Adaptação"
                            className="border border-[#E6C85C] rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <Label className="text-xs text-[#4A4A4A]">Observações da Semana</Label>
                        <Input
                          value={week.notes || ''}
                          onChange={(e) => updateWeek(week.weekNumber, { notes: e.target.value })}
                          placeholder="Observações específicas desta semana..."
                          className="border border-[#E6C85C] rounded-lg text-sm mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Componente Visualização do Histórico
function WorkoutHistoryView({
  history,
  workouts,
  cycles,
  students
}: {
  history: WorkoutHistory[];
  workouts: Workout[];
  cycles: PeriodizationCycle[];
  students: string[];
}) {
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredHistory = history.filter(item => {
    const matchesStudent = selectedStudent === 'all' || item.studentId === selectedStudent;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesStudent && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#1FBF75] text-white';
      case 'completed': return 'bg-[#0A0A0A] text-[#FFC300]';
      case 'paused': return 'bg-[#FFC300] text-[#0A0A0A]';
      default: return 'bg-[#4A4A4A] text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      case 'paused': return 'Pausado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0A0A0A] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FFC300]" />
              Histórico de Treinos
            </CardTitle>
            <div className="flex gap-3">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white text-sm"
              >
                <option value="all">Todos os alunos</option>
                {students.map(student => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border-2 border-[#E6C85C] rounded-xl bg-white text-sm"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativo</option>
                <option value="completed">Concluído</option>
                <option value="paused">Pausado</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-[#4A4A4A] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                Nenhum histórico encontrado
              </h3>
              <p className="text-[#4A4A4A]">
                {selectedStudent !== 'all' || selectedStatus !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'O histórico de treinos aparecerá aqui conforme os alunos utilizarem o sistema'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const workout = workouts.find(w => w.id === item.workoutId);
                const cycle = cycles.find(c => c.id === item.cycleId);
                
                return (
                  <Card key={item.id} className="border border-[#E6C85C] rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-[#0A0A0A] mb-1">
                            {workout?.name || 'Treino não encontrado'}
                          </h4>
                          <p className="text-sm text-[#4A4A4A] mb-2">
                            <strong>Aluno:</strong> {item.studentId}
                          </p>
                          {cycle && (
                            <p className="text-sm text-[#4A4A4A] mb-2">
                              <strong>Mesociclo:</strong> {cycle.name}
                            </p>
                          )}
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusLabel(item.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-[#4A4A4A]">Data de Início:</span>
                          <p className="font-medium text-[#0A0A0A]">
                            {item.startDate.toLocaleDateString()}
                          </p>
                        </div>
                        {item.endDate && (
                          <div>
                            <span className="text-[#4A4A4A]">Data de Término:</span>
                            <p className="font-medium text-[#0A0A0A]">
                              {item.endDate.toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className="text-[#4A4A4A]">Progresso:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-[#E6C85C] rounded-full h-2">
                              <div 
                                className="bg-[#1FBF75] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-medium text-[#0A0A0A] text-xs">
                              {item.progress}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {workout && (
                        <div className="mt-3 pt-3 border-t border-[#E6C85C]">
                          <div className="flex items-center gap-4 text-xs text-[#4A4A4A]">
                            <span>
                              <strong>Objetivo:</strong> {workout.objective}
                            </span>
                            <span>
                              <strong>Exercícios:</strong> {workout.exercises.length}
                            </span>
                            {workout.duration && (
                              <span>
                                <strong>Duração:</strong> {workout.duration} min
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}