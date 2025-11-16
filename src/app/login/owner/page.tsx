'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function LoginOwnerPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔐 Iniciando login como Owner...');
      console.log('📧 Email:', email);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, senha }),
      });

      console.log('📡 Status da resposta:', response.status);

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Verificar se é owner
      console.log('👤 Usuário:', data.user);
      console.log('🔑 isOwner:', data.user?.isOwner);

      if (!data.user) {
        throw new Error('Dados do usuário não foram retornados');
      }

      if (!data.user.isOwner) {
        throw new Error('Acesso negado. Esta área é exclusiva para o Dono do App.');
      }

      console.log('✅ Login como Owner bem-sucedido! Redirecionando para /admin...');

      // Aguardar um pouco para garantir que o cookie foi setado
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirecionar para painel admin
      window.location.href = '/admin';
    } catch (err: any) {
      console.error('❌ Erro no login:', err);
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-3xl border border-gray-200">
        <CardContent className="p-8">
          {/* Botão Voltar */}
          <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Link>

          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/b4d57c0d-ebec-4a74-a3a6-002c5c2e5f55.png" 
                alt="Orbian Fit Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Orbian Fit
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              Conectando personal trainers e alunos de forma inteligente
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-900 font-semibold">
              <Shield className="w-5 h-5 text-red-600" />
              <span>Login do Dono Orbian Fit</span>
            </div>
          </div>

          {/* Alerta de Configuração */}
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm text-yellow-800">
              <strong>Importante:</strong> Se você está vendo "sessão expirada", configure as variáveis de ambiente no Vercel:
              <code className="block mt-2 text-xs bg-yellow-100 p-2 rounded">
                ORBIAN_OWNER_EMAIL<br/>
                ORBIAN_OWNER_PASSWORD<br/>
                JWT_SECRET
              </code>
              <a 
                href="https://github.com/seu-repo/orbian-fit/blob/main/DEPLOY_CHECKLIST.md" 
                target="_blank"
                className="text-yellow-900 underline text-xs mt-2 inline-block"
              >
                Ver instruções completas →
              </a>
            </AlertDescription>
          </Alert>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-center">
              <Link 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
