'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Dumbbell, 
  Heart, 
  MessageCircle, 
  Plus,
  Calendar,
  TrendingUp,
  Users,
  Activity,
  CreditCard,
  Check,
  Star,
  Crown,
  Apple,
  BarChart3,
  Video,
  Pill,
  CalendarDays,
  Target,
  FileText,
  UserPlus,
  ClipboardList,
  Trophy,
  Link,
  DollarSign,
  Timer
} from 'lucide-react';
import WorkoutBank from '@/components/WorkoutBank';
import EmotionalCheckIn from '@/components/EmotionalCheckIn';
import ChatInterface from '@/components/ChatInterface';
import NutritionPlan from '@/components/NutritionPlan';
import BodyAnalysis from '@/components/BodyAnalysis';
import DetailedReports from '@/components/DetailedReports';
import VideoSessions from '@/components/VideoSessions';
import SupplementPlan from '@/components/SupplementPlan';
import ExclusiveEvents from '@/components/ExclusiveEvents';
import UserRegistration from '@/components/UserRegistration';
import Anamnese from '@/components/Anamnese';
import PhysicalAssessment from '@/components/PhysicalAssessment';
import CommunityFeed from '@/components/CommunityFeed';
import ScheduleModule from '@/components/ScheduleModule';
import FrequencyRanking from '@/components/FrequencyRanking';
import TeacherRegistrationLink from '@/components/TeacherRegistrationLink';
import NutritionModule from '@/components/NutritionModule';
import TimerModule from '@/components/TimerModule';

export default function Home() {
  const [userRole, setUserRole] = useState<'trainer' | 'student' | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userPlan, setUserPlan] = useState<'basic' | 'premium' | 'elite'>('basic'); // Simulando plano do usuário
  const [registrationTab, setRegistrationTab] = useState('users');

  const handleMercadoPagoPayment = (planType: string, amount: number) => {
    // Simulação da integração com Mercado Pago
    const preference = {
      items: [
        {
          title: `Orbian Fit - Plano ${planType}`,
          quantity: 1,
          unit_price: amount,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: window.location.origin + '/success',
        failure: window.location.origin + '/failure',
        pending: window.location.origin + '/pending'
      },
      auto_return: 'approved'
    };

    // Em produção, você faria uma chamada para sua API que criaria a preferência no Mercado Pago
    console.log('Criando preferência de pagamento:', preference);
    alert(`Redirecionando para pagamento do ${planType} - R$ ${amount.toFixed(2)}`);
    
    // Simulando upgrade de plano após pagamento
    if (planType === 'Premium') setUserPlan('premium');
    if (planType === 'Elite') setUserPlan('elite');
  };

  // Função para verificar se o usuário tem acesso a uma funcionalidade
  const hasAccess = (feature: string) => {
    const planFeatures = {
      basic: ['workouts_limited', 'chat_basic', 'checkin', 'tracking_basic'],
      premium: ['workouts_unlimited', 'chat_priority', 'checkin', 'tracking_basic', 'nutrition', 'body_analysis', 'reports'],
      elite: ['workouts_unlimited', 'chat_priority', 'checkin', 'tracking_basic', 'nutrition', 'body_analysis', 'reports', 'personal_trainer', 'video_sessions', 'supplements', 'events']
    };
    
    return planFeatures[userPlan]?.includes(feature) || false;
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFC300] to-[#FFB800] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
                alt="Orbian Fit Logo" 
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-[#0A0A0A] mb-2">
              Orbian Fit
            </CardTitle>
            <p className="text-[#4A4A4A] text-lg">Conectando personal trainers e alunos</p>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <Button 
              onClick={() => setUserRole('trainer')}
              className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-semibold py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:ring-offset-2"
              size="lg"
            >
              <User className="w-5 h-5 mr-3" />
              Sou Personal Trainer
            </Button>
            <Button 
              onClick={() => setUserRole('student')}
              className="w-full bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] font-semibold py-4 border-2 border-[#0A0A0A] rounded-2xl transition-all duration-300"
              size="lg"
            >
              <Activity className="w-5 h-5 mr-3" />
              Sou Aluno
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFC300] to-[#FFB800]">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#E6C85C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
                  alt="Orbian Fit Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0A0A0A]">
                  Orbian Fit
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-[#4A4A4A] font-medium">
                    {userRole === 'trainer' ? 'Personal Trainer' : 'Aluno'}
                  </p>
                  <Badge className={`
                    ${userPlan === 'basic' ? 'bg-[#FFC300] text-[#0A0A0A]' : ''}
                    ${userPlan === 'premium' ? 'bg-[#E10600] text-white' : ''}
                    ${userPlan === 'elite' ? 'bg-gradient-to-r from-[#FFC300] to-[#E10600] text-white' : ''}
                    font-bold px-3 py-1 rounded-xl
                  `}>
                    {userPlan === 'basic' ? 'Básico' : userPlan === 'premium' ? 'Premium' : 'Elite'}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setUserRole(null)}
              className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl font-medium px-6"
            >
              Trocar Perfil
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 lg:grid-cols-16 lg:w-auto bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="agenda" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Agenda</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cadastros" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Cadastros</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workouts" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="timers" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">Cronômetros</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ranking" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Ranking</span>
            </TabsTrigger>
            <TabsTrigger 
              value="teacher-profile" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil Professor</span>
            </TabsTrigger>
            <TabsTrigger 
              value="teacher-link" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Link className="w-4 h-4" />
              <span className="hidden sm:inline">Link Professor</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plans" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Planos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="checkin" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Check-in</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            {hasAccess('nutrition') && (
              <TabsTrigger 
                value="nutrition" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
              >
                <Apple className="w-4 h-4" />
                <span className="hidden sm:inline">Nutrição</span>
              </TabsTrigger>
            )}
            {hasAccess('body_analysis') && (
              <TabsTrigger 
                value="analysis" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Análise</span>
              </TabsTrigger>
            )}
            {hasAccess('video_sessions') && (
              <TabsTrigger 
                value="video" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Vídeos</span>
              </TabsTrigger>
            )}
            {hasAccess('reports') && (
              <TabsTrigger 
                value="reports" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Relatórios</span>
              </TabsTrigger>
            )}
            {hasAccess('supplements') && (
              <TabsTrigger 
                value="supplements" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
              >
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Suplementos</span>
              </TabsTrigger>
            )}
            {hasAccess('events') && (
              <TabsTrigger 
                value="events" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Eventos</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                        {userRole === 'trainer' ? 'Alunos Ativos' : 'Treinos Concluídos'}
                      </p>
                      <p className="text-3xl font-bold text-[#0A0A0A]">
                        {userRole === 'trainer' ? '12' : '8'}
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
                        {userRole === 'trainer' ? 'Treinos Criados' : 'Próximo Treino'}
                      </p>
                      <p className="text-3xl font-bold text-[#0A0A0A]">
                        {userRole === 'trainer' ? (hasAccess('workouts_unlimited') ? '∞' : '45') : 'Hoje'}
                      </p>
                    </div>
                    <Dumbbell className="w-8 h-8 text-[#FFC300]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#4A4A4A] mb-2">Check-ins</p>
                      <p className="text-3xl font-bold text-[#0A0A0A]">
                        {userRole === 'trainer' ? '28' : '5'}
                      </p>
                    </div>
                    <Heart className="w-8 h-8 text-[#E10600]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#4A4A4A] mb-2">
                        {hasAccess('chat_priority') ? 'Chat Prioritário' : 'Mensagens'}
                      </p>
                      <p className="text-3xl font-bold text-[#0A0A0A]">
                        {hasAccess('chat_priority') ? '24/7' : '3'}
                      </p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-[#1FBF75]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Features Overview */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                  <Target className="w-6 h-6 text-[#FFC300]" />
                  Recursos do seu Plano {userPlan === 'basic' ? 'Básico' : userPlan === 'premium' ? 'Premium' : 'Elite'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                    <Check className="w-5 h-5 text-[#1FBF75]" />
                    <span className="text-[#0A0A0A] font-medium">
                      {hasAccess('workouts_unlimited') ? 'Treinos Ilimitados' : '3 Treinos Personalizados'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                    <Check className="w-5 h-5 text-[#1FBF75]" />
                    <span className="text-[#0A0A0A] font-medium">
                      {hasAccess('chat_priority') ? 'Chat Prioritário 24/7' : 'Chat com Personal'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                    <Check className="w-5 h-5 text-[#1FBF75]" />
                    <span className="text-[#0A0A0A] font-medium">Check-in Emocional</span>
                  </div>
                  {hasAccess('nutrition') && (
                    <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A] font-medium">Plano Nutricional</span>
                    </div>
                  )}
                  {hasAccess('body_analysis') && (
                    <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A] font-medium">Análise Corporal Mensal</span>
                    </div>
                  )}
                  {hasAccess('personal_trainer') && (
                    <div className="flex items-center gap-3 p-3 bg-[#FFF3C4] rounded-xl">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A] font-medium">Personal Trainer Dedicado</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
                  <Calendar className="w-6 h-6 text-[#FFC300]" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRole === 'trainer' ? (
                    <>
                      <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-[#1FBF75] rounded-full"></div>
                          <span className="text-[#0A0A0A] font-medium">João completou treino de peito</span>
                        </div>
                        <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">2h atrás</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-[#1FBF75] rounded-full"></div>
                          <span className="text-[#0A0A0A] font-medium">Maria fez check-in emocional</span>
                        </div>
                        <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">4h atrás</Badge>
                      </div>
                      {hasAccess('video_sessions') && (
                        <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-[#E10600] rounded-full"></div>
                            <span className="text-[#0A0A0A] font-medium">Videochamada agendada com Carlos</span>
                          </div>
                          <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">6h atrás</Badge>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-[#1FBF75] rounded-full"></div>
                          <span className="text-[#0A0A0A] font-medium">Treino de pernas concluído</span>
                        </div>
                        <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">1h atrás</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-[#1FBF75] rounded-full"></div>
                          <span className="text-[#0A0A0A] font-medium">Check-in emocional realizado</span>
                        </div>
                        <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">3h atrás</Badge>
                      </div>
                      {hasAccess('nutrition') && (
                        <div className="flex items-center justify-between p-4 bg-[#FFF3C4] rounded-2xl border border-[#E6C85C]">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-[#FFC300] rounded-full"></div>
                            <span className="text-[#0A0A0A] font-medium">Plano nutricional atualizado</span>
                          </div>
                          <Badge className="bg-[#0A0A0A] text-[#FFC300] font-medium px-3 py-1 rounded-xl">1 dia atrás</Badge>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agenda */}
          <TabsContent value="agenda">
            <ScheduleModule userRole={userRole} />
          </TabsContent>

          {/* Cadastros */}
          <TabsContent value="cadastros" className="space-y-8">
            <Tabs value={registrationTab} onValueChange={setRegistrationTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
                <TabsTrigger 
                  value="users" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {userRole === 'trainer' ? 'Alunos' : 'Personal Trainers'}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="anamnese" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Anamnese</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="assessment" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span className="hidden sm:inline">Avaliação Física</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users">
                <UserRegistration userRole={userRole} />
              </TabsContent>

              <TabsContent value="anamnese">
                <Anamnese userRole={userRole} />
              </TabsContent>

              <TabsContent value="assessment">
                <PhysicalAssessment userRole={userRole} />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Community Feed */}
          <TabsContent value="community">
            <CommunityFeed userRole={userRole} />
          </TabsContent>

          {/* Workouts - Agora usando o novo WorkoutBank */}
          <TabsContent value="workouts">
            <WorkoutBank userRole={userRole} />
          </TabsContent>

          {/* Cronômetros de Treino */}
          <TabsContent value="timers">
            <TimerModule userRole={userRole} />
          </TabsContent>

          {/* Ranking de Frequência */}
          <TabsContent value="ranking">
            <FrequencyRanking userRole={userRole} />
          </TabsContent>

          {/* Perfil do Professor */}
          <TabsContent value="teacher-profile">
            <div className="space-y-6">
              <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
                    <User className="w-7 h-7 text-[#FFC300]" />
                    Perfil Profissional
                  </CardTitle>
                  <p className="text-[#4A4A4A]">
                    Gerencie seu perfil completo, avaliações, planos e leads de forma inteligente com IA.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-2 border-[#FFC300] bg-[#FFF3C4] hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-[#FFC300] rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="w-8 h-8 text-[#0A0A0A]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Perfil Completo</h3>
                        <p className="text-[#4A4A4A] text-sm mb-4">
                          Gerencie suas informações, formação, experiência e modalidades
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium"
                        >
                          Gerenciar Perfil
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-[#E10600] bg-red-50 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-[#E10600] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Avaliações</h3>
                        <p className="text-[#4A4A4A] text-sm mb-4">
                          Sistema completo de avaliações com estrelas e comentários dos alunos
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-medium"
                        >
                          Ver Avaliações
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-500 bg-green-50 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Página Pública</h3>
                        <p className="text-[#4A4A4A] text-sm mb-4">
                          Página de vendas com seus serviços, planos e valores
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile/public/1', '_blank')}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
                        >
                          Ver Página Pública
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-500 bg-purple-50 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">IA Inteligente</h3>
                        <p className="text-[#4A4A4A] text-sm mb-4">
                          Otimize seu perfil com sugestões de IA para atrair mais alunos
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium"
                        >
                          Otimizar com IA
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-500 bg-blue-50 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Funil de Leads</h3>
                        <p className="text-[#4A4A4A] text-sm mb-4">
                          Gerencie leads e acompanhe seu funil de vendas completo
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
                        >
                          Gerenciar Leads
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-500 bg-orange-50 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Marketplace</h3>
                        <p className="text-[#4A4A4A] text-sm mb-4">
                          Integração completa com o marketplace para captação de alunos
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile/public/1', '_blank')}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
                        >
                          Ver no Marketplace
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-[#FFC300] mb-2">4.8</div>
                    <div className="text-sm text-[#4A4A4A]">Avaliação Média</div>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-[#E10600] mb-2">127</div>
                    <div className="text-sm text-[#4A4A4A]">Total de Avaliações</div>
                    <div className="text-xs text-green-600 mt-1">+12 este mês</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
                    <div className="text-sm text-[#4A4A4A]">Leads este Mês</div>
                    <div className="text-xs text-green-600 mt-1">+8 vs mês anterior</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">18%</div>
                    <div className="text-sm text-[#4A4A4A]">Taxa de Conversão</div>
                    <div className="text-xs text-green-600 mt-1">Acima da média</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Link do Professor */}
          <TabsContent value="teacher-link">
            <TeacherRegistrationLink userRole={userRole} />
          </TabsContent>

          {/* Plans */}
          <TabsContent value="plans" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Escolha seu Plano</h2>
              <p className="text-white/80 text-lg">Encontre o plano perfeito para suas necessidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Plano Básico */}
              <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl relative">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-[#FFF3C4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-8 h-8 text-[#FFC300]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0A0A0A] mb-2">Básico</CardTitle>
                  <div className="text-4xl font-bold text-[#0A0A0A] mb-2">
                    R$ 29,90
                    <span className="text-lg font-normal text-[#4A4A4A]">/mês</span>
                  </div>
                  <p className="text-[#4A4A4A]">Ideal para começar</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">3 treinos personalizados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Chat com personal trainer</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Check-in emocional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Acompanhamento básico</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleMercadoPagoPayment('Básico', 29.90)}
                    className="w-full bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold py-3 rounded-2xl transition-all duration-300"
                    disabled={userPlan === 'basic'}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {userPlan === 'basic' ? 'Plano Atual' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Premium */}
              <Card className="bg-white border-2 border-[#FFC300] shadow-lg rounded-2xl relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#E10600] text-white font-bold px-4 py-2 rounded-full">
                    MAIS POPULAR
                  </Badge>
                </div>
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-16 h-16 bg-[#FFC300] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0A0A0A] mb-2">Premium</CardTitle>
                  <div className="text-4xl font-bold text-[#0A0A0A] mb-2">
                    R$ 59,90
                    <span className="text-lg font-normal text-[#4A4A4A]">/mês</span>
                  </div>
                  <p className="text-[#4A4A4A]">Para resultados sérios</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Treinos ilimitados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Chat prioritário 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Plano nutricional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Análise corporal mensal</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Relatórios detalhados</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleMercadoPagoPayment('Premium', 59.90)}
                    className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-semibold py-3 rounded-2xl transition-all duration-300"
                    disabled={userPlan === 'premium'}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {userPlan === 'premium' ? 'Plano Atual' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Elite */}
              <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl relative">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFC300] to-[#E10600] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0A0A0A] mb-2">Elite</CardTitle>
                  <div className="text-4xl font-bold text-[#0A0A0A] mb-2">
                    R$ 99,90
                    <span className="text-lg font-normal text-[#4A4A4A]">/mês</span>
                  </div>
                  <p className="text-[#4A4A4A]">Experiência completa</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Tudo do Premium +</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Personal trainer dedicado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Videochamadas semanais</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Suplementação personalizada</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#1FBF75]" />
                      <span className="text-[#0A0A0A]">Acesso a eventos exclusivos</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleMercadoPagoPayment('Elite', 99.90)}
                    className="w-full bg-gradient-to-r from-[#FFC300] to-[#E10600] hover:from-[#E6C85C] hover:to-[#C00000] text-white font-semibold py-3 rounded-2xl transition-all duration-300"
                    disabled={userPlan === 'elite'}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {userPlan === 'elite' ? 'Plano Atual' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Informações sobre pagamento */}
            <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-4">Pagamento Seguro com Mercado Pago</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <CreditCard className="w-8 h-8 mb-2" />
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm opacity-80">Até 12x sem juros</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Activity className="w-8 h-8 mb-2" />
                      <p className="font-medium">PIX</p>
                      <p className="text-sm opacity-80">Aprovação instantânea</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Check className="w-8 h-8 mb-2" />
                      <p className="font-medium">Segurança Total</p>
                      <p className="text-sm opacity-80">Dados protegidos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Check-in */}
          <TabsContent value="checkin">
            <EmotionalCheckIn userRole={userRole} />
          </TabsContent>

          {/* Chat */}
          <TabsContent value="chat">
            <ChatInterface userRole={userRole} isPriority={hasAccess('chat_priority')} />
          </TabsContent>

          {/* Nutrition Plan - Premium+ */}
          {hasAccess('nutrition') && (
            <TabsContent value="nutrition">
              <NutritionModule userRole={userRole} />
            </TabsContent>
          )}

          {/* Body Analysis - Premium+ */}
          {hasAccess('body_analysis') && (
            <TabsContent value="analysis">
              <BodyAnalysis userRole={userRole} />
            </TabsContent>
          )}

          {/* Detailed Reports - Premium+ */}
          {hasAccess('reports') && (
            <TabsContent value="reports">
              <DetailedReports userRole={userRole} />
            </TabsContent>
          )}

          {/* Supplement Plan - Elite */}
          {hasAccess('supplements') && (
            <TabsContent value="supplements">
              <SupplementPlan userRole={userRole} />
            </TabsContent>
          )}

          {/* Video Sessions - Elite */}
          {hasAccess('video_sessions') && (
            <TabsContent value="video">
              <VideoSessions userRole={userRole} />
            </TabsContent>
          )}

          {/* Exclusive Events - Elite */}
          {hasAccess('events') && (
            <TabsContent value="events">
              <ExclusiveEvents userRole={userRole} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}