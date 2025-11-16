'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, 
  Heart, 
  Users,
  Check,
  Star,
  Crown,
  CreditCard,
  Activity,
  Target,
  TrendingUp,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
                  alt="Orbian Fit Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Orbian Fit
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium px-6">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-full mb-6 text-sm">
            Plataforma Completa de Fitness
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Conectando Personal Trainers<br />e Alunos de Forma Inteligente
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            A plataforma definitiva para gestão de treinos, nutrição, acompanhamento e muito mais.
            Seja você um personal trainer ou aluno, temos o plano perfeito para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro-professor">
              <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Dumbbell className="w-5 h-5 mr-2" />
                Sou Personal Trainer
              </Button>
            </Link>
            <Link href="/cadastro-aluno">
              <Button className="bg-card hover:bg-secondary text-foreground font-semibold py-6 px-8 border-2 border-foreground rounded-2xl text-lg transition-all duration-300">
                <Activity className="w-5 h-5 mr-2" />
                Sou Aluno
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recursos Poderosos
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar e acompanhar sua jornada fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">Treinos Personalizados</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Crie e gerencie treinos completos com banco de exercícios e IA integrada
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-destructive-foreground" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">Check-in Emocional</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Acompanhe o bem-estar emocional dos alunos com check-ins diários
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">Nutrição Inteligente</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Planos nutricionais completos com cálculo de macros e sugestões de IA
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">Comunidade Ativa</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Interaja com alunos e professores em uma comunidade engajada
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">Relatórios Detalhados</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Acompanhe evolução com relatórios completos e análises de progresso
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-lg rounded-2xl border border-border hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">IA Avançada</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Inteligência artificial para otimizar treinos, nutrição e marketing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Planos para Personal Trainers
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Básico */}
            <Card className="bg-background shadow-xl rounded-3xl border border-border hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-4 pt-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Básico</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-2">
                  R$ 29,90
                  <span className="text-lg font-normal text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground">Até 20 alunos ativos</p>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Dashboard completo</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Gestão de alunos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Treinos e templates</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Ranking de frequência</span>
                  </div>
                </div>
                <Link href="/cadastro-professor">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-2xl">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="bg-background shadow-2xl rounded-3xl border-2 border-destructive transform scale-105 hover:scale-110 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-destructive text-destructive-foreground font-bold px-6 py-2 rounded-full shadow-lg">
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
                <p className="text-muted-foreground">Até 50 alunos ativos</p>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Tudo do Básico +</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Funil de leads completo</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Página pública do professor</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Relatórios avançados</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Nutrição básica</span>
                  </div>
                </div>
                <Link href="/cadastro-professor">
                  <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6 rounded-2xl">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Elite */}
            <Card className="bg-background shadow-xl rounded-3xl border border-border hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-4 pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Elite</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-2">
                  R$ 99,90
                  <span className="text-lg font-normal text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground">Alunos ilimitados</p>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Tudo do Premium +</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">IA avançada Orbian</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Nutrição avançada com IA</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Eventos ilimitados</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Suporte prioritário</span>
                  </div>
                </div>
                <Link href="/cadastro-professor">
                  <Button className="w-full bg-gradient-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 text-white font-semibold py-6 rounded-2xl">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-destructive">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para Transformar seu Negócio Fitness?
          </h3>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Junte-se a centenas de personal trainers e alunos que já estão usando o Orbian Fit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro-professor">
              <Button className="bg-white hover:bg-white/90 text-primary font-semibold py-6 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-transparent hover:bg-white/10 text-white font-semibold py-6 px-8 border-2 border-white rounded-2xl text-lg transition-all duration-300">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
              alt="Orbian Fit Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-foreground">Orbian Fit</span>
          </div>
          <p className="text-muted-foreground mb-6">
            A plataforma completa para personal trainers e alunos
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            © 2024 Orbian Fit. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
