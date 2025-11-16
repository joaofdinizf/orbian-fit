import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { planoSlug } = await request.json();

    if (!planoSlug) {
      return NextResponse.json(
        { error: 'Plano não especificado' },
        { status: 400 }
      );
    }

    // Validar se o plano existe e é de professor
    const planosValidos = ['personal_20', 'personal_50', 'personal_50_plus'];
    if (!planosValidos.includes(planoSlug)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Atualizar o plano do usuário
    const { error: updateError } = await supabase
      .from('users')
      .update({ plano_atual_slug: planoSlug })
      .eq('id', session.user.id);

    if (updateError) {
      console.error('Erro ao atualizar plano:', updateError);
      return NextResponse.json(
        { error: 'Erro ao atualizar plano' },
        { status: 500 }
      );
    }

    // Criar assinatura (por enquanto sem integração com Mercado Pago)
    const { error: assinaturaError } = await supabase
      .from('assinaturas')
      .insert({
        user_id: session.user.id,
        plano_slug: planoSlug,
        status: 'ativa', // Em produção, seria 'pendente' até confirmar pagamento
        data_inicio: new Date().toISOString(),
      });

    if (assinaturaError) {
      console.error('Erro ao criar assinatura:', assinaturaError);
    }

    return NextResponse.json({
      success: true,
      message: 'Plano selecionado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao selecionar plano:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
