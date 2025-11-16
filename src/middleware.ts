import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'orbian-fit-secret-key-change-in-production'
);

// Rotas públicas (sem necessidade de login)
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/login/owner',
  '/cadastro-professor',
  '/cadastro-aluno',
  '/planos',
  '/planos-aluno',
  '/planos-professor',
  '/marketplace',
  '/health',
];

// Rotas de autenticação (redirecionar se já logado)
const AUTH_ROUTES = ['/login', '/login/owner', '/cadastro-professor', '/cadastro-aluno'];

interface SessionUser {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'professor' | 'aluno';
  planoAtualSlug?: string | null;
  professorIdVinculado?: string | null;
  isOwner?: boolean;
}

interface SessionData {
  user: SessionUser;
  expiresAt: number;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // IMPORTANTE: Permitir TODAS as rotas de API sem verificação de middleware
  // As rotas de API fazem sua própria verificação de autenticação
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Permitir acesso a arquivos estáticos, Next.js internals e HMR
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/__nextjs') ||
    pathname.startsWith('/lasy-bridge') ||
    pathname.includes('webpack-hmr') ||
    pathname.includes('hot-update') ||
    pathname.includes('_next/static') ||
    pathname.includes('_next/image') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|json|woff|woff2|ttf|eot|map)$/)
  ) {
    return NextResponse.next();
  }

  // Verificar se é rota pública
  const isPublicRoute = PUBLIC_ROUTES.some(route => {
    if (route === '/teacher-profile/public') {
      return pathname.startsWith('/teacher-profile/public/');
    }
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  // Obter token da sessão
  const token = request.cookies.get('session')?.value;
  let session: SessionData | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      session = payload as unknown as SessionData;

      // Verificar se a sessão expirou
      if (session.expiresAt < Date.now()) {
        session = null;
      }
    } catch (error) {
      // Token inválido, continuar sem sessão
      session = null;
    }
  }

  const isAuthenticated = session !== null;
  const user = session?.user;

  // REGRA ESPECIAL: Se é OWNER, liberar acesso a TUDO
  if (isAuthenticated && user?.isOwner === true) {
    return NextResponse.next();
  }

  // REGRA 1: Se usuário está logado e tenta acessar rotas de autenticação ou home
  if (isAuthenticated && user) {
    if (AUTH_ROUTES.includes(pathname) || pathname === '/') {
      // Redirecionar baseado no tipo de usuário
      if (user.tipoUsuario === 'professor') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else if (user.tipoUsuario === 'aluno') {
        return NextResponse.redirect(new URL('/app-aluno', request.url));
      }
    }
  }

  // REGRA 2: Proteger rota /admin (apenas owner)
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated || user?.isOwner !== true) {
      return NextResponse.redirect(new URL('/login/owner', request.url));
    }
  }

  // REGRA 3: Se não está autenticado e tenta acessar rota privada
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // REGRA 4: Permitir acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (começam com /api/)
     * - _next internals (começam com /_next/)
     * - static files (contêm extensão de arquivo)
     * - webpack HMR
     */
    '/((?!api/|_next/|__nextjs|lasy-bridge|.*\\..*)*)',
  ],
};
