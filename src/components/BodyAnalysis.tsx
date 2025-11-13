'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Scale, 
  Ruler,
  Target,
  Calendar,
  Camera,
  Plus
} from 'lucide-react';

interface BodyAnalysisProps {
  userRole: 'trainer' | 'student';
}

export default function BodyAnalysis({ userRole }: BodyAnalysisProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

  const currentMeasurements = {
    weight: 75.2,
    height: 175,
    bodyFat: 15.8,
    muscleMass: 63.4,
    bmi: 24.6,
    waist: 82,
    chest: 98,
    arm: 35,
    thigh: 58
  };

  const progressData = [
    { month: 'Jan', weight: 78.5, bodyFat: 18.2, muscleMass: 60.8 },
    { month: 'Fev', weight: 77.1, bodyFat: 17.1, muscleMass: 61.9 },
    { month: 'Mar', weight: 75.8, bodyFat: 16.4, muscleMass: 62.7 },
    { month: 'Abr', weight: 75.2, bodyFat: 15.8, muscleMass: 63.4 }
  ];

  const goals = {
    targetWeight: 73,
    targetBodyFat: 12,
    targetMuscleMass: 65,
    deadline: '2024-08-01'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userRole === 'trainer' ? 'Análise Corporal dos Alunos' : 'Sua Análise Corporal'}
        </h2>
        <p className="text-white/80 text-lg">
          {userRole === 'trainer' 
            ? 'Acompanhe a evolução física dos seus alunos' 
            : 'Acompanhe sua evolução física mensal'
          }
        </p>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Peso Atual</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{currentMeasurements.weight}kg</p>
              </div>
              <Scale className="w-8 h-8 text-[#FFC300]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">% Gordura</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{currentMeasurements.bodyFat}%</p>
              </div>
              <Target className="w-8 h-8 text-[#E10600]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Massa Muscular</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{currentMeasurements.muscleMass}kg</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#1FBF75]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">IMC</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{currentMeasurements.bmi}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-[#3B82F6]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <TrendingUp className="w-6 h-6 text-[#FFC300]" />
              Evolução dos Últimos Meses
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={selectedPeriod === '3months' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('3months')}
                className="text-sm"
              >
                3 meses
              </Button>
              <Button 
                variant={selectedPeriod === '6months' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('6months')}
                className="text-sm"
              >
                6 meses
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progressData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                    <span className="font-bold text-[#0A0A0A]">{data.month}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#0A0A0A]">{data.month} 2024</p>
                    <p className="text-sm text-[#4A4A4A]">Medição mensal</p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-[#4A4A4A]">Peso</p>
                    <p className="font-bold text-[#0A0A0A]">{data.weight}kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#4A4A4A]">% Gordura</p>
                    <p className="font-bold text-[#E10600]">{data.bodyFat}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#4A4A4A]">Músculo</p>
                    <p className="font-bold text-[#1FBF75]">{data.muscleMass}kg</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Body Measurements */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <Ruler className="w-6 h-6 text-[#FFC300]" />
              Medidas Corporais
            </CardTitle>
            {userRole === 'trainer' && (
              <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Nova Medição
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-[#0A0A0A] text-lg">Medidas Principais</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#FFF3C4] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Cintura</span>
                  <span className="font-bold text-[#0A0A0A]">{currentMeasurements.waist}cm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#FFF3C4] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Peito</span>
                  <span className="font-bold text-[#0A0A0A]">{currentMeasurements.chest}cm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#FFF3C4] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Braço</span>
                  <span className="font-bold text-[#0A0A0A]">{currentMeasurements.arm}cm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#FFF3C4] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Coxa</span>
                  <span className="font-bold text-[#0A0A0A]">{currentMeasurements.thigh}cm</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-[#0A0A0A] text-lg">Metas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#E8F5E8] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Peso Meta</span>
                  <span className="font-bold text-[#1FBF75]">{goals.targetWeight}kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#FFE8E8] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">% Gordura Meta</span>
                  <span className="font-bold text-[#E10600]">{goals.targetBodyFat}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#E8F5E8] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Músculo Meta</span>
                  <span className="font-bold text-[#1FBF75]">{goals.targetMuscleMass}kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#FFF3C4] rounded-xl">
                  <span className="text-[#0A0A0A] font-medium">Prazo</span>
                  <span className="font-bold text-[#FFC300]">Ago 2024</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-[#0A0A0A] text-lg">Fotos de Progresso</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-[#FFF3C4] rounded-xl flex items-center justify-center border-2 border-dashed border-[#E6C85C]">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-[#4A4A4A] mx-auto mb-2" />
                    <p className="text-xs text-[#4A4A4A]">Frente</p>
                  </div>
                </div>
                <div className="aspect-square bg-[#FFF3C4] rounded-xl flex items-center justify-center border-2 border-dashed border-[#E6C85C]">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-[#4A4A4A] mx-auto mb-2" />
                    <p className="text-xs text-[#4A4A4A]">Lateral</p>
                  </div>
                </div>
                <div className="aspect-square bg-[#FFF3C4] rounded-xl flex items-center justify-center border-2 border-dashed border-[#E6C85C]">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-[#4A4A4A] mx-auto mb-2" />
                    <p className="text-xs text-[#4A4A4A]">Costas</p>
                  </div>
                </div>
                <Button className="aspect-square bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl">
                  <Plus className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Measurement */}
      <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="text-center text-white">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Próxima Análise Corporal</h3>
            <p className="text-lg mb-4">15 de Maio, 2024</p>
            <p className="text-white/80 mb-6">
              {userRole === 'trainer' 
                ? 'Agende a próxima avaliação com seus alunos' 
                : 'Sua próxima avaliação mensal está chegando'
              }
            </p>
            <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold py-3 px-8 rounded-2xl">
              <Calendar className="w-5 h-5 mr-2" />
              {userRole === 'trainer' ? 'Agendar Avaliação' : 'Lembrar-me'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}