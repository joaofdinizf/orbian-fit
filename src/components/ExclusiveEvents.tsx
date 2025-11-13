'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Clock,
  Star,
  Trophy,
  Ticket,
  Plus,
  CheckCircle
} from 'lucide-react';

interface ExclusiveEventsProps {
  userRole: 'trainer' | 'student';
}

export default function ExclusiveEvents({ userRole }: ExclusiveEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const upcomingEvents = [
    {
      id: 'workshop-nutrition',
      title: 'Workshop: Nutrição Esportiva Avançada',
      date: '2024-05-25',
      time: '14:00',
      duration: '3 horas',
      location: 'Online',
      type: 'Workshop',
      instructor: 'Dra. Ana Nutricionista',
      capacity: 50,
      registered: 32,
      price: 'Gratuito',
      description: 'Aprenda estratégias avançadas de nutrição para maximizar performance e recuperação.',
      benefits: ['Certificado de participação', 'Material exclusivo', 'Sessão de Q&A']
    },
    {
      id: 'masterclass-strength',
      title: 'Masterclass: Treinamento de Força',
      date: '2024-06-08',
      time: '10:00',
      duration: '4 horas',
      location: 'São Paulo - SP',
      type: 'Masterclass',
      instructor: 'Prof. Carlos Strength',
      capacity: 30,
      registered: 18,
      price: 'Gratuito',
      description: 'Técnicas avançadas de treinamento de força e periodização para atletas.',
      benefits: ['Prática hands-on', 'Networking', 'Kit exclusivo']
    },
    {
      id: 'challenge-30days',
      title: 'Desafio 30 Dias: Transformação Total',
      date: '2024-06-01',
      time: '00:00',
      duration: '30 dias',
      location: 'Online',
      type: 'Desafio',
      instructor: 'Equipe Orbian Fit',
      capacity: 100,
      registered: 67,
      price: 'Gratuito',
      description: 'Desafio completo de 30 dias com treinos, nutrição e acompanhamento diário.',
      benefits: ['Grupo VIP no WhatsApp', 'Lives semanais', 'Prêmios para os top 3']
    }
  ];

  const pastEvents = [
    {
      id: 'seminar-recovery',
      title: 'Seminário: Recuperação e Sono',
      date: '2024-04-20',
      type: 'Seminário',
      rating: 4.9,
      participants: 45,
      certificate: true
    },
    {
      id: 'bootcamp-hiit',
      title: 'Bootcamp: HIIT Avançado',
      date: '2024-04-05',
      type: 'Bootcamp',
      rating: 4.8,
      participants: 25,
      certificate: true
    }
  ];

  const eventTypes = [
    { name: 'Workshop', color: 'bg-[#FFC300]', count: 3 },
    { name: 'Masterclass', color: 'bg-[#E10600]', count: 2 },
    { name: 'Desafio', color: 'bg-[#1FBF75]', count: 1 },
    { name: 'Seminário', color: 'bg-[#3B82F6]', count: 2 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userRole === 'trainer' ? 'Eventos para Profissionais' : 'Eventos Exclusivos'}
        </h2>
        <p className="text-white/80 text-lg">
          {userRole === 'trainer' 
            ? 'Eventos especiais para desenvolvimento profissional' 
            : 'Acesso exclusivo a workshops, masterclasses e desafios'
          }
        </p>
      </div>

      {/* Event Types Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {eventTypes.map((type, index) => (
          <Card key={index} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-[#0A0A0A]">{type.name}</p>
              <p className="text-sm text-[#4A4A4A]">{type.count} disponíveis</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <CalendarDays className="w-6 h-6 text-[#FFC300]" />
              Próximos Eventos
            </CardTitle>
            {userRole === 'trainer' && (
              <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Criar Evento
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                className={`
                  p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                  ${selectedEvent === event.id 
                    ? 'bg-[#FFC300] border-[#E6C85C] shadow-lg' 
                    : 'bg-[#FFF3C4] border-[#E6C85C] hover:bg-[#FFC300]/50'
                  }
                `}
                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#0A0A0A] rounded-2xl flex items-center justify-center">
                      <CalendarDays className="w-8 h-8 text-[#FFC300]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-[#4A4A4A] mb-2">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-[#4A4A4A]">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`
                      ${event.type === 'Workshop' ? 'bg-[#FFC300] text-[#0A0A0A]' : ''}
                      ${event.type === 'Masterclass' ? 'bg-[#E10600] text-white' : ''}
                      ${event.type === 'Desafio' ? 'bg-[#1FBF75] text-white' : ''}
                      font-bold px-3 py-1 rounded-xl
                    `}>
                      {event.type}
                    </Badge>
                    <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-3 py-1 rounded-xl">
                      {event.price}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#4A4A4A]" />
                      <span className="text-sm text-[#4A4A4A]">
                        {event.registered}/{event.capacity} inscritos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#4A4A4A]" />
                      <span className="text-sm text-[#4A4A4A]">
                        Com {event.instructor}
                      </span>
                    </div>
                  </div>
                  <div className="w-32 bg-[#E6C85C] rounded-full h-2">
                    <div 
                      className="bg-[#1FBF75] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {selectedEvent === event.id && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-white rounded-xl">
                      <h4 className="font-bold text-[#0A0A0A] mb-3">Benefícios Inclusos:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {event.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#1FBF75]" />
                            <span className="text-sm text-[#4A4A4A]">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="bg-[#1FBF75] hover:bg-[#16A085] text-white font-semibold rounded-xl">
                        <Ticket className="w-4 h-4 mr-2" />
                        Inscrever-se Agora
                      </Button>
                      <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border border-[#E6C85C] font-medium rounded-xl">
                        <Star className="w-4 h-4 mr-2" />
                        Favoritar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Events */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Trophy className="w-6 h-6 text-[#FFC300]" />
            Eventos Anteriores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1FBF75] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A0A0A]">{event.title}</h3>
                    <p className="text-sm text-[#4A4A4A]">
                      {new Date(event.date).toLocaleDateString('pt-BR')} • {event.participants} participantes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FFC300]" />
                    <span className="font-bold text-[#0A0A0A]">{event.rating}</span>
                  </div>
                  {event.certificate && (
                    <Badge className="bg-[#3B82F6] text-white font-medium px-3 py-1 rounded-xl">
                      Certificado
                    </Badge>
                  )}
                  <Button size="sm" className="bg-[#0A0A0A] hover:bg-[#2A2A2A] text-[#FFC300] rounded-xl">
                    Ver Certificado
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <CalendarDays className="w-12 h-12 text-[#FFC300] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#0A0A0A] mb-2">8</p>
            <p className="text-[#4A4A4A]">Eventos Participados</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-[#1FBF75] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#0A0A0A] mb-2">6</p>
            <p className="text-[#4A4A4A]">Certificados Obtidos</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 text-[#E10600] mx-auto mb-4" />
            <p className="text-3xl font-bold text-[#0A0A0A] mb-2">4.9</p>
            <p className="text-[#4A4A4A]">Avaliação Média</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Event Reminder */}
      <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="text-center text-white">
            <CalendarDays className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Próximo Evento em 5 dias!</h3>
            <p className="text-lg mb-4">Workshop: Nutrição Esportiva Avançada</p>
            <p className="text-white/80 mb-6">
              Não perca esta oportunidade exclusiva de aprender com especialistas
            </p>
            <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold py-3 px-8 rounded-2xl">
              <Ticket className="w-5 h-5 mr-2" />
              Ver Detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}