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
  Camera,
  Upload,
  User,
  Calendar,
  Eye,
  CheckCircle,
  AlertCircle,
  Scan
} from 'lucide-react';

interface PosturalAssessmentProps {
  userRole: 'trainer' | 'student';
}

interface PosturalItem {
  id: string;
  name: string;
  status: 'normal' | 'altered';
  side?: 'direita' | 'esquerda' | 'bilateral';
  observations?: string;
}

interface Assessment {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  evaluatorName?: string;
  photos: {
    anterior: string;
    lateralDireita: string;
    lateralEsquerda: string;
    posterior: string;
  };
  generalObservations: string;
  anteriorView: PosturalItem[];
  lateralView: PosturalItem[];
  posteriorView: PosturalItem[];
  specificObservations: {
    coluna: string;
    ombros: string;
    pelve: string;
    joelhos: string;
    pes: string;
  };
}

export default function PosturalAssessment({ userRole }: PosturalAssessmentProps) {
  const [activeView, setActiveView] = useState<'list' | 'new' | 'view'>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'João Silva',
      date: '2024-01-15',
      evaluatorName: 'Prof. Carlos',
      photos: {
        anterior: '',
        lateralDireita: '',
        lateralEsquerda: '',
        posterior: ''
      },
      generalObservations: 'Primeira avaliação postural. Aluno apresenta alguns desvios posturais leves.',
      anteriorView: [
        { id: '1', name: 'Inclinação lateral da cabeça', status: 'altered', side: 'direita' },
        { id: '2', name: 'Ombro direito mais alto', status: 'altered' },
        { id: '3', name: 'Joelhos valgos', status: 'altered' }
      ],
      lateralView: [
        { id: '4', name: 'Cabeça anteriorizada', status: 'altered' },
        { id: '5', name: 'Hipercifose torácica', status: 'altered' }
      ],
      posteriorView: [
        { id: '6', name: 'Escápula alada direita', status: 'altered' }
      ],
      specificObservations: {
        coluna: 'Leve hipercifose torácica, mais acentuada na região T4-T8',
        ombros: 'Ombro direito elevado, possível tensão do trapézio superior',
        pelve: 'Pelve em posição neutra',
        joelhos: 'Leve valgo bilateral',
        pes: 'Apoio normal bilateral'
      }
    }
  ]);

  const [formData, setFormData] = useState<Partial<Assessment>>({
    studentName: '',
    date: new Date().toISOString().split('T')[0],
    evaluatorName: '',
    photos: {
      anterior: '',
      lateralDireita: '',
      lateralEsquerda: '',
      posterior: ''
    },
    generalObservations: '',
    anteriorView: [],
    lateralView: [],
    posteriorView: [],
    specificObservations: {
      coluna: '',
      ombros: '',
      pelve: '',
      joelhos: '',
      pes: ''
    }
  });

  // Itens de avaliação por vista
  const anteriorItems = [
    { id: 'cabeca_inclinacao', name: 'Inclinação lateral da cabeça', hasSide: true },
    { id: 'ombro_direito_alto', name: 'Ombro direito mais alto', hasSide: false },
    { id: 'ombro_esquerdo_alto', name: 'Ombro esquerdo mais alto', hasSide: false },
    { id: 'claviculas_assimetria', name: 'Assimetria de clavículas', hasSide: false },
    { id: 'joelhos_valgos', name: 'Joelhos valgos (em X)', hasSide: false },
    { id: 'joelhos_varos', name: 'Joelhos varos (em O)', hasSide: false },
    { id: 'crista_iliaca_direita', name: 'Crista ilíaca direita mais alta', hasSide: false },
    { id: 'crista_iliaca_esquerda', name: 'Crista ilíaca esquerda mais alta', hasSide: false },
    { id: 'pe_pronado_direito', name: 'Pé pronado direito', hasSide: false },
    { id: 'pe_pronado_esquerdo', name: 'Pé pronado esquerdo', hasSide: false },
    { id: 'pe_supinado_direito', name: 'Pé supinado direito', hasSide: false },
    { id: 'pe_supinado_esquerdo', name: 'Pé supinado esquerdo', hasSide: false }
  ];

  const lateralItems = [
    { id: 'cabeca_anteriorizada', name: 'Cabeça anteriorizada', hasSide: false },
    { id: 'ombros_protraidos', name: 'Ombros protraídos', hasSide: false },
    { id: 'hipercifose_toracica', name: 'Hipercifose torácica', hasSide: false },
    { id: 'hiperlordose_lombar', name: 'Hiperlordose lombar', hasSide: false },
    { id: 'retificacao_curvaturas', name: 'Retificação de curvaturas', hasSide: false },
    { id: 'anteversao_pelvica', name: 'Anteversão pélvica', hasSide: false },
    { id: 'retroversao_pelvica', name: 'Retroversão pélvica', hasSide: false },
    { id: 'hiperextensao_joelho', name: 'Hiperextensão de joelho', hasSide: true },
    { id: 'flexo_joelho', name: 'Flexo de joelho', hasSide: true },
    { id: 'inclinacao_tornozelo', name: 'Inclinação anterior/posterior do tornozelo', hasSide: true }
  ];

  const posteriorItems = [
    { id: 'cabeca_inclinada_post', name: 'Cabeça inclinada', hasSide: true },
    { id: 'ombro_direito_alto_post', name: 'Ombro direito mais alto', hasSide: false },
    { id: 'ombro_esquerdo_alto_post', name: 'Ombro esquerdo mais alto', hasSide: false },
    { id: 'escapula_alada_direita', name: 'Escápula alada direita', hasSide: false },
    { id: 'escapula_alada_esquerda', name: 'Escápula alada esquerda', hasSide: false },
    { id: 'assimetria_escapulas', name: 'Assimetria de escápulas', hasSide: false },
    { id: 'desvio_c', name: 'Desvio em C da coluna', hasSide: false },
    { id: 'desvio_s', name: 'Desvio em S da coluna', hasSide: false },
    { id: 'assimetria_quadril', name: 'Assimetria de quadril', hasSide: false },
    { id: 'valgo_varo_posterior', name: 'Valgo/varo observado por trás', hasSide: false },
    { id: 'tendao_aquiles_valgo', name: 'Tendão de Aquiles em valgo/varo', hasSide: true },
    { id: 'diferenca_apoio', name: 'Diferença de apoio entre lados', hasSide: false }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Assessment] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleItemChange = (view: 'anteriorView' | 'lateralView' | 'posteriorView', itemId: string, status: 'normal' | 'altered', side?: string) => {
    const currentItems = formData[view] || [];
    const existingItemIndex = currentItems.findIndex(item => item.id === itemId);
    
    if (status === 'altered') {
      const newItem: PosturalItem = {
        id: itemId,
        name: getItemName(view, itemId),
        status: 'altered',
        side: side as any
      };
      
      if (existingItemIndex >= 0) {
        currentItems[existingItemIndex] = newItem;
      } else {
        currentItems.push(newItem);
      }
    } else {
      if (existingItemIndex >= 0) {
        currentItems.splice(existingItemIndex, 1);
      }
    }
    
    setFormData(prev => ({ ...prev, [view]: currentItems }));
  };

  const getItemName = (view: 'anteriorView' | 'lateralView' | 'posteriorView', itemId: string) => {
    let items;
    switch (view) {
      case 'anteriorView': items = anteriorItems; break;
      case 'lateralView': items = lateralItems; break;
      case 'posteriorView': items = posteriorItems; break;
    }
    return items.find(item => item.id === itemId)?.name || itemId;
  };

  const isItemAltered = (view: 'anteriorView' | 'lateralView' | 'posteriorView', itemId: string) => {
    const items = formData[view] || [];
    return items.some(item => item.id === itemId);
  };

  const getItemSide = (view: 'anteriorView' | 'lateralView' | 'posteriorView', itemId: string) => {
    const items = formData[view] || [];
    const item = items.find(item => item.id === itemId);
    return item?.side || '';
  };

  const handlePhotoUpload = (position: 'anterior' | 'lateralDireita' | 'lateralEsquerda' | 'posterior', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange(`photos.${position}`, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAssessment = () => {
    if (!formData.studentName) {
      alert('Por favor, preencha o nome do aluno.');
      return;
    }

    const newAssessment: Assessment = {
      ...formData,
      id: Date.now().toString(),
      anteriorView: formData.anteriorView || [],
      lateralView: formData.lateralView || [],
      posteriorView: formData.posteriorView || []
    } as Assessment;

    setAssessments(prev => [...prev, newAssessment]);
    setActiveView('list');
    setFormData({
      studentName: '',
      date: new Date().toISOString().split('T')[0],
      evaluatorName: '',
      photos: {
        anterior: '',
        lateralDireita: '',
        lateralEsquerda: '',
        posterior: ''
      },
      generalObservations: '',
      anteriorView: [],
      lateralView: [],
      posteriorView: [],
      specificObservations: {
        coluna: '',
        ombros: '',
        pelve: '',
        joelhos: '',
        pes: ''
      }
    });
  };

  const handleView = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setActiveView('view');
  };

  const getTotalAlterations = (assessment: Assessment) => {
    return assessment.anteriorView.length + assessment.lateralView.length + assessment.posteriorView.length;
  };

  // Tela de visualização
  if (activeView === 'view' && selectedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scan className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">
              Avaliação Postural - {selectedAssessment.studentName}
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

        {/* Fotos da Avaliação */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Camera className="w-5 h-5 text-[#FFC300]" />
              Fotos da Avaliação Postural
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: 'anterior', label: 'Vista Anterior' },
                { key: 'lateralDireita', label: 'Vista Lateral Direita' },
                { key: 'lateralEsquerda', label: 'Vista Lateral Esquerda' },
                { key: 'posterior', label: 'Vista Posterior' }
              ].map((view) => (
                <div key={view.key} className="text-center">
                  <Label className="text-[#0A0A0A] font-medium mb-2 block">{view.label}</Label>
                  <div className="w-full h-64 bg-[#FFF3C4] border-2 border-dashed border-[#E6C85C] rounded-xl flex items-center justify-center">
                    {selectedAssessment.photos[view.key as keyof typeof selectedAssessment.photos] ? (
                      <img
                        src={selectedAssessment.photos[view.key as keyof typeof selectedAssessment.photos]}
                        alt={`Foto ${view.label}`}
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

        {/* Resultados por Vista */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vista Anterior */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Eye className="w-5 h-5 text-[#FFC300]" />
                Vista Anterior
                <Badge className={selectedAssessment.anteriorView.length > 0 ? "bg-[#E10600] text-white" : "bg-[#1FBF75] text-white"}>
                  {selectedAssessment.anteriorView.length} alterações
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedAssessment.anteriorView.length > 0 ? (
                selectedAssessment.anteriorView.map((item) => (
                  <div key={item.id} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-[#E10600]" />
                      <span className="font-medium text-[#0A0A0A]">{item.name}</span>
                    </div>
                    {item.side && (
                      <p className="text-sm text-[#4A4A4A]">Lado: {item.side}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-8 h-8 text-[#1FBF75] mx-auto mb-2" />
                  <p className="text-[#1FBF75] font-medium">Nenhuma alteração detectada</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vista Lateral */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Eye className="w-5 h-5 text-[#1FBF75]" />
                Vista Lateral
                <Badge className={selectedAssessment.lateralView.length > 0 ? "bg-[#E10600] text-white" : "bg-[#1FBF75] text-white"}>
                  {selectedAssessment.lateralView.length} alterações
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedAssessment.lateralView.length > 0 ? (
                selectedAssessment.lateralView.map((item) => (
                  <div key={item.id} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-[#E10600]" />
                      <span className="font-medium text-[#0A0A0A]">{item.name}</span>
                    </div>
                    {item.side && (
                      <p className="text-sm text-[#4A4A4A]">Lado: {item.side}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-8 h-8 text-[#1FBF75] mx-auto mb-2" />
                  <p className="text-[#1FBF75] font-medium">Nenhuma alteração detectada</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vista Posterior */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Eye className="w-5 h-5 text-[#E10600]" />
                Vista Posterior
                <Badge className={selectedAssessment.posteriorView.length > 0 ? "bg-[#E10600] text-white" : "bg-[#1FBF75] text-white"}>
                  {selectedAssessment.posteriorView.length} alterações
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedAssessment.posteriorView.length > 0 ? (
                selectedAssessment.posteriorView.map((item) => (
                  <div key={item.id} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-[#E10600]" />
                      <span className="font-medium text-[#0A0A0A]">{item.name}</span>
                    </div>
                    {item.side && (
                      <p className="text-sm text-[#4A4A4A]">Lado: {item.side}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-8 h-8 text-[#1FBF75] mx-auto mb-2" />
                  <p className="text-[#1FBF75] font-medium">Nenhuma alteração detectada</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Observações Específicas */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Activity className="w-5 h-5 text-[#FFC300]" />
              Observações Específicas por Região
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(selectedAssessment.specificObservations).map(([region, observation]) => (
              observation && (
                <div key={region} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <h4 className="font-semibold text-[#0A0A0A] capitalize mb-1">{region}:</h4>
                  <p className="text-[#0A0A0A]">{observation}</p>
                </div>
              )
            ))}
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
            <Scan className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">Nova Avaliação Postural</h2>
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
                placeholder="Observações gerais sobre a avaliação postural..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Fotos da Avaliação */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Camera className="w-5 h-5 text-[#FFC300]" />
              Fotos da Avaliação Postural
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: 'anterior', label: 'Vista Anterior' },
                { key: 'lateralDireita', label: 'Vista Lateral Direita' },
                { key: 'lateralEsquerda', label: 'Vista Lateral Esquerda' },
                { key: 'posterior', label: 'Vista Posterior' }
              ].map((view) => (
                <div key={view.key} className="space-y-2">
                  <Label className="text-[#0A0A0A] font-medium">{view.label}</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(view.key as any, e)}
                      className="hidden"
                      id={`photo-${view.key}`}
                    />
                    <label
                      htmlFor={`photo-${view.key}`}
                      className="w-full h-64 bg-[#FFF3C4] border-2 border-dashed border-[#E6C85C] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#FFF0B3] transition-colors"
                    >
                      {formData.photos?.[view.key as keyof typeof formData.photos] ? (
                        <img
                          src={formData.photos[view.key as keyof typeof formData.photos]}
                          alt={`Foto ${view.label}`}
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

        {/* Checklist Vista Anterior */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Eye className="w-5 h-5 text-[#FFC300]" />
              Vista Anterior - Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anteriorItems.map((item) => (
                <div key={item.id} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">{item.name}</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={item.id}
                          value="normal"
                          checked={!isItemAltered('anteriorView', item.id)}
                          onChange={() => handleItemChange('anteriorView', item.id, 'normal')}
                          className="text-[#1FBF75]"
                        />
                        <span className="text-[#0A0A0A]">Normal</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={item.id}
                          value="altered"
                          checked={isItemAltered('anteriorView', item.id)}
                          onChange={() => handleItemChange('anteriorView', item.id, 'altered')}
                          className="text-[#E10600]"
                        />
                        <span className="text-[#0A0A0A]">Alterado</span>
                      </label>
                    </div>
                    {item.hasSide && isItemAltered('anteriorView', item.id) && (
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${item.id}_side`}
                            value="direita"
                            checked={getItemSide('anteriorView', item.id) === 'direita'}
                            onChange={() => handleItemChange('anteriorView', item.id, 'altered', 'direita')}
                            className="text-[#FFC300]"
                          />
                          <span className="text-[#0A0A0A] text-sm">Direita</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${item.id}_side`}
                            value="esquerda"
                            checked={getItemSide('anteriorView', item.id) === 'esquerda'}
                            onChange={() => handleItemChange('anteriorView', item.id, 'altered', 'esquerda')}
                            className="text-[#FFC300]"
                          />
                          <span className="text-[#0A0A0A] text-sm">Esquerda</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist Vista Lateral */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Eye className="w-5 h-5 text-[#1FBF75]" />
              Vista Lateral - Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lateralItems.map((item) => (
                <div key={item.id} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">{item.name}</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={item.id}
                          value="normal"
                          checked={!isItemAltered('lateralView', item.id)}
                          onChange={() => handleItemChange('lateralView', item.id, 'normal')}
                          className="text-[#1FBF75]"
                        />
                        <span className="text-[#0A0A0A]">Normal</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={item.id}
                          value="altered"
                          checked={isItemAltered('lateralView', item.id)}
                          onChange={() => handleItemChange('lateralView', item.id, 'altered')}
                          className="text-[#E10600]"
                        />
                        <span className="text-[#0A0A0A]">Alterado</span>
                      </label>
                    </div>
                    {item.hasSide && isItemAltered('lateralView', item.id) && (
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${item.id}_side`}
                            value="direita"
                            checked={getItemSide('lateralView', item.id) === 'direita'}
                            onChange={() => handleItemChange('lateralView', item.id, 'altered', 'direita')}
                            className="text-[#FFC300]"
                          />
                          <span className="text-[#0A0A0A] text-sm">Direita</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${item.id}_side`}
                            value="esquerda"
                            checked={getItemSide('lateralView', item.id) === 'esquerda'}
                            onChange={() => handleItemChange('lateralView', item.id, 'altered', 'esquerda')}
                            className="text-[#FFC300]"
                          />
                          <span className="text-[#0A0A0A] text-sm">Esquerda</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist Vista Posterior */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Eye className="w-5 h-5 text-[#E10600]" />
              Vista Posterior - Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posteriorItems.map((item) => (
                <div key={item.id} className="p-3 bg-[#FFF3C4] rounded-xl border border-[#E6C85C]">
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">{item.name}</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={item.id}
                          value="normal"
                          checked={!isItemAltered('posteriorView', item.id)}
                          onChange={() => handleItemChange('posteriorView', item.id, 'normal')}
                          className="text-[#1FBF75]"
                        />
                        <span className="text-[#0A0A0A]">Normal</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={item.id}
                          value="altered"
                          checked={isItemAltered('posteriorView', item.id)}
                          onChange={() => handleItemChange('posteriorView', item.id, 'altered')}
                          className="text-[#E10600]"
                        />
                        <span className="text-[#0A0A0A]">Alterado</span>
                      </label>
                    </div>
                    {item.hasSide && isItemAltered('posteriorView', item.id) && (
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${item.id}_side`}
                            value="direita"
                            checked={getItemSide('posteriorView', item.id) === 'direita'}
                            onChange={() => handleItemChange('posteriorView', item.id, 'altered', 'direita')}
                            className="text-[#FFC300]"
                          />
                          <span className="text-[#0A0A0A] text-sm">Direita</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`${item.id}_side`}
                            value="esquerda"
                            checked={getItemSide('posteriorView', item.id) === 'esquerda'}
                            onChange={() => handleItemChange('posteriorView', item.id, 'altered', 'esquerda')}
                            className="text-[#FFC300]"
                          />
                          <span className="text-[#0A0A0A] text-sm">Esquerda</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observações Específicas por Região */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Activity className="w-5 h-5 text-[#FFC300]" />
              Observações Específicas por Região
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'coluna', label: 'Coluna' },
                { key: 'ombros', label: 'Ombros' },
                { key: 'pelve', label: 'Pelve' },
                { key: 'joelhos', label: 'Joelhos' },
                { key: 'pes', label: 'Pés' }
              ].map((region) => (
                <div key={region.key} className="space-y-2">
                  <Label htmlFor={`obs-${region.key}`} className="text-[#0A0A0A] font-medium">
                    {region.label}
                  </Label>
                  <Textarea
                    id={`obs-${region.key}`}
                    value={formData.specificObservations?.[region.key as keyof typeof formData.specificObservations] || ''}
                    onChange={(e) => handleInputChange(`specificObservations.${region.key}`, e.target.value)}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder={`Observações específicas sobre ${region.label.toLowerCase()}...`}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botão Salvar */}
        <div className="flex justify-center">
          <Button
            onClick={saveAssessment}
            className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar Avaliação Postural
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
          <Scan className="w-6 h-6 text-[#FFC300]" />
          <h2 className="text-2xl font-bold text-white">Avaliações Posturais</h2>
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
                    <Scan className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <CardTitle className="text-[#0A0A0A] text-lg">{assessment.studentName}</CardTitle>
                    <p className="text-[#4A4A4A] text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(assessment.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <Badge className={getTotalAlterations(assessment) > 0 ? "bg-[#E10600] text-white" : "bg-[#1FBF75] text-white"}>
                  {getTotalAlterations(assessment)} alterações
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                  <Eye className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#0A0A0A]">{assessment.anteriorView.length}</p>
                  <p className="text-xs text-[#4A4A4A]">Anterior</p>
                </div>
                <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                  <Eye className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#0A0A0A]">{assessment.lateralView.length}</p>
                  <p className="text-xs text-[#4A4A4A]">Lateral</p>
                </div>
                <div className="text-center p-3 bg-[#FFF3C4] rounded-xl">
                  <Eye className="w-5 h-5 text-[#4A4A4A] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#0A0A0A]">{assessment.posteriorView.length}</p>
                  <p className="text-xs text-[#4A4A4A]">Posterior</p>
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
            <Scan className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma avaliação postural cadastrada</h3>
            <p className="text-white/80 mb-6">
              Comece criando a primeira avaliação postural para seus alunos.
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