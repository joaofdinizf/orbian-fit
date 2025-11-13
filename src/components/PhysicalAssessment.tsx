'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Ruler, 
  Scale, 
  Heart, 
  Target,
  Save,
  Plus,
  Edit,
  Eye,
  Calendar,
  TrendingUp,
  User,
  Camera,
  Upload,
  Bluetooth,
  Calculator,
  Timer,
  ClipboardList,
  Dumbbell,
  Scan
} from 'lucide-react';
import VO2MaxTests from '@/components/VO2MaxTests';
import NeuroMuscularAssessment from '@/components/NeuroMuscularAssessment';
import PosturalAssessment from '@/components/PosturalAssessment';

interface PhysicalAssessmentProps {
  userRole: 'trainer' | 'student';
}

interface AssessmentData {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  // Medidas antropométricas
  weight: number;
  height: number;
  bmi: number;
  // Novos campos de peso e gordura
  idealWeight: number;
  leanWeight: number;
  fatWeight: number;
  currentBodyFat: number;
  idealBodyFat: number;
  // Circunferências expandidas (cm)
  chest: number; // tórax
  waist: number; // cintura
  hip: number; // quadril
  rightArm: number; // braço direito
  leftArm: number; // braço esquerdo
  rightArmRelaxed: number; // braço direito relaxado
  leftArmRelaxed: number; // braço esquerdo relaxado
  rightArmContracted: number; // braço direito contraído
  leftArmContracted: number; // braço esquerdo contraído
  rightForearm: number; // antebraço direito
  leftForearm: number; // antebraço esquerdo
  rightThigh: number; // coxa direita
  leftThigh: number; // coxa esquerda
  rightCalf: number; // panturrilha direita
  leftCalf: number; // panturrilha esquerda
  neck: number; // pescoço
  abdomen: number; // abdômen
  shoulder: number; // ombro
  // Dobras cutâneas (mm) - incluindo coxa
  triceps: number;
  subscapular: number;
  peitoral: number;
  axilarMedia: number;
  supraIliaca: number;
  abdominal: number;
  coxa: number; // Nova dobra
  bodyFatPercentage: number;
  // 3 dobras principais
  threeFoldsPeitoral: number;
  threeFoldsAbdominal: number;
  threeFoldsCoxa: number;
  // Bioimpedância expandida
  bodyFat: number;
  skeletalMuscle: number; // Músculo esquelético
  bodyAge: number; // Idade corporal
  basalMetabolism: number;
  visceralFat: number;
  bodyWater: number; // Água corporal
  muscleMass: number; // Massa muscular
  boneMass: number; // Massa óssea
  // Testes físicos
  restingHeartRate: number;
  bloodPressure: string;
  flexibility: number;
  // Fotos
  photos: {
    front: string;
    side: string;
    back: string;
  };
  // Observações
  observations: string;
  // Conectividade Bluetooth
  bluetoothConnected: boolean;
  lastBluetoothSync: string;
}

export default function PhysicalAssessment({ userRole }: PhysicalAssessmentProps) {
  const [activeView, setActiveView] = useState<'list' | 'new' | 'view' | 'edit'>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentData | null>(null);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('assessments');
  const [assessments, setAssessments] = useState<AssessmentData[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'João Silva',
      date: '2024-01-15',
      weight: 80,
      height: 175,
      bmi: 26.1,
      idealWeight: 75,
      leanWeight: 65.2,
      fatWeight: 14.8,
      currentBodyFat: 18.5,
      idealBodyFat: 15.0,
      chest: 98,
      waist: 85,
      hip: 95,
      rightArm: 32,
      leftArm: 31.5,
      rightArmRelaxed: 30,
      leftArmRelaxed: 29.5,
      rightArmContracted: 34,
      leftArmContracted: 33.5,
      rightForearm: 28,
      leftForearm: 27.5,
      rightThigh: 58,
      leftThigh: 57.5,
      rightCalf: 36,
      leftCalf: 35.5,
      neck: 38,
      abdomen: 87,
      shoulder: 115,
      triceps: 12,
      subscapular: 15,
      peitoral: 10,
      axilarMedia: 8,
      supraIliaca: 18,
      abdominal: 20,
      coxa: 22,
      bodyFatPercentage: 18.5,
      threeFoldsPeitoral: 10,
      threeFoldsAbdominal: 20,
      threeFoldsCoxa: 22,
      bodyFat: 16.2,
      skeletalMuscle: 42.5,
      bodyAge: 28,
      basalMetabolism: 1850,
      visceralFat: 8,
      bodyWater: 58.4,
      muscleMass: 35.8,
      boneMass: 3.2,
      restingHeartRate: 68,
      bloodPressure: '120/80',
      flexibility: 25,
      photos: {
        front: '',
        side: '',
        back: ''
      },
      observations: 'Aluno apresenta boa disposição para treinar. Objetivo de ganho de massa muscular.',
      bluetoothConnected: false,
      lastBluetoothSync: ''
    }
  ]);

  const [formData, setFormData] = useState<Partial<AssessmentData>>({
    studentId: '',
    studentName: '',
    date: new Date().toISOString().split('T')[0],
    photos: {
      front: '',
      side: '',
      back: ''
    },
    bluetoothConnected: false,
    lastBluetoothSync: ''
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof AssessmentData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateBMI = (weight: number, height: number) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return 0;
  };

  const calculateIdealWeight = (height: number, gender: 'male' | 'female' = 'male') => {
    if (height) {
      // Fórmula de Robinson
      const heightInCm = height;
      if (gender === 'male') {
        return parseFloat((52 + (1.9 * ((heightInCm - 152.4) / 2.54))).toFixed(1));
      } else {
        return parseFloat((49 + (1.7 * ((heightInCm - 152.4) / 2.54))).toFixed(1));
      }
    }
    return 0;
  };

  const calculateLeanWeight = (weight: number, bodyFatPercentage: number) => {
    if (weight && bodyFatPercentage) {
      return parseFloat((weight * (1 - bodyFatPercentage / 100)).toFixed(1));
    }
    return 0;
  };

  const calculateFatWeight = (weight: number, bodyFatPercentage: number) => {
    if (weight && bodyFatPercentage) {
      return parseFloat((weight * (bodyFatPercentage / 100)).toFixed(1));
    }
    return 0;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'bg-blue-500' };
    if (bmi < 25) return { category: 'Peso normal', color: 'bg-green-500' };
    if (bmi < 30) return { category: 'Sobrepeso', color: 'bg-yellow-500' };
    return { category: 'Obesidade', color: 'bg-red-500' };
  };

  const handleBluetoothConnect = async () => {
    try {
      // Simulação de conexão Bluetooth
      setBluetoothConnected(true);
      setFormData(prev => ({
        ...prev,
        bluetoothConnected: true,
        lastBluetoothSync: new Date().toISOString()
      }));
      
      // Simulação de dados recebidos via Bluetooth
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          weight: 78.5,
          bodyFat: 17.2,
          skeletalMuscle: 41.8,
          bodyAge: 26,
          basalMetabolism: 1820,
          visceralFat: 7,
          bodyWater: 59.1,
          muscleMass: 36.2,
          boneMass: 3.1
        }));
      }, 2000);
    } catch (error) {
      console.error('Erro ao conectar Bluetooth:', error);
    }
  };

  const handleSave = () => {
    const bmi = calculateBMI(formData.weight || 0, formData.height || 0);
    const idealWeight = calculateIdealWeight(formData.height || 0);
    const leanWeight = calculateLeanWeight(formData.weight || 0, formData.bodyFatPercentage || 0);
    const fatWeight = calculateFatWeight(formData.weight || 0, formData.bodyFatPercentage || 0);
    
    if (selectedAssessment) {
      setAssessments(prev => prev.map(assessment => 
        assessment.id === selectedAssessment.id ? { 
          ...formData, 
          id: selectedAssessment.id, 
          bmi,
          idealWeight,
          leanWeight,
          fatWeight
        } as AssessmentData : assessment
      ));
    } else {
      const newAssessment: AssessmentData = {
        ...formData,
        id: Date.now().toString(),
        bmi,
        idealWeight,
        leanWeight,
        fatWeight
      } as AssessmentData;
      setAssessments(prev => [...prev, newAssessment]);
    }
    
    setActiveView('list');
    setSelectedAssessment(null);
    setFormData({
      studentId: '',
      studentName: '',
      date: new Date().toISOString().split('T')[0],
      photos: {
        front: '',
        side: '',
        back: ''
      },
      bluetoothConnected: false,
      lastBluetoothSync: ''
    });
  };

  const handleView = (assessment: AssessmentData) => {
    setSelectedAssessment(assessment);
    setActiveView('view');
  };

  const handleEdit = (assessment: AssessmentData) => {
    setSelectedAssessment(assessment);
    setFormData(assessment);
    setActiveView('edit');
  };

  const handlePhotoUpload = (position: 'front' | 'side' | 'back', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange(`photos.${position}`, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Se estiver na aba de VO2máx, renderizar o componente específico
  if (activeTab === 'vo2max') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Avaliação Física</h2>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
            <TabsTrigger 
              value="assessments" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Avaliações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vo2max" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">VO2máx</span>
            </TabsTrigger>
            <TabsTrigger 
              value="neuromuscular" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Neuromuscular</span>
            </TabsTrigger>
            <TabsTrigger 
              value="postural" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Postural</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vo2max">
            <VO2MaxTests userRole={userRole} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Se estiver na aba neuromuscular, renderizar o componente específico
  if (activeTab === 'neuromuscular') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Avaliação Física</h2>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
            <TabsTrigger 
              value="assessments" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Avaliações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vo2max" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">VO2máx</span>
            </TabsTrigger>
            <TabsTrigger 
              value="neuromuscular" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Neuromuscular</span>
            </TabsTrigger>
            <TabsTrigger 
              value="postural" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Postural</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="neuromuscular">
            <NeuroMuscularAssessment userRole={userRole} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Se estiver na aba postural, renderizar o componente específico
  if (activeTab === 'postural') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Avaliação Física</h2>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
            <TabsTrigger 
              value="assessments" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Avaliações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vo2max" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">VO2máx</span>
            </TabsTrigger>
            <TabsTrigger 
              value="neuromuscular" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Neuromuscular</span>
            </TabsTrigger>
            <TabsTrigger 
              value="postural" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Postural</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="postural">
            <PosturalAssessment userRole={userRole} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (activeView === 'view' && selectedAssessment) {
    const bmiInfo = getBMICategory(selectedAssessment.bmi);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Avaliação Física - {selectedAssessment.studentName}</h2>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleEdit(selectedAssessment)}
              className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              onClick={() => setActiveView('list')}
              className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
            >
              Voltar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dados Básicos e Calculados */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Calculator className="w-5 h-5 text-[#FFC300]" />
                Dados Básicos e Calculados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Peso Atual</Label>
                  <p className="text-2xl font-bold text-[#0A0A0A]">{selectedAssessment.weight} kg</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Altura</Label>
                  <p className="text-2xl font-bold text-[#0A0A0A]">{selectedAssessment.height} cm</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Peso Ideal</Label>
                  <p className="text-xl font-bold text-[#1FBF75]">{selectedAssessment.idealWeight} kg</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Peso Magro</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.leanWeight} kg</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Peso Gordo</Label>
                  <p className="text-xl font-bold text-[#E10600]">{selectedAssessment.fatWeight} kg</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Gordura Atual</Label>
                  <p className="text-xl font-bold text-[#FFC300]">{selectedAssessment.currentBodyFat}%</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Gordura Ideal</Label>
                  <p className="text-xl font-bold text-[#1FBF75]">{selectedAssessment.idealBodyFat}%</p>
                </div>
              </div>
              <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-[#4A4A4A] text-sm">IMC</Label>
                  <Badge className={`${bmiInfo.color} text-white`}>
                    {bmiInfo.category}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-[#0A0A0A]">{selectedAssessment.bmi}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bioimpedância Completa */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <TrendingUp className="w-5 h-5 text-[#1FBF75]" />
                Bioimpedância Completa
                {selectedAssessment.bluetoothConnected && (
                  <Badge className="bg-[#1FBF75] text-white">
                    <Bluetooth className="w-3 h-3 mr-1" />
                    Conectado
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#4A4A4A] text-sm">% Gordura</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.bodyFat}%</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Músculo Esquelético</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.skeletalMuscle} kg</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Idade Corporal</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.bodyAge} anos</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Metabolismo Basal</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.basalMetabolism} kcal</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Gordura Visceral</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.visceralFat}</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Água Corporal</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.bodyWater}%</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Massa Muscular</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.muscleMass} kg</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Massa Óssea</Label>
                  <p className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.boneMass} kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Circunferências Expandidas */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Ruler className="w-5 h-5 text-[#FFC300]" />
                Circunferências (cm)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Tórax:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.chest} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Cintura:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.waist} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Quadril:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.hip} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Abdômen:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.abdomen} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Pescoço:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.neck} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Ombro:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.shoulder} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Braço D Relaxado:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.rightArmRelaxed} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Braço E Relaxado:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.leftArmRelaxed} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Braço D Contraído:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.rightArmContracted} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Braço E Contraído:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.leftArmContracted} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Antebraço D:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.rightForearm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Antebraço E:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.leftForearm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Coxa D:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.rightThigh} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Coxa E:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.leftThigh} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Panturrilha D:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.rightCalf} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Panturrilha E:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.leftCalf} cm</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dobras Cutâneas Completas */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Target className="w-5 h-5 text-[#E10600]" />
                Dobras Cutâneas (mm)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Tríceps:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.triceps} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Subescapular:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.subscapular} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Peitoral:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.peitoral} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Axilar Média:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.axilarMedia} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Supra-ilíaca:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.supraIliaca} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Abdominal:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.abdominal} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A4A4A]">Coxa:</span>
                  <span className="font-medium text-[#0A0A0A]">{selectedAssessment.coxa} mm</span>
                </div>
              </div>
              
              {/* 3 Dobras Principais */}
              <div className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <h4 className="font-semibold text-[#0A0A0A] mb-2">3 Dobras Principais</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <span className="text-[#4A4A4A] block">Peitoral</span>
                    <span className="font-bold text-[#0A0A0A]">{selectedAssessment.threeFoldsPeitoral} mm</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[#4A4A4A] block">Abdominal</span>
                    <span className="font-bold text-[#0A0A0A]">{selectedAssessment.threeFoldsAbdominal} mm</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[#4A4A4A] block">Coxa</span>
                    <span className="font-bold text-[#0A0A0A]">{selectedAssessment.threeFoldsCoxa} mm</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                <div className="flex justify-between items-center">
                  <span className="text-[#4A4A4A] font-medium">% Gordura (Dobras):</span>
                  <span className="text-xl font-bold text-[#0A0A0A]">{selectedAssessment.bodyFatPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fotos da Avaliação */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Camera className="w-5 h-5 text-[#FFC300]" />
              Fotos da Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['front', 'side', 'back'].map((position) => (
                <div key={position} className="text-center">
                  <Label className="text-[#0A0A0A] font-medium capitalize mb-2 block">
                    {position === 'front' ? 'Frente' : position === 'side' ? 'Lateral' : 'Costas'}
                  </Label>
                  <div className="w-full h-64 bg-[#FFF3C4] border-2 border-dashed border-[#E6C85C] rounded-xl flex items-center justify-center">
                    {selectedAssessment.photos[position as keyof typeof selectedAssessment.photos] ? (
                      <img
                        src={selectedAssessment.photos[position as keyof typeof selectedAssessment.photos]}
                        alt={`Foto ${position}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-[#4A4A4A] mx-auto mb-2" />
                        <p className="text-[#4A4A4A]">Sem foto</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        {selectedAssessment.observations && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Heart className="w-5 h-5 text-[#E10600]" />
                Observações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#0A0A0A]">{selectedAssessment.observations}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (activeView === 'new' || activeView === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">
              {activeView === 'edit' ? 'Editar' : 'Nova'} Avaliação Física
            </h2>
          </div>
          <Button
            onClick={() => {
              setActiveView('list');
              setSelectedAssessment(null);
              setFormData({
                studentId: '',
                studentName: '',
                date: new Date().toISOString().split('T')[0],
                photos: {
                  front: '',
                  side: '',
                  back: ''
                },
                bluetoothConnected: false,
                lastBluetoothSync: ''
              });
            }}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            Voltar
          </Button>
        </div>

        {/* Informações do Aluno */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <User className="w-5 h-5 text-[#FFC300]" />
              Informações do Aluno
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-[#0A0A0A] font-medium">Nome do Aluno</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome completo do aluno"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#0A0A0A] font-medium">Data da Avaliação</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conectividade Bluetooth */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Bluetooth className="w-5 h-5 text-[#1FBF75]" />
              Balança de Bioimpedância
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
              <div>
                <p className="font-medium text-[#0A0A0A]">
                  {bluetoothConnected ? 'Balança Conectada' : 'Conectar Balança Bluetooth'}
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  {bluetoothConnected 
                    ? 'Dados serão sincronizados automaticamente' 
                    : 'Conecte sua balança para receber dados automaticamente'
                  }
                </p>
              </div>
              <Button
                onClick={handleBluetoothConnect}
                disabled={bluetoothConnected}
                className={`${
                  bluetoothConnected 
                    ? 'bg-[#1FBF75] text-white' 
                    : 'bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A]'
                } rounded-xl`}
              >
                <Bluetooth className="w-4 h-4 mr-2" />
                {bluetoothConnected ? 'Conectado' : 'Conectar'}
              </Button>
            </div>
            <p className="text-sm text-[#4A4A4A]">
              Ou insira os valores manualmente nos campos abaixo
            </p>
          </CardContent>
        </Card>

        {/* Dados Básicos */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Scale className="w-5 h-5 text-[#FFC300]" />
              Dados Básicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-[#0A0A0A] font-medium">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight || ''}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="80.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-[#0A0A0A] font-medium">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="175"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentBodyFat" className="text-[#0A0A0A] font-medium">Gordura Atual (%)</Label>
                <Input
                  id="currentBodyFat"
                  type="number"
                  step="0.1"
                  value={formData.currentBodyFat || ''}
                  onChange={(e) => handleInputChange('currentBodyFat', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="18.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idealBodyFat" className="text-[#0A0A0A] font-medium">Gordura Ideal (%)</Label>
                <Input
                  id="idealBodyFat"
                  type="number"
                  step="0.1"
                  value={formData.idealBodyFat || ''}
                  onChange={(e) => handleInputChange('idealBodyFat', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="15.0"
                />
              </div>
            </div>
            
            {/* Campos calculados automaticamente */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-[#0A0A0A] font-medium">IMC</Label>
                <div className="p-3 bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-xl">
                  <span className="text-xl font-bold text-[#0A0A0A]">
                    {formData.weight && formData.height ? calculateBMI(formData.weight, formData.height) : '0.0'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0A0A0A] font-medium">Peso Ideal (kg)</Label>
                <div className="p-3 bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-xl">
                  <span className="text-xl font-bold text-[#1FBF75]">
                    {formData.height ? calculateIdealWeight(formData.height) : '0.0'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0A0A0A] font-medium">Peso Magro (kg)</Label>
                <div className="p-3 bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-xl">
                  <span className="text-xl font-bold text-[#0A0A0A]">
                    {formData.weight && formData.currentBodyFat ? calculateLeanWeight(formData.weight, formData.currentBodyFat) : '0.0'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#0A0A0A] font-medium">Peso Gordo (kg)</Label>
                <div className="p-3 bg-[#FFF3C4] border-2 border-[#E6C85C] rounded-xl">
                  <span className="text-xl font-bold text-[#E10600]">
                    {formData.weight && formData.currentBodyFat ? calculateFatWeight(formData.weight, formData.currentBodyFat) : '0.0'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bioimpedância Expandida */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <TrendingUp className="w-5 h-5 text-[#1FBF75]" />
              Bioimpedância Completa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyFat" className="text-[#0A0A0A] font-medium">% Gordura</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  value={formData.bodyFat || ''}
                  onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="16.2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skeletalMuscle" className="text-[#0A0A0A] font-medium">Músculo Esquelético (kg)</Label>
                <Input
                  id="skeletalMuscle"
                  type="number"
                  step="0.1"
                  value={formData.skeletalMuscle || ''}
                  onChange={(e) => handleInputChange('skeletalMuscle', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="42.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyAge" className="text-[#0A0A0A] font-medium">Idade Corporal</Label>
                <Input
                  id="bodyAge"
                  type="number"
                  value={formData.bodyAge || ''}
                  onChange={(e) => handleInputChange('bodyAge', parseInt(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="28"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basalMetabolism" className="text-[#0A0A0A] font-medium">Metabolismo Basal (kcal)</Label>
                <Input
                  id="basalMetabolism"
                  type="number"
                  value={formData.basalMetabolism || ''}
                  onChange={(e) => handleInputChange('basalMetabolism', parseInt(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="1850"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visceralFat" className="text-[#0A0A0A] font-medium">Gordura Visceral</Label>
                <Input
                  id="visceralFat"
                  type="number"
                  value={formData.visceralFat || ''}
                  onChange={(e) => handleInputChange('visceralFat', parseInt(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyWater" className="text-[#0A0A0A] font-medium">Água Corporal (%)</Label>
                <Input
                  id="bodyWater"
                  type="number"
                  step="0.1"
                  value={formData.bodyWater || ''}
                  onChange={(e) => handleInputChange('bodyWater', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="58.4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="muscleMass" className="text-[#0A0A0A] font-medium">Massa Muscular (kg)</Label>
                <Input
                  id="muscleMass"
                  type="number"
                  step="0.1"
                  value={formData.muscleMass || ''}
                  onChange={(e) => handleInputChange('muscleMass', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="35.8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="boneMass" className="text-[#0A0A0A] font-medium">Massa Óssea (kg)</Label>
                <Input
                  id="boneMass"
                  type="number"
                  step="0.1"
                  value={formData.boneMass || ''}
                  onChange={(e) => handleInputChange('boneMass', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="3.2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Circunferências Expandidas */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Ruler className="w-5 h-5 text-[#FFC300]" />
              Circunferências (cm)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tronco */}
            <div>
              <h4 className="font-semibold text-[#0A0A0A] mb-3">Tronco</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest" className="text-[#0A0A0A] font-medium">Tórax</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    value={formData.chest || ''}
                    onChange={(e) => handleInputChange('chest', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="98.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist" className="text-[#0A0A0A] font-medium">Cintura</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    value={formData.waist || ''}
                    onChange={(e) => handleInputChange('waist', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="85.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abdomen" className="text-[#0A0A0A] font-medium">Abdômen</Label>
                  <Input
                    id="abdomen"
                    type="number"
                    step="0.1"
                    value={formData.abdomen || ''}
                    onChange={(e) => handleInputChange('abdomen', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="87.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hip" className="text-[#0A0A0A] font-medium">Quadril</Label>
                  <Input
                    id="hip"
                    type="number"
                    step="0.1"
                    value={formData.hip || ''}
                    onChange={(e) => handleInputChange('hip', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="95.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neck" className="text-[#0A0A0A] font-medium">Pescoço</Label>
                  <Input
                    id="neck"
                    type="number"
                    step="0.1"
                    value={formData.neck || ''}
                    onChange={(e) => handleInputChange('neck', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="38.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder" className="text-[#0A0A0A] font-medium">Ombro</Label>
                  <Input
                    id="shoulder"
                    type="number"
                    step="0.1"
                    value={formData.shoulder || ''}
                    onChange={(e) => handleInputChange('shoulder', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="115.0"
                  />
                </div>
              </div>
            </div>

            {/* Braços */}
            <div>
              <h4 className="font-semibold text-[#0A0A0A] mb-3">Braços</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rightArmRelaxed" className="text-[#0A0A0A] font-medium">Braço D Relaxado</Label>
                  <Input
                    id="rightArmRelaxed"
                    type="number"
                    step="0.1"
                    value={formData.rightArmRelaxed || ''}
                    onChange={(e) => handleInputChange('rightArmRelaxed', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="30.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leftArmRelaxed" className="text-[#0A0A0A] font-medium">Braço E Relaxado</Label>
                  <Input
                    id="leftArmRelaxed"
                    type="number"
                    step="0.1"
                    value={formData.leftArmRelaxed || ''}
                    onChange={(e) => handleInputChange('leftArmRelaxed', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="29.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rightArmContracted" className="text-[#0A0A0A] font-medium">Braço D Contraído</Label>
                  <Input
                    id="rightArmContracted"
                    type="number"
                    step="0.1"
                    value={formData.rightArmContracted || ''}
                    onChange={(e) => handleInputChange('rightArmContracted', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="34.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leftArmContracted" className="text-[#0A0A0A] font-medium">Braço E Contraído</Label>
                  <Input
                    id="leftArmContracted"
                    type="number"
                    step="0.1"
                    value={formData.leftArmContracted || ''}
                    onChange={(e) => handleInputChange('leftArmContracted', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="33.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rightForearm" className="text-[#0A0A0A] font-medium">Antebraço D</Label>
                  <Input
                    id="rightForearm"
                    type="number"
                    step="0.1"
                    value={formData.rightForearm || ''}
                    onChange={(e) => handleInputChange('rightForearm', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="28.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leftForearm" className="text-[#0A0A0A] font-medium">Antebraço E</Label>
                  <Input
                    id="leftForearm"
                    type="number"
                    step="0.1"
                    value={formData.leftForearm || ''}
                    onChange={(e) => handleInputChange('leftForearm', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="27.5"
                  />
                </div>
              </div>
            </div>

            {/* Pernas */}
            <div>
              <h4 className="font-semibold text-[#0A0A0A] mb-3">Pernas</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rightThigh" className="text-[#0A0A0A] font-medium">Coxa D</Label>
                  <Input
                    id="rightThigh"
                    type="number"
                    step="0.1"
                    value={formData.rightThigh || ''}
                    onChange={(e) => handleInputChange('rightThigh', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="58.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leftThigh" className="text-[#0A0A0A] font-medium">Coxa E</Label>
                  <Input
                    id="leftThigh"
                    type="number"
                    step="0.1"
                    value={formData.leftThigh || ''}
                    onChange={(e) => handleInputChange('leftThigh', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="57.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rightCalf" className="text-[#0A0A0A] font-medium">Panturrilha D</Label>
                  <Input
                    id="rightCalf"
                    type="number"
                    step="0.1"
                    value={formData.rightCalf || ''}
                    onChange={(e) => handleInputChange('rightCalf', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="36.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leftCalf" className="text-[#0A0A0A] font-medium">Panturrilha E</Label>
                  <Input
                    id="leftCalf"
                    type="number"
                    step="0.1"
                    value={formData.leftCalf || ''}
                    onChange={(e) => handleInputChange('leftCalf', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="35.5"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dobras Cutâneas Expandidas */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Target className="w-5 h-5 text-[#E10600]" />
              Dobras Cutâneas (mm)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="triceps" className="text-[#0A0A0A] font-medium">Tríceps</Label>
                <Input
                  id="triceps"
                  type="number"
                  step="0.1"
                  value={formData.triceps || ''}
                  onChange={(e) => handleInputChange('triceps', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="12.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscapular" className="text-[#0A0A0A] font-medium">Subescapular</Label>
                <Input
                  id="subscapular"
                  type="number"
                  step="0.1"
                  value={formData.subscapular || ''}
                  onChange={(e) => handleInputChange('subscapular', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="15.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peitoral" className="text-[#0A0A0A] font-medium">Peitoral</Label>
                <Input
                  id="peitoral"
                  type="number"
                  step="0.1"
                  value={formData.peitoral || ''}
                  onChange={(e) => handleInputChange('peitoral', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="10.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="axilarMedia" className="text-[#0A0A0A] font-medium">Axilar Média</Label>
                <Input
                  id="axilarMedia"
                  type="number"
                  step="0.1"
                  value={formData.axilarMedia || ''}
                  onChange={(e) => handleInputChange('axilarMedia', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="8.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supraIliaca" className="text-[#0A0A0A] font-medium">Supra-ilíaca</Label>
                <Input
                  id="supraIliaca"
                  type="number"
                  step="0.1"
                  value={formData.supraIliaca || ''}
                  onChange={(e) => handleInputChange('supraIliaca', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="18.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="abdominal" className="text-[#0A0A0A] font-medium">Abdominal</Label>
                <Input
                  id="abdominal"
                  type="number"
                  step="0.1"
                  value={formData.abdominal || ''}
                  onChange={(e) => handleInputChange('abdominal', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="20.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coxa" className="text-[#0A0A0A] font-medium">Coxa</Label>
                <Input
                  id="coxa"
                  type="number"
                  step="0.1"
                  value={formData.coxa || ''}
                  onChange={(e) => handleInputChange('coxa', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="22.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFatPercentage" className="text-[#0A0A0A] font-medium">% Gordura (Dobras)</Label>
                <Input
                  id="bodyFatPercentage"
                  type="number"
                  step="0.1"
                  value={formData.bodyFatPercentage || ''}
                  onChange={(e) => handleInputChange('bodyFatPercentage', parseFloat(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="18.5"
                />
              </div>
            </div>

            {/* 3 Dobras Principais */}
            <div className="p-4 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
              <h4 className="font-semibold text-[#0A0A0A] mb-3">3 Dobras Principais</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threeFoldsPeitoral" className="text-[#0A0A0A] font-medium">Peitoral</Label>
                  <Input
                    id="threeFoldsPeitoral"
                    type="number"
                    step="0.1"
                    value={formData.threeFoldsPeitoral || ''}
                    onChange={(e) => handleInputChange('threeFoldsPeitoral', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="10.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threeFoldsAbdominal" className="text-[#0A0A0A] font-medium">Abdominal</Label>
                  <Input
                    id="threeFoldsAbdominal"
                    type="number"
                    step="0.1"
                    value={formData.threeFoldsAbdominal || ''}
                    onChange={(e) => handleInputChange('threeFoldsAbdominal', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="20.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threeFoldsCoxa" className="text-[#0A0A0A] font-medium">Coxa</Label>
                  <Input
                    id="threeFoldsCoxa"
                    type="number"
                    step="0.1"
                    value={formData.threeFoldsCoxa || ''}
                    onChange={(e) => handleInputChange('threeFoldsCoxa', parseFloat(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="22.0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fotos da Avaliação */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Camera className="w-5 h-5 text-[#FFC300]" />
              Fotos da Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['front', 'side', 'back'].map((position) => (
                <div key={position} className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium capitalize">
                    {position === 'front' ? 'Frente' : position === 'side' ? 'Lateral' : 'Costas'}
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(position as 'front' | 'side' | 'back', e)}
                      className="hidden"
                      id={`photo-${position}`}
                    />
                    <label
                      htmlFor={`photo-${position}`}
                      className="w-full h-64 bg-[#FFF3C4] border-2 border-dashed border-[#E6C85C] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#FFF0B3] transition-colors"
                    >
                      {formData.photos?.[position as keyof typeof formData.photos] ? (
                        <img
                          src={formData.photos[position as keyof typeof formData.photos]}
                          alt={`Foto ${position}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-[#4A4A4A] mx-auto mb-2" />
                          <p className="text-[#4A4A4A]">Clique para adicionar foto</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Heart className="w-5 h-5 text-[#E10600]" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="observations" className="text-[#0A0A0A] font-medium">Observações gerais</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => handleInputChange('observations', e.target.value)}
                className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                placeholder="Observações sobre a avaliação, condições do aluno, etc."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
          >
            <Save className="w-5 h-5 mr-2" />
            {activeView === 'edit' ? 'Atualizar' : 'Salvar'} Avaliação
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#FFC300]" />
          <h2 className="text-2xl font-bold text-white">Avaliação Física</h2>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
          <TabsTrigger 
            value="assessments" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Avaliações</span>
          </TabsTrigger>
          <TabsTrigger 
            value="vo2max" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Timer className="w-4 h-4" />
            <span className="hidden sm:inline">VO2máx</span>
          </TabsTrigger>
          <TabsTrigger 
            value="neuromuscular" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Dumbbell className="w-4 h-4" />
            <span className="hidden sm:inline">Neuromuscular</span>
          </TabsTrigger>
          <TabsTrigger 
            value="postural" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Scan className="w-4 h-4" />
            <span className="hidden sm:inline">Postural</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assessments">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-[#FFC300]" />
              <h3 className="text-xl font-bold text-white">Avaliações Físicas</h3>
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
            {assessments.map((assessment) => {
              const bmiInfo = getBMICategory(assessment.bmi);
              
              return (
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
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={`${bmiInfo.color} text-white font-medium px-3 py-1 rounded-xl`}>
                          IMC {assessment.bmi}
                        </Badge>
                        {assessment.bluetoothConnected && (
                          <Badge className="bg-[#1FBF75] text-white text-xs">
                            <Bluetooth className="w-3 h-3 mr-1" />
                            Bluetooth
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                        <Scale className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                        <p className="text-xl font-bold text-[#0A0A0A]">{assessment.weight} kg</p>
                        <p className="text-xs text-[#4A4A4A]">Peso</p>
                      </div>
                      <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                        <TrendingUp className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                        <p className="text-xl font-bold text-[#0A0A0A]">{assessment.bodyFat}%</p>
                        <p className="text-xs text-[#4A4A4A]">Gordura</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-[#E6C85C]">
                      <Button
                        onClick={() => handleView(assessment)}
                        size="sm"
                        className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        onClick={() => handleEdit(assessment)}
                        size="sm"
                        className="bg-[#0A0A0A] hover:bg-[#2A2A2A] text-white rounded-xl flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {assessments.length === 0 && (
            <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
              <CardContent className="p-12 text-center">
                <Activity className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhuma avaliação física cadastrada</h3>
                <p className="text-white/80 mb-6">
                  Comece criando a primeira avaliação física para seus alunos.
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
        </TabsContent>

        <TabsContent value="vo2max">
          <VO2MaxTests userRole={userRole} />
        </TabsContent>

        <TabsContent value="neuromuscular">
          <NeuroMuscularAssessment userRole={userRole} />
        </TabsContent>

        <TabsContent value="postural">
          <PosturalAssessment userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  );
}