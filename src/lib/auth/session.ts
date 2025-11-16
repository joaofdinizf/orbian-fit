'use server';

import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'orbian-fit-secret-key-change-in-production'
);

export interface SessionUser {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'professor' | 'aluno';
  planoAtualSlug?: string | null;
  professorIdVinculado?: string | null;
  isOwner?: boolean;
}

export interface SessionData {
  user: SessionUser;
  expiresAt: number;
}

// Criar sessão após login
export async function createSession(user: SessionUser) {
  console.log('🔐 [createSession] Criando sessão para:', {
    email: user.email,
    isOwner: user.isOwner,
    tipoUsuario: user.tipoUsuario,
  });
  
  // Aumentar tempo de expiração para 30 dias
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 dias
  
  const token = await new SignJWT({ user, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  
  // Configurar cookie com opções mais permissivas
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 dias em segundos
    path: '/',
  });

  console.log('✅ [createSession] Sessão criada com sucesso. Token:', token.substring(0, 20) + '...');
  console.log('✅ [createSession] Expira em:', new Date(expiresAt).toISOString());
  
  return { success: true, token };
}

// Obter sessão atual
export async function getSession(): Promise<SessionData | null> {
  console.log('🔍 [getSession] Buscando sessão...');
  
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    console.log('❌ [getSession] Token não encontrado nos cookies');
    return null;
  }

  console.log('🔍 [getSession] Token encontrado:', token.substring(0, 20) + '...');

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const sessionData = payload as unknown as SessionData;

    console.log('🔍 [getSession] Payload decodificado:', {
      email: sessionData.user?.email,
      isOwner: sessionData.user?.isOwner,
      expiresAt: new Date(sessionData.expiresAt).toISOString(),
      now: new Date().toISOString(),
    });

    // Verificar se a sessão expirou
    if (sessionData.expiresAt < Date.now()) {
      console.log('❌ [getSession] Sessão expirada');
      await deleteSession();
      return null;
    }

    console.log('✅ [getSession] Sessão válida:', {
      email: sessionData.user.email,
      isOwner: sessionData.user.isOwner,
    });
    
    return sessionData;
  } catch (error) {
    console.error('❌ [getSession] Erro ao verificar sessão:', error);
    await deleteSession();
    return null;
  }
}

// Deletar sessão (logout)
export async function deleteSession() {
  console.log('🗑️ [deleteSession] Deletando sessão');
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}

// Verificar se usuário está autenticado
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  const authenticated = session !== null;
  console.log('🔍 [isAuthenticated]', authenticated);
  return authenticated;
}

// Obter usuário da sessão
export async function getCurrentUser(): Promise<SessionUser | null> {
  console.log('🔍 [getCurrentUser] Buscando usuário atual...');
  const session = await getSession();
  const user = session?.user || null;
  
  console.log('🔍 [getCurrentUser] Resultado:', {
    found: !!user,
    email: user?.email,
    isOwner: user?.isOwner,
  });
  
  return user;
}
