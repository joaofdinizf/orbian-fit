'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Calculator,
  Clock,
  MapPin,
  Heart,
  Save,
  ArrowLeft,
  CheckCircle,
  Timer,
  Target,
  TrendingUp
} from 'lucide-react';

interface VO2MaxTestsProps {
  userRole: 'trainer' | 'student';
}

interface TestResult {
  id: string;
  testType: 'cooper12min' | 'cooper2400m' | 'rockport';
  vo2max: number;
  date: string;
  studentName: string;
  testData: any;
}

export default function VO2MaxTests({ userRole }: VO2MaxTestsProps) {
  const [activeTest, setActiveTest] = useState<'cooper12min' | 'cooper2400m' | 'rockport' | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: '1',
      testType: 'cooper12min',
      vo2max: 48.7,
      date: '2024-01-15',
      studentName: 'João Silva',
      testData: { distance: 2800 }
    },
    {
      id: '2',
      testType: 'rockport',
      vo2max: 42.3,
      date: '2024-01-10',
      studentName: 'Maria Santos',
      testData: { gender: 'female', age: 28, weight: 65, time: 15.5, heartRate: 165 }
    }
  ]);
  const [showResult, setShowResult] = useState<TestResult | null>(null);

  // Estados para Cooper 12 minutos
  const [cooper12Data, setCooper12Data] = useState({
    distance: '',
    studentName: ''
  });

  // Estados para Cooper 2400m
  const [cooper2400Data, setCooper2400Data] = useState({
    minutes: '',
    seconds: '',
    studentName: ''
  });

  // Estados para Rockport
  const [rockportData, setRockportData] = useState({
    gender: 'male' as 'male' | 'female',
    age: '',
    weight: '',
    minutes: '',
    seconds: '',
    heartRate: '',
    studentName: ''
  });

  // Cálculo Cooper 12 minutos
  const calculateCooper12Min = () => {
    const distance = parseFloat(cooper12Data.distance);
    if (!distance || !cooper12Data.studentName) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const vo2max = (distance - 504.9) / 44.73;
    
    const result: TestResult = {
      id: Date.now().toString(),
      testType: 'cooper12min',
      vo2max: parseFloat(vo2max.toFixed(1)),
      date: new Date().toISOString().split('T')[0],
      studentName: cooper12Data.studentName,
      testData: { distance }
    };

    setShowResult(result);
  };

  // Cálculo Cooper 2400m
  const calculateCooper2400M = () => {
    const minutes = parseFloat(cooper2400Data.minutes);
    const seconds = parseFloat(cooper2400Data.seconds) || 0;
    
    if (!minutes || !cooper2400Data.studentName) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const timeMin = minutes + (seconds / 60);
    const vo2max = 483 / timeMin + 3.5;
    
    const result: TestResult = {
      id: Date.now().toString(),
      testType: 'cooper2400m',
      vo2max: parseFloat(vo2max.toFixed(1)),
      date: new Date().toISOString().split('T')[0],
      studentName: cooper2400Data.studentName,
      testData: { timeMin: parseFloat(timeMin.toFixed(2)) }
    };

    setShowResult(result);
  };

  // Cálculo Rockport
  const calculateRockport = () => {
    const age = parseFloat(rockportData.age);
    const weight = parseFloat(rockportData.weight);
    const minutes = parseFloat(rockportData.minutes);
    const seconds = parseFloat(rockportData.seconds) || 0;
    const heartRate = parseFloat(rockportData.heartRate);
    
    if (!age || !weight || !minutes || !heartRate || !rockportData.studentName) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const timeMin = minutes + (seconds / 60);
    const weightLb = weight * 2.20462;
    const sexFlag = rockportData.gender === 'male' ? 1 : 0;
    
    const vo2max = 132.853 
      - (0.0769 * weightLb) 
      - (0.3877 * age) 
      - (3.2649 * timeMin) 
      - (0.1565 * heartRate) 
      + (6.315 * sexFlag);
    
    const result: TestResult = {
      id: Date.now().toString(),
      testType: 'rockport',
      vo2max: parseFloat(vo2max.toFixed(1)),
      date: new Date().toISOString().split('T')[0],
      studentName: rockportData.studentName,
      testData: { 
        gender: rockportData.gender, 
        age, 
        weight, 
        timeMin: parseFloat(timeMin.toFixed(2)), 
        heartRate 
      }
    };

    setShowResult(result);
  };

  // Salvar resultado
  const saveResult = () => {
    if (showResult) {
      setTestResults(prev => [...prev, showResult]);
      setShowResult(null);
      setActiveTest(null);
      
      // Limpar formulários
      setCooper12Data({ distance: '', studentName: '' });
      setCooper2400Data({ minutes: '', seconds: '', studentName: '' });
      setRockportData({
        gender: 'male',
        age: '',
        weight: '',
        minutes: '',
        seconds: '',
        heartRate: '',
        studentName: ''
      });
    }
  };

  const getTestTypeName = (type: string) => {
    switch (type) {
      case 'cooper12min': return 'Cooper 12 min';
      case 'cooper2400m': return 'Cooper 2400m';
      case 'rockport': return 'Rockport';
      default: return type;
    }
  };

  const getVO2MaxCategory = (vo2max: number) => {
    if (vo2max >= 60) return { category: 'Excelente', color: 'bg-green-500' };
    if (vo2max >= 50) return { category: 'Muito Bom', color: 'bg-blue-500' };
    if (vo2max >= 40) return { category: 'Bom', color: 'bg-yellow-500' };
    if (vo2max >= 30) return { category: 'Regular', color: 'bg-orange-500' };
    return { category: 'Fraco', color: 'bg-red-500' };
  };

  // Tela de resultado
  if (showResult) {
    const category = getVO2MaxCategory(showResult.vo2max);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Resultado do Teste de VO2máx</h2>
          </div>
          <Button
            onClick={() => setShowResult(null)}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-[#FFC300] rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-10 h-10 text-[#0A0A0A]" />
            </div>
            <CardTitle className="text-3xl font-bold text-[#0A0A0A] mb-2">
              VO2máx: {showResult.vo2max} ml/kg/min
            </CardTitle>
            <Badge className={`${category.color} text-white font-bold px-4 py-2 rounded-xl text-lg`}>
              {category.category}
            </Badge>
            <p className="text-[#4A4A4A] mt-4">
              Estimativa baseada no {getTestTypeName(showResult.testType)}
              {showResult.testType === 'cooper12min' && ' (12 min)'}
              {showResult.testType === 'cooper2400m' && ' (1,5 milha)'}
              {showResult.testType === 'rockport' && ' (1 milha)'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0A0A0A] text-lg">Dados do Teste</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Aluno:</span>
                    <span className="font-medium text-[#0A0A0A]">{showResult.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Data:</span>
                    <span className="font-medium text-[#0A0A0A]">
                      {new Date(showResult.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Tipo de Teste:</span>
                    <span className="font-medium text-[#0A0A0A]">{getTestTypeName(showResult.testType)}</span>
                  </div>
                  
                  {showResult.testType === 'cooper12min' && (
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A]">Distância:</span>
                      <span className="font-medium text-[#0A0A0A]">{showResult.testData.distance}m</span>
                    </div>
                  )}
                  
                  {showResult.testType === 'cooper2400m' && (
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A]">Tempo:</span>
                      <span className="font-medium text-[#0A0A0A]">{showResult.testData.timeMin} min</span>
                    </div>
                  )}
                  
                  {showResult.testType === 'rockport' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-[#4A4A4A]">Sexo:</span>
                        <span className="font-medium text-[#0A0A0A]">
                          {showResult.testData.gender === 'male' ? 'Masculino' : 'Feminino'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A4A4A]">Idade:</span>
                        <span className="font-medium text-[#0A0A0A]">{showResult.testData.age} anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A4A4A]">Peso:</span>
                        <span className="font-medium text-[#0A0A0A]">{showResult.testData.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A4A4A]">Tempo:</span>
                        <span className="font-medium text-[#0A0A0A]">{showResult.testData.timeMin} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A4A4A]">FC Final:</span>
                        <span className="font-medium text-[#0A0A0A]">{showResult.testData.heartRate} bpm</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0A0A0A] text-lg">Interpretação</h3>
                <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <p className="text-[#0A0A0A] text-sm leading-relaxed">
                    O VO2máx representa a capacidade máxima do organismo de consumir oxigênio durante o exercício. 
                    Um valor de <strong>{showResult.vo2max} ml/kg/min</strong> indica uma condição cardiovascular <strong>{category.category.toLowerCase()}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={saveResult}
                className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
              >
                <Save className="w-5 h-5 mr-2" />
                Salvar Resultado no Histórico
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Teste Cooper 12 minutos
  if (activeTest === 'cooper12min') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Timer className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Teste de Cooper - 12 minutos</h2>
          </div>
          <Button
            onClick={() => setActiveTest(null)}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Clock className="w-5 h-5 text-[#FFC300]" />
              Instruções do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
              <p className="text-[#0A0A0A] leading-relaxed">
                <strong>Objetivo:</strong> Correr ou caminhar a maior distância possível em 12 minutos.
              </p>
              <p className="text-[#0A0A0A] leading-relaxed mt-2">
                <strong>Como fazer:</strong> Marque a distância total percorrida em metros ao final dos 12 minutos.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Calculator className="w-5 h-5 text-[#FFC300]" />
              Dados do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-[#0A0A0A] font-medium">
                  Nome do Aluno *
                </Label>
                <Input
                  id="studentName"
                  value={cooper12Data.studentName}
                  onChange={(e) => setCooper12Data(prev => ({ ...prev, studentName: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome completo do aluno"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance" className="text-[#0A0A0A] font-medium">
                  Distância Percorrida (metros) *
                </Label>
                <Input
                  id="distance"
                  type="number"
                  value={cooper12Data.distance}
                  onChange={(e) => setCooper12Data(prev => ({ ...prev, distance: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 2800"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={calculateCooper12Min}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold px-8 py-3 rounded-2xl"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular VO2máx
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Teste Cooper 2400m
  if (activeTest === 'cooper2400m') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Teste de Cooper - 2400m (1,5 milha)</h2>
          </div>
          <Button
            onClick={() => setActiveTest(null)}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Target className="w-5 h-5 text-[#FFC300]" />
              Instruções do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
              <p className="text-[#0A0A0A] leading-relaxed">
                <strong>Objetivo:</strong> Correr 2400 metros (1,5 milha) no menor tempo possível.
              </p>
              <p className="text-[#0A0A0A] leading-relaxed mt-2">
                <strong>Como fazer:</strong> Cronometrar o tempo total para completar a distância de 2400m.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Calculator className="w-5 h-5 text-[#FFC300]" />
              Dados do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName2400" className="text-[#0A0A0A] font-medium">
                  Nome do Aluno *
                </Label>
                <Input
                  id="studentName2400"
                  value={cooper2400Data.studentName}
                  onChange={(e) => setCooper2400Data(prev => ({ ...prev, studentName: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome completo do aluno"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minutes2400" className="text-[#0A0A0A] font-medium">
                  Tempo - Minutos *
                </Label>
                <Input
                  id="minutes2400"
                  type="number"
                  value={cooper2400Data.minutes}
                  onChange={(e) => setCooper2400Data(prev => ({ ...prev, minutes: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seconds2400" className="text-[#0A0A0A] font-medium">
                  Tempo - Segundos
                </Label>
                <Input
                  id="seconds2400"
                  type="number"
                  value={cooper2400Data.seconds}
                  onChange={(e) => setCooper2400Data(prev => ({ ...prev, seconds: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 30"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={calculateCooper2400M}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold px-8 py-3 rounded-2xl"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular VO2máx
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Teste Rockport
  if (activeTest === 'rockport') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Teste de Caminhada - Rockport (1 milha)</h2>
          </div>
          <Button
            onClick={() => setActiveTest(null)}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Target className="w-5 h-5 text-[#FFC300]" />
              Instruções do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
              <p className="text-[#0A0A0A] leading-relaxed">
                <strong>Objetivo:</strong> Caminhar 1 milha (1609 metros) o mais rápido possível, sem correr.
              </p>
              <p className="text-[#0A0A0A] leading-relaxed mt-2">
                <strong>Como fazer:</strong> Cronometrar o tempo total e medir a frequência cardíaca imediatamente ao final.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Calculator className="w-5 h-5 text-[#FFC300]" />
              Dados do Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentNameRockport" className="text-[#0A0A0A] font-medium">
                  Nome do Aluno *
                </Label>
                <Input
                  id="studentNameRockport"
                  value={rockportData.studentName}
                  onChange={(e) => setRockportData(prev => ({ ...prev, studentName: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome completo do aluno"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#0A0A0A] font-medium">Sexo *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={rockportData.gender === 'male'}
                      onChange={(e) => setRockportData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                      className="text-[#FFC300]"
                    />
                    <span className="text-[#0A0A0A]">Masculino</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={rockportData.gender === 'female'}
                      onChange={(e) => setRockportData(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                      className="text-[#FFC300]"
                    />
                    <span className="text-[#0A0A0A]">Feminino</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-[#0A0A0A] font-medium">
                  Idade (anos) *
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={rockportData.age}
                  onChange={(e) => setRockportData(prev => ({ ...prev, age: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 28"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-[#0A0A0A] font-medium">
                  Peso (kg) *
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={rockportData.weight}
                  onChange={(e) => setRockportData(prev => ({ ...prev, weight: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 70.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minutesRockport" className="text-[#0A0A0A] font-medium">
                  Tempo - Minutos *
                </Label>
                <Input
                  id="minutesRockport"
                  type="number"
                  value={rockportData.minutes}
                  onChange={(e) => setRockportData(prev => ({ ...prev, minutes: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondsRockport" className="text-[#0A0A0A] font-medium">
                  Tempo - Segundos
                </Label>
                <Input
                  id="secondsRockport"
                  type="number"
                  value={rockportData.seconds}
                  onChange={(e) => setRockportData(prev => ({ ...prev, seconds: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate" className="text-[#0A0A0A] font-medium">
                  FC Final (bpm) *
                </Label>
                <Input
                  id="heartRate"
                  type="number"
                  value={rockportData.heartRate}
                  onChange={(e) => setRockportData(prev => ({ ...prev, heartRate: e.target.value }))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 165"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={calculateRockport}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold px-8 py-3 rounded-2xl"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular VO2máx
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela principal - seleção de testes
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#FFC300]" />
          <h2 className="text-2xl font-bold text-white">Testes de VO2máx</h2>
        </div>
      </div>

      {/* Seleção de Testes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl cursor-pointer hover:border-[#FFC300] transition-colors"
          onClick={() => setActiveTest('cooper12min')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-[#FFC300] rounded-full flex items-center justify-center mx-auto mb-4">
              <Timer className="w-8 h-8 text-[#0A0A0A]" />
            </div>
            <CardTitle className="text-xl font-bold text-[#0A0A0A] mb-2">
              Teste de Cooper
            </CardTitle>
            <Badge className="bg-[#FFC300] text-[#0A0A0A] font-medium px-3 py-1 rounded-xl">
              12 minutos
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-[#4A4A4A] mb-4">
              Correr ou caminhar a maior distância possível em 12 minutos
            </p>
            <Button className="w-full bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl">
              Iniciar Teste
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl cursor-pointer hover:border-[#FFC300] transition-colors"
          onClick={() => setActiveTest('cooper2400m')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-[#0A0A0A] mb-2">
              Teste de Cooper
            </CardTitle>
            <Badge className="bg-[#E10600] text-white font-medium px-3 py-1 rounded-xl">
              2400m (1,5 milha)
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-[#4A4A4A] mb-4">
              Correr 2400 metros no menor tempo possível
            </p>
            <Button className="w-full bg-[#E10600] hover:bg-[#C00000] text-white rounded-xl">
              Iniciar Teste
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl cursor-pointer hover:border-[#FFC300] transition-colors"
          onClick={() => setActiveTest('rockport')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-[#1FBF75] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-[#0A0A0A] mb-2">
              Teste de Caminhada
            </CardTitle>
            <Badge className="bg-[#1FBF75] text-white font-medium px-3 py-1 rounded-xl">
              Rockport (1 milha)
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-[#4A4A4A] mb-4">
              Caminhar 1 milha o mais rápido possível, sem correr
            </p>
            <Button className="w-full bg-[#1FBF75] hover:bg-[#1AA366] text-white rounded-xl">
              Iniciar Teste
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Resultados */}
      {testResults.length > 0 && (
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <TrendingUp className="w-5 h-5 text-[#FFC300]" />
              Histórico de Testes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result) => {
                const category = getVO2MaxCategory(result.vo2max);
                return (
                  <div key={result.id} className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-[#0A0A0A]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0A0A0A]">{result.studentName}</p>
                        <p className="text-sm text-[#4A4A4A]">
                          {getTestTypeName(result.testType)} - {new Date(result.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#0A0A0A]">{result.vo2max}</p>
                      <p className="text-sm text-[#4A4A4A]">ml/kg/min</p>
                      <Badge className={`${category.color} text-white text-xs mt-1`}>
                        {category.category}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {testResults.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-12 text-center">
            <Activity className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum teste realizado</h3>
            <p className="text-white/80 mb-6">
              Escolha um dos testes acima para começar a avaliar o VO2máx dos seus alunos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}