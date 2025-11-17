import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getAllUsers } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Verificar se usuário está autenticado e é owner
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.isOwner) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      );
    }

    // Buscar todos os usuários
    const users = await getAllUsers();

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
