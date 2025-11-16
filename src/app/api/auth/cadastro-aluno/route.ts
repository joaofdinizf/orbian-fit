import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, senha, telefone, origemCadastro } = body;

    // Validações
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se email já existe
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário
    const newUser = await createUser({
      nome,
      email: email.toLowerCase(),
      senha_hash: senhaHash,
      tipo_usuario: 'aluno',
      telefone: telefone || null,
      professor_id_vinculado: null,
      plano_atual_slug: null,
      is_embaixador: false,
      origem_cadastro: origemCadastro || 'landing_page',
    });

    if (!newUser) {
      return NextResponse.json(
        { error: 'Erro ao criar conta' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Conta criada com sucesso',
      data: {
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Erro no cadastro de aluno:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
