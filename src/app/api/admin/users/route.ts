import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getAllUsers } from '@/lib/database';

export async function GET(request: NextRequest) {
  console.log('🔍 [API /admin/users] Requisição recebida');
  console.log('🔍 [API /admin/users] Headers:', Object.fromEntries(request.headers.entries()));
  console.log('🔍 [API /admin/users] Cookies:', request.cookies.getAll());
  
  try {
    // Verificar se usuário está autenticado e é owner
    console.log('🔍 [API /admin/users] Buscando usuário atual...');
    const currentUser = await getCurrentUser();
    
    console.log('🔍 [API /admin/users] Usuário atual:', {
      exists: !!currentUser,
      email: currentUser?.email,
      isOwner: currentUser?.isOwner,
      tipoUsuario: currentUser?.tipoUsuario,
    });

    if (!currentUser) {
      console.log('❌ [API /admin/users] Usuário não autenticado');
      return NextResponse.json(
        { error: 'Não autenticado' },
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    if (!currentUser.isOwner) {
      console.log('❌ [API /admin/users] Usuário não é owner');
      return NextResponse.json(
        { error: 'Não autorizado - apenas owners podem acessar' },
        { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

    // Buscar todos os usuários
    console.log('🔍 [API /admin/users] Buscando todos os usuários...');
    const users = await getAllUsers();
    console.log(`✅ [API /admin/users] ${users.length} usuários encontrados`);

    return NextResponse.json(
      {
        success: true,
        users,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    console.error('❌ [API /admin/users] Erro ao buscar usuários:', error);
    console.error('❌ [API /admin/users] Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
