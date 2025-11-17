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
  isOwner?: boolean; // NOVO: campo para identificar o dono do app
}

export interface SessionData {
  user: SessionUser;
  expiresAt: number;
}

// Criar sessão após login
export async function createSession(user: SessionUser) {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 dias
  
  const token = await new SignJWT({ user, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    path: '/',
  });

  return { success: true };
}

// Obter sessão atual
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const sessionData = payload as unknown as SessionData;

    // Verificar se a sessão expirou
    if (sessionData.expiresAt < Date.now()) {
      await deleteSession();
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    await deleteSession();
    return null;
  }
}

// Deletar sessão (logout)
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}

// Verificar se usuário está autenticado
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

// Obter usuário da sessão
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  return session?.user || null;
}
