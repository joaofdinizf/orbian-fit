'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp,
  Edit,
  Save,
  Camera,
  GraduationCap,
  Award,
  Dumbbell,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  DollarSign,
  Eye,
  UserPlus,
  CheckCircle,
  Clock,
  Sparkles,
  Target,
  Share2,
  Copy,
  ExternalLink,
  Filter,
  Search,
  BarChart3,
  ArrowLeft
} from 'lucide-react';

interface TeacherProfile {
  id: string;
  name: string;
  photo: string;
  bio: string;
  education: {
    university: string;
    courses: string[];
    certifications: string[];
  };
  experience: {
    years: number;
    areas: string[];
  };
  modalities: string[];
  rating: number;
  totalReviews: number;
  location: string;
  services: {
    online: boolean;
    inPerson: boolean;
    hybrid: boolean;
  };
  plans: {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
  }[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}

interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  source: string;
  date: string;
  notes?: string;
}

export default function TeacherProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [aiOptimizing, setAiOptimizing] = useState(false);
  const [filterLeads, setFilterLeads] = useState('all');
  const [searchLeads, setSearchLeads] = useState('');

  // Mock data - em produção viria do banco de dados
  const [profile, setProfile] = useState<TeacherProfile>({
    id: '1',
    name: 'Carlos Silva',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
    bio: 'Personal trainer especializado em hipertrofia e emagrecimento com mais de 8 anos de experiência. Formado em Educação Física e pós-graduado em Fisiologia do Exercício.',
    education: {
      university: 'Universidade Federal de São Paulo',
      courses: ['Educação Física - Bacharelado', 'Pós-graduação em Fisiologia do Exercício'],
      certifications: ['CREF 123456-G/SP', 'Certificação ACSM', 'Treinamento Funcional Level 2']
    },
    experience: {
      years: 8,
      areas: ['Hipertrofia', 'Emagrecimento', 'Condicionamento Físico', 'Reabilitação']
    },
    modalities: ['Musculação', 'Treinamento Funcional', 'Corrida', 'Crossfit', 'Pilates'],
    rating: 4.8,
    totalReviews: 127,
    location: 'São Paulo, SP',
    services: {
      online: true,
      inPerson: true,
      hybrid: true
    },
    plans: [
      {
        id: '1',
        name: 'Consultoria Online',
        price: 150,
        description: 'Treino personalizado e acompanhamento via WhatsApp',
        features: ['Treino personalizado', 'Acompanhamento diário', 'Ajustes semanais', 'Suporte via WhatsApp']
      },
      {
        id: '2',
        name: 'Personal Presencial',
        price: 80,
        description: 'Aula individual presencial (por sessão)',
        features: ['Aula individual', 'Correção de postura', 'Motivação presencial', 'Flexibilidade de horários']
      },
      {
        id: '3',
        name: 'Híbrido Premium',
        price: 300,
        description: 'Combinação de online e presencial',
        features: ['2x presencial/semana', 'Acompanhamento online', 'Plano nutricional', 'Relatórios mensais']
      }
    ],
    contact: {
      phone: '(11) 99999-9999',
      email: 'carlos@personaltrainer.com',
      website: 'www.carlossilvapt.com'
    }
  });

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      studentName: 'Maria Santos',
      rating: 5,
      comment: 'Excelente profissional! Consegui perder 15kg em 6 meses com o acompanhamento do Carlos. Super recomendo!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      studentName: 'João Oliveira',
      rating: 5,
      comment: 'Carlos é muito dedicado e sempre adapta os treinos conforme minha evolução. Resultados incríveis!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      studentName: 'Ana Costa',
      rating: 4,
      comment: 'Ótimo personal! Me ajudou muito a ganhar massa muscular. Metodologia excelente.',
      date: '2024-01-05',
      verified: true
    }
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Pedro Almeida',
      email: 'pedro@email.com',
      phone: '(11) 98888-8888',
      status: 'new',
      source: 'Página Pública',
      date: '2024-01-20',
      notes: 'Interessado em emagrecimento'
    },
    {
      id: '2',
      name: 'Lucia Ferreira',
      email: 'lucia@email.com',
      status: 'contacted',
      source: 'Marketplace',
      date: '2024-01-18',
      notes: 'Quer treino presencial'
    },
    {
      id: '3',
      name: 'Roberto Silva',
      email: 'roberto@email.com',
      phone: '(11) 97777-7777',
      status: 'converted',
      source: 'Indicação',
      date: '2024-01-15',
      notes: 'Contratou plano híbrido'
    }
  ]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Aqui salvaria no banco de dados
    console.log('Perfil salvo:', profile);
  };

  const handleAiOptimization = async () => {
    setAiOptimizing(true);
    
    // Simulação da otimização por IA
    setTimeout(() => {
      const optimizedBio = `Personal trainer especializado em transformação corporal com metodologia científica comprovada. Com mais de 8 anos de experiência, já ajudei centenas de alunos a alcançarem seus objetivos através de treinos personalizados e acompanhamento individualizado. 

Minha abordagem combina conhecimento técnico avançado com motivação constante, garantindo resultados sustentáveis e duradouros. Especialista em hipertrofia, emagrecimento e condicionamento físico.

🏆 Mais de 500 transformações realizadas
📚 Formação acadêmica sólida e certificações internacionais
💪 Metodologia personalizada para cada objetivo
📱 Acompanhamento 24/7 via WhatsApp`;

      setProfile(prev => ({
        ...prev,
        bio: optimizedBio
      }));
      
      setAiOptimizing(false);
    }, 3000);
  };

  const copyProfileLink = () => {
    const link = `${window.location.origin}/teacher-profile/public/${profile.id}`;
    navigator.clipboard.writeText(link);
    alert('Link copiado para a área de transferência!');
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filterLeads === 'all' || lead.status === filterLeads;
    const matchesSearch = lead.name.toLowerCase().includes(searchLeads.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchLeads.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'converted': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'converted': return 'Convertido';
      case 'lost': return 'Perdido';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFC300] to-[#FFB800]">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#E6C85C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => window.history.back()}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
              <div className="w-12 h-12 bg-[#FFC300] rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 text-[#0A0A0A]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0A0A0A]">
                  Perfil do Professor
                </h1>
                <p className="text-[#4A4A4A] font-medium">
                  Gerencie seu perfil profissional
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={copyProfileLink}
                className="bg-[#E10600] hover:bg-[#C00000] text-white rounded-xl"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar
              </Button>
              <Badge className={`px-3 py-1 rounded-xl font-medium ${
                isPublic ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {isPublic ? 'Público' : 'Privado'}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Avaliações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="public" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Página Pública</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">IA</span>
            </TabsTrigger>
            <TabsTrigger 
              value="leads" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-bold text-[#0A0A0A]">
                      Informações Pessoais
                    </CardTitle>
                    <Button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-[#FFC300]"
                        />
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 bg-[#E10600] hover:bg-[#C00000] text-white rounded-full w-8 h-8 p-0"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <Input
                            value={profile.name}
                            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            className="text-2xl font-bold border-2 border-[#E6C85C] rounded-xl"
                          />
                        ) : (
                          <h2 className="text-2xl font-bold text-[#0A0A0A]">{profile.name}</h2>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="font-medium text-[#0A0A0A]">{profile.rating}</span>
                            <span className="text-[#4A4A4A]">({profile.totalReviews} avaliações)</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#4A4A4A]">
                            <MapPin className="w-4 h-4" />
                            <span>{profile.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-[#0A0A0A] font-medium mb-2 block">Descrição</Label>
                      {isEditing ? (
                        <Textarea
                          value={profile.bio}
                          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                          rows={4}
                          className="border-2 border-[#E6C85C] rounded-xl"
                        />
                      ) : (
                        <p className="text-[#4A4A4A] whitespace-pre-line">{profile.bio}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[#0A0A0A] font-medium mb-2 block">Contato</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#4A4A4A]" />
                            {isEditing ? (
                              <Input
                                value={profile.contact.phone}
                                onChange={(e) => setProfile(prev => ({
                                  ...prev,
                                  contact: { ...prev.contact, phone: e.target.value }
                                }))}
                                className="border border-[#E6C85C] rounded-lg"
                              />
                            ) : (
                              <span className="text-[#4A4A4A]">{profile.contact.phone}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#4A4A4A]" />
                            {isEditing ? (
                              <Input
                                value={profile.contact.email}
                                onChange={(e) => setProfile(prev => ({
                                  ...prev,
                                  contact: { ...prev.contact, email: e.target.value }
                                }))}
                                className="border border-[#E6C85C] rounded-lg"
                              />
                            ) : (
                              <span className="text-[#4A4A4A]">{profile.contact.email}</span>
                            )}
                          </div>
                          {profile.contact.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-[#4A4A4A]" />
                              {isEditing ? (
                                <Input
                                  value={profile.contact.website}
                                  onChange={(e) => setProfile(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, website: e.target.value }
                                  }))}
                                  className="border border-[#E6C85C] rounded-lg"
                                />
                              ) : (
                                <span className="text-[#4A4A4A]">{profile.contact.website}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-[#0A0A0A] font-medium mb-2 block">Experiência</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#4A4A4A]" />
                            <span className="text-[#4A4A4A]">{profile.experience.years} anos de experiência</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {profile.experience.areas.map((area, index) => (
                              <Badge key={index} className="bg-[#FFC300] text-[#0A0A0A] rounded-lg">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                      <GraduationCap className="w-6 h-6 text-[#FFC300]" />
                      Formação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-[#0A0A0A] font-medium mb-2 block">Universidade</Label>
                      <p className="text-[#4A4A4A]">{profile.education.university}</p>
                    </div>
                    <div>
                      <Label className="text-[#0A0A0A] font-medium mb-2 block">Cursos</Label>
                      <ul className="list-disc list-inside text-[#4A4A4A] space-y-1">
                        {profile.education.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Label className="text-[#0A0A0A] font-medium mb-2 block">Certificações</Label>
                      <div className="flex flex-wrap gap-2">
                        {profile.education.certifications.map((cert, index) => (
                          <Badge key={index} className="bg-[#E10600] text-white rounded-lg">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Modalities */}
                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                      <Dumbbell className="w-6 h-6 text-[#FFC300]" />
                      Modalidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.modalities.map((modality, index) => (
                        <Badge key={index} className="bg-[#FFF3C4] text-[#0A0A0A] border border-[#FFC300] rounded-lg">
                          {modality}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                      <Target className="w-6 h-6 text-[#FFC300]" />
                      Serviços
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#0A0A0A]">Online</span>
                      <Badge className={profile.services.online ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}>
                        {profile.services.online ? 'Disponível' : 'Indisponível'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#0A0A0A]">Presencial</span>
                      <Badge className={profile.services.inPerson ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}>
                        {profile.services.inPerson ? 'Disponível' : 'Indisponível'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#0A0A0A]">Híbrido</span>
                      <Badge className={profile.services.hybrid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}>
                        {profile.services.hybrid ? 'Disponível' : 'Indisponível'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                      <BarChart3 className="w-6 h-6 text-[#FFC300]" />
                      Estatísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">Visualizações do perfil</span>
                      <span className="font-bold text-[#0A0A0A]">1.2k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">Leads este mês</span>
                      <span className="font-bold text-[#0A0A0A]">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">Taxa de conversão</span>
                      <span className="font-bold text-[#0A0A0A]">18%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <Star className="w-6 h-6 text-[#FFC300]" />
                  Avaliações dos Alunos
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(profile.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-[#0A0A0A]">{profile.rating}</span>
                    <span className="text-[#4A4A4A]">({profile.totalReviews} avaliações)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-[#E6C85C] pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#FFC300] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-[#0A0A0A]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#0A0A0A]">{review.studentName}</h4>
                              {review.verified && (
                                <Badge className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-[#4A4A4A]">
                                {new Date(review.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#4A4A4A] ml-13">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Public Page Tab */}
          <TabsContent value="public" className="space-y-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <Globe className="w-6 h-6 text-[#FFC300]" />
                  Página Pública de Vendas
                </CardTitle>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={copyProfileLink}
                    className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Link
                  </Button>
                  <Button
                    onClick={() => window.open(`/teacher-profile/public/${profile.id}`, '_blank')}
                    className="bg-[#E10600] hover:bg-[#C00000] text-white rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-[#FFF3C4] p-4 rounded-xl border border-[#FFC300]">
                  <p className="text-[#0A0A0A] font-medium mb-2">Link da sua página pública:</p>
                  <code className="text-sm bg-white p-2 rounded border text-[#4A4A4A] block">
                    {window.location.origin}/teacher-profile/public/{profile.id}
                  </code>
                </div>

                {/* Plans */}
                <div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Seus Planos e Valores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {profile.plans.map((plan) => (
                      <Card key={plan.id} className="border-2 border-[#E6C85C] rounded-xl">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-bold text-[#0A0A0A]">{plan.name}</CardTitle>
                          <div className="text-2xl font-bold text-[#E10600]">
                            R$ {plan.price}
                            <span className="text-sm font-normal text-[#4A4A4A]">/mês</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#4A4A4A] mb-3">{plan.description}</p>
                          <ul className="space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Preview da Página Pública</h3>
                  <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-xl font-bold text-[#0A0A0A]">{profile.name}</h2>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= Math.floor(profile.rating)
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-[#4A4A4A]">
                              {profile.rating} ({profile.totalReviews} avaliações)
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#4A4A4A] text-sm mb-4 line-clamp-3">{profile.bio}</p>
                      <div className="flex gap-2 mb-4">
                        {profile.modalities.slice(0, 3).map((modality, index) => (
                          <Badge key={index} className="bg-[#FFC300] text-[#0A0A0A] text-xs">
                            {modality}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-[#E10600] hover:bg-[#C00000] text-white">
                        Contratar Serviços
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <Sparkles className="w-6 h-6 text-[#FFC300]" />
                  Otimização com IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-[#FFC300] to-[#FFB800] p-6 rounded-xl text-white">
                  <h3 className="text-lg font-bold mb-2">🚀 Melhore seu perfil com IA</h3>
                  <p className="mb-4">
                    Nossa IA analisa seu perfil e sugere melhorias para atrair mais alunos e aumentar suas conversões.
                  </p>
                  <Button
                    onClick={handleAiOptimization}
                    disabled={aiOptimizing}
                    className="bg-white text-[#0A0A0A] hover:bg-gray-100 font-medium"
                  >
                    {aiOptimizing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full mr-2"></div>
                        Otimizando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Otimizar Perfil
                      </>
                    )}
                  </Button>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#0A0A0A]">💡 Sugestões da IA</h3>
                  
                  <Card className="border-l-4 border-l-green-500 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">Descrição Otimizada</h4>
                          <p className="text-green-700 text-sm">
                            Sua descrição foi melhorada com palavras-chave que atraem mais clientes e destacam seus diferenciais.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-1">Adicione mais certificações</h4>
                          <p className="text-yellow-700 text-sm">
                            Perfis com mais certificações têm 35% mais conversões. Considere adicionar cursos recentes.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">Otimize seus preços</h4>
                          <p className="text-blue-700 text-sm">
                            Baseado no mercado local, seus preços estão competitivos. Considere criar um plano intermediário.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500 bg-purple-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-purple-800 mb-1">Solicite mais avaliações</h4>
                          <p className="text-purple-700 text-sm">
                            Perfis com mais de 50 avaliações têm 60% mais contratações. Peça feedback aos seus alunos atuais.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Insights */}
                <div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Insights de Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-[#FFF3C4] border border-[#FFC300]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#4A4A4A] mb-1">Score do Perfil</p>
                            <p className="text-2xl font-bold text-[#0A0A0A]">85/100</p>
                          </div>
                          <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-[#0A0A0A]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#FFF3C4] border border-[#FFC300]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#4A4A4A] mb-1">Potencial de Melhoria</p>
                            <p className="text-2xl font-bold text-[#E10600]">+23%</p>
                          </div>
                          <div className="w-12 h-12 bg-[#E10600] rounded-full flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <Users className="w-6 h-6 text-[#FFC300]" />
                  Funil de Vendas e Leads
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#4A4A4A]" />
                    <select
                      value={filterLeads}
                      onChange={(e) => setFilterLeads(e.target.value)}
                      className="border border-[#E6C85C] rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="all">Todos</option>
                      <option value="new">Novos</option>
                      <option value="contacted">Contatados</option>
                      <option value="converted">Convertidos</option>
                      <option value="lost">Perdidos</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#4A4A4A]" />
                    <Input
                      placeholder="Buscar leads..."
                      value={searchLeads}
                      onChange={(e) => setSearchLeads(e.target.value)}
                      className="w-48 border-[#E6C85C] rounded-lg"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-blue-50 border border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {leads.filter(l => l.status === 'new').length}
                      </div>
                      <div className="text-sm text-blue-600">Novos</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50 border border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {leads.filter(l => l.status === 'contacted').length}
                      </div>
                      <div className="text-sm text-yellow-600">Contatados</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {leads.filter(l => l.status === 'converted').length}
                      </div>
                      <div className="text-sm text-green-600">Convertidos</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 border border-red-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {leads.filter(l => l.status === 'lost').length}
                      </div>
                      <div className="text-sm text-red-600">Perdidos</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Leads List */}
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <Card key={lead.id} className="border border-[#E6C85C] hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#FFC300] rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-[#0A0A0A]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-[#0A0A0A]">{lead.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {lead.email}
                                </span>
                                {lead.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {lead.phone}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-[#FFF3C4] text-[#0A0A0A] text-xs">
                                  {lead.source}
                                </Badge>
                                <span className="text-xs text-[#4A4A4A]">
                                  {new Date(lead.date).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              {lead.notes && (
                                <p className="text-sm text-[#4A4A4A] mt-1">{lead.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getStatusColor(lead.status)} text-white px-3 py-1 rounded-full`}>
                              {getStatusLabel(lead.status)}
                            </Badge>
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                              className="border border-[#E6C85C] rounded-lg px-2 py-1 text-sm"
                            >
                              <option value="new">Novo</option>
                              <option value="contacted">Contatado</option>
                              <option value="converted">Convertido</option>
                              <option value="lost">Perdido</option>
                            </select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredLeads.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                    <p className="text-[#4A4A4A]">Nenhum lead encontrado</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}