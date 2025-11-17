import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';
import { findUserByEmail } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // VERIFICAR SE É O DONO DO APP (OWNER)
    const ownerEmail = process.env.ORBIAN_OWNER_EMAIL;
    const ownerPassword = process.env.ORBIAN_OWNER_PASSWORD;
    const ownerName = process.env.ORBIAN_OWNER_NAME || 'Orbian Owner';

    if (ownerEmail && ownerPassword && email === ownerEmail && senha === ownerPassword) {
      // Criar sessão para o owner (usuário virtual)
      await createSession({
        id: 'owner-orbian',
        nome: ownerName,
        email: ownerEmail,
        tipoUsuario: 'professor',
        isOwner: true,
        planoAtualSlug: 'personal_50_plus',
      });

      return NextResponse.json({
        success: true,
        user: {
          id: 'owner-orbian',
          nome: ownerName,
          email: ownerEmail,
          tipoUsuario: 'professor',
          isOwner: true,
          planoAtualSlug: 'personal_50_plus',
        },
      });
    }

    // Buscar usuário no banco (fluxo normal)
    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos' },
        { status: 401 }
      );
    }

    // Verificar senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    
    if (!senhaValida) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos' },
        { status: 401 }
      );
    }

    // Criar sessão
    await createSession({
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipoUsuario: user.tipo_usuario,
      planoAtualSlug: user.plano_atual_slug,
      professorIdVinculado: user.professor_id_vinculado,
      isOwner: user.is_owner ?? false, // Incluir isOwner do banco
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipoUsuario: user.tipo_usuario,
        planoAtualSlug: user.plano_atual_slug,
        isOwner: user.is_owner ?? false,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
