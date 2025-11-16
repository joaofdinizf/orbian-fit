'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Redirecionar baseado no tipo de usuário
      if (data.user.tipoUsuario === 'professor') {
        router.push('/dashboard');
      } else if (data.user.tipoUsuario === 'aluno') {
        router.push('/app-aluno');
      } else {
        router.push(redirect);
      }
      
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-border">
        <CardHeader className="text-center pb-6 pt-10">
          <div className="mx-auto w-20 h-20 mb-4 flex items-center justify-center">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
              alt="Orbian Fit Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            Bem-vindo de volta!
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Entre com suas credenciais para continuar
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-10">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-foreground font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-border"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                'Entrando...'
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">
                  Não tem uma conta?
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cadastro-professor">
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-medium transition-all duration-200"
                >
                  Sou Professor
                </Button>
              </Link>
              <Link href="/cadastro-aluno">
                <Button
                  variant="outline"
                  className="w-full border-2 border-foreground text-foreground hover:bg-secondary rounded-xl font-medium transition-all duration-200"
                >
                  Sou Aluno
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Voltar para a página inicial
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
