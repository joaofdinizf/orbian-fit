'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Link, 
  Copy, 
  Users, 
  UserPlus,
  Share2,
  QrCode,
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  Target,
  TrendingUp,
  ExternalLink,
  MessageCircle,
  Instagram,
  Send,
  User,
  Award,
  Clock,
  MapPin,
  BarChart3
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate: string;
  goals: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  registrationDate: string;
  status: 'active' | 'pending' | 'inactive';
  avatar: string;
  source: 'whatsapp' | 'instagram' | 'direct' | 'referral';
}

interface Teacher {
  id: string;
  name: string;
  specialties: string[];
  registrationLink: string;
  qrCode: string;
  students: Student[];
}

interface TeacherRegistrationLinkProps {
  userRole: 'trainer' | 'student';
}

// 🔧 TIPOS CERTINHOS PRO FORM
type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

type RegistrationForm = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  goals: string;
  fitnessLevel: FitnessLevel;
};

export default function TeacherRegistrationLink({ userRole }: TeacherRegistrationLinkProps) {
  const [activeTab, setActiveTab] = useState('link');
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    goals: '',
    fitnessLevel: 'beginner',
  });

  // Dados simulados do professor
  const teacher: Teacher = {
    id: 'teacher-1',
    name: 'Carlos Silva',
    specialties: ['Musculação', 'Funcional', 'Emagrecimento'],
    registrationLink: `${typeof window !== 'undefined' ? window.location.origin : 'https://orbianfit.com'}/cadastro/professor/carlos-silva-abc123`,
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMyI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+',
    students: [
      {
        id: '1',
        name: 'João Santos',
        email: 'joao@email.com',
        phone: '(11) 99999-9999',
        birthDate: '1990-05-15',
        goals: 'Ganhar massa muscular e definição',
        fitnessLevel: 'intermediate',
        registrationDate: '2024-01-10',
        status: 'active',
        avatar: '👨',
        source: 'whatsapp'
      },
      {
        id: '2',
        name: 'Maria Oliveira',
        email: 'maria@email.com',
        phone: '(11) 88888-8888',
        birthDate: '1985-08-22',
        goals: 'Emagrecimento e condicionamento físico',
        fitnessLevel: 'beginner',
        registrationDate: '2024-01-12',
        status: 'active',
        avatar: '👩',
        source: 'instagram'
      },
      {
        id: '3',
        name: 'Pedro Costa',
        email: 'pedro@email.com',
        birthDate: '1992-12-03',
        goals: 'Melhora da força e resistência',
        fitnessLevel: 'advanced',
        registrationDate: '2024-01-15',
        status: 'pending',
        avatar: '👨',
        source: 'direct'
      },
      {
        id: '4',
        name: 'Ana Silva',
        email: 'ana@email.com',
        phone: '(11) 77777-7777',
        birthDate: '1988-03-18',
        goals: 'Reabilitação e fortalecimento',
        fitnessLevel: 'beginner',
        registrationDate: '2024-01-18',
        status: 'active',
        avatar: '👩',
        source: 'referral'
      }
    ]
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#E4405F]" />;
      case 'direct':
        return <ExternalLink className="w-4 h-4 text-[#FFC300]" />;
      case 'referral':
        return <Users className="w-4 h-4 text-[#1FBF75]" />;
      default:
        return <User className="w-4 h-4 text-[#4A4A4A]" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return 'WhatsApp';
      case 'instagram':
        return 'Instagram';
      case 'direct':
        return 'Link Direto';
      case 'referral':
        return 'Indicação';
      default:
        return 'Outros';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#1FBF75] text-white';
      case 'pending':
        return 'bg-[#FFC300] text-[#0A0A0A]';
      case 'inactive':
        return 'bg-[#E10600] text-white';
      default:
        return 'bg-[#4A4A4A] text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'inactive':
        return 'Inativo';
      default:
        return 'Desconhecido';
    }
  };

  const getFitnessLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Iniciante';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return 'Não informado';
    }
  };

  const handleStudentRegistration = () => {
    console.log('Novo aluno cadastrado:', registrationForm);
    setRegistrationForm({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      goals: '',
      fitnessLevel: 'beginner',
    });
    alert('Aluno cadastrado com sucesso! Ele foi automaticamente vinculado à sua conta.');
  };

  const shareToWhatsApp = () => {
    const message = `🏋️‍♂️ Olá! Sou o personal trainer ${teacher.name}.\n\nConvido você para fazer parte da minha equipe de alunos!\n\n✅ Treinos personalizados\n✅ Acompanhamento profissional\n✅ Resultados garantidos\n\nCadastre-se pelo meu link exclusivo:\n${teacher.registrationLink}\n\nVamos juntos alcançar seus objetivos! 💪`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToInstagram = () => {
    copyToClipboard(teacher.registrationLink);
    alert('Link copiado! Cole no seu story ou bio do Instagram para compartilhar com seus seguidores.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🔗 Link de Cadastro do Professor
        </h1>
        <p className="text-white/80 text-lg">
          Gerencie seu link exclusivo e acompanhe novos alunos
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
          <TabsTrigger 
            value="link" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Link className="w-4 h-4" />
            <span className="hidden sm:inline">Meu Link</span>
          </TabsTrigger>
          <TabsTrigger 
            value="students" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Alunos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="register" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Cadastrar</span>
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Análises</span>
          </TabsTrigger>
        </TabsList>

        {/* Meu Link Tab */}
        <TabsContent value="link" className="space-y-6">
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Link className="w-6 h-6 text-[#FFC300]" />
                Seu Link Exclusivo de Cadastro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-[#4A4A4A] mb-2">Link personalizado:</p>
                    <p className="text-[#0A0A0A] font-mono text-sm break-all">
                      {teacher.registrationLink}
                    </p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(teacher.registrationLink)}
                    className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium px-4 py-2 rounded-xl"
                  >
                    {linkCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* QR Code */}
                <div className="text-center">
                  <h3 className="font-bold text-[#0A0A0A] mb-4">QR Code</h3>
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#E6C85C] inline-block">
                    <img 
                      src={teacher.qrCode} 
                      alt="QR Code do Link de Cadastro" 
                      className="w-32 h-32"
                    />
                  </div>
                  <p className="text-sm text-[#4A4A4A] mt-2">
                    Escaneie para acessar o cadastro
                  </p>
                </div>

                {/* Compartilhamento */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#0A0A0A]">Compartilhar</h3>
                  
                  <Button
                    onClick={shareToWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-medium py-3 rounded-xl"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Compartilhar no WhatsApp
                  </Button>
                  
                  <Button
                    onClick={shareToInstagram}
                    className="w-full bg-[#E4405F] hover:bg-[#C13584] text-white font-medium py-3 rounded-xl"
                  >
                    <Instagram className="w-5 h-5 mr-3" />
                    Compartilhar no Instagram
                  </Button>
                  
                  <Button
                    onClick={() => copyToClipboard(teacher.registrationLink)}
                    className="w-full bg-[#0A0A0A] hover:bg-[#2A2A2A] text-white font-medium py-3 rounded-xl"
                  >
                    <Share2 className="w-5 h-5 mr-3" />
                    Copiar Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instruções */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Target className="w-6 h-6 text-[#FFC300]" />
                Como Usar seu Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
                  <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Copy className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">1. Copie o Link</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    Use o botão "Copiar" para copiar seu link exclusivo
                  </p>
                </div>

                <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
                  <div className="w-12 h-12 bg-[#1FBF75] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">2. Compartilhe</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    Envie por WhatsApp, Instagram ou redes sociais
                  </p>
                </div>

                <div className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
                  <div className="w-12 h-12 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">3. Receba Alunos</h3>
                  <p className="text-sm text-[#4A4A4A]">
                    Alunos se cadastram automaticamente vinculados a você
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alunos Tab */}
        <TabsContent value="students" className="space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Total de Alunos
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {teacher.students.length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-[#FFC300]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Alunos Ativos
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {teacher.students.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-[#1FBF75]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Pendentes
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {teacher.students.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-[#FFC300]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Este Mês
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">
                      {teacher.students.filter(s => 
                        new Date(s.registrationDate).getMonth() === new Date().getMonth()
                      ).length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-[#E10600]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Alunos */}
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Users className="w-6 h-6 text-[#FFC300]" />
                Alunos Cadastrados pelo seu Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.students.map((student) => (
                  <div 
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-md">
                        {student.avatar}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-[#0A0A0A]">
                            {student.name}
                          </h4>
                          <Badge className={`${getStatusBadge(student.status)} font-medium px-2 py-1 rounded-lg text-xs`}>
                            {getStatusLabel(student.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </div>
                          {student.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {student.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(student.registrationDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-[#4A4A4A]">Origem</p>
                        <div className="flex items-center gap-1">
                          {getSourceIcon(student.source)}
                          <span className="text-sm font-medium text-[#0A0A0A]">
                            {getSourceLabel(student.source)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-[#4A4A4A]">Nível</p>
                        <p className="text-sm font-medium text-[#0A0A0A]">
                          {getFitnessLevelLabel(student.fitnessLevel)}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => setSelectedStudent(student)}
                        className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium px-4 py-2 rounded-xl"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modal de Detalhes do Aluno */}
          {selectedStudent && (
            <Card className="bg-white border-2 border-[#FFC300] shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                    <User className="w-6 h-6 text-[#FFC300]" />
                    Detalhes do Aluno
                  </CardTitle>
                  <Button
                    onClick={() => setSelectedStudent(null)}
                    className="bg-[#E10600] hover:bg-[#C00000] text-white font-medium px-4 py-2 rounded-xl"
                  >
                    Fechar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#FFF3C4] rounded-full flex items-center justify-center text-2xl">
                        {selectedStudent.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#0A0A0A]">
                          {selectedStudent.name}
                        </h3>
                        <Badge className={`${getStatusBadge(selectedStudent.status)} font-medium px-3 py-1 rounded-xl`}>
                          {getStatusLabel(selectedStudent.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                        <Mail className="w-5 h-5 text-[#4A4A4A]" />
                        <div>
                          <p className="text-sm text-[#4A4A4A]">Email</p>
                          <p className="font-medium text-[#0A0A0A]">{selectedStudent.email}</p>
                        </div>
                      </div>

                      {selectedStudent.phone && (
                        <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                          <Phone className="w-5 h-5 text-[#4A4A4A]" />
                          <div>
                            <p className="text-sm text-[#4A4A4A]">Telefone</p>
                            <p className="font-medium text-[#0A0A0A]">{selectedStudent.phone}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                        <Calendar className="w-5 h-5 text-[#4A4A4A]" />
                        <div>
                          <p className="text-sm text-[#4A4A4A]">Data de Nascimento</p>
                          <p className="font-medium text-[#0A0A0A]">
                            {new Date(selectedStudent.birthDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-[#FFF3C4] rounded-2xl">
                      <h4 className="font-bold text-[#0A0A0A] mb-2">Objetivos</h4>
                      <p className="text-[#4A4A4A]">{selectedStudent.goals}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#FFF3C4] rounded-xl text-center">
                        <p className="text-sm text-[#4A4A4A]">Nível</p>
                        <p className="font-bold text-[#0A0A0A]">
                          {getFitnessLevelLabel(selectedStudent.fitnessLevel)}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-[#FFF3C4] rounded-xl text-center">
                        <p className="text-sm text-[#4A4A4A]">Origem</p>
                        <div className="flex items-center justify-center gap-1">
                          {getSourceIcon(selectedStudent.source)}
                          <p className="font-bold text-[#0A0A0A]">
                            {getSourceLabel(selectedStudent.source)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FFF3C4] rounded-xl text-center">
                      <p className="text-sm text-[#4A4A4A]">Cadastrado em</p>
                      <p className="font-bold text-[#0A0A0A]">
                        {new Date(selectedStudent.registrationDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Cadastrar Tab */}
        <TabsContent value="register" className="space-y-6">
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <UserPlus className="w-6 h-6 text-[#FFC300]" />
                Cadastrar Novo Aluno
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Nome Completo *</Label>
                    <Input
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                      placeholder="Digite o nome completo"
                      className="border-2 border-[#E6C85C] rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Email *</Label>
                    <Input
                      type="email"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                      placeholder="Digite o email"
                      className="border-2 border-[#E6C85C] rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Telefone</Label>
                    <Input
                      value={registrationForm.phone}
                      onChange={(e) => setRegistrationForm({...registrationForm, phone: e.target.value})}
                      placeholder="(11) 99999-9999"
                      className="border-2 border-[#E6C85C] rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Data de Nascimento *</Label>
                    <Input
                      type="date"
                      value={registrationForm.birthDate}
                      onChange={(e) => setRegistrationForm({...registrationForm, birthDate: e.target.value})}
                      className="border-2 border-[#E6C85C] rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Nível de Treino *</Label>
                    <Select 
                      value={registrationForm.fitnessLevel} 
                      onValueChange={(value: FitnessLevel) => 
                        setRegistrationForm({...registrationForm, fitnessLevel: value})
                      }
                    >
                      <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante</SelectItem>
                        <SelectItem value="intermediate">Intermediário</SelectItem>
                        <SelectItem value="advanced">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#0A0A0A] font-medium">Objetivos *</Label>
                    <Textarea
                      value={registrationForm.goals}
                      onChange={(e) => setRegistrationForm({...registrationForm, goals: e.target.value})}
                      placeholder="Descreva os objetivos do aluno (ex: ganhar massa muscular, emagrecer, melhorar condicionamento...)"
                      className="border-2 border-[#E6C85C] rounded-xl min-h-[120px]"
                    />
                  </div>

                  <div className="p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                    <p className="text-[#0A0A0A] font-medium mb-2">ℹ️ Informação</p>
                    <p className="text-[#4A4A4A] text-sm">
                      Ao cadastrar este aluno, ele será automaticamente vinculado à sua conta 
                      e poderá acessar a plataforma com as credenciais fornecidas.
                    </p>
                  </div>

                  <Button
                    onClick={handleStudentRegistration}
                    className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-semibold py-3 rounded-2xl"
                    disabled={!registrationForm.name || !registrationForm.email || !registrationForm.birthDate || !registrationForm.goals}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Cadastrar Aluno
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Visualizações do Link
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">127</p>
                  </div>
                  <ExternalLink className="w-8 h-8 text-[#FFC300]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Taxa de Conversão
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">3.1%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-[#1FBF75]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                      Cadastros este Mês
                    </p>
                    <p className="text-3xl font-bold text-[#0A0A0A]">4</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-[#E10600]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <BarChart3 className="w-6 h-6 text-[#FFC300]" />
                Origem dos Cadastros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: 'whatsapp', label: 'WhatsApp', count: 2, percentage: 50 },
                  { source: 'instagram', label: 'Instagram', count: 1, percentage: 25 },
                  { source: 'direct', label: 'Link Direto', count: 1, percentage: 25 },
                  { source: 'referral', label: 'Indicação', count: 1, percentage: 25 }
                ].map((item) => (
                  <div key={item.source} className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl">
                    <div className="flex items-center gap-4">
                      {getSourceIcon(item.source)}
                      <div>
                        <h4 className="font-bold text-[#0A0A0A]">{item.label}</h4>
                        <p className="text-sm text-[#4A4A4A]">{item.count} cadastros</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-[#E6C85C] rounded-full h-3">
                        <div 
                          className="bg-[#FFC300] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-[#0A0A0A] min-w-[3rem] text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                <Calendar className="w-6 h-6 text-[#FFC300]" />
                Evolução de Cadastros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { month: 'Out/23', count: 2 },
                  { month: 'Nov/23', count: 3 },
                  { month: 'Dez/23', count: 1 },
                  { month: 'Jan/24', count: 4 }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-[#FFF3C4] rounded-2xl">
                    <p className="text-sm text-[#4A4A4A] mb-2">{item.month}</p>
                    <p className="text-2xl font-bold text-[#0A0A0A]">{item.count}</p>
                    <p className="text-xs text-[#4A4A4A]">cadastros</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
