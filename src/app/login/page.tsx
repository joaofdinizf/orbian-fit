'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginSelectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card shadow-2xl rounded-3xl border border-border">
        <CardContent className="p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/6aeb479b-c4ce-4e78-9000-aab5f70cf4c6.png" 
                alt="Orbian Fit Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Orbian Fit
            </h1>
            <p className="text-muted-foreground text-sm">
              Conectando personal trainers e alunos
            </p>
          </div>

          {/* Badge Tema Escuro (opcional) */}
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="text-xs">
              Tema Escuro
            </Badge>
          </div>

          {/* Botões de Seleção */}
          <div className="space-y-4">
            <Button
              onClick={() => router.push('/login/personal')}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Sou Personal Trainer
            </Button>

            <Button
              onClick={() => router.push('/login/aluno')}
              variant="outline"
              className="w-full bg-card hover:bg-secondary text-foreground font-semibold py-6 border-2 border-destructive rounded-2xl text-lg transition-all duration-300"
            >
              <User className="w-5 h-5 mr-2" />
              Sou Aluno
            </Button>

            <div className="text-center pt-2">
              <Link 
                href="/login/owner"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Sou Dono (Owner)
              </Link>
            </div>
          </div>

          {/* Link para cadastro */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/cadastro-professor" className="text-destructive hover:underline font-medium">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
