import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.tipoUsuario !== 'professor') {
    redirect('/app-aluno');
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Dashboard do Professor
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user.nome}!
        </p>
        
        {/* Aqui você pode adicionar o conteúdo do dashboard do professor */}
        <div className="mt-8">
          <p className="text-foreground">
            Esta é a área protegida do dashboard. Apenas professores logados podem acessar.
          </p>
        </div>
      </div>
    </div>
  );
}
