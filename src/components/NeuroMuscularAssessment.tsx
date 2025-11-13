'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Save,
  Plus,
  ArrowLeft,
  Clock,
  Target,
  TrendingUp,
  User,
  Calendar,
  CheckCircle,
  Timer,
  Zap,
  Dumbbell
} from 'lucide-react';

interface NeuroMuscularAssessmentProps {
  userRole: 'trainer' | 'student';
}

interface TestData {
  id: string;
  type: 'flexao' | 'abdominal' | 'prancha' | 'salto';
  completed: boolean;
  data: any;
}

interface Assessment {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  evaluatorName?: string;
  generalObservations: string;
  tests: TestData[];
}

export default function NeuroMuscularAssessment({ userRole }: NeuroMuscularAssessmentProps) {
  const [activeView, setActiveView] = useState<'list' | 'new' | 'view' | 'test'>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [activeTest, setActiveTest] = useState<'flexao' | 'abdominal' | 'prancha' | 'salto' | null>(null);
  
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'João Silva',
      date: '2024-01-15',
      evaluatorName: 'Prof. Carlos',
      generalObservations: 'Aluno apresenta boa disposição para os testes. Primeira avaliação neuromuscular.',
      tests: [
        {
          id: '1',
          type: 'flexao',
          completed: true,
          data: {
            position: 'padrao',
            repetitions: 25,
            time: 60,
            observations: 'Boa execução técnica'
          }
        },
        {
          id: '2',
          type: 'abdominal',
          completed: true,
          data: {
            repetitions: 35,
            observations: 'Ritmo constante durante todo o teste'
          }
        }
      ]
    }
  ]);

  const [formData, setFormData] = useState<Partial<Assessment>>({
    studentName: '',
    date: new Date().toISOString().split('T')[0],
    evaluatorName: '',
    generalObservations: '',
    tests: []
  });

  // Estados para cada teste
  const [flexaoData, setFlexaoData] = useState({
    position: 'padrao' as 'padrao' | 'adaptada',
    repetitions: '',
    time: '',
    observations: ''
  });

  const [abdominalData, setAbdominalData] = useState({
    repetitions: '',
    observations: ''
  });

  const [pranchaData, setPranchaData] = useState({
    time: '',
    variation: 'anterior' as 'anterior' | 'lateral_direita' | 'lateral_esquerda',
    observations: ''
  });

  const [saltoData, setSaltoData] = useState({
    attempts: ['', '', ''],
    observations: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTestName = (type: string) => {
    switch (type) {
      case 'flexao': return 'Flexão de Braços';
      case 'abdominal': return 'Abdominal 1 min';
      case 'prancha': return 'Prancha Isométrica';
      case 'salto': return 'Salto Horizontal';
      default: return type;
    }
  };

  const getTestIcon = (type: string) => {
    switch (type) {
      case 'flexao': return <Dumbbell className="w-5 h-5" />;
      case 'abdominal': return <Target className="w-5 h-5" />;
      case 'prancha': return <Timer className="w-5 h-5" />;
      case 'salto': return <Zap className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const calculateFlexaoIndex = (repetitions: number, time: number) => {
    if (time > 0) {
      return (repetitions / time).toFixed(2);
    }
    return null;
  };

  const getBestJump = (attempts: string[]) => {
    const validAttempts = attempts.filter(a => a && parseFloat(a) > 0).map(a => parseFloat(a));
    return validAttempts.length > 0 ? Math.max(...validAttempts) : 0;
  };

  const saveTest = () => {
    let testData: any = {};
    
    switch (activeTest) {
      case 'flexao':
        if (!flexaoData.repetitions) {
          alert('Por favor, preencha o número de repetições.');
          return;
        }
        testData = {
          type: 'flexao',
          completed: true,
          data: {
            position: flexaoData.position,
            repetitions: parseInt(flexaoData.repetitions),
            time: flexaoData.time ? parseInt(flexaoData.time) : null,
            observations: flexaoData.observations
          }
        };
        break;
      
      case 'abdominal':
        if (!abdominalData.repetitions) {
          alert('Por favor, preencha o número de repetições.');
          return;
        }
        testData = {
          type: 'abdominal',
          completed: true,
          data: {
            repetitions: parseInt(abdominalData.repetitions),
            observations: abdominalData.observations
          }
        };
        break;
      
      case 'prancha':
        if (!pranchaData.time) {
          alert('Por favor, preencha o tempo mantido.');
          return;
        }
        testData = {
          type: 'prancha',
          completed: true,
          data: {
            time: parseInt(pranchaData.time),
            variation: pranchaData.variation,
            observations: pranchaData.observations
          }
        };
        break;
      
      case 'salto':
        const validAttempts = saltoData.attempts.filter(a => a && parseFloat(a) > 0);
        if (validAttempts.length === 0) {
          alert('Por favor, registre pelo menos uma tentativa de salto.');
          return;
        }
        testData = {
          type: 'salto',
          completed: true,
          data: {
            attempts: saltoData.attempts.map(a => a ? parseFloat(a) : null).filter(a => a !== null),
            bestJump: getBestJump(saltoData.attempts),
            observations: saltoData.observations
          }
        };
        break;
    }

    // Atualizar formData com o teste
    const currentTests = formData.tests || [];
    const existingTestIndex = currentTests.findIndex(t => t.type === activeTest);
    
    if (existingTestIndex >= 0) {
      currentTests[existingTestIndex] = { ...testData, id: currentTests[existingTestIndex].id };
    } else {
      currentTests.push({ ...testData, id: Date.now().toString() });
    }

    setFormData(prev => ({ ...prev, tests: currentTests }));
    setActiveView('new');
    setActiveTest(null);

    // Limpar dados do teste
    setFlexaoData({ position: 'padrao', repetitions: '', time: '', observations: '' });
    setAbdominalData({ repetitions: '', observations: '' });
    setPranchaData({ time: '', variation: 'anterior', observations: '' });
    setSaltoData({ attempts: ['', '', ''], observations: '' });
  };

  const saveAssessment = () => {
    if (!formData.studentName) {
      alert('Por favor, preencha o nome do aluno.');
      return;
    }

    const newAssessment: Assessment = {
      ...formData,
      id: Date.now().toString(),
      tests: formData.tests || []
    } as Assessment;

    setAssessments(prev => [...prev, newAssessment]);
    setActiveView('list');
    setFormData({
      studentName: '',
      date: new Date().toISOString().split('T')[0],
      evaluatorName: '',
      generalObservations: '',
      tests: []
    });
  };

  const handleView = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setActiveView('view');
  };

  // Tela de teste específico
  if (activeView === 'test' && activeTest) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getTestIcon(activeTest)}
            <h2 className="text-2xl font-bold text-white">{getTestName(activeTest)}</h2>
          </div>
          <Button
            onClick={() => setActiveView('new')}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Teste de Flexão de Braços */}
        {activeTest === 'flexao' && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Dumbbell className="w-5 h-5 text-[#FFC300]" />
                Teste de Flexão de Braços - Resistência MMSS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <p className="text-[#0A0A0A] leading-relaxed">
                  <strong>Objetivo:</strong> Avaliar a resistência muscular dos membros superiores através de flexões de braço.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">Posição Utilizada *</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="position"
                        value="padrao"
                        checked={flexaoData.position === 'padrao'}
                        onChange={(e) => setFlexaoData(prev => ({ ...prev, position: e.target.value as 'padrao' | 'adaptada' }))}
                        className="text-[#FFC300]"
                      />
                      <span className="text-[#0A0A0A]">Padrão (apoio mãos e pés)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="position"
                        value="adaptada"
                        checked={flexaoData.position === 'adaptada'}
                        onChange={(e) => setFlexaoData(prev => ({ ...prev, position: e.target.value as 'padrao' | 'adaptada' }))}
                        className="text-[#FFC300]"
                      />
                      <span className="text-[#0A0A0A]">Adaptada (apoio joelhos)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repetitions" className="text-[#0A0A0A] font-medium">
                    Número de Repetições Completas *
                  </Label>
                  <Input
                    id="repetitions"
                    type="number"
                    value={flexaoData.repetitions}
                    onChange={(e) => setFlexaoData(prev => ({ ...prev, repetitions: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Ex: 25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-[#0A0A0A] font-medium">
                    Tempo Total do Teste (segundos)
                  </Label>
                  <Input
                    id="time"
                    type="number"
                    value={flexaoData.time}
                    onChange={(e) => setFlexaoData(prev => ({ ...prev, time: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Ex: 60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations" className="text-[#0A0A0A] font-medium">Observações</Label>
                  <Textarea
                    id="observations"
                    value={flexaoData.observations}
                    onChange={(e) => setFlexaoData(prev => ({ ...prev, observations: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Observações sobre a execução do teste..."
                    rows={3}
                  />
                </div>
              </div>

              {flexaoData.repetitions && (
                <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Resultado</h4>
                  <p className="text-[#0A0A0A]">
                    <strong>Repetições realizadas:</strong> {flexaoData.repetitions}
                  </p>
                  {flexaoData.time && (
                    <p className="text-[#0A0A0A]">
                      <strong>Índice de resistência MMSS:</strong> {calculateFlexaoIndex(parseInt(flexaoData.repetitions), parseInt(flexaoData.time))} rep/seg
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  onClick={saveTest}
                  className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Teste Abdominal */}
        {activeTest === 'abdominal' && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Target className="w-5 h-5 text-[#FFC300]" />
                Teste de Abdominal em 1 minuto - Core Dinâmico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <p className="text-[#0A0A0A] leading-relaxed">
                  <strong>Objetivo:</strong> Avaliar a resistência muscular do core através de abdominais em 1 minuto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="abdominalReps" className="text-[#0A0A0A] font-medium">
                    Repetições Completas em 1 minuto *
                  </Label>
                  <Input
                    id="abdominalReps"
                    type="number"
                    value={abdominalData.repetitions}
                    onChange={(e) => setAbdominalData(prev => ({ ...prev, repetitions: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Ex: 35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abdominalObs" className="text-[#0A0A0A] font-medium">Observações</Label>
                  <Textarea
                    id="abdominalObs"
                    value={abdominalData.observations}
                    onChange={(e) => setAbdominalData(prev => ({ ...prev, observations: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Observações sobre a execução do teste..."
                    rows={3}
                  />
                </div>
              </div>

              {abdominalData.repetitions && (
                <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Resultado</h4>
                  <p className="text-[#0A0A0A]">
                    <strong>Repetições de abdominal:</strong> {abdominalData.repetitions} em 1 minuto
                  </p>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  onClick={saveTest}
                  className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Teste Prancha */}
        {activeTest === 'prancha' && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Timer className="w-5 h-5 text-[#FFC300]" />
                Teste de Prancha Isométrica - Core Estático
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <p className="text-[#0A0A0A] leading-relaxed">
                  <strong>Objetivo:</strong> Avaliar a resistência isométrica do core através da manutenção da posição de prancha.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pranchaTime" className="text-[#0A0A0A] font-medium">
                    Tempo Mantido na Posição (segundos) *
                  </Label>
                  <Input
                    id="pranchaTime"
                    type="number"
                    value={pranchaData.time}
                    onChange={(e) => setPranchaData(prev => ({ ...prev, time: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Ex: 90"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">Variação Utilizada *</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="variation"
                        value="anterior"
                        checked={pranchaData.variation === 'anterior'}
                        onChange={(e) => setPranchaData(prev => ({ ...prev, variation: e.target.value as any }))}
                        className="text-[#FFC300]"
                      />
                      <span className="text-[#0A0A0A]">Prancha anterior</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="variation"
                        value="lateral_direita"
                        checked={pranchaData.variation === 'lateral_direita'}
                        onChange={(e) => setPranchaData(prev => ({ ...prev, variation: e.target.value as any }))}
                        className="text-[#FFC300]"
                      />
                      <span className="text-[#0A0A0A]">Prancha lateral direita</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="variation"
                        value="lateral_esquerda"
                        checked={pranchaData.variation === 'lateral_esquerda'}
                        onChange={(e) => setPranchaData(prev => ({ ...prev, variation: e.target.value as any }))}
                        className="text-[#FFC300]"
                      />
                      <span className="text-[#0A0A0A]">Prancha lateral esquerda</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pranchaObs" className="text-[#0A0A0A] font-medium">Observações</Label>
                  <Textarea
                    id="pranchaObs"
                    value={pranchaData.observations}
                    onChange={(e) => setPranchaData(prev => ({ ...prev, observations: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Observações sobre a execução do teste..."
                    rows={3}
                  />
                </div>
              </div>

              {pranchaData.time && (
                <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Resultado</h4>
                  <p className="text-[#0A0A0A]">
                    <strong>Tempo de prancha:</strong> {pranchaData.time} segundos
                  </p>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  onClick={saveTest}
                  className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Teste Salto Horizontal */}
        {activeTest === 'salto' && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Zap className="w-5 h-5 text-[#FFC300]" />
                Teste de Salto Horizontal - Potência MMII
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <p className="text-[#0A0A0A] leading-relaxed">
                  <strong>Objetivo:</strong> Avaliar a potência dos membros inferiores através do salto horizontal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">
                    Distância dos Saltos (cm) - Registre de 1 a 3 tentativas
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {saltoData.attempts.map((attempt, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-[#0A0A0A] text-sm">Tentativa {index + 1}</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={attempt}
                          onChange={(e) => {
                            const newAttempts = [...saltoData.attempts];
                            newAttempts[index] = e.target.value;
                            setSaltoData(prev => ({ ...prev, attempts: newAttempts }));
                          }}
                          className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                          placeholder="Ex: 240.5"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saltoObs" className="text-[#0A0A0A] font-medium">Observações</Label>
                  <Textarea
                    id="saltoObs"
                    value={saltoData.observations}
                    onChange={(e) => setSaltoData(prev => ({ ...prev, observations: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="Observações sobre a execução do teste..."
                    rows={3}
                  />
                </div>
              </div>

              {saltoData.attempts.some(a => a && parseFloat(a) > 0) && (
                <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Resultado</h4>
                  <p className="text-[#0A0A0A] mb-2">
                    <strong>Melhor salto:</strong> {getBestJump(saltoData.attempts)} cm
                  </p>
                  <div className="space-y-1">
                    <p className="text-[#4A4A4A] text-sm font-medium">Lista dos saltos registrados:</p>
                    {saltoData.attempts.map((attempt, index) => (
                      attempt && parseFloat(attempt) > 0 && (
                        <p key={index} className="text-[#0A0A0A] text-sm">
                          Tentativa {index + 1}: {attempt} cm
                        </p>
                      )
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  onClick={saveTest}
                  className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Tela de visualização
  if (activeView === 'view' && selectedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">
              Avaliação Neuromuscular - {selectedAssessment.studentName}
            </h2>
          </div>
          <Button
            onClick={() => setActiveView('list')}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            Voltar
          </Button>
        </div>

        {/* Informações Gerais */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <User className="w-5 h-5 text-[#FFC300]" />
              Informações da Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Aluno</Label>
                <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.studentName}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Data</Label>
                <p className="text-xl font-bold text-[#0A0A0A]">
                  {new Date(selectedAssessment.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              {selectedAssessment.evaluatorName && (
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Avaliador</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.evaluatorName}</p>
                </div>
              )}
            </div>
            {selectedAssessment.generalObservations && (
              <div>
                <Label className="text-[#4A4A4A] text-sm">Observações Gerais</Label>
                <p className="text-[#0A0A0A] mt-1">{selectedAssessment.generalObservations}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Testes Realizados */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <TrendingUp className="w-5 h-5 text-[#FFC300]" />
              Testes Realizados ({selectedAssessment.tests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedAssessment.tests.map((test) => (
              <div key={test.id} className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex items-center gap-3 mb-3">
                  {getTestIcon(test.type)}
                  <h4 className="font-semibold text-[#0A0A0A]">{getTestName(test.type)}</h4>
                  <Badge className="bg-[#1FBF75] text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Concluído
                  </Badge>
                </div>

                {test.type === 'flexao' && (
                  <div className="space-y-2">
                    <p className="text-[#0A0A0A]">
                      <strong>Posição:</strong> {test.data.position === 'padrao' ? 'Padrão (apoio mãos e pés)' : 'Adaptada (apoio joelhos)'}
                    </p>
                    <p className="text-[#0A0A0A]">
                      <strong>Repetições realizadas:</strong> {test.data.repetitions}
                    </p>
                    {test.data.time && (
                      <p className="text-[#0A0A0A]">
                        <strong>Índice de resistência MMSS:</strong> {calculateFlexaoIndex(test.data.repetitions, test.data.time)} rep/seg
                      </p>
                    )}
                    {test.data.observations && (
                      <p className="text-[#4A4A4A] text-sm">
                        <strong>Observações:</strong> {test.data.observations}
                      </p>
                    )}
                  </div>
                )}

                {test.type === 'abdominal' && (
                  <div className="space-y-2">
                    <p className="text-[#0A0A0A]">
                      <strong>Repetições de abdominal:</strong> {test.data.repetitions} em 1 minuto
                    </p>
                    {test.data.observations && (
                      <p className="text-[#4A4A4A] text-sm">
                        <strong>Observações:</strong> {test.data.observations}
                      </p>
                    )}
                  </div>
                )}

                {test.type === 'prancha' && (
                  <div className="space-y-2">
                    <p className="text-[#0A0A0A]">
                      <strong>Tempo de prancha:</strong> {test.data.time} segundos
                    </p>
                    <p className="text-[#0A0A0A]">
                      <strong>Variação:</strong> {
                        test.data.variation === 'anterior' ? 'Prancha anterior' :
                        test.data.variation === 'lateral_direita' ? 'Prancha lateral direita' :
                        'Prancha lateral esquerda'
                      }
                    </p>
                    {test.data.observations && (
                      <p className="text-[#4A4A4A] text-sm">
                        <strong>Observações:</strong> {test.data.observations}
                      </p>
                    )}
                  </div>
                )}

                {test.type === 'salto' && (
                  <div className="space-y-2">
                    <p className="text-[#0A0A0A]">
                      <strong>Melhor salto:</strong> {test.data.bestJump} cm
                    </p>
                    <div>
                      <p className="text-[#0A0A0A] font-medium">Lista dos saltos registrados:</p>
                      {test.data.attempts.map((attempt: number, index: number) => (
                        <p key={index} className="text-[#4A4A4A] text-sm">
                          Tentativa {index + 1}: {attempt} cm
                        </p>
                      ))}
                    </div>
                    {test.data.observations && (
                      <p className="text-[#4A4A4A] text-sm">
                        <strong>Observações:</strong> {test.data.observations}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {selectedAssessment.tests.length === 0 && (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                <p className="text-[#4A4A4A]">Nenhum teste foi realizado nesta avaliação.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de nova avaliação
  if (activeView === 'new') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Nova Avaliação Neuromuscular</h2>
          </div>
          <Button
            onClick={() => setActiveView('list')}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Informações Básicas */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <User className="w-5 h-5 text-[#FFC300]" />
              Informações da Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-[#0A0A0A] font-medium">Nome do Aluno *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome completo do aluno"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#0A0A0A] font-medium">Data da Avaliação *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evaluatorName" className="text-[#0A0A0A] font-medium">Nome do Avaliador</Label>
                <Input
                  id="evaluatorName"
                  value={formData.evaluatorName}
                  onChange={(e) => handleInputChange('evaluatorName', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome do professor/avaliador"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="generalObservations" className="text-[#0A0A0A] font-medium">Observações Gerais</Label>
              <Textarea
                id="generalObservations"
                value={formData.generalObservations}
                onChange={(e) => handleInputChange('generalObservations', e.target.value)}
                className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                placeholder="Observações gerais sobre a avaliação..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Testes Disponíveis */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Target className="w-5 h-5 text-[#FFC300]" />
              Testes Neuromusculares
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Flexão de Braços */}
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-[#FFC300]" />
                    <h4 className="font-semibold text-[#0A0A0A]">Flexão de Braços</h4>
                  </div>
                  {formData.tests?.some(t => t.type === 'flexao') && (
                    <Badge className="bg-[#1FBF75] text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Concluído
                    </Badge>
                  )}
                </div>
                <p className="text-[#4A4A4A] text-sm mb-3">Resistência de Membros Superiores</p>
                <Button
                  onClick={() => {
                    setActiveTest('flexao');
                    setActiveView('test');
                  }}
                  className="w-full bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
                >
                  {formData.tests?.some(t => t.type === 'flexao') ? 'Editar Teste' : 'Realizar Teste'}
                </Button>
              </div>

              {/* Abdominal */}
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[#E10600]" />
                    <h4 className="font-semibold text-[#0A0A0A]">Abdominal 1 min</h4>
                  </div>
                  {formData.tests?.some(t => t.type === 'abdominal') && (
                    <Badge className="bg-[#1FBF75] text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Concluído
                    </Badge>
                  )}
                </div>
                <p className="text-[#4A4A4A] text-sm mb-3">Core - Dinâmico</p>
                <Button
                  onClick={() => {
                    setActiveTest('abdominal');
                    setActiveView('test');
                  }}
                  className="w-full bg-[#E10600] hover:bg-[#C00000] text-white rounded-xl"
                >
                  {formData.tests?.some(t => t.type === 'abdominal') ? 'Editar Teste' : 'Realizar Teste'}
                </Button>
              </div>

              {/* Prancha */}
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-[#1FBF75]" />
                    <h4 className="font-semibold text-[#0A0A0A]">Prancha Isométrica</h4>
                  </div>
                  {formData.tests?.some(t => t.type === 'prancha') && (
                    <Badge className="bg-[#1FBF75] text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Concluído
                    </Badge>
                  )}
                </div>
                <p className="text-[#4A4A4A] text-sm mb-3">Core - Estático</p>
                <Button
                  onClick={() => {
                    setActiveTest('prancha');
                    setActiveView('test');
                  }}
                  className="w-full bg-[#1FBF75] hover:bg-[#1AA366] text-white rounded-xl"
                >
                  {formData.tests?.some(t => t.type === 'prancha') ? 'Editar Teste' : 'Realizar Teste'}
                </Button>
              </div>

              {/* Salto Horizontal */}
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#9333EA]" />
                    <h4 className="font-semibold text-[#0A0A0A]">Salto Horizontal</h4>
                  </div>
                  {formData.tests?.some(t => t.type === 'salto') && (
                    <Badge className="bg-[#1FBF75] text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Concluído
                    </Badge>
                  )}
                </div>
                <p className="text-[#4A4A4A] text-sm mb-3">Potência de Membros Inferiores</p>
                <Button
                  onClick={() => {
                    setActiveTest('salto');
                    setActiveView('test');
                  }}
                  className="w-full bg-[#9333EA] hover:bg-[#7C3AED] text-white rounded-xl"
                >
                  {formData.tests?.some(t => t.type === 'salto') ? 'Editar Teste' : 'Realizar Teste'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo dos Testes */}
        {formData.tests && formData.tests.length > 0 && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <TrendingUp className="w-5 h-5 text-[#FFC300]" />
                Resumo dos Testes Realizados ({formData.tests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.tests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <div className="flex items-center gap-3">
                    {getTestIcon(test.type)}
                    <span className="font-medium text-[#0A0A0A]">{getTestName(test.type)}</span>
                  </div>
                  <Badge className="bg-[#1FBF75] text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Concluído
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Botão Salvar */}
        <div className="flex justify-center">
          <Button
            onClick={saveAssessment}
            className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar Avaliação Neuromuscular
          </Button>
        </div>
      </div>
    );
  }

  // Tela principal - lista de avaliações
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#FFC300]" />
          <h2 className="text-2xl font-bold text-white">Avaliações Neuromusculares</h2>
        </div>
        <Button
          onClick={() => setActiveView('new')}
          className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-6 py-3 rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <CardTitle className="text-[#0A0A0A] text-lg">{assessment.studentName}</CardTitle>
                    <p className="text-[#4A4A4A] text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(assessment.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#1FBF75] text-white font-medium px-3 py-1 rounded-xl">
                  {assessment.tests.length} testes
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                  <Target className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                  <p className="text-xl font-bold text-[#0A0A0A]">{assessment.tests.length}</p>
                  <p className="text-xs text-[#4A4A4A]">Testes</p>
                </div>
                <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                  <p className="text-xl font-bold text-[#0A0A0A]">{assessment.tests.filter(t => t.completed).length}</p>
                  <p className="text-xs text-[#4A4A4A]">Concluídos</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-[#E6C85C]">
                <Button
                  onClick={() => handleView(assessment)}
                  size="sm"
                  className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl flex-1"
                >
                  Visualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {assessments.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-12 text-center">
            <Activity className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma avaliação neuromuscular cadastrada</h3>
            <p className="text-white/80 mb-6">
              Comece criando a primeira avaliação neuromuscular para seus alunos.
            </p>
            <Button
              onClick={() => setActiveView('new')}
              className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-6 py-3 rounded-2xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeira Avaliação
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}