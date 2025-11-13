'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText, 
  Heart, 
  Activity, 
  AlertTriangle, 
  Clock, 
  User,
  Save,
  Plus,
  Edit,
  Eye,
  Calendar,
  CheckCircle,
  Pill,
  Stethoscope,
  Brain,
  Bone,
  Utensils,
  Cigarette,
  Wine,
  Shield,
  Users,
  Zap
} from 'lucide-react';

interface AnamneseProps {
  userRole: 'trainer' | 'student';
}

interface AnamneseData {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'pending' | 'completed';
  
  // Dados pessoais básicos
  age: number;
  gender: string;
  occupation: string;
  sleepHours: number;
  stressLevel: number;
  
  // Histórico médico detalhado
  medicalHistory: string;
  chronicDiseases: string[];
  currentMedications: string;
  medicationFrequency: string;
  allergies: string;
  allergicReactions: string;
  
  // Histórico de lesões e cirurgias
  injuries: string;
  fractures: string;
  surgeries: string;
  surgeryDates: string;
  physicalTherapy: string;
  
  // Sistema cardiovascular
  heartProblems: string;
  bloodPressure: string;
  cholesterol: string;
  heartRate: string;
  
  // Sistema respiratório
  respiratoryProblems: string;
  asthma: string;
  breathingDifficulties: string;
  
  // Sistema digestivo
  digestiveProblems: string;
  foodIntolerances: string;
  eatingDisorders: string;
  
  // Sistema musculoesquelético
  jointProblems: string;
  backProblems: string;
  muscleProblems: string;
  posturalProblems: string;
  
  // Saúde mental
  mentalHealth: string;
  anxiety: string;
  depression: string;
  sleepDisorders: string;
  
  // Histórico familiar
  familyHistory: string;
  geneticDiseases: string;
  familyHeartProblems: string;
  familyDiabetes: string;
  
  // Exames recentes
  recentExams: string;
  bloodTests: string;
  imagingExams: string;
  lastCheckup: string;
  
  // Histórico de exercícios
  exerciseHistory: string;
  currentActivity: string;
  preferredActivities: string[];
  dislikedActivities: string[];
  
  // Objetivos e motivação
  primaryGoal: string;
  secondaryGoals: string[];
  motivation: string;
  timeAvailable: string;
  
  // Hábitos alimentares
  mealsPerDay: number;
  waterIntake: number;
  supplements: string;
  dietaryRestrictions: string;
  
  // Estilo de vida
  smokingStatus: string;
  smokingHistory: string;
  alcoholConsumption: string;
  drugUse: string;
  workSchedule: string;
  
  // Limitações e observações
  physicalLimitations: string;
  contraindications: string;
  observations: string;
}

export default function Anamnese({ userRole }: AnamneseProps) {
  const [activeView, setActiveView] = useState<'list' | 'new' | 'view' | 'edit'>('list');
  const [selectedAnamnese, setSelectedAnamnese] = useState<AnamneseData | null>(null);
  const [anamneses, setAnamneses] = useState<AnamneseData[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'João Silva',
      date: '2024-01-15',
      status: 'completed',
      age: 34,
      gender: 'Masculino',
      occupation: 'Engenheiro',
      sleepHours: 7,
      stressLevel: 6,
      medicalHistory: 'Hipertensão controlada desde 2020',
      chronicDiseases: ['Hipertensão'],
      currentMedications: 'Losartana 50mg - 1x ao dia pela manhã',
      medicationFrequency: 'Diário',
      allergies: 'Nenhuma conhecida',
      allergicReactions: 'Nunca apresentou reações alérgicas',
      injuries: 'Lesão no joelho direito em 2020 jogando futebol',
      fractures: 'Fratura no punho esquerdo aos 15 anos',
      surgeries: 'Nenhuma cirurgia realizada',
      surgeryDates: '',
      physicalTherapy: 'Fisioterapia para joelho em 2020 (6 meses)',
      heartProblems: 'Hipertensão arterial controlada',
      bloodPressure: '130/85 mmHg (última medição)',
      cholesterol: 'Colesterol total: 200 mg/dL (normal)',
      heartRate: 'FC repouso: 72 bpm',
      respiratoryProblems: 'Nenhum problema respiratório',
      asthma: 'Não possui asma',
      breathingDifficulties: 'Não apresenta dificuldades respiratórias',
      digestiveProblems: 'Ocasionalmente azia após refeições pesadas',
      foodIntolerances: 'Intolerância leve à lactose',
      eatingDisorders: 'Nenhum transtorno alimentar',
      jointProblems: 'Dor no joelho direito em atividades de impacto',
      backProblems: 'Dor lombar ocasional devido ao trabalho sedentário',
      muscleProblems: 'Tensão muscular no pescoço e ombros',
      posturalProblems: 'Postura anteriorizada por trabalho no computador',
      mentalHealth: 'Estresse relacionado ao trabalho',
      anxiety: 'Ansiedade leve em períodos de maior pressão',
      depression: 'Nunca apresentou quadros depressivos',
      sleepDisorders: 'Dificuldade para adormecer em dias estressantes',
      familyHistory: 'Pai: hipertensão e diabetes. Mãe: colesterol alto',
      geneticDiseases: 'Predisposição familiar para hipertensão e diabetes',
      familyHeartProblems: 'Pai teve infarto aos 60 anos',
      familyDiabetes: 'Pai diabético tipo 2',
      recentExams: 'Hemograma completo (dezembro/2023)',
      bloodTests: 'Glicemia: 95 mg/dL, Colesterol: 200 mg/dL',
      imagingExams: 'Raio-X joelho direito (2020)',
      lastCheckup: 'Check-up completo em dezembro/2023',
      exerciseHistory: 'Praticou futebol na adolescência, parou aos 25 anos',
      currentActivity: 'Caminhada 2x por semana (30 minutos)',
      preferredActivities: ['Musculação', 'Natação'],
      dislikedActivities: ['Corrida', 'Crossfit'],
      primaryGoal: 'Ganho de massa muscular',
      secondaryGoals: ['Melhora do condicionamento', 'Redução do estresse'],
      motivation: 'Melhorar a saúde e autoestima',
      timeAvailable: '1 hora, 3x por semana',
      mealsPerDay: 4,
      waterIntake: 2,
      supplements: 'Whey protein e vitamina D',
      dietaryRestrictions: 'Redução de lactose',
      smokingStatus: 'Nunca fumou',
      smokingHistory: 'Nunca teve contato com cigarro',
      alcoholConsumption: 'Socialmente (fins de semana) - 2-3 doses',
      drugUse: 'Nunca fez uso de drogas ilícitas',
      workSchedule: 'Segunda a sexta, 8h às 18h (trabalho sedentário)',
      physicalLimitations: 'Dor no joelho em exercícios de impacto',
      contraindications: 'Evitar exercícios de alto impacto no joelho direito',
      observations: 'Muito motivado, busca resultados consistentes. Disponível para treinar no período da manhã.'
    }
  ]);

  const [formData, setFormData] = useState<Partial<AnamneseData>>({
    studentId: '',
    studentName: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    preferredActivities: [],
    dislikedActivities: [],
    secondaryGoals: [],
    chronicDiseases: []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof AnamneseData] as string[] || [];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSave = () => {
    if (selectedAnamnese) {
      setAnamneses(prev => prev.map(anamnese => 
        anamnese.id === selectedAnamnese.id ? { ...formData, id: selectedAnamnese.id } as AnamneseData : anamnese
      ));
    } else {
      const newAnamnese: AnamneseData = {
        ...formData,
        id: Date.now().toString(),
        status: 'completed'
      } as AnamneseData;
      setAnamneses(prev => [...prev, newAnamnese]);
    }
    
    setActiveView('list');
    setSelectedAnamnese(null);
    setFormData({
      studentId: '',
      studentName: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      preferredActivities: [],
      dislikedActivities: [],
      secondaryGoals: [],
      chronicDiseases: []
    });
  };

  const handleView = (anamnese: AnamneseData) => {
    setSelectedAnamnese(anamnese);
    setActiveView('view');
  };

  const handleEdit = (anamnese: AnamneseData) => {
    setSelectedAnamnese(anamnese);
    setFormData(anamnese);
    setActiveView('edit');
  };

  const activities = [
    'Musculação', 'Funcional', 'Pilates', 'Yoga', 'Natação', 'Corrida', 
    'Ciclismo', 'Crossfit', 'Dança', 'Lutas', 'Caminhada', 'Alongamento'
  ];

  const goals = [
    'Perda de peso', 'Ganho de massa muscular', 'Definição muscular',
    'Melhora do condicionamento', 'Redução do estresse', 'Reabilitação',
    'Melhora da flexibilidade', 'Fortalecimento do core'
  ];

  const chronicDiseasesList = [
    'Hipertensão', 'Diabetes', 'Colesterol alto', 'Asma', 'Artrite', 
    'Fibromialgia', 'Osteoporose', 'Tireoide', 'Depressão', 'Ansiedade'
  ];

  if (activeView === 'view' && selectedAnamnese) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Anamnese - {selectedAnamnese.studentName}</h2>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleEdit(selectedAnamnese)}
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
          {/* Informações Gerais */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <User className="w-5 h-5 text-[#FFC300]" />
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Idade</Label>
                  <p className="text-[#0A0A0A] font-medium">{selectedAnamnese.age} anos</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Gênero</Label>
                  <p className="text-[#0A0A0A] font-medium">{selectedAnamnese.gender}</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Profissão</Label>
                  <p className="text-[#0A0A0A] font-medium">{selectedAnamnese.occupation}</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm">Horas de sono</Label>
                  <p className="text-[#0A0A0A] font-medium">{selectedAnamnese.sleepHours}h por noite</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico Médico */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Stethoscope className="w-5 h-5 text-[#E10600]" />
                Histórico Médico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Doenças crônicas</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAnamnese.chronicDiseases?.map((disease, index) => (
                    <Badge key={index} className="bg-[#E10600] text-white">
                      {disease}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Medicamentos atuais</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.currentMedications}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Alergias</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.allergies}</p>
              </div>
            </CardContent>
          </Card>

          {/* Sistema Cardiovascular */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Heart className="w-5 h-5 text-[#E10600]" />
                Sistema Cardiovascular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Pressão arterial</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.bloodPressure}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Frequência cardíaca</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.heartRate}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Colesterol</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.cholesterol}</p>
              </div>
            </CardContent>
          </Card>

          {/* Lesões e Fraturas */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Bone className="w-5 h-5 text-[#FFC300]" />
                Lesões e Fraturas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Fraturas anteriores</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.fractures}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Lesões</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.injuries}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Fisioterapia</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.physicalTherapy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Saúde Mental */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Brain className="w-5 h-5 text-[#9333EA]" />
                Saúde Mental
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Estado mental geral</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.mentalHealth}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Ansiedade</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.anxiety}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Distúrbios do sono</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.sleepDisorders}</p>
              </div>
            </CardContent>
          </Card>

          {/* Histórico Familiar */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Users className="w-5 h-5 text-[#1FBF75]" />
                Histórico Familiar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Doenças genéticas</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.geneticDiseases}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Problemas cardíacos familiares</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.familyHeartProblems}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Diabetes familiar</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.familyDiabetes}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Objetivos e Limitações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Activity className="w-5 h-5 text-[#1FBF75]" />
                Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Objetivo principal</Label>
                <Badge className="bg-[#FFC300] text-[#0A0A0A] mt-1">{selectedAnamnese.primaryGoal}</Badge>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Atividades preferidas</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAnamnese.preferredActivities.map((activity, index) => (
                    <Badge key={index} className="bg-[#1FBF75] text-white">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <AlertTriangle className="w-5 h-5 text-[#FFC300]" />
                Limitações e Contraindicações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#4A4A4A] text-sm">Limitações físicas</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.physicalLimitations}</p>
              </div>
              <div>
                <Label className="text-[#4A4A4A] text-sm">Contraindicações</Label>
                <p className="text-[#0A0A0A]">{selectedAnamnese.contraindications}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeView === 'new' || activeView === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">
              {activeView === 'edit' ? 'Editar' : 'Nova'} Anamnese Completa
            </h2>
          </div>
          <Button
            onClick={() => {
              setActiveView('list');
              setSelectedAnamnese(null);
              setFormData({
                studentId: '',
                studentName: '',
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                preferredActivities: [],
                dislikedActivities: [],
                secondaryGoals: [],
                chronicDiseases: []
              });
            }}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            Voltar
          </Button>
        </div>

        {/* Informações Pessoais */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <User className="w-5 h-5 text-[#FFC300]" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-[#0A0A0A] font-medium">Nome Completo *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome completo do aluno"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-[#0A0A0A] font-medium">Idade *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Idade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#0A0A0A] font-medium">Gênero *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                    <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-[#0A0A0A] font-medium">Profissão</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Profissão"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico Médico Detalhado */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Stethoscope className="w-5 h-5 text-[#E10600]" />
              Histórico Médico Completo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#0A0A0A] font-medium">Possui alguma doença crônica? *</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {chronicDiseasesList.map(disease => (
                  <div key={disease} className="flex items-center space-x-2">
                    <Checkbox
                      id={`disease-${disease}`}
                      checked={formData.chronicDiseases?.includes(disease)}
                      onCheckedChange={(checked) => handleArrayChange('chronicDiseases', disease, checked as boolean)}
                    />
                    <Label htmlFor={`disease-${disease}`} className="text-sm text-[#0A0A0A]">{disease}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory" className="text-[#0A0A0A] font-medium">Histórico médico detalhado</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Descreva seu histórico médico completo, incluindo diagnósticos, tratamentos..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentMedications" className="text-[#0A0A0A] font-medium">Medicamentos atuais *</Label>
                <Textarea
                  id="currentMedications"
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Liste TODOS os medicamentos que usa (nome, dosagem, frequência). Se não usa nenhum, escreva 'Nenhum'"
                  rows={4}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-[#0A0A0A] font-medium">Alergias conhecidas *</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Liste alergias a medicamentos, alimentos, substâncias. Se não tem, escreva 'Nenhuma'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergicReactions" className="text-[#0A0A0A] font-medium">Reações alérgicas já apresentadas</Label>
                <Textarea
                  id="allergicReactions"
                  value={formData.allergicReactions}
                  onChange={(e) => handleInputChange('allergicReactions', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Descreva reações alérgicas que já teve (sintomas, gravidade, tratamento)"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistema Cardiovascular */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Heart className="w-5 h-5 text-[#E10600]" />
              Sistema Cardiovascular
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heartProblems" className="text-[#0A0A0A] font-medium">Problemas cardíacos *</Label>
                <Textarea
                  id="heartProblems"
                  value={formData.heartProblems}
                  onChange={(e) => handleInputChange('heartProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Possui problemas no coração? Arritmias, sopros, doenças cardíacas? Se não, escreva 'Nenhum'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure" className="text-[#0A0A0A] font-medium">Pressão arterial (última medição)</Label>
                <Input
                  id="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 120/80 mmHg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cholesterol" className="text-[#0A0A0A] font-medium">Níveis de colesterol</Label>
                <Input
                  id="cholesterol"
                  value={formData.cholesterol}
                  onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: Colesterol total: 200 mg/dL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate" className="text-[#0A0A0A] font-medium">Frequência cardíaca de repouso</Label>
                <Input
                  id="heartRate"
                  value={formData.heartRate}
                  onChange={(e) => handleInputChange('heartRate', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 72 bpm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesões, Fraturas e Cirurgias */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Bone className="w-5 h-5 text-[#FFC300]" />
              Lesões, Fraturas e Cirurgias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fractures" className="text-[#0A0A0A] font-medium">Fraturas anteriores *</Label>
                <Textarea
                  id="fractures"
                  value={formData.fractures}
                  onChange={(e) => handleInputChange('fractures', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Já quebrou algum osso? Quando? Como foi o tratamento? Se nunca, escreva 'Nunca tive fraturas'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuries" className="text-[#0A0A0A] font-medium">Lesões esportivas/acidentais *</Label>
                <Textarea
                  id="injuries"
                  value={formData.injuries}
                  onChange={(e) => handleInputChange('injuries', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Lesões em músculos, ligamentos, tendões. Como aconteceu? Tratamento realizado?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surgeries" className="text-[#0A0A0A] font-medium">Cirurgias realizadas *</Label>
                <Textarea
                  id="surgeries"
                  value={formData.surgeries}
                  onChange={(e) => handleInputChange('surgeries', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Que cirurgias já fez? Quando? Recuperação completa? Se nunca, escreva 'Nenhuma cirurgia'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physicalTherapy" className="text-[#0A0A0A] font-medium">Fisioterapia/Reabilitação</Label>
                <Textarea
                  id="physicalTherapy"
                  value={formData.physicalTherapy}
                  onChange={(e) => handleInputChange('physicalTherapy', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Já fez fisioterapia? Para que? Quando? Resultado obtido?"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistemas Respiratório e Digestivo */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Zap className="w-5 h-5 text-[#1FBF75]" />
              Sistemas Respiratório e Digestivo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="respiratoryProblems" className="text-[#0A0A0A] font-medium">Problemas respiratórios *</Label>
                <Textarea
                  id="respiratoryProblems"
                  value={formData.respiratoryProblems}
                  onChange={(e) => handleInputChange('respiratoryProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Asma, bronquite, falta de ar? Usa bombinha? Se não tem problemas, escreva 'Nenhum'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="digestiveProblems" className="text-[#0A0A0A] font-medium">Problemas digestivos *</Label>
                <Textarea
                  id="digestiveProblems"
                  value={formData.digestiveProblems}
                  onChange={(e) => handleInputChange('digestiveProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Gastrite, refluxo, intestino preso/solto, intolerâncias? Se não tem, escreva 'Nenhum'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foodIntolerances" className="text-[#0A0A0A] font-medium">Intolerâncias alimentares</Label>
                <Input
                  id="foodIntolerances"
                  value={formData.foodIntolerances}
                  onChange={(e) => handleInputChange('foodIntolerances', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Lactose, glúten, outros alimentos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eatingDisorders" className="text-[#0A0A0A] font-medium">Transtornos alimentares</Label>
                <Input
                  id="eatingDisorders"
                  value={formData.eatingDisorders}
                  onChange={(e) => handleInputChange('eatingDisorders', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Anorexia, bulimia, compulsão alimentar"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sistema Musculoesquelético */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Activity className="w-5 h-5 text-[#FFC300]" />
              Sistema Musculoesquelético
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jointProblems" className="text-[#0A0A0A] font-medium">Problemas articulares *</Label>
                <Textarea
                  id="jointProblems"
                  value={formData.jointProblems}
                  onChange={(e) => handleInputChange('jointProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Dores nas articulações (joelhos, ombros, quadris)? Artrite, artrose?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backProblems" className="text-[#0A0A0A] font-medium">Problemas na coluna *</Label>
                <Textarea
                  id="backProblems"
                  value={formData.backProblems}
                  onChange={(e) => handleInputChange('backProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Dores nas costas, hérnia de disco, escoliose, lordose, cifose?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="muscleProblems" className="text-[#0A0A0A] font-medium">Problemas musculares</Label>
                <Textarea
                  id="muscleProblems"
                  value={formData.muscleProblems}
                  onChange={(e) => handleInputChange('muscleProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Tensões musculares, contraturas, fibromialgia?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="posturalProblems" className="text-[#0A0A0A] font-medium">Problemas posturais</Label>
                <Textarea
                  id="posturalProblems"
                  value={formData.posturalProblems}
                  onChange={(e) => handleInputChange('posturalProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Postura anteriorizada, ombros caídos, desvios posturais?"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saúde Mental */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Brain className="w-5 h-5 text-[#9333EA]" />
              Saúde Mental e Bem-estar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mentalHealth" className="text-[#0A0A0A] font-medium">Estado mental geral *</Label>
                <Textarea
                  id="mentalHealth"
                  value={formData.mentalHealth}
                  onChange={(e) => handleInputChange('mentalHealth', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Como se sente mentalmente? Estresse, cansaço mental, motivação?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anxiety" className="text-[#0A0A0A] font-medium">Ansiedade *</Label>
                <Textarea
                  id="anxiety"
                  value={formData.anxiety}
                  onChange={(e) => handleInputChange('anxiety', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Sente ansiedade? Em que situações? Faz tratamento? Se não tem, escreva 'Não tenho ansiedade'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depression" className="text-[#0A0A0A] font-medium">Depressão *</Label>
                <Textarea
                  id="depression"
                  value={formData.depression}
                  onChange={(e) => handleInputChange('depression', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Já teve ou tem depressão? Faz tratamento? Se nunca teve, escreva 'Nunca tive depressão'"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleepDisorders" className="text-[#0A0A0A] font-medium">Distúrbios do sono</Label>
                <Textarea
                  id="sleepDisorders"
                  value={formData.sleepDisorders}
                  onChange={(e) => handleInputChange('sleepDisorders', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Insônia, sono agitado, ronco, apneia do sono?"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Histórico Familiar */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Users className="w-5 h-5 text-[#1FBF75]" />
              Histórico Familiar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="familyHistory" className="text-[#0A0A0A] font-medium">Histórico familiar geral *</Label>
                <Textarea
                  id="familyHistory"
                  value={formData.familyHistory}
                  onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Doenças dos pais, avós, irmãos (câncer, diabetes, hipertensão, etc.)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="geneticDiseases" className="text-[#0A0A0A] font-medium">Doenças genéticas na família</Label>
                <Textarea
                  id="geneticDiseases"
                  value={formData.geneticDiseases}
                  onChange={(e) => handleInputChange('geneticDiseases', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Predisposições genéticas, doenças hereditárias"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyHeartProblems" className="text-[#0A0A0A] font-medium">Problemas cardíacos familiares</Label>
                <Input
                  id="familyHeartProblems"
                  value={formData.familyHeartProblems}
                  onChange={(e) => handleInputChange('familyHeartProblems', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Infartos, AVC, problemas cardíacos na família"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyDiabetes" className="text-[#0A0A0A] font-medium">Diabetes familiar</Label>
                <Input
                  id="familyDiabetes"
                  value={formData.familyDiabetes}
                  onChange={(e) => handleInputChange('familyDiabetes', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Familiares com diabetes tipo 1 ou 2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exames e Check-ups */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Shield className="w-5 h-5 text-[#1FBF75]" />
              Exames e Check-ups Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastCheckup" className="text-[#0A0A0A] font-medium">Último check-up médico *</Label>
                <Input
                  id="lastCheckup"
                  value={formData.lastCheckup}
                  onChange={(e) => handleInputChange('lastCheckup', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Quando foi sua última consulta médica?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodTests" className="text-[#0A0A0A] font-medium">Últimos exames de sangue</Label>
                <Textarea
                  id="bloodTests"
                  value={formData.bloodTests}
                  onChange={(e) => handleInputChange('bloodTests', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Resultados dos últimos exames (glicemia, colesterol, hemograma, etc.)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagingExams" className="text-[#0A0A0A] font-medium">Exames de imagem recentes</Label>
                <Textarea
                  id="imagingExams"
                  value={formData.imagingExams}
                  onChange={(e) => handleInputChange('imagingExams', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Raio-X, ultrassom, tomografia, ressonância magnética"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recentExams" className="text-[#0A0A0A] font-medium">Outros exames importantes</Label>
                <Textarea
                  id="recentExams"
                  value={formData.recentExams}
                  onChange={(e) => handleInputChange('recentExams', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Eletrocardiograma, teste ergométrico, densitometria óssea, etc."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hábitos de Vida */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Cigarette className="w-5 h-5 text-[#E10600]" />
              Hábitos de Vida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smokingStatus" className="text-[#0A0A0A] font-medium">Tabagismo *</Label>
                <Select value={formData.smokingStatus} onValueChange={(value) => handleInputChange('smokingStatus', value)}>
                  <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                    <SelectValue placeholder="Selecione sua relação com o cigarro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nunca fumou">Nunca fumou</SelectItem>
                    <SelectItem value="Ex-fumante">Ex-fumante</SelectItem>
                    <SelectItem value="Fumante ocasional">Fumante ocasional</SelectItem>
                    <SelectItem value="Fumante regular">Fumante regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smokingHistory" className="text-[#0A0A0A] font-medium">Histórico do tabagismo</Label>
                <Input
                  id="smokingHistory"
                  value={formData.smokingHistory}
                  onChange={(e) => handleInputChange('smokingHistory', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Quantos cigarros/dia? Por quanto tempo? Quando parou?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcoholConsumption" className="text-[#0A0A0A] font-medium">Consumo de álcool *</Label>
                <Select value={formData.alcoholConsumption} onValueChange={(value) => handleInputChange('alcoholConsumption', value)}>
                  <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                    <SelectValue placeholder="Selecione seu consumo de álcool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Não bebe">Não bebe</SelectItem>
                    <SelectItem value="Raramente">Raramente</SelectItem>
                    <SelectItem value="Socialmente">Socialmente (fins de semana)</SelectItem>
                    <SelectItem value="Moderadamente">Moderadamente (algumas vezes na semana)</SelectItem>
                    <SelectItem value="Frequentemente">Frequentemente (diariamente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="drugUse" className="text-[#0A0A0A] font-medium">Uso de substâncias</Label>
                <Input
                  id="drugUse"
                  value={formData.drugUse}
                  onChange={(e) => handleInputChange('drugUse', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Uso de drogas ilícitas ou medicamentos não prescritos"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objetivos e Atividades */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Activity className="w-5 h-5 text-[#1FBF75]" />
              Objetivos e Preferências de Exercícios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryGoal" className="text-[#0A0A0A] font-medium">Objetivo principal *</Label>
                <Select value={formData.primaryGoal} onValueChange={(value) => handleInputChange('primaryGoal', value)}>
                  <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                    <SelectValue placeholder="Selecione o objetivo principal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goals.map(goal => (
                      <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeAvailable" className="text-[#0A0A0A] font-medium">Tempo disponível *</Label>
                <Input
                  id="timeAvailable"
                  value={formData.timeAvailable}
                  onChange={(e) => handleInputChange('timeAvailable', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Ex: 1 hora, 3x por semana"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#0A0A0A] font-medium">Atividades que gosta</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activities.map(activity => (
                  <div key={activity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`preferred-${activity}`}
                      checked={formData.preferredActivities?.includes(activity)}
                      onCheckedChange={(checked) => handleArrayChange('preferredActivities', activity, checked as boolean)}
                    />
                    <Label htmlFor={`preferred-${activity}`} className="text-sm text-[#0A0A0A]">{activity}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseHistory" className="text-[#0A0A0A] font-medium">Histórico de exercícios *</Label>
              <Textarea
                id="exerciseHistory"
                value={formData.exerciseHistory}
                onChange={(e) => handleInputChange('exerciseHistory', e.target.value)}
                className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                placeholder="Que atividades já praticou? Por quanto tempo? Quando parou? Por que parou?"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Limitações e Contraindicações */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <AlertTriangle className="w-5 h-5 text-[#FFC300]" />
              Limitações e Contraindicações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="physicalLimitations" className="text-[#0A0A0A] font-medium">Limitações físicas *</Label>
                <Textarea
                  id="physicalLimitations"
                  value={formData.physicalLimitations}
                  onChange={(e) => handleInputChange('physicalLimitations', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Movimentos que causam dor, limitações de mobilidade, restrições médicas"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contraindications" className="text-[#0A0A0A] font-medium">Contraindicações médicas *</Label>
                <Textarea
                  id="contraindications"
                  value={formData.contraindications}
                  onChange={(e) => handleInputChange('contraindications', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Exercícios proibidos pelo médico, atividades que devem ser evitadas"
                  rows={4}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observations" className="text-[#0A0A0A] font-medium">Observações importantes</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => handleInputChange('observations', e.target.value)}
                className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                placeholder="Qualquer informação adicional importante que o personal trainer deve saber"
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
            {activeView === 'edit' ? 'Atualizar' : 'Salvar'} Anamnese Completa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-[#FFC300]" />
          <h2 className="text-2xl font-bold text-white">Anamneses Completas</h2>
        </div>
        <Button
          onClick={() => setActiveView('new')}
          className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-6 py-3 rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Anamnese
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {anamneses.map((anamnese) => (
          <Card key={anamnese.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <CardTitle className="text-[#0A0A0A] text-lg">{anamnese.studentName}</CardTitle>
                    <p className="text-[#4A4A4A] text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(anamnese.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <Badge className={`
                  ${anamnese.status === 'completed' ? 'bg-[#1FBF75] text-white' : 'bg-[#FFC300] text-[#0A0A0A]'}
                  font-medium px-3 py-1 rounded-xl
                `}>
                  {anamnese.status === 'completed' ? 'Completa' : 'Pendente'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-[#4A4A4A]">Objetivo principal</Label>
                  <p className="text-[#0A0A0A] font-medium">{anamnese.primaryGoal}</p>
                </div>
                <div>
                  <Label className="text-[#4A4A4A]">Idade</Label>
                  <p className="text-[#0A0A0A] font-medium">{anamnese.age} anos</p>
                </div>
              </div>

              <div>
                <Label className="text-[#4A4A4A] text-sm">Doenças crônicas</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {anamnese.chronicDiseases?.slice(0, 2).map((disease, index) => (
                    <Badge
                      key={index}
                      className="bg-[#E10600] text-white text-xs px-2 py-1 rounded-lg"
                    >
                      {disease}
                    </Badge>
                  ))}
                  {anamnese.chronicDiseases?.length > 2 && (
                    <Badge className="bg-[#E6C85C] text-[#0A0A0A] text-xs px-2 py-1 rounded-lg">
                      +{anamnese.chronicDiseases.length - 2}
                    </Badge>
                  )}
                  {(!anamnese.chronicDiseases || anamnese.chronicDiseases.length === 0) && (
                    <Badge className="bg-[#1FBF75] text-white text-xs px-2 py-1 rounded-lg">
                      Nenhuma
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-[#E6C85C]">
                <Button
                  onClick={() => handleView(anamnese)}
                  size="sm"
                  className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
                <Button
                  onClick={() => handleEdit(anamnese)}
                  size="sm"
                  className="bg-[#0A0A0A] hover:bg-[#2A2A2A] text-white rounded-xl flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {anamneses.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma anamnese cadastrada</h3>
            <p className="text-white/80 mb-6">
              Comece criando a primeira anamnese completa para seus alunos.
            </p>
            <Button
              onClick={() => setActiveView('new')}
              className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-6 py-3 rounded-2xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeira Anamnese
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}