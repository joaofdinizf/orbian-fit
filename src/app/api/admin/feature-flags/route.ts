import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
  try {
    console.log('🚩 [PATCH /api/admin/feature-flags] Iniciando atualização de feature flag...');
    
    const supabase = await createClient();
    
    // Verificar autenticação
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      console.log('❌ [PATCH /api/admin/feature-flags] Não autenticado');
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar se é owner
    const { data: ownerData, error: ownerError } = await supabase
      .from('usuarios')
      .select('is_owner')
      .eq('id', authUser.id)
      .single();

    if (ownerError || !ownerData?.is_owner) {
      console.log('❌ [PATCH /api/admin/feature-flags] Acesso negado - não é owner');
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Obter dados do body
    const body = await request.json();
    const { slug, enabled } = body;

    if (!slug || typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Dados inválidos. Forneça slug e enabled.' },
        { status: 400 }
      );
    }

    console.log('📝 [PATCH /api/admin/feature-flags] Atualizando flag:', { slug, enabled });

    // Verificar se a feature flag já existe
    const { data: existingFlag } = await supabase
      .from('feature_flags')
      .select('*')
      .eq('slug', slug)
      .single();

    let result;

    if (existingFlag) {
      // Atualizar flag existente
      const { data, error } = await supabase
        .from('feature_flags')
        .update({ enabled, updated_at: new Date().toISOString() })
        .eq('slug', slug)
        .select()
        .single();

      if (error) {
        console.error('❌ [PATCH /api/admin/feature-flags] Erro ao atualizar:', error);
        return NextResponse.json(
          { error: 'Erro ao atualizar feature flag', details: error.message },
          { status: 500 }
        );
      }

      result = data;
    } else {
      // Criar nova flag
      const { data, error } = await supabase
        .from('feature_flags')
        .insert({
          slug,
          enabled,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [PATCH /api/admin/feature-flags] Erro ao criar:', error);
        return NextResponse.json(
          { error: 'Erro ao criar feature flag', details: error.message },
          { status: 500 }
        );
      }

      result = data;
    }

    console.log('✅ [PATCH /api/admin/feature-flags] Feature flag atualizada com sucesso');
    
    return NextResponse.json({
      success: true,
      flag: result,
    });

  } catch (error) {
    console.error('❌ [PATCH /api/admin/feature-flags] Erro inesperado:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🚩 [GET /api/admin/feature-flags] Buscando feature flags...');
    
    const supabase = await createClient();
    
    // Verificar autenticação
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      console.log('❌ [GET /api/admin/feature-flags] Não autenticado');
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar se é owner
    const { data: ownerData, error: ownerError } = await supabase
      .from('usuarios')
      .select('is_owner')
      .eq('id', authUser.id)
      .single();

    if (ownerError || !ownerData?.is_owner) {
      console.log('❌ [GET /api/admin/feature-flags] Acesso negado - não é owner');
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Buscar todas as feature flags
    const { data: flags, error: flagsError } = await supabase
      .from('feature_flags')
      .select('*')
      .order('slug', { ascending: true });

    if (flagsError) {
      console.error('❌ [GET /api/admin/feature-flags] Erro ao buscar:', flagsError);
      return NextResponse.json(
        { error: 'Erro ao buscar feature flags', details: flagsError.message },
        { status: 500 }
      );
    }

    console.log('✅ [GET /api/admin/feature-flags] Feature flags encontradas:', flags?.length || 0);
    
    return NextResponse.json({
      success: true,
      flags: flags || [],
    });

  } catch (error) {
    console.error('❌ [GET /api/admin/feature-flags] Erro inesperado:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
