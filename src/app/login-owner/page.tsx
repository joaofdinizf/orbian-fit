'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, ArrowLeft, Shield } from 'lucide-react';
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
      console.log('📧 Email digitado:', email);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      console.log('📡 Status da resposta:', response.status);

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Verificar se é owner
      console.log('👤 Usuário retornado:', data.user);
      console.log('🔑 isOwner:', data.user?.isOwner);

      if (!data.user?.isOwner) {
        throw new Error('Acesso negado. Esta área é exclusiva para o Dono do App.');
      }

      console.log('✅ Login como Owner bem-sucedido! Redirecionando para /admin...');

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      console.error('❌ Erro no login do Owner:', err);
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
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Orbian Fit</h1>
            <p className="text-gray-600 text-sm mb-4">
              Conectando personal trainers e alunos de forma inteligente
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-900 font-semibold">
              <Shield className="w-5 h-5 text-red-600" />
              <span>Login do Dono Orbian Fit</span>
            </div>
          </div>

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
                  placeholder="dono@orbianfit.com"
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
              {loading ? 'Entrando...' : 'Entrar como Dono'}
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
