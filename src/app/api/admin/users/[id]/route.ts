import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: any
) {
  try {
    console.log('🔧 [PATCH /api/admin/users/[id]] Iniciando atualização de usuário...');

    const supabase = await createClient();

    // Verificar autenticação
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      console.log('❌ [PATCH /api/admin/users/[id]] Não autenticado');
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
      console.log('❌ [PATCH /api/admin/users/[id]] Acesso negado - não é owner');
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    // Obter dados do body
    const body = await request.json();
    const { tipo_usuario, plano_atual_slug } = body;

    console.log('📝 [PATCH /api/admin/users/[id]] Dados para atualizar:', {
      userId: params.id,
      tipo_usuario,
      plano_atual_slug,
    });

    // Preparar dados para atualização
    const updateData: any = {};
    if (tipo_usuario !== undefined) updateData.tipo_usuario = tipo_usuario;
    if (plano_atual_slug !== undefined) updateData.plano_atual_slug = plano_atual_slug;

    // Atualizar usuário
    const { data: updatedUser, error: updateError } = await supabase
      .from('usuarios')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ [PATCH /api/admin/users/[id]] Erro ao atualizar:', updateError);
      return NextResponse.json(
        { error: 'Erro ao atualizar usuário', details: updateError.message },
        { status: 500 }
      );
    }

    console.log('✅ [PATCH /api/admin/users/[id]] Usuário atualizado com sucesso');

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('❌ [PATCH /api/admin/users/[id]] Erro inesperado:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
