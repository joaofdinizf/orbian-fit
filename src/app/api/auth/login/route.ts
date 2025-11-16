import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';
import { findUserByEmail } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 [API Login] Iniciando processo de login...');
    
    const { email, senha } = await request.json();

    console.log('📧 [API Login] Email recebido:', email);

    if (!email || !senha) {
      console.log('❌ [API Login] Email ou senha não fornecidos');
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // VERIFICAR SE É O DONO DO APP (OWNER)
    const ownerEmail = process.env.ORBIAN_OWNER_EMAIL;
    const ownerPassword = process.env.ORBIAN_OWNER_PASSWORD;
    const ownerName = process.env.ORBIAN_OWNER_NAME || 'Orbian Owner';

    console.log('🔍 [API Login] Verificando se é Owner...');
    console.log('🔍 [API Login] Owner Email configurado:', ownerEmail ? 'Sim' : 'Não');
    console.log('🔍 [API Login] Owner Password configurado:', ownerPassword ? 'Sim' : 'Não');

    if (ownerEmail && ownerPassword && email === ownerEmail && senha === ownerPassword) {
      console.log('✅ [API Login] Login como OWNER detectado!');
      
      // Criar sessão para o owner (usuário virtual)
      const sessionResult = await createSession({
        id: 'owner-orbian',
        nome: ownerName,
        email: ownerEmail,
        tipoUsuario: 'professor',
        isOwner: true,
        planoAtualSlug: 'personal_50_plus',
      });

      console.log('✅ [API Login] Sessão Owner criada:', sessionResult);

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

    console.log('🔍 [API Login] Não é Owner, buscando no banco de dados...');

    // Buscar usuário no banco (fluxo normal)
    const user = await findUserByEmail(email);

    if (!user) {
      console.log('❌ [API Login] Usuário não encontrado no banco');
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos' },
        { status: 401 }
      );
    }

    console.log('✅ [API Login] Usuário encontrado:', {
      id: user.id,
      email: user.email,
      tipo: user.tipo_usuario,
    });

    // Verificar senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    
    if (!senhaValida) {
      console.log('❌ [API Login] Senha inválida');
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos' },
        { status: 401 }
      );
    }

    console.log('✅ [API Login] Senha válida, criando sessão...');

    // Criar sessão
    const sessionResult = await createSession({
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipoUsuario: user.tipo_usuario,
      planoAtualSlug: user.plano_atual_slug,
      professorIdVinculado: user.professor_id_vinculado,
      isOwner: user.is_owner ?? false,
    });

    console.log('✅ [API Login] Sessão criada:', sessionResult);

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
    console.error('❌ [API Login] Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
