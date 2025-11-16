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
  '/cadastro-professor',
  '/cadastro-aluno',
  '/planos',
  '/planos-aluno',
  '/planos-professor',
  '/marketplace',
  '/teacher-profile/public',
];

// Rotas de autenticação
const AUTH_ROUTES = ['/login', '/cadastro-professor', '/cadastro-aluno'];

interface SessionUser {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'professor' | 'aluno';
  planoAtualSlug?: string | null;
  professorIdVinculado?: string | null;
}

interface SessionData {
  user: SessionUser;
  expiresAt: number;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acesso a arquivos estáticos, API routes, Next.js internals e arquivos com extensão
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/__nextjs') ||
    pathname.includes('/webpack-hmr') ||
    pathname.includes('/_next/static') ||
    pathname.includes('/_next/image') ||
    pathname.includes('/favicon') ||
    pathname.includes('/icon') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|json|woff|woff2|ttf|eot)$/)
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

  // REGRA 1: Se usuário está logado e tenta acessar rotas de autenticação ou home
  if (isAuthenticated && user) {
    if (AUTH_ROUTES.includes(pathname) || pathname === '/') {
      // Redirecionar baseado no tipo de usuário
      if (user.tipoUsuario === 'professor') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else if (user.tipoUsuario === 'aluno') {
        // Aluno vai para a home do app (que seria a página principal com role de aluno)
        return NextResponse.redirect(new URL('/app-aluno', request.url));
      }
    }
  }

  // REGRA 2: Se não está autenticado e tenta acessar rota privada
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // REGRA 3: Permitir acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - _next/webpack-hmr (hot module replacement)
     * - favicon, icons
     * - files with extensions (images, fonts, etc)
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon|icon|.*\\..*$).*)',
  ],
};
