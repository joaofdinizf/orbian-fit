import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';

export default async function AppAlunoPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.tipoUsuario !== 'aluno') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          App do Aluno
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user.nome}!
        </p>
        
        {/* Aqui você pode adicionar o conteúdo do app do aluno */}
        <div className="mt-8">
          <p className="text-foreground">
            Esta é a área protegida do app do aluno. Apenas alunos logados podem acessar.
          </p>
        </div>
      </div>
    </div>
  );
}
