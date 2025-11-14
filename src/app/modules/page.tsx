'use client';

import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Módulos Beta</h1>
      <p className="text-gray-600 mb-6">Cada módulo abaixo exibe se a respectiva feature flag estiver ativa.</p>

      <ModulePlaceholder
        flag="share_card"
        title="Cartão Compartilhável"
        description="Gera imagem com resumo do treino para compartilhar nas redes."
        nextSteps={[
          'Template base do cartão',
          'Exportar PNG/JPEG',
          'Botão "Compartilhar"',
        ]}
      />

      <ModulePlaceholder
        flag="plan_vs_done"
        title="Planejado vs Realizado"
        description="Comparativo do treino prescrito vs executado (carga/séries/reps)."
        nextSteps={[
          'Entradas de carga/séries/reps',
          'Persistência das execuções',
          'Gráfico por exercício',
        ]}
      />

      <ModulePlaceholder
        flag="swap_exercise"
        title="Substituir Exercício"
        description="Sugestões de substituição quando aparelho estiver ocupado."
        nextSteps={[
          'Lista alternativas por grupo muscular',
          'Filtro por equipamento disponível',
        ]}
      />

      <ModulePlaceholder
        flag="rest_timer"
        title="Cronômetro de Descanso"
        description="Timer 30/60/90/120s com aviso ao finalizar."
        nextSteps={[
          'Timer com presets',
          'Notificação visual/sonora',
        ]}
      />

      <ModulePlaceholder
        flag="session_timer"
        title="Tempo de Sessão"
        description="Cronômetro de início/fim para estimar duração do treino."
        nextSteps={[
          'Start/stop no início/fim',
          'Mostrar total de minutos',
        ]}
      />

      <ModulePlaceholder
        flag="progress_analytics"
        title="Evolução e Métricas"
        description="Força, frequência, resistência (cardio) e gráficos."
        nextSteps={[
          'Modelo de dados de progresso',
          'Gráficos por período',
        ]}
      />

      <ModulePlaceholder
        flag="time_estimator"
        title="Estimador de Tempo"
        description="Prevê duração do treino considerando sets, descanso e espera."
        nextSteps={[
          'Cálculo por exercício',
          'Somatório + tolerância de espera',
        ]}
      />

      <ModulePlaceholder
        flag="premade_workouts"
        title="Treinos Pré-prontos"
        description="Biblioteca para treinar rápido (casa, poucos equipamentos, etc.)."
        nextSteps={[
          'Catálogo + tags',
          'Aplicar no plano do aluno',
        ]}
      />

      <ModulePlaceholder
        flag="stretching"
        title="Alongamentos"
        description="Rotinas de alongamento antes/depois do treino."
        nextSteps={[
          'Sequências por grupo muscular',
          'Temporizadores por posição',
        ]}
      />

      <ModulePlaceholder
        flag="session_summary"
        title="Resumo da Sessão"
        description="Tela final com totais, PRs, observações e compartilhar."
        nextSteps={[
          'PR detection',
          'Resumo de volume, reps, tempo total',
        ]}
      />

      <ModulePlaceholder
        flag="add_only_hardening"
        title="Modo Adição Restrita"
        description="Adicionar só cargas/séries/reps (sem edição do plano)."
        nextSteps={[
          'Bloquear edição do plano',
          'Habilitar apenas inputs de execução',
        ]}
      />
    </main>
  );
}
