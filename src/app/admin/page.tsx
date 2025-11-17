'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, CreditCard, Flag, Loader2 } from 'lucide-react';

interface User {
  id: string;
  nome: string;
  email: string;
  tipo_usuario: 'professor' | 'aluno';
  plano_atual_slug?: string | null;
  professor_id_vinculado?: string | null;
  is_owner?: boolean;
}

interface FeatureFlagInfo {
  slug: string;
  description: string;
  enabled: boolean;
}

const PLANOS = [
  { slug: 'personal_20', nome: 'Básico', maxAlunos: 20 },
  { slug: 'personal_50', nome: 'Premium', maxAlunos: 50 },
  { slug: 'personal_50_plus', nome: 'Elite', maxAlunos: 'Ilimitado' },
  { slug: 'beta_full_120', nome: 'Beta 120 dias', maxAlunos: 4 },
];

const FEATURE_FLAGS: FeatureFlagInfo[] = [
  { slug: 'share_card', description: 'Compartilhar card de treino', enabled: false },
  { slug: 'plan_vs_done', description: 'Planejado vs Realizado', enabled: false },
  { slug: 'swap_exercise', description: 'Trocar exercício', enabled: false },
  { slug: 'rest_timer', description: 'Timer de descanso', enabled: false },
  { slug: 'session_timer', description: 'Timer de sessão', enabled: false },
  { slug: 'progress_analytics', description: 'Análise de progresso', enabled: false },
  { slug: 'time_estimator', description: 'Estimador de tempo', enabled: false },
  { slug: 'premade_workouts', description: 'Treinos pré-montados', enabled: false },
  { slug: 'stretching', description: 'Alongamento', enabled: false },
  { slug: 'session_summary', description: 'Resumo de sessão', enabled: false },
  { slug: 'add_only_hardening', description: 'Adicionar apenas endurecimento', enabled: false },
];

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Não autorizado');
        }
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Painel do Dono
            </h1>
            <p className="text-gray-600">Administração completa do Orbian Fit</p>
          </div>
        </div>

        {/* Card: Visão geral de usuários */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <CardTitle>Visão Geral de Usuários</CardTitle>
            </div>
            <CardDescription>
              Total de {users.length} usuários cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Plano</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.nome}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant={user.tipo_usuario === 'professor' ? 'default' : 'secondary'}>
                          {user.tipo_usuario === 'professor' ? 'Professor' : 'Aluno'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {user.plano_atual_slug ? (
                          <Badge variant="outline">{user.plano_atual_slug}</Badge>
                        ) : (
                          <span className="text-gray-400">Sem plano</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {user.is_owner ? (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                            Owner
                          </Badge>
                        ) : user.professor_id_vinculado ? (
                          <span className="text-sm text-gray-500">Vinculado</span>
                        ) : (
                          <span className="text-sm text-green-600">Ativo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Card: Planos configurados */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <CardTitle>Planos Configurados</CardTitle>
            </div>
            <CardDescription>
              Limites de alunos por plano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PLANOS.map((plano) => (
                <div
                  key={plano.slug}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-gray-200"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{plano.nome}</h3>
                  <p className="text-sm text-gray-600 mb-2">{plano.slug}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-600">
                      {plano.maxAlunos}
                    </span>
                    <span className="text-sm text-gray-600">
                      {typeof plano.maxAlunos === 'number' ? 'alunos' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card: Feature Flags */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-green-600" />
              <CardTitle>Feature Flags</CardTitle>
            </div>
            <CardDescription>
              Estado atual das funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {FEATURE_FLAGS.map((flag) => (
                <div
                  key={flag.slug}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{flag.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{flag.slug}</p>
                  </div>
                  <Badge variant={flag.enabled ? 'default' : 'secondary'}>
                    {flag.enabled ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
