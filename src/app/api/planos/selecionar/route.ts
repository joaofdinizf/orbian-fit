import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { updateUserPlan } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado. Faça login primeiro.' },
        { status: 401 }
      );
    }

    let userId: string;
    try {
      const decoded = await verifyToken(token);
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido. Faça login novamente.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { planoSlug } = body;

    if (!planoSlug) {
      return NextResponse.json(
        { error: 'Plano não especificado' },
        { status: 400 }
      );
    }

    // Validar plano
    const planosValidos = ['personal_20', 'personal_50', 'personal_50_plus'];
    if (!planosValidos.includes(planoSlug)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Atualizar plano do usuário
    const updatedUser = await updateUserPlan(userId, planoSlug);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Erro ao atualizar plano' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Plano selecionado com sucesso!',
      plano: planoSlug,
    });
  } catch (error: any) {
    console.error('Erro ao selecionar plano:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
