'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, CreditCard, Flag, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log('🔍 [AdminPage] Iniciando busca de usuários...');
        console.log('🔍 [AdminPage] URL da API:', '/api/admin/users');
        
        const response = await fetch('/api/admin/users', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('📡 [AdminPage] Status da resposta:', response.status);
        console.log('📡 [AdminPage] Headers da resposta:', Object.fromEntries(response.headers.entries()));

        if (response.status === 401) {
          console.log('❌ [AdminPage] Não autorizado - redirecionando para login');
          setError('Sessão expirada. Redirecionando para login...');
          setTimeout(() => router.push('/login/owner'), 2000);
          return;
        }

        if (response.status === 403) {
          console.log('❌ [AdminPage] Acesso negado - não é owner');
          setError('Acesso negado. Você não tem permissão para acessar esta área.');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { error: `Erro HTTP ${response.status}` };
          }
          
          console.error('❌ [AdminPage] Erro na resposta:', errorData);
          throw new Error(errorData.error || 'Erro ao buscar usuários');
        }

        const data = await response.json();
        console.log('✅ [AdminPage] Dados recebidos:', data);
        
        setUsers(data.users || []);
        setError(null);
        setErrorDetails(null);
      } catch (error) {
        console.error('❌ [AdminPage] Erro ao buscar usuários:', error);
        
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          setError('Erro de conexão com o servidor');
          setErrorDetails('Não foi possível conectar à API. Verifique se o servidor está rodando e se as variáveis de ambiente do Supabase estão configuradas corretamente.');
        } else {
          setError(error instanceof Error ? error.message : 'Erro desconhecido');
          setErrorDetails(error instanceof Error ? error.stack || null : null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando painel do dono...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao carregar dados</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="font-semibold">{error}</p>
                {errorDetails && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm">Ver detalhes técnicos</summary>
                    <pre className="mt-2 text-xs bg-black/5 p-2 rounded overflow-auto max-h-40">
                      {errorDetails}
                    </pre>
                  </details>
                )}
                <div className="mt-4 space-y-2 text-sm">
                  <p className="font-semibold">Possíveis soluções:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verifique se as variáveis de ambiente do Supabase estão configuradas</li>
                    <li>Certifique-se de que você fez login como Owner</li>
                    <li>Tente fazer logout e login novamente</li>
                    <li>Verifique o console do navegador (F12) para mais detalhes</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
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
            {users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum usuário cadastrado ainda.
              </div>
            ) : (
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
            )}
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
