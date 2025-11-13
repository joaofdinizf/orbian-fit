'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Calendar,
  Users,
  CheckCircle,
  Target,
  Award,
  Crown,
  Zap,
  Activity,
  BarChart3,
  Filter,
  CalendarDays,
  User
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar: string;
  trainerId: string;
  trainerName: string;
  completedWorkouts: number;
  scheduledWorkouts: number;
  adherenceRate: number;
  streak: number;
  lastWorkout: string;
}

interface Trainer {
  id: string;
  name: string;
  students: Student[];
}

interface FrequencyRankingProps {
  userRole: 'trainer' | 'student';
}

export default function FrequencyRanking({ userRole }: FrequencyRankingProps) {
  const [activeTab, setActiveTab] = useState('ranking');
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [checkInMode, setCheckInMode] = useState<'manual' | 'student'>('manual');

  // Dados simulados
  const trainers: Trainer[] = [
    {
      id: '1',
      name: 'Carlos Silva',
      students: [
        {
          id: '1',
          name: 'João Santos',
          avatar: '👨',
          trainerId: '1',
          trainerName: 'Carlos Silva',
          completedWorkouts: 12,
          scheduledWorkouts: 15,
          adherenceRate: 80,
          streak: 5,
          lastWorkout: '2024-01-15'
        },
        {
          id: '2',
          name: 'Maria Oliveira',
          avatar: '👩',
          trainerId: '1',
          trainerName: 'Carlos Silva',
          completedWorkouts: 14,
          scheduledWorkouts: 16,
          adherenceRate: 87.5,
          streak: 7,
          lastWorkout: '2024-01-15'
        },
        {
          id: '3',
          name: 'Pedro Costa',
          avatar: '👨',
          trainerId: '1',
          trainerName: 'Carlos Silva',
          completedWorkouts: 8,
          scheduledWorkouts: 12,
          adherenceRate: 66.7,
          streak: 2,
          lastWorkout: '2024-01-14'
        }
      ]
    },
    {
      id: '2',
      name: 'Ana Rodrigues',
      students: [
        {
          id: '4',
          name: 'Lucas Ferreira',
          avatar: '👨',
          trainerId: '2',
          trainerName: 'Ana Rodrigues',
          completedWorkouts: 16,
          scheduledWorkouts: 18,
          adherenceRate: 88.9,
          streak: 9,
          lastWorkout: '2024-01-15'
        },
        {
          id: '5',
          name: 'Carla Mendes',
          avatar: '👩',
          trainerId: '2',
          trainerName: 'Ana Rodrigues',
          completedWorkouts: 11,
          scheduledWorkouts: 14,
          adherenceRate: 78.6,
          streak: 4,
          lastWorkout: '2024-01-15'
        }
      ]
    }
  ];

  // Combinar todos os alunos para ranking geral
  const allStudents = trainers.flatMap(trainer => trainer.students);

  // Filtrar alunos baseado no trainer selecionado
  const getFilteredStudents = () => {
    if (selectedTrainer === 'all') {
      return allStudents;
    }
    const trainer = trainers.find(t => t.id === selectedTrainer);
    return trainer ? trainer.students : [];
  };

  // Ordenar alunos por frequência
  const getSortedStudents = () => {
    return getFilteredStudents().sort((a, b) => {
      if (b.adherenceRate !== a.adherenceRate) {
        return b.adherenceRate - a.adherenceRate;
      }
      return b.completedWorkouts - a.completedWorkouts;
    });
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-[#FFD700]" />;
      case 2:
        return <Medal className="w-6 h-6 text-[#C0C0C0]" />;
      case 3:
        return <Award className="w-6 h-6 text-[#CD7F32]" />;
      default:
        return <Star className="w-5 h-5 text-[#FFC300]" />;
    }
  };

  const getRankBadge = (position: number) => {
    if (position <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A0A0A]',
        2: 'bg-gradient-to-r from-[#C0C0C0] to-[#A0A0A0] text-[#0A0A0A]',
        3: 'bg-gradient-to-r from-[#CD7F32] to-[#B8860B] text-white'
      };
      return colors[position as keyof typeof colors];
    }
    if (position <= 10) {
      return 'bg-[#FFC300] text-[#0A0A0A]';
    }
    return 'bg-[#E6C85C] text-[#0A0A0A]';
  };

  const handleCheckIn = (studentId: string, workoutCompleted: boolean) => {
    // Lógica para registrar check-in
    console.log(`Check-in registrado para aluno ${studentId}: ${workoutCompleted ? 'Treino concluído' : 'Presença marcada'}`);
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return 'Semanal';
      case 'monthly':
        return 'Mensal';
      case 'custom':
        return 'Personalizado';
      default:
        return 'Semanal';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🏆 Ranking de Frequência
        </h1>
        <p className="text-white/80 text-lg">
          Acompanhe a dedicação e frequência dos alunos nos treinos
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
          <TabsTrigger 
            value="ranking" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Ranking</span>
          </TabsTrigger>
          <TabsTrigger 
            value="checkin" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Check-in</span>
          </TabsTrigger>
          <TabsTrigger 
            value="stats" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Estatísticas</span>
          </TabsTrigger>
        </TabsList>

        {/* Ranking Tab */}
        <TabsContent value="ranking" className="space-y-6">
          {/* Filtros */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Filter className="w-6 h-6 text-[#FFC300]" />
                Filtros do Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Período */}
                <div className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">Período</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Trainer Filter */}
                {userRole === 'trainer' && (
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Professor</Label>
                    <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                      <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Professores</SelectItem>
                        {trainers.map(trainer => (
                          <SelectItem key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Tipo de Ranking */}
                <div className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">Tipo</Label>
                  <Select value={selectedTrainer === 'all' ? 'general' : 'trainer'} onValueChange={(value) => {
                    if (value === 'general') setSelectedTrainer('all');
                  }}>
                    <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Ranking Geral</SelectItem>
                      <SelectItem value="trainer">Por Professor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Período Personalizado */}
              {selectedPeriod === 'custom' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Data Início</Label>
                    <Input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="border-2 border-[#E6C85C] rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Data Fim</Label>
                    <Input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="border-2 border-[#E6C85C] rounded-xl"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ranking Header */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-[#FFC300]" />
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A0A0A]">
                      Ranking {getPeriodLabel()}
                    </h2>
                    <p className="text-[#4A4A4A]">
                      {selectedTrainer === 'all' 
                        ? `${allStudents.length} alunos na plataforma`
                        : `${getFilteredStudents().length} alunos do professor`
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#4A4A4A]">Atualizado em</p>
                  <p className="text-lg font-bold text-[#0A0A0A]">
                    {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getSortedStudents().slice(0, 3).map((student, index) => (
              <Card 
                key={student.id} 
                className={`
                  border-2 shadow-lg rounded-2xl transform transition-all duration-300 hover:scale-105
                  ${index === 0 ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-[#FFD700] md:order-2' : ''}
                  ${index === 1 ? 'bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0] border-[#C0C0C0] md:order-1' : ''}
                  ${index === 2 ? 'bg-gradient-to-br from-[#CD7F32] to-[#B8860B] border-[#CD7F32] md:order-3' : ''}
                `}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                        {student.avatar}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        {getRankIcon(index + 1)}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {student.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {student.trainerName}
                      </p>
                    </div>

                    <div className="space-y-2 w-full">
                      <div className="bg-white/20 rounded-xl p-3">
                        <p className="text-white/80 text-sm">Taxa de Adesão</p>
                        <p className="text-2xl font-bold text-white">
                          {student.adherenceRate.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20 rounded-xl p-2">
                          <p className="text-white/80 text-xs">Concluídos</p>
                          <p className="text-lg font-bold text-white">
                            {student.completedWorkouts}
                          </p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-2">
                          <p className="text-white/80 text-xs">Sequência</p>
                          <p className="text-lg font-bold text-white">
                            {student.streak}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Badge className="bg-white text-[#0A0A0A] font-bold px-4 py-2 rounded-xl">
                      #{index + 1}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ranking Completo */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Users className="w-6 h-6 text-[#FFC300]" />
                Ranking Completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getSortedStudents().map((student, index) => (
                  <div 
                    key={student.id}
                    className={`
                      flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-md
                      ${index < 3 ? 'bg-gradient-to-r from-[#FFF3C4] to-[#FFF8E1] border-[#FFC300]' : 'bg-[#FFF3C4] border-[#E6C85C]'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <Badge className={`${getRankBadge(index + 1)} font-bold px-3 py-2 rounded-xl min-w-[3rem] text-center`}>
                        #{index + 1}
                      </Badge>
                      
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-md">
                            {student.avatar}
                          </div>
                          {index < 3 && (
                            <div className="absolute -top-1 -right-1">
                              {getRankIcon(index + 1)}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-[#0A0A0A]">
                            {student.name}
                          </h4>
                          <p className="text-sm text-[#4A4A4A]">
                            {student.trainerName}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Taxa de Adesão</p>
                        <p className="text-xl font-bold text-[#0A0A0A]">
                          {student.adherenceRate.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Treinos</p>
                        <p className="text-lg font-bold text-[#0A0A0A]">
                          {student.completedWorkouts}/{student.scheduledWorkouts}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Sequência</p>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-[#FFC300]" />
                          <p className="text-lg font-bold text-[#0A0A0A]">
                            {student.streak}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Check-in Tab */}
        <TabsContent value="checkin" className="space-y-6">
          {/* Modo de Check-in */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <CheckCircle className="w-6 h-6 text-[#FFC300]" />
                Registro de Presença
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">Modo de Check-in</Label>
                  <Select value={checkInMode} onValueChange={(value: 'manual' | 'student') => setCheckInMode(value)}>
                    <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual (Professor marca)</SelectItem>
                      <SelectItem value="student">Aluno marca conclusão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                  <p className="text-[#0A0A0A] font-medium mb-2">
                    {checkInMode === 'manual' ? '👨‍🏫 Modo Manual' : '🎯 Modo Aluno'}
                  </p>
                  <p className="text-[#4A4A4A] text-sm">
                    {checkInMode === 'manual' 
                      ? 'O professor marca a presença dos alunos manualmente após cada treino.'
                      : 'Os alunos marcam quando concluem o treino através do botão "Concluí esse treino".'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Alunos para Check-in */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <User className="w-6 h-6 text-[#FFC300]" />
                Alunos - Check-in de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredStudents().map((student) => (
                  <div 
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-md">
                        {student.avatar}
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-[#0A0A0A]">
                          {student.name}
                        </h4>
                        <p className="text-sm text-[#4A4A4A]">
                          Último treino: {new Date(student.lastWorkout).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {checkInMode === 'manual' ? (
                        <>
                          <Button
                            onClick={() => handleCheckIn(student.id, false)}
                            className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium px-4 py-2 rounded-xl"
                          >
                            Marcar Presença
                          </Button>
                          <Button
                            onClick={() => handleCheckIn(student.id, true)}
                            className="bg-[#1FBF75] hover:bg-[#17A366] text-white font-medium px-4 py-2 rounded-xl"
                          >
                            Treino Concluído
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleCheckIn(student.id, true)}
                          className="bg-[#E10600] hover:bg-[#C00000] text-white font-medium px-6 py-2 rounded-xl"
                        >
                          Concluí esse Treino
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estatísticas Tab */}
        <TabsContent value="stats" className="space-y-6">
          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Total de Alunos
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {allStudents.length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-[#FFC300]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Taxa Média de Adesão
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {(allStudents.reduce((acc, student) => acc + student.adherenceRate, 0) / allStudents.length).toFixed(1)}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-[#1FBF75]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Treinos Concluídos
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {allStudents.reduce((acc, student) => acc + student.completedWorkouts, 0)}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-[#E10600]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Maior Sequência
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {Math.max(...allStudents.map(s => s.streak))}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-[#FFC300]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas por Professor */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <TrendingUp className="w-6 h-6 text-[#FFC300]" />
                Estatísticas por Professor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainers.map((trainer) => {
                  const avgAdherence = trainer.students.reduce((acc, student) => acc + student.adherenceRate, 0) / trainer.students.length;
                  const totalWorkouts = trainer.students.reduce((acc, student) => acc + student.completedWorkouts, 0);
                  
                  return (
                    <div 
                      key={trainer.id}
                      className="p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[#0A0A0A] text-lg">
                            {trainer.name}
                          </h4>
                          <p className="text-[#4A4A4A]">
                            {trainer.students.length} alunos
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-[#4A4A4A]">Taxa Média</p>
                            <p className="text-xl font-bold text-[#0A0A0A]">
                              {avgAdherence.toFixed(1)}%
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-[#4A4A4A]">Total Treinos</p>
                            <p className="text-xl font-bold text-[#0A0A0A]">
                              {totalWorkouts}
                            </p>
                          </div>
                          
                          <Badge className={`
                            font-bold px-3 py-2 rounded-xl
                            ${avgAdherence >= 85 ? 'bg-[#1FBF75] text-white' : 
                              avgAdherence >= 70 ? 'bg-[#FFC300] text-[#0A0A0A]' : 
                              'bg-[#E10600] text-white'}
                          `}>
                            {avgAdherence >= 85 ? 'Excelente' : 
                             avgAdherence >= 70 ? 'Bom' : 'Precisa Melhorar'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Metas e Conquistas */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Award className="w-6 h-6 text-[#FFC300]" />
                Metas e Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-[#0A0A0A]">🎯 Metas do Mês</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#FFF3C4] rounded-xl">
                      <span className="text-[#0A0A0A]">Taxa de adesão &gt; 80%</span>
                      <Badge className="bg-[#1FBF75] text-white">Atingida</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#FFF3C4] rounded-xl">
                      <span className="text-[#0A0A0A]">500 treinos concluídos</span>
                      <Badge className="bg-[#FFC300] text-[#0A0A0A]">Em progresso</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#FFF3C4] rounded-xl">
                      <span className="text-[#0A0A0A]">10 alunos com sequência 7+</span>
                      <Badge className="bg-[#E10600] text-white">Pendente</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-[#0A0A0A]">🏆 Conquistas Recentes</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                      <Trophy className="w-6 h-6 text-[#FFD700]" />
                      <div>
                        <p className="font-medium text-[#0A0A0A]">Campeão do Mês</p>
                        <p className="text-sm text-[#4A4A4A]">Lucas Ferreira - 88.9%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                      <Zap className="w-6 h-6 text-[#FFC300]" />
                      <div>
                        <p className="font-medium text-[#0A0A0A]">Maior Sequência</p>
                        <p className="text-sm text-[#4A4A4A]">9 treinos consecutivos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                      <TrendingUp className="w-6 h-6 text-[#1FBF75]" />
                      <div>
                        <p className="font-medium text-[#0A0A0A]">Maior Evolução</p>
                        <p className="text-sm text-[#4A4A4A]">+15% este mês</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}