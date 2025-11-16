import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
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

    const supabase = await createClient();

    // Verificar se o email já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      );
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário professor
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        nome,
        email,
        senha_hash: senhaHash,
        tipo_usuario: 'professor',
        telefone: telefone || null,
        plano_atual_slug: null, // Ainda não escolheu plano
        professor_id_vinculado: null,
        is_embaixador: false,
        origem_cadastro: 'cadastro_professor',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao criar professor:', insertError);
      return NextResponse.json(
        { error: 'Erro ao criar conta. Tente novamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
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
  } catch (error) {
    console.error('Erro no cadastro de professor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
