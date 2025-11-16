'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Heart,
  Smile,
  Meh,
  Frown,
  Battery,
  Calendar,
  TrendingUp,
  Save,
} from 'lucide-react';
import type { EmotionalCheckIn as EmotionalCheckInType } from '@/lib/types';

interface EmotionalCheckInProps {
  userRole: 'trainer' | 'student';
}

const moodOptions = [
  { value: 'excellent', label: 'Excelente', icon: Smile, color: 'text-[#1FBF75]', bg: 'bg-green-50' },
  { value: 'good', label: 'Bem', icon: Smile, color: 'text-[#FFC300]', bg: 'bg-yellow-50' },
  { value: 'neutral', label: 'Neutro', icon: Meh, color: 'text-[#FF9F1A]', bg: 'bg-orange-50' },
  { value: 'tired', label: 'Cansado', icon: Frown, color: 'text-[#4A4A4A]', bg: 'bg-gray-50' },
  { value: 'stressed', label: 'Estressado', icon: Frown, color: 'text-[#E10600]', bg: 'bg-red-50' },
] as const;

export default function EmotionalCheckIn({ userRole }: EmotionalCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [energyLevel, setEnergyLevel] = useState([7]);
  const [notes, setNotes] = useState('');
  const [checkIns, setCheckIns] = useState<EmotionalCheckInType[]>([
    {
      id: '1',
      studentId: 'student1',
      mood: 'good',
      energyLevel: 8,
      notes: 'Me sinto bem hoje, pronto para o treino!',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    },
    {
      id: '2',
      studentId: 'student1',
      mood: 'tired',
      energyLevel: 5,
      notes: 'Dia corrido no trabalho, mas vou tentar dar o meu melhor.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
    },
    {
      id: '3',
      studentId: 'student1',
      mood: 'excellent',
      energyLevel: 9,
      notes: 'Dormi muito bem! Energia total para treinar.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
    },
  ]);

  const saveCheckIn = () => {
    if (!selectedMood) return;

    const newCheckIn: EmotionalCheckInType = {
      id: Date.now().toString(),
      studentId: 'current-student',
      mood: selectedMood as any,
      energyLevel: energyLevel[0],
      notes: notes.trim() || undefined,
      createdAt: new Date(),
    };

    setCheckIns([newCheckIn, ...checkIns]);
    setSelectedMood('');
    setEnergyLevel([7]);
    setNotes('');
  };

  const getMoodIcon = (mood: string) => {
    const option = moodOptions.find((opt) => opt.value === mood);
    return option ? option.icon : Meh;
  };

  const getMoodColor = (mood: string) => {
    const option = moodOptions.find((opt) => opt.value === mood);
    return option ? option.color : 'text-[#4A4A4A]';
  };

  const getMoodBg = (mood: string) => {
    const option = moodOptions.find((opt) => opt.value === mood);
    return option ? option.bg : 'bg-gray-50';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
  };

  if (userRole === 'trainer') {
    return (
      <div className="space-y-8">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <TrendingUp className="w-6 h-6 text-[#FFC300]" />
              Check-ins dos Alunos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {checkIns.map((checkIn) => {
                const MoodIcon = getMoodIcon(checkIn.mood);
                return (
                  <Card
                    key={checkIn.id}
                    className="bg-white border-l-4 border-l-[#FFC300] border border-[#E6C85C] rounded-2xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${getMoodBg(checkIn.mood)}`}>
                            <MoodIcon className={`w-6 h-6 ${getMoodColor(checkIn.mood)}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#0A0A0A] text-lg">João Silva</h3>
                            <p className="text-sm text-[#4A4A4A] font-medium">
                              {moodOptions.find((opt) => opt.value === checkIn.mood)?.label}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">
                            {formatTimeAgo(checkIn.createdAt)}
                          </Badge>
                          <div className="flex items-center gap-2 mt-2">
                            <Battery className="w-4 h-4 text-[#4A4A4A]" />
                            <span className="text-sm text-[#4A4A4A] font-medium">
                              Energia: {checkIn.energyLevel}/10
                            </span>
                          </div>
                        </div>
                      </div>

                      {checkIn.notes && (
                        <div className="bg-[#FFF3C4] p-4 rounded-2xl border border-[#E6C85C] mb-4">
                          <p className="text-sm text-[#0A0A0A] font-medium">{checkIn.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button className="bg-[#E10600] hover:bg-[#C00000] text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300" size="sm">
                          Responder
                        </Button>
                        <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-semibold px-4 py-2 rounded-xl transition-all duration-300" size="sm">
                          Ajustar Treino
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <TrendingUp className="w-6 h-6 text-[#FFC300]" />
              Análise Emocional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                <div className="text-3xl font-bold text-[#1FBF75] mb-2">75%</div>
                <div className="text-sm text-[#4A4A4A] font-medium">Check-ins Positivos</div>
              </div>
              <div className="text-center p-6 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                <div className="text-3xl font-bold text-[#FFC300] mb-2">7.2</div>
                <div className="text-sm text-[#4A4A4A] font-medium">Energia Média</div>
              </div>
              <div className="text-center p-6 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                <div className="text-3xl font-bold text-[#E10600] mb-2">28</div>
                <div className="text-sm text-[#4A4A4A] font-medium">Check-ins Este Mês</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* New Check-in */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Heart className="w-6 h-6 text-[#E10600]" />
            Como você está se sentindo hoje?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mood Selection */}
          <div>
            <h3 className="text-sm font-bold text-[#0A0A0A] mb-4">Estado de espírito</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {moodOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedMood(option.value)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedMood === option.value
                        ? `border-[#FFC300] ${option.bg} shadow-lg`
                        : 'border-[#E6C85C] hover:border-[#FFC300] bg-white'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        selectedMood === option.value ? option.color : 'text-[#4A4A4A]'
                      }`}
                    />
                    <div className="text-sm font-semibold text-[#0A0A0A]">
                      {option.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0A0A0A]">Nível de energia</h3>
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-[#FFC300]" />
                <span className="text-lg font-bold text-[#0A0A0A]">
                  {energyLevel[0]}/10
                </span>
              </div>
            </div>
            <Slider
              value={energyLevel}
              onValueChange={setEnergyLevel}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#4A4A4A] mt-2 font-medium">
              <span>Muito baixo</span>
              <span>Muito alto</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-bold text-[#0A0A0A] mb-4">
              Observações (opcional)
            </h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como foi seu dia? Algo específico que gostaria de compartilhar?"
              rows={4}
              className="bg-white border-[1.5px] border-[#0A0A0A] rounded-2xl focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] text-[#0A0A0A] resize-none"
            />
          </div>

          <Button
            onClick={saveCheckIn}
            disabled={!selectedMood}
            className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-bold py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:ring-offset-2 text-lg"
          >
            <Save className="w-5 h-5 mr-3" />
            Salvar Check-in
          </Button>
        </CardContent>
      </Card>

      {/* Previous Check-ins */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Calendar className="w-6 h-6 text-[#FFC300]" />
            Histórico de Check-ins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {checkIns.map((checkIn) => {
              const MoodIcon = getMoodIcon(checkIn.mood);
              return (
                <div
                  key={checkIn.id}
                  className="flex items-start gap-4 p-6 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]"
                >
                  <div className={`p-3 rounded-2xl ${getMoodBg(checkIn.mood)}`}>
                    <MoodIcon className={`w-6 h-6 ${getMoodColor(checkIn.mood)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-[#0A0A0A] text-lg">
                        {moodOptions.find((opt) => opt.value === checkIn.mood)?.label}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4 text-[#FFC300]" />
                          <span className="text-sm text-[#0A0A0A] font-bold">
                            {checkIn.energyLevel}/10
                          </span>
                        </div>
                        <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl text-xs">
                          {formatTimeAgo(checkIn.createdAt)}
                        </Badge>
                      </div>
                    </div>
                    {checkIn.notes && (
                      <p className="text-sm text-[#4A4A4A] font-medium">
                        {checkIn.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
