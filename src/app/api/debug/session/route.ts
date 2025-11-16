import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  console.log('🔍 [DEBUG /api/debug/session] Verificando sessão...');
  
  try {
    const session = await getSession();
    const user = await getCurrentUser();
    
    return NextResponse.json({
      hasSession: !!session,
      hasUser: !!user,
      session: session ? {
        email: session.user.email,
        isOwner: session.user.isOwner,
        tipoUsuario: session.user.tipoUsuario,
        expiresAt: new Date(session.expiresAt).toISOString(),
      } : null,
      user: user ? {
        email: user.email,
        isOwner: user.isOwner,
        tipoUsuario: user.tipoUsuario,
      } : null,
    });
  } catch (error) {
    console.error('❌ [DEBUG /api/debug/session] Erro:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}
