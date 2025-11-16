'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Dumbbell,
  Sparkles,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const planosAluno = [
  {
    slug: 'aluno_orbian',
    nome: 'Plano Aluno Orbian',
    descricao: 'Treinos e nutrição com IA',
    preco: 19.9,
    destaque: true,
    beneficios: [
      'Treinos personalizados por objetivo',
      'Ajustes automáticos via IA',
      'Módulo completo de nutrição',
      'Check-in diário de treino e emocional',
      'Desafios e metas gamificadas',
      'Acesso à comunidade Orbian',
      'Marketplace de professores com 10% de desconto',
      'Histórico completo de progresso',
    ],
  },
];

export default function PlanosAlunoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState<string | null>(null);

  // 👇 aqui está o ajuste: usa optional chaining para evitar o erro de "possivelmente null"
  const isNovo = searchParams?.get('novo') === 'true';

  const handleAssinar = async (planoSlug: string) => {
    setLoading(true);
    setSelectedPlano(planoSlug);

    try {
      const response = await fetch('/api/pagamentos/criar-assinatura-aluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planoSlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar assinatura');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error('Erro ao assinar:', err);
      alert('Erro ao processar assinatura. Tente novamente.');
    } finally {
      setLoading(false);
      setSelectedPlano(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Orbian Fit
            </h1>
          </div>
          <Button variant="ghost" onClick={() => router.push('/login')}>
            Voltar ao login
          </Button>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        {isNovo && (
          <Badge className="mb-4 bg-green-500 text-white">
            Conta criada com sucesso! 🎉
          </Badge>
        )}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Escolha seu plano e comece hoje
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transforme seu corpo com treinos inteligentes e nutrição personalizada
        </p>
      </div>

      {/* Plano */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {planosAluno.map((plano) => (
          <Card
            key={plano.slug}
            className="relative overflow-hidden border-2 border-blue-200 shadow-2xl"
          >
            {plano.destaque && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                Mais Popular
              </div>
            )}

            <CardHeader className="text-center pb-8 pt-12">
              <div className="mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl w-fit">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold">{plano.nome}</CardTitle>
              <CardDescription className="text-lg">
                {plano.descricao}
              </CardDescription>
              <div className="mt-6">
                <div className="text-5xl font-bold text-gray-900">
                  R$ {plano.preco.toFixed(2)}
                  <span className="text-xl text-gray-600 font-normal">
                    /mês
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Cancele quando quiser
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {plano.beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{beneficio}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleAssinar(plano.slug)}
                disabled={loading && selectedPlano === plano.slug}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
              >
                {loading && selectedPlano === plano.slug
                  ? 'Processando...'
                  : 'Assinar agora'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                Pagamento seguro via Mercado Pago
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features adicionais */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Por que escolher o Orbian Fit?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 bg-blue-100 p-4 rounded-2xl w-fit">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Resultados Reais</h4>
              <p className="text-gray-600">
                Acompanhe sua evolução com métricas detalhadas e ajustes
                automáticos
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 bg-purple-100 p-4 rounded-2xl w-fit">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">
                Inteligência Artificial
              </h4>
              <p className="text-gray-600">
                IA que aprende com você e adapta treinos e nutrição
                automaticamente
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 bg-green-100 p-4 rounded-2xl w-fit">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Comunidade Ativa</h4>
              <p className="text-gray-600">
                Participe de desafios e conecte-se com outros atletas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
