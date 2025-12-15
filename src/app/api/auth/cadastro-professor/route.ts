import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/database';
import { createToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, senha, telefone } = body;

    // Validações
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter no mínimo 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    try {
      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        return NextResponse.json(
          { error: 'Este email já está cadastrado' },
          { status: 400 }
        );
      }
    } catch (dbError: any) {
      console.error('Erro ao verificar email existente:', dbError);
      return NextResponse.json(
        { error: 'Erro ao conectar com o banco de dados. Verifique se o Supabase está configurado corretamente.' },
        { status: 500 }
      );
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário professor
    try {
      const newUser = await createUser({
        nome,
        email: email.toLowerCase(),
        senha_hash: senhaHash,
        tipo_usuario: 'professor',
        telefone: telefone || null,
        plano_atual_slug: null, // Ainda não escolheu plano
        professor_id_vinculado: null,
        is_embaixador: false,
        origem_cadastro: 'cadastro_professor',
      });

      if (!newUser) {
        return NextResponse.json(
          { error: 'Erro ao criar conta no banco de dados. Verifique se a tabela "users" existe no Supabase.' },
          { status: 500 }
        );
      }

      // Criar token JWT para autenticação automática
      const token = await createToken({
        userId: newUser.id,
        email: newUser.email,
        tipoUsuario: newUser.tipo_usuario,
      });

      // Criar resposta com cookie de autenticação
      const response = NextResponse.json(
        {
          success: true,
          message: 'Conta criada com sucesso!',
          user: {
            id: newUser.id,
            nome: newUser.nome,
            email: newUser.email,
            tipoUsuario: newUser.tipo_usuario,
          },
        },
        { status: 201 }
      );

      // Definir cookie com token
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
      });

      return response;
    } catch (createError: any) {
      console.error('Erro ao criar usuário:', createError);
      return NextResponse.json(
        { error: `Erro ao criar conta: ${createError.message || 'Erro desconhecido'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro no cadastro de professor:', error);
    return NextResponse.json(
      { error: `Erro interno: ${error.message || 'Erro desconhecido'}` },
      { status: 500 }
    );
  }
}
