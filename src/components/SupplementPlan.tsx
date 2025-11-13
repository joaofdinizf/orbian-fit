'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pill, 
  Clock, 
  Target, 
  AlertCircle,
  CheckCircle,
  Plus,
  Calendar,
  Zap
} from 'lucide-react';

interface SupplementPlanProps {
  userRole: 'trainer' | 'student';
}

export default function SupplementPlan({ userRole }: SupplementPlanProps) {
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null);

  const currentSupplements = [
    {
      id: 'whey-protein',
      name: 'Whey Protein Isolado',
      dosage: '30g',
      frequency: '2x ao dia',
      timing: ['Pós-treino', 'Antes de dormir'],
      purpose: 'Síntese proteica e recuperação muscular',
      duration: '3 meses',
      stock: 15,
      status: 'Ativo'
    },
    {
      id: 'creatine',
      name: 'Creatina Monohidratada',
      dosage: '5g',
      frequency: '1x ao dia',
      timing: ['Pós-treino'],
      purpose: 'Aumento de força e potência',
      duration: '6 meses',
      stock: 8,
      status: 'Ativo'
    },
    {
      id: 'omega3',
      name: 'Ômega 3 EPA/DHA',
      dosage: '2 cápsulas',
      frequency: '1x ao dia',
      timing: ['Com almoço'],
      purpose: 'Anti-inflamatório e saúde cardiovascular',
      duration: 'Contínuo',
      stock: 22,
      status: 'Ativo'
    },
    {
      id: 'vitamin-d',
      name: 'Vitamina D3',
      dosage: '2000 UI',
      frequency: '1x ao dia',
      timing: ['Manhã'],
      purpose: 'Saúde óssea e imunidade',
      duration: 'Contínuo',
      stock: 5,
      status: 'Baixo estoque'
    }
  ];

  const supplementSchedule = [
    { time: '07:00', supplements: ['Vitamina D3'], meal: 'Café da manhã' },
    { time: '12:30', supplements: ['Ômega 3'], meal: 'Almoço' },
    { time: '15:30', supplements: ['Whey Protein', 'Creatina'], meal: 'Pós-treino' },
    { time: '22:00', supplements: ['Whey Protein'], meal: 'Antes de dormir' }
  ];

  const recommendations = [
    {
      name: 'BCAA',
      reason: 'Para treinos em jejum',
      priority: 'Média',
      dosage: '10g antes do treino'
    },
    {
      name: 'Magnésio',
      reason: 'Melhora do sono e recuperação',
      priority: 'Alta',
      dosage: '400mg antes de dormir'
    },
    {
      name: 'Multivitamínico',
      reason: 'Cobertura nutricional completa',
      priority: 'Baixa',
      dosage: '1 cápsula pela manhã'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userRole === 'trainer' ? 'Suplementação dos Alunos' : 'Sua Suplementação Personalizada'}
        </h2>
        <p className="text-white/80 text-lg">
          {userRole === 'trainer' 
            ? 'Gerencie os planos de suplementação dos seus alunos' 
            : 'Plano de suplementos personalizado para seus objetivos'
          }
        </p>
      </div>

      {/* Current Supplements */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <Pill className="w-6 h-6 text-[#FFC300]" />
              Suplementos Atuais
            </CardTitle>
            {userRole === 'trainer' && (
              <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Suplemento
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentSupplements.map((supplement) => (
              <div 
                key={supplement.id}
                className={`
                  p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                  ${selectedSupplement === supplement.id 
                    ? 'bg-[#FFC300] border-[#E6C85C] shadow-lg' 
                    : 'bg-[#FFF3C4] border-[#E6C85C] hover:bg-[#FFC300]/50'
                  }
                `}
                onClick={() => setSelectedSupplement(selectedSupplement === supplement.id ? null : supplement.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center">
                      <Pill className="w-6 h-6 text-[#FFC300]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{supplement.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{supplement.dosage} • {supplement.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`
                      ${supplement.status === 'Ativo' ? 'bg-[#1FBF75] text-white' : ''}
                      ${supplement.status === 'Baixo estoque' ? 'bg-[#E10600] text-white' : ''}
                      font-bold px-3 py-1 rounded-xl
                    `}>
                      {supplement.status}
                    </Badge>
                    <span className="text-sm text-[#4A4A4A]">{supplement.stock} doses</span>
                  </div>
                </div>

                {selectedSupplement === supplement.id && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white rounded-xl">
                        <h4 className="font-bold text-[#0A0A0A] mb-2">Objetivo</h4>
                        <p className="text-[#4A4A4A] text-sm">{supplement.purpose}</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl">
                        <h4 className="font-bold text-[#0A0A0A] mb-2">Duração</h4>
                        <p className="text-[#4A4A4A] text-sm">{supplement.duration}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl">
                      <h4 className="font-bold text-[#0A0A0A] mb-2">Horários</h4>
                      <div className="flex gap-2">
                        {supplement.timing.map((time, index) => (
                          <Badge key={index} className="bg-[#E6C85C] text-[#0A0A0A] font-medium px-3 py-1 rounded-xl">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Schedule */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Clock className="w-6 h-6 text-[#FFC300]" />
            Cronograma Diário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supplementSchedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#FFC300] rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0A0A0A] text-lg">{schedule.time}</p>
                    <p className="text-sm text-[#4A4A4A]">{schedule.meal}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {schedule.supplements.map((supplement, suppIndex) => (
                    <Badge key={suppIndex} className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">
                      {supplement}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Target className="w-6 h-6 text-[#FFC300]" />
            Recomendações Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#FFC300]" />
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{rec.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{rec.dosage}</p>
                    </div>
                  </div>
                  <Badge className={`
                    ${rec.priority === 'Alta' ? 'bg-[#E10600] text-white' : ''}
                    ${rec.priority === 'Média' ? 'bg-[#FFC300] text-[#0A0A0A]' : ''}
                    ${rec.priority === 'Baixa' ? 'bg-[#1FBF75] text-white' : ''}
                    font-bold px-3 py-1 rounded-xl
                  `}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-[#4A4A4A] text-sm mb-3">{rec.reason}</p>
                <Button size="sm" className="bg-[#0A0A0A] hover:bg-[#2A2A2A] text-[#FFC300] rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar ao Plano
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="bg-white border-2 border-[#E10600] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#E10600] text-xl">
            <AlertCircle className="w-6 h-6" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#FFE8E8] rounded-xl">
              <AlertCircle className="w-5 h-5 text-[#E10600]" />
              <div>
                <p className="font-bold text-[#0A0A0A]">Vitamina D3 - Estoque baixo</p>
                <p className="text-sm text-[#4A4A4A]">Apenas 5 doses restantes. Reabasteça em breve.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#FFF3E8] rounded-xl">
              <Clock className="w-5 h-5 text-[#FFC300]" />
              <div>
                <p className="font-bold text-[#0A0A0A]">Lembrete: Próxima dose em 2 horas</p>
                <p className="text-sm text-[#4A4A4A]">Whey Protein + Creatina às 15:30</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-[#1FBF75] hover:bg-[#16A085] text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <CheckCircle className="w-5 h-5 mr-2" />
          {userRole === 'trainer' ? 'Ajustar Plano' : 'Marcar Dose Tomada'}
        </Button>
        <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <Calendar className="w-5 h-5 mr-2" />
          Histórico de Suplementação
        </Button>
      </div>
    </div>
  );
}