'use client';

import { useState, useEffect } from 'react';
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
  Timer,
  Sun,
  Moon
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
  const [userPlan, setUserPlan] = useState<'basic' | 'premium' | 'elite'>('basic');
  const [registrationTab, setRegistrationTab] = useState('users');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('orbian-theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('orbian-theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleMercadoPagoPayment = (planType: string, amount: number) => {
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

    console.log('Criando preferência de pagamento:', preference);
    alert(`Redirecionando para pagamento do ${planType} - R$ ${amount.toFixed(2)}`);
    
    if (planType === 'Premium') setUserPlan('premium');
    if (planType === 'Elite') setUserPlan('elite');
  };

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
      <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-lg bg-card shadow-2xl rounded-3xl overflow-hidden border-border">
          <CardHeader className="text-center pb-8 pt-12 px-8 bg-gradient-to-b from-card to-secondary">
            <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
                alt="Orbian Fit Logo" 
                className="h-20 w-auto"
              />
            </div>
            <CardTitle className="text-4xl font-bold text-foreground mb-3">
              Orbian Fit
            </CardTitle>
            <p className="text-muted-foreground text-lg font-medium">Conectando personal trainers e alunos</p>
            
            {/* Theme Toggle */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="rounded-full px-4 py-2 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Tema Escuro
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Tema Claro
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-8 pb-12 pt-8">
            <Button 
              onClick={() => setUserRole('trainer')}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
            >
              <User className="w-5 h-5 mr-3" />
              Sou Personal Trainer
            </Button>
            <Button 
              onClick={() => setUserRole('student')}
              className="w-full bg-card hover:bg-secondary text-foreground font-semibold py-6 border-2 border-foreground rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
                  alt="Orbian Fit Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-foreground truncate">
                  Orbian Fit
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-muted-foreground font-medium text-sm">
                    {userRole === 'trainer' ? 'Personal Trainer' : 'Aluno'}
                  </p>
                  <Badge className={`
                    ${userPlan === 'basic' ? 'bg-primary text-primary-foreground' : ''}
                    ${userPlan === 'premium' ? 'bg-destructive text-destructive-foreground' : ''}
                    ${userPlan === 'elite' ? 'bg-gradient-to-r from-primary to-destructive text-white' : ''}
                    font-bold px-3 py-1 rounded-xl text-xs
                  `}>
                    {userPlan === 'basic' ? 'Básico' : userPlan === 'premium' ? 'Premium' : 'Elite'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="rounded-xl border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
              <Button 
                onClick={() => setUserRole(null)}
                className="bg-card hover:bg-secondary text-foreground border-2 border-foreground rounded-xl font-medium px-4 sm:px-6 transition-all duration-200"
              >
                <span className="hidden sm:inline">Trocar Perfil</span>
                <User className="w-4 h-4 sm:hidden" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-card rounded-2xl shadow-md p-2 overflow-x-auto border border-border">
            <TabsList className="inline-flex w-full min-w-max bg-transparent gap-1">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="agenda" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Agenda</span>
              </TabsTrigger>
              <TabsTrigger 
                value="cadastros" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <UserPlus className="w-4 h-4 flex-shrink-0" />
                <span>Cadastros</span>
              </TabsTrigger>
              <TabsTrigger 
                value="community" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>Comunidade</span>
              </TabsTrigger>
              <TabsTrigger 
                value="workouts" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Dumbbell className="w-4 h-4 flex-shrink-0" />
                <span>Treinos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="timers" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Timer className="w-4 h-4 flex-shrink-0" />
                <span>Cronômetros</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ranking" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Trophy className="w-4 h-4 flex-shrink-0" />
                <span>Ranking</span>
              </TabsTrigger>
              <TabsTrigger 
                value="teacher-profile" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span>Perfil Professor</span>
              </TabsTrigger>
              <TabsTrigger 
                value="teacher-link" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Link className="w-4 h-4 flex-shrink-0" />
                <span>Link Professor</span>
              </TabsTrigger>
              <TabsTrigger 
                value="plans" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span>Planos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="checkin" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <Heart className="w-4 h-4 flex-shrink-0" />
                <span>Check-in</span>
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>Chat</span>
              </TabsTrigger>
              {hasAccess('nutrition') && (
                <TabsTrigger 
                  value="nutrition" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
                >
                  <Apple className="w-4 h-4 flex-shrink-0" />
                  <span>Nutrição</span>
                </TabsTrigger>
              )}
              {hasAccess('body_analysis') && (
                <TabsTrigger 
                  value="analysis" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4 flex-shrink-0" />
                  <span>Análise</span>
                </TabsTrigger>
              )}
              {hasAccess('video_sessions') && (
                <TabsTrigger 
                  value="video" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
                >
                  <Video className="w-4 h-4 flex-shrink-0" />
                  <span>Vídeos</span>
                </TabsTrigger>
              )}
              {hasAccess('reports') && (
                <TabsTrigger 
                  value="reports" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4 flex-shrink-0" />
                  <span>Relatórios</span>
                </TabsTrigger>
              )}
              {hasAccess('supplements') && (
                <TabsTrigger 
                  value="supplements" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
                >
                  <Pill className="w-4 h-4 flex-shrink-0" />
                  <span>Suplementos</span>
                </TabsTrigger>
              )}
              {hasAccess('events') && (
                <TabsTrigger 
                  value="events" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-4 py-2 whitespace-nowrap transition-all duration-200"
                >
                  <CalendarDays className="w-4 h-4 flex-shrink-0" />
                  <span>Eventos</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2 truncate">
                        {userRole === 'trainer' ? 'Alunos Ativos' : 'Treinos Concluídos'}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {userRole === 'trainer' ? '12' : '8'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2 truncate">
                        {userRole === 'trainer' ? 'Treinos Criados' : 'Próximo Treino'}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {userRole === 'trainer' ? (hasAccess('workouts_unlimited') ? '∞' : '45') : 'Hoje'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Dumbbell className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2 truncate">Check-ins</p>
                      <p className="text-3xl font-bold text-foreground">
                        {userRole === 'trainer' ? '28' : '5'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Heart className="w-10 h-10 text-destructive" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2 truncate">
                        {hasAccess('chat_priority') ? 'Chat Prioritário' : 'Mensagens'}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {hasAccess('chat_priority') ? '24/7' : '3'}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <MessageCircle className="w-10 h-10 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Features Overview */}
            <Card className="bg-card shadow-lg rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-foreground text-xl sm:text-2xl">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary flex-shrink-0" />
                  <span className="truncate">Recursos do seu Plano {userPlan === 'basic' ? 'Básico' : userPlan === 'premium' ? 'Premium' : 'Elite'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm leading-relaxed">
                      {hasAccess('workouts_unlimited') ? 'Treinos Ilimitados' : '3 Treinos Personalizados'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm leading-relaxed">
                      {hasAccess('chat_priority') ? 'Chat Prioritário 24/7' : 'Chat com Personal'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm leading-relaxed">Check-in Emocional</span>
                  </div>
                  {hasAccess('nutrition') && (
                    <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-sm leading-relaxed">Plano Nutricional</span>
                    </div>
                  )}
                  {hasAccess('body_analysis') && (
                    <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-sm leading-relaxed">Análise Corporal Mensal</span>
                    </div>
                  )}
                  {hasAccess('personal_trainer') && (
                    <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-sm leading-relaxed">Personal Trainer Dedicado</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card shadow-lg rounded-2xl border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-foreground text-xl sm:text-2xl">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-primary flex-shrink-0" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userRole === 'trainer' ? (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-secondary rounded-xl">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                          <span className="text-foreground font-medium text-sm leading-relaxed">João completou treino de peito</span>
                        </div>
                        <Badge className="bg-foreground text-background font-medium px-3 py-1 rounded-xl text-xs whitespace-nowrap self-start sm:self-center">2h atrás</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-secondary rounded-xl">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                          <span className="text-foreground font-medium text-sm leading-relaxed">Maria fez check-in emocional</span>
                        </div>
                        <Badge className="bg-foreground text-background font-medium px-3 py-1 rounded-xl text-xs whitespace-nowrap self-start sm:self-center">4h atrás</Badge>
                      </div>
                      {hasAccess('video_sessions') && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-secondary rounded-xl">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="w-3 h-3 bg-destructive rounded-full flex-shrink-0 mt-1.5"></div>
                            <span className="text-foreground font-medium text-sm leading-relaxed">Videochamada agendada com Carlos</span>
                          </div>
                          <Badge className="bg-foreground text-background font-medium px-3 py-1 rounded-xl text-xs whitespace-nowrap self-start sm:self-center">6h atrás</Badge>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-secondary rounded-xl">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                          <span className="text-foreground font-medium text-sm leading-relaxed">Treino de pernas concluído</span>
                        </div>
                        <Badge className="bg-foreground text-background font-medium px-3 py-1 rounded-xl text-xs whitespace-nowrap self-start sm:self-center">1h atrás</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-secondary rounded-xl">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                          <span className="text-foreground font-medium text-sm leading-relaxed">Check-in emocional realizado</span>
                        </div>
                        <Badge className="bg-foreground text-background font-medium px-3 py-1 rounded-xl text-xs whitespace-nowrap self-start sm:self-center">3h atrás</Badge>
                      </div>
                      {hasAccess('nutrition') && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-secondary rounded-xl">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>
                            <span className="text-foreground font-medium text-sm leading-relaxed">Plano nutricional atualizado</span>
                          </div>
                          <Badge className="bg-foreground text-background font-medium px-3 py-1 rounded-xl text-xs whitespace-nowrap self-start sm:self-center">1 dia atrás</Badge>
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
          <TabsContent value="cadastros" className="space-y-6">
            <Tabs value={registrationTab} onValueChange={setRegistrationTab} className="space-y-6">
              <div className="bg-card rounded-2xl shadow-md p-2 border border-border">
                <TabsList className="grid w-full grid-cols-3 bg-transparent gap-1">
                  <TabsTrigger 
                    value="users" 
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-3 py-2 transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline truncate">
                      {userRole === 'trainer' ? 'Alunos' : 'Personal Trainers'}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="anamnese" 
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-3 py-2 transition-all duration-200"
                  >
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline truncate">Anamnese</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="assessment" 
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl font-medium px-3 py-2 transition-all duration-200"
                  >
                    <ClipboardList className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline truncate">Avaliação Física</span>
                  </TabsTrigger>
                </TabsList>
              </div>

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

          {/* Workouts */}
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
              <Card className="bg-card shadow-lg rounded-2xl border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-foreground">
                    <User className="w-7 h-7 text-primary flex-shrink-0" />
                    <span>Perfil Profissional</span>
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    Gerencie seu perfil completo, avaliações, planos e leads de forma inteligente com IA.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Card className="border-2 border-primary bg-secondary hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Perfil Completo</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          Gerencie suas informações, formação, experiência e modalidades
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
                        >
                          Gerenciar Perfil
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-destructive bg-secondary hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-8 h-8 text-destructive-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Avaliações</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          Sistema completo de avaliações com estrelas e comentários dos alunos
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium transition-all duration-200"
                        >
                          Ver Avaliações
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-500 bg-secondary hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Página Pública</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          Página de vendas com seus serviços, planos e valores
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile/public/1', '_blank')}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-200"
                        >
                          Ver Página Pública
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-500 bg-secondary hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">IA Inteligente</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          Otimize seu perfil com sugestões de IA para atrair mais alunos
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium transition-all duration-200"
                        >
                          Otimizar com IA
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-500 bg-secondary hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Funil de Leads</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          Gerencie leads e acompanhe seu funil de vendas completo
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile', '_blank')}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200"
                        >
                          Gerenciar Leads
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-500 bg-secondary hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Marketplace</h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          Integração completa com o marketplace para captação de alunos
                        </p>
                        <Button 
                          onClick={() => window.open('/teacher-profile/public/1', '_blank')}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200"
                        >
                          Ver no Marketplace
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="bg-card shadow-lg rounded-2xl border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                    <div className="text-sm text-muted-foreground mb-2">Avaliação Média</div>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-lg rounded-2xl border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-destructive mb-2">127</div>
                    <div className="text-sm text-muted-foreground mb-1">Total de Avaliações</div>
                    <div className="text-xs text-green-600">+12 este mês</div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-lg rounded-2xl border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
                    <div className="text-sm text-muted-foreground mb-1">Leads este Mês</div>
                    <div className="text-xs text-green-600">+8 vs mês anterior</div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-lg rounded-2xl border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">18%</div>
                    <div className="text-sm text-muted-foreground mb-1">Taxa de Conversão</div>
                    <div className="text-xs text-green-600">Acima da média</div>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Escolha seu Plano</h2>
              <p className="text-muted-foreground text-lg">Encontre o plano perfeito para suas necessidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Plano Básico */}
              <Card className="bg-card shadow-xl rounded-3xl border border-border relative hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">Básico</CardTitle>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    R$ 29,90
                    <span className="text-lg font-normal text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-muted-foreground">Ideal para começar</p>
                </CardHeader>
                <CardContent className="space-y-6 pb-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">3 treinos personalizados</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Chat com personal trainer</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Check-in emocional</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Acompanhamento básico</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleMercadoPagoPayment('Básico', 29.90)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={userPlan === 'basic'}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {userPlan === 'basic' ? 'Plano Atual' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Premium */}
              <Card className="bg-card shadow-2xl rounded-3xl border-2 border-destructive relative transform scale-105 hover:scale-110 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-destructive text-destructive-foreground font-bold px-6 py-2 rounded-full shadow-lg text-sm">
                    MAIS POPULAR
                  </Badge>
                </div>
                <CardHeader className="text-center pb-4 pt-12">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">Premium</CardTitle>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    R$ 59,90
                    <span className="text-lg font-normal text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-muted-foreground">Para resultados sérios</p>
                </CardHeader>
                <CardContent className="space-y-6 pb-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Treinos ilimitados</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Chat prioritário 24/7</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Plano nutricional</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Análise corporal mensal</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Relatórios detalhados</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleMercadoPagoPayment('Premium', 59.90)}
                    className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={userPlan === 'premium'}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {userPlan === 'premium' ? 'Plano Atual' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Elite */}
              <Card className="bg-card shadow-xl rounded-3xl border border-border relative hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4 pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">Elite</CardTitle>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    R$ 99,90
                    <span className="text-lg font-normal text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-muted-foreground">Experiência completa</p>
                </CardHeader>
                <CardContent className="space-y-6 pb-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Tudo do Premium +</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Personal trainer dedicado</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Videochamadas semanais</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Suplementação personalizada</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">Acesso a eventos exclusivos</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleMercadoPagoPayment('Elite', 99.90)}
                    className="w-full bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 text-white font-semibold py-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={userPlan === 'elite'}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {userPlan === 'elite' ? 'Plano Atual' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Informações sobre pagamento */}
            <Card className="bg-card/95 backdrop-blur-sm shadow-xl rounded-3xl border border-border">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Pagamento Seguro com Mercado Pago</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-3">
                        <CreditCard className="w-7 h-7 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground mb-1">Cartão de Crédito</p>
                      <p className="text-sm text-muted-foreground">Até 12x sem juros</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-3">
                        <Activity className="w-7 h-7 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground mb-1">PIX</p>
                      <p className="text-sm text-muted-foreground">Aprovação instantânea</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-3">
                        <Check className="w-7 h-7 text-green-500" />
                      </div>
                      <p className="font-semibold text-foreground mb-1">Segurança Total</p>
                      <p className="text-sm text-muted-foreground">Dados protegidos</p>
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
