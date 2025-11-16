import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const DESCONTO_ALUNO_ORBIAN_PERCENT = 10;

export async function GET(request: NextRequest) {
  try {
    // Buscar professores com perfil público ativo
    const { data: perfis, error: perfisError } = await supabase
      .from('perfil_publico_professor')
      .select(`
        *,
        professor:users!perfil_publico_professor_professor_id_fkey(
          id,
          nome,
          email
        )
      `)
      .eq('ativo', true);

    if (perfisError) {
      console.error('Erro ao buscar perfis:', perfisError);
      return NextResponse.json(
        { error: 'Erro ao buscar professores' },
        { status: 500 }
      );
    }

    // Formatar dados
    const professores = perfis.map((perfil: any) => ({
      id: perfil.professor.id,
      nome: perfil.professor.nome,
      slug: perfil.slug,
      bio: perfil.bio || '',
      especialidades: perfil.especialidades || [],
      fotoPerfil: perfil.foto_perfil,
      rating: 4.8, // TODO: Calcular rating real das avaliações
      totalAvaliacoes: 0, // TODO: Contar avaliações reais
      cidade: null, // TODO: Adicionar campo cidade se necessário
    }));

    return NextResponse.json({
      success: true,
      data: professores,
    });
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
