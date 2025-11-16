'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface HealthCheck {
  status: 'ok' | 'warning' | 'error';
  message: string;
  details?: string;
}

export default function HealthCheckPage() {
  const [checks, setChecks] = useState<Record<string, HealthCheck>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performHealthChecks();
  }, []);

  const performHealthChecks = async () => {
    const results: Record<string, HealthCheck> = {};

    // 1. Verificar se a página carrega
    results.pageLoad = {
      status: 'ok',
      message: 'Página carregou com sucesso',
    };

    // 2. Verificar API de login
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@test.com', senha: 'test' }),
      });
      
      if (response.status === 401 || response.status === 400) {
        results.loginApi = {
          status: 'ok',
          message: 'API de login está respondendo',
          details: 'Retornou erro esperado para credenciais inválidas',
        };
      } else if (response.status === 500) {
        results.loginApi = {
          status: 'error',
          message: 'API de login com erro interno',
          details: 'Verifique variáveis de ambiente (JWT_SECRET, SECRET_KEY)',
        };
      } else {
        results.loginApi = {
          status: 'warning',
          message: 'API de login com comportamento inesperado',
          details: `Status: ${response.status}`,
        };
      }
    } catch (error) {
      results.loginApi = {
        status: 'error',
        message: 'Falha ao conectar com API de login',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }

    // 3. Verificar variáveis de ambiente públicas
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasFirebaseKey = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (hasSupabaseUrl || hasFirebaseKey) {
      results.database = {
        status: 'ok',
        message: 'Configuração de banco detectada',
        details: hasSupabaseUrl ? 'Supabase' : 'Firebase',
      };
    } else {
      results.database = {
        status: 'warning',
        message: 'Nenhum banco de dados configurado',
        details: 'Configure Supabase ou Firebase',
      };
    }

    // 4. Verificar build
    results.build = {
      status: 'ok',
      message: 'Build completou com sucesso',
      details: 'Aplicação está rodando',
    };

    setChecks(results);
    setLoading(false);
  };

  const getIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return <Badge className="bg-green-500">OK</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Aviso</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Erro</Badge>;
      default:
        return null;
    }
  };

  const overallStatus = Object.values(checks).every((c) => c.status === 'ok')
    ? 'ok'
    : Object.values(checks).some((c) => c.status === 'error')
    ? 'error'
    : 'warning';

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Diagnóstico do Sistema
          </h1>
          <p className="text-muted-foreground">
            Verificação de saúde do Orbian Fit
          </p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Executando verificações...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Status Geral</CardTitle>
                  {getStatusBadge(overallStatus)}
                </div>
              </CardHeader>
              <CardContent>
                {overallStatus === 'ok' && (
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Sistema Operacional</p>
                      <p className="text-sm text-muted-foreground">
                        Todas as verificações passaram
                      </p>
                    </div>
                  </div>
                )}
                {overallStatus === 'warning' && (
                  <div className="flex items-center gap-3 text-yellow-600">
                    <AlertCircle className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Sistema com Avisos</p>
                      <p className="text-sm text-muted-foreground">
                        Algumas configurações podem ser melhoradas
                      </p>
                    </div>
                  </div>
                )}
                {overallStatus === 'error' && (
                  <div className="flex items-center gap-3 text-red-600">
                    <XCircle className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Sistema com Erros</p>
                      <p className="text-sm text-muted-foreground">
                        Ação necessária para corrigir problemas
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {Object.entries(checks).map(([key, check]) => (
                <Card key={key}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getIcon(check.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">
                            {check.message}
                          </h3>
                          {getStatusBadge(check.status)}
                        </div>
                        {check.details && (
                          <p className="text-sm text-muted-foreground">
                            {check.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  💡 Precisa de Ajuda?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Se você está vendo erros, consulte o arquivo{' '}
                  <code className="bg-background px-2 py-1 rounded">
                    DEPLOY_CHECKLIST.md
                  </code>{' '}
                  na raiz do projeto para instruções detalhadas de configuração.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <strong>Variáveis obrigatórias:</strong>
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>JWT_SECRET (mínimo 32 caracteres)</li>
                    <li>SECRET_KEY (mínimo 32 caracteres)</li>
                    <li>ORBIAN_OWNER_EMAIL</li>
                    <li>ORBIAN_OWNER_PASSWORD</li>
                    <li>Configuração de banco (Supabase ou Firebase)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
