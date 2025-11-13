'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Calendar, 
  Clock, 
  User,
  Phone,
  MessageCircle,
  CheckCircle,
  Plus,
  Play
} from 'lucide-react';

interface VideoSessionsProps {
  userRole: 'trainer' | 'student';
}

export default function VideoSessions({ userRole }: VideoSessionsProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const upcomingSessions = [
    {
      id: 'session-1',
      date: '2024-05-15',
      time: '14:00',
      duration: 60,
      type: 'Avaliação Mensal',
      trainer: 'Carlos Silva',
      status: 'Agendada',
      notes: 'Revisão do progresso e ajustes no plano de treino'
    },
    {
      id: 'session-2',
      date: '2024-05-22',
      time: '16:30',
      duration: 45,
      type: 'Treino Personalizado',
      trainer: 'Carlos Silva',
      status: 'Agendada',
      notes: 'Sessão focada em exercícios funcionais'
    }
  ];

  const pastSessions = [
    {
      id: 'past-1',
      date: '2024-05-08',
      time: '15:00',
      duration: 60,
      type: 'Consulta Inicial',
      trainer: 'Carlos Silva',
      status: 'Concluída',
      rating: 5,
      notes: 'Excelente sessão! Definimos objetivos claros e plano de ação.'
    },
    {
      id: 'past-2',
      date: '2024-05-01',
      time: '14:00',
      duration: 45,
      type: 'Acompanhamento',
      trainer: 'Carlos Silva',
      status: 'Concluída',
      rating: 5,
      notes: 'Ótimo progresso nos exercícios de força. Ajustamos a intensidade.'
    }
  ];

  const trainerInfo = {
    name: 'Carlos Silva',
    specialties: ['Musculação', 'Funcional', 'Reabilitação'],
    experience: '8 anos',
    rating: 4.9,
    totalSessions: 1247
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userRole === 'trainer' ? 'Videochamadas com Alunos' : 'Suas Videochamadas'}
        </h2>
        <p className="text-white/80 text-lg">
          {userRole === 'trainer' 
            ? 'Gerencie suas sessões de videochamada com os alunos' 
            : 'Sessões personalizadas com seu personal trainer dedicado'
          }
        </p>
      </div>

      {/* Trainer Info - Only for students */}
      {userRole === 'student' && (
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <User className="w-6 h-6 text-[#FFC300]" />
              Seu Personal Trainer Dedicado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#FFC300] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-[#0A0A0A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">{trainerInfo.name}</h3>
                <div className="flex items-center gap-4 mb-3">
                  <Badge className="bg-[#1FBF75] text-white font-medium px-3 py-1 rounded-xl">
                    ⭐ {trainerInfo.rating}
                  </Badge>
                  <span className="text-[#4A4A4A]">{trainerInfo.experience} de experiência</span>
                  <span className="text-[#4A4A4A]">{trainerInfo.totalSessions} sessões realizadas</span>
                </div>
                <div className="flex gap-2">
                  {trainerInfo.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-[#FFF3C4] text-[#0A0A0A] border border-[#E6C85C] font-medium px-3 py-1 rounded-xl">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="bg-[#1FBF75] hover:bg-[#16A085] text-white rounded-xl">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Sessions */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <Calendar className="w-6 h-6 text-[#FFC300]" />
              Próximas Sessões
            </CardTitle>
            {userRole === 'trainer' && (
              <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Sessão
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div 
                key={session.id}
                className="p-4 bg-[#FFF3C4] rounded-2xl border-2 border-[#E6C85C] hover:bg-[#FFC300]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-[#0A0A0A]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{session.type}</h3>
                      <p className="text-sm text-[#4A4A4A]">
                        {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#1FBF75] text-white font-bold px-3 py-1 rounded-xl">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.duration}min
                    </Badge>
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl">
                      <Video className="w-4 h-4 mr-2" />
                      Entrar
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#4A4A4A]" />
                    <span className="text-[#4A4A4A] text-sm">
                      {userRole === 'trainer' ? 'Aluno: João Silva' : `Trainer: ${session.trainer}`}
                    </span>
                  </div>
                  <p className="text-sm text-[#4A4A4A] italic">{session.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Sessions */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <CheckCircle className="w-6 h-6 text-[#1FBF75]" />
            Sessões Anteriores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div 
                key={session.id}
                className={`
                  p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                  ${selectedSession === session.id 
                    ? 'bg-[#E8F5E8] border-[#1FBF75]' 
                    : 'bg-[#F8F8F8] border-[#E6C85C] hover:bg-[#FFF3C4]'
                  }
                `}
                onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1FBF75] rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{session.type}</h3>
                      <p className="text-sm text-[#4A4A4A]">
                        {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-lg ${i < session.rating ? 'text-[#FFC300]' : 'text-[#E6C85C]'}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-3 py-1 rounded-xl">
                      {session.duration}min
                    </Badge>
                  </div>
                </div>

                {selectedSession === session.id && (
                  <div className="mt-4 p-4 bg-white rounded-xl">
                    <h4 className="font-bold text-[#0A0A0A] mb-2">Notas da Sessão:</h4>
                    <p className="text-[#4A4A4A] mb-4">{session.notes}</p>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl">
                        <Play className="w-4 h-4 mr-2" />
                        Ver Gravação
                      </Button>
                      <Button size="sm" className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border border-[#E6C85C] rounded-xl">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Comentários
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <Video className="w-12 h-12 text-[#FFC300] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#0A0A0A] mb-2">12</p>
            <p className="text-[#4A4A4A]">Sessões Realizadas</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <Clock className="w-12 h-12 text-[#1FBF75] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#0A0A0A] mb-2">18h</p>
            <p className="text-[#4A4A4A]">Tempo Total</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-[#E10600] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#0A0A0A] mb-2">4.9</p>
            <p className="text-[#4A4A4A]">Avaliação Média</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <Video className="w-5 h-5 mr-2" />
          {userRole === 'trainer' ? 'Iniciar Sessão Rápida' : 'Agendar Nova Sessão'}
        </Button>
        <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <Calendar className="w-5 h-5 mr-2" />
          Ver Calendário Completo
        </Button>
      </div>
    </div>
  );
}