'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Calendar,
  Target,
  Activity,
  BarChart3,
  Clock
} from 'lucide-react';

interface DetailedReportsProps {
  userRole: 'trainer' | 'student';
}

export default function DetailedReports({ userRole }: DetailedReportsProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: 'monthly-april',
      title: 'Relatório Mensal - Abril 2024',
      type: 'Mensal',
      date: '2024-04-30',
      status: 'Concluído',
      highlights: {
        workoutsCompleted: 18,
        caloriesBurned: 3240,
        avgHeartRate: 142,
        strengthGain: '+12%'
      }
    },
    {
      id: 'quarterly-q1',
      title: 'Relatório Trimestral - Q1 2024',
      type: 'Trimestral',
      date: '2024-03-31',
      status: 'Concluído',
      highlights: {
        workoutsCompleted: 52,
        caloriesBurned: 9720,
        weightLoss: '-3.2kg',
        muscleGain: '+1.8kg'
      }
    },
    {
      id: 'progress-march',
      title: 'Análise de Progresso - Março',
      type: 'Progresso',
      date: '2024-03-31',
      status: 'Concluído',
      highlights: {
        consistency: '89%',
        goalAchievement: '94%',
        improvement: '+15%',
        satisfaction: '4.8/5'
      }
    }
  ];

  const currentMonthStats = {
    workoutsCompleted: 12,
    totalWorkouts: 16,
    caloriesBurned: 2180,
    avgWorkoutDuration: 52,
    strengthProgress: 8,
    cardioProgress: 12,
    consistencyRate: 75
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userRole === 'trainer' ? 'Relatórios dos Alunos' : 'Seus Relatórios Detalhados'}
        </h2>
        <p className="text-white/80 text-lg">
          {userRole === 'trainer' 
            ? 'Análises completas do progresso dos seus alunos' 
            : 'Acompanhe seu progresso com relatórios detalhados'
          }
        </p>
      </div>

      {/* Current Month Overview */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <BarChart3 className="w-6 h-6 text-[#FFC300]" />
            Resumo do Mês Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
              <Activity className="w-8 h-8 text-[#FFC300] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#0A0A0A]">
                {currentMonthStats.workoutsCompleted}/{currentMonthStats.totalWorkouts}
              </p>
              <p className="text-sm text-[#4A4A4A]">Treinos Concluídos</p>
            </div>
            <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
              <Target className="w-8 h-8 text-[#E10600] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#0A0A0A]">{currentMonthStats.caloriesBurned}</p>
              <p className="text-sm text-[#4A4A4A]">Calorias Queimadas</p>
            </div>
            <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
              <Clock className="w-8 h-8 text-[#1FBF75] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#0A0A0A]">{currentMonthStats.avgWorkoutDuration}min</p>
              <p className="text-sm text-[#4A4A4A]">Duração Média</p>
            </div>
            <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
              <TrendingUp className="w-8 h-8 text-[#3B82F6] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#0A0A0A]">{currentMonthStats.consistencyRate}%</p>
              <p className="text-sm text-[#4A4A4A]">Consistência</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#0A0A0A] font-medium">Progresso em Força</span>
                <span className="text-[#FFC300] font-bold">+{currentMonthStats.strengthProgress}%</span>
              </div>
              <div className="w-full bg-[#E6C85C] rounded-full h-3">
                <div 
                  className="bg-[#FFC300] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${currentMonthStats.strengthProgress * 5}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#0A0A0A] font-medium">Progresso Cardiovascular</span>
                <span className="text-[#1FBF75] font-bold">+{currentMonthStats.cardioProgress}%</span>
              </div>
              <div className="w-full bg-[#E6C85C] rounded-full h-3">
                <div 
                  className="bg-[#1FBF75] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${currentMonthStats.cardioProgress * 5}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <FileText className="w-6 h-6 text-[#FFC300]" />
            Relatórios Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className={`
                  p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                  ${selectedReport === report.id 
                    ? 'bg-[#FFC300] border-[#E6C85C] shadow-lg' 
                    : 'bg-[#FFF3C4] border-[#E6C85C] hover:bg-[#FFC300]/50'
                  }
                `}
                onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#0A0A0A]" />
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{report.title}</h3>
                      <p className="text-sm text-[#4A4A4A]">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`
                      ${report.type === 'Mensal' ? 'bg-[#1FBF75]' : ''}
                      ${report.type === 'Trimestral' ? 'bg-[#E10600]' : ''}
                      ${report.type === 'Progresso' ? 'bg-[#3B82F6]' : ''}
                      text-white font-bold px-3 py-1 rounded-xl
                    `}>
                      {report.type}
                    </Badge>
                    <Button 
                      size="sm"
                      className="bg-[#0A0A0A] hover:bg-[#2A2A2A] text-[#FFC300] rounded-xl"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>

                {selectedReport === report.id && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(report.highlights).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-white rounded-xl">
                        <p className="text-lg font-bold text-[#0A0A0A]">{value}</p>
                        <p className="text-xs text-[#4A4A4A] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Insights */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <TrendingUp className="w-6 h-6 text-[#FFC300]" />
            Insights e Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-[#E8F5E8] rounded-2xl border-l-4 border-[#1FBF75]">
              <h4 className="font-bold text-[#0A0A0A] mb-2">✅ Pontos Fortes</h4>
              <ul className="text-[#4A4A4A] space-y-1">
                <li>• Excelente consistência nos treinos de força</li>
                <li>• Melhoria significativa na resistência cardiovascular</li>
                <li>• Boa aderência ao plano nutricional</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#FFF3E8] rounded-2xl border-l-4 border-[#FFC300]">
              <h4 className="font-bold text-[#0A0A0A] mb-2">⚠️ Áreas de Atenção</h4>
              <ul className="text-[#4A4A4A] space-y-1">
                <li>• Aumentar frequência de treinos de flexibilidade</li>
                <li>• Melhorar hidratação durante os exercícios</li>
                <li>• Focar mais em exercícios funcionais</li>
              </ul>
            </div>

            <div className="p-4 bg-[#E8F0FF] rounded-2xl border-l-4 border-[#3B82F6]">
              <h4 className="font-bold text-[#0A0A0A] mb-2">🎯 Próximos Objetivos</h4>
              <ul className="text-[#4A4A4A] space-y-1">
                <li>• Aumentar carga nos exercícios compostos em 10%</li>
                <li>• Incluir 2 sessões de HIIT por semana</li>
                <li>• Manter consistência acima de 85%</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-[#1FBF75] hover:bg-[#16A085] text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <FileText className="w-5 h-5 mr-2" />
          {userRole === 'trainer' ? 'Gerar Novo Relatório' : 'Solicitar Relatório Personalizado'}
        </Button>
        <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <Calendar className="w-5 h-5 mr-2" />
          Agendar Revisão
        </Button>
      </div>
    </div>
  );
}