'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Dumbbell, Loader2, Users, Calendar, TrendingUp, Zap, Crown, Rocket } from 'lucide-react';

interface Plano {
  slug: string;
  nomeExibicao: string;
  descricaoCurta: string;
  precoMensal: number;
  maxAlunosAtivos: number | null;
  features: string[];
  icon: any;
  gradient: string;
}

const PLANOS: Plano[] = [
  {
    slug: 'personal_20',
    nomeExibicao: 'Básico',
    descricaoCurta: 'Ideal para começar',
    precoMensal: 29.90,
    maxAlunosAtivos: 20,
    icon: Dumbbell,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Até 20 alunos ativos',
      'Dashboard do professor',
      'Agenda completa',
      'Cadastro de alunos',
      'Comunidade privada',
      'Treinos e templates',
      'Check-in de presença',
      'Cronômetros',
      'Ranking simples',
      '1 relatório mensal',
      'Até 2 eventos ativos',
    ],
  },
  {
    slug: 'personal_50',
    nomeExibicao: 'Premium',
    descricaoCurta: 'Para resultados sérios',
    precoMensal: 59.90,
    maxAlunosAtivos: 50,
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    features: [
      'Até 50 alunos ativos',
      'Tudo do plano Básico',
      'Funil de Leads completo',
      'Página Pública do Professor',
      'Ranking completo',
      'Relatórios avançados',
      'Nutrição básica para alunos',
      'Até 5 eventos ativos',
      'Suporte prioritário',
    ],
  },
  {
    slug: 'personal_50_plus',
    nomeExibicao: 'Elite',
    descricaoCurta: 'Experiência completa',
    precoMensal: 99.90,
    maxAlunosAtivos: null,
    icon: Crown,
    gradient: 'from-orange-500 to-red-500',
    features: [
      'Alunos ilimitados',
      'Tudo do plano Premium',
      'IA inteligente Orbian',
      'Nutrição avançada com IA',
      'Eventos ilimitados',
      'Relatórios completos com PDF',
      'Automações de marketing',
      'Mensagens automáticas',
      'Prioridade em novos recursos',
      'Suporte VIP',
    ],
  },
];

export default function PlanosProfessorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSelectPlan = async (planoSlug: string) => {
    setLoading(planoSlug);
    setError('');

    try {
      // Aqui você implementaria a lógica de pagamento com Mercado Pago
      // Por enquanto, vamos apenas atualizar o plano do usuário
      const response = await fetch('/api/planos/selecionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planoSlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao selecionar plano');
      }

      // Redirecionar para dashboard após selecionar plano
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao selecionar plano');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl">
              <Rocket className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Selecione o plano ideal para o seu negócio e comece a transformar vidas hoje mesmo
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PLANOS.map((plano) => {
            const Icon = plano.icon;
            const isPopular = plano.slug === 'personal_50';

            return (
              <Card
                key={plano.slug}
                className={`relative ${
                  isPopular ? 'border-2 border-purple-500 shadow-2xl shadow-purple-500/20' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`bg-gradient-to-br ${plano.gradient} p-3 rounded-2xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{plano.nomeExibicao}</CardTitle>
                  <CardDescription className="text-base">{plano.descricaoCurta}</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      R$ {plano.precoMensal.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">por mês</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plano.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plano.slug)}
                    disabled={loading !== null}
                    className={`w-full bg-gradient-to-r ${plano.gradient} hover:opacity-90 transition-opacity`}
                  >
                    {loading === plano.slug ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Escolher plano'
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Todos os planos incluem 7 dias de garantia. Cancele quando quiser.
          </p>
        </div>
      </div>
    </div>
  );
}
