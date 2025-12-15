import { createClient } from '@supabase/supabase-js';

// Cliente Supabase centralizado
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ ERRO: Variáveis de ambiente do Supabase não configuradas');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Configurada' : 'NÃO configurada');
  console.error('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'Configurada' : 'NÃO configurada');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configurada' : 'NÃO configurada');
}

export const db = createClient(supabaseUrl || '', supabaseKey || '');

// Tipos para usuário
export interface User {
  id: string;
  nome: string;
  email: string;
  senha_hash: string;
  tipo_usuario: 'professor' | 'aluno';
  telefone?: string | null;
  plano_atual_slug?: string | null;
  professor_id_vinculado?: string | null;
  is_embaixador?: boolean;
  is_owner?: boolean;
  origem_cadastro?: string;
  created_at?: string;
  updated_at?: string;
}

// Funções auxiliares para operações comuns
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Erro ao buscar usuário por email:', error);
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }

    return data as User;
  } catch (error: any) {
    console.error('Erro na função findUserByEmail:', error);
    throw error;
  }
}

export async function createUser(userData: Partial<User>): Promise<User | null> {
  try {
    const { data, error } = await db
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar usuário no Supabase:', error);
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }

    return data as User;
  } catch (error: any) {
    console.error('Erro na função createUser:', error);
    throw error;
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  try {
    const { data, error } = await db
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }

    return data as User;
  } catch (error: any) {
    console.error('Erro na função updateUser:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const { data, error } = await db
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }

    return data as User[];
  } catch (error: any) {
    console.error('Erro na função getAllUsers:', error);
    return [];
  }
}

export async function updateUserPlan(userId: string, planoSlug: string): Promise<User | null> {
  try {
    const { data, error } = await db
      .from('users')
      .update({ 
        plano_atual_slug: planoSlug,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar plano do usuário:', error);
      throw new Error(`Erro ao atualizar plano: ${error.message}`);
    }

    return data as User;
  } catch (error: any) {
    console.error('Erro na função updateUserPlan:', error);
    throw error;
  }
}
