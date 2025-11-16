import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ---- Supabase (somente servidor) ----
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL (ou NEXT_PUBLIC_SUPABASE_URL) não configurada');
}

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurada');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ---- Mercado Pago ----
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planoSlug, userId } = body;

    // TODO: pegar userId da sessão autenticada
    // const userId = session.user.id

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
    const mpResponse = await fetch(
      'https://api.mercadopago.com/preapproval',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
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
          back_url: `${APP_URL}/assinatura/confirmacao`,
          payer_email: user.email,
          external_reference: userId,
        }),
      }
    );

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
