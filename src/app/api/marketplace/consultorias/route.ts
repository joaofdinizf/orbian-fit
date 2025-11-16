import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const DESCONTO_ALUNO_ORBIAN_PERCENT = 10;

export async function GET(request: NextRequest) {
  try {
    // TODO: Verificar se usuário está logado e tem plano ativo
    const temPlanoAtivo = true; // Temporário

    // Buscar consultorias ativas
    const { data: consultorias, error: consultoriasError } = await supabase
      .from('consultorias_professor')
      .select(`
        *,
        tipo_consultoria:tipos_consultoria!consultorias_professor_tipo_consultoria_id_fkey(
          id,
          titulo,
          descricao_curta,
          duracao,
          tipo_atendimento
        ),
        professor:users!consultorias_professor_professor_id_fkey(
          id,
          nome
        )
      `)
      .eq('ativo', true);

    if (consultoriasError) {
      console.error('Erro ao buscar consultorias:', consultoriasError);
      return NextResponse.json(
        { error: 'Erro ao buscar consultorias' },
        { status: 500 }
      );
    }

    // Formatar dados e calcular preços
    const consultoriasFormatadas = consultorias.map((c: any) => {
      const precoBase = parseFloat(c.preco_base);
      const precoComDesconto = temPlanoAtivo
        ? precoBase * (1 - DESCONTO_ALUNO_ORBIAN_PERCENT / 100)
        : null;

      return {
        id: c.id,
        professorId: c.professor_id,
        professorNome: c.professor.nome,
        tipoConsultoriaTitulo: c.tipo_consultoria.titulo,
        tipoConsultoriaDescricao: c.tipo_consultoria.descricao_curta,
        duracao: c.tipo_consultoria.duracao,
        tipoAtendimento: c.tipo_consultoria.tipo_atendimento,
        precoBase,
        precoComDesconto,
        temDesconto: temPlanoAtivo,
      };
    });

    return NextResponse.json({
      success: true,
      data: consultoriasFormatadas,
    });
  } catch (error) {
    console.error('Erro ao buscar consultorias:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
