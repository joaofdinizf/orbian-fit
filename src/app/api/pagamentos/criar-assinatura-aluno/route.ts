import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planoSlug } = body;

    // TODO: Pegar userId da sessão autenticada
    const userId = body.userId; // Temporário - implementar auth real

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Buscar dados do plano
    const { data: plano, error: planoError } = await supabase
      .from('planos')
      .select('*')
      .eq('slug', planoSlug)
      .single();

    if (planoError || !plano) {
      return NextResponse.json(
        { error: 'Plano não encontrado' },
        { status: 404 }
      );
    }

    // Buscar dados do usuário
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Criar assinatura no Mercado Pago
    const mpResponse = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reason: `${plano.nome_exibicao} - Orbian Fit`,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: plano.preco_mensal,
          currency_id: 'BRL',
        },
        back_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura/confirmacao`,
        payer_email: user.email,
        external_reference: userId,
      }),
    });

    const mpData = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error('Erro Mercado Pago:', mpData);
      return NextResponse.json(
        { error: 'Erro ao criar assinatura no Mercado Pago' },
        { status: 500 }
      );
    }

    // Salvar assinatura no banco
    const { data: assinatura, error: assinaturaError } = await supabase
      .from('assinaturas')
      .insert({
        user_id: userId,
        plano_slug: planoSlug,
        mercado_pago_subscription_id: mpData.id,
        status: 'pendente',
        data_inicio: new Date().toISOString(),
      })
      .select()
      .single();

    if (assinaturaError) {
      console.error('Erro ao salvar assinatura:', assinaturaError);
      return NextResponse.json(
        { error: 'Erro ao salvar assinatura' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: mpData.init_point,
      assinaturaId: assinatura.id,
    });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
