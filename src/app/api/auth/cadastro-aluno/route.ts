import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        nome,
        email,
        senha_hash: senhaHash,
        tipo_usuario: 'aluno',
        telefone: telefone || null,
        professor_id_vinculado: null,
        plano_atual_slug: null,
        is_embaixador: false,
        origem_cadastro: origemCadastro || 'landing_page',
      })
      .select()
      .single();

    if (createError) {
      console.error('Erro ao criar usuário:', createError);
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
