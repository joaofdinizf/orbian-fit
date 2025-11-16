import { createClient } from '@supabase/supabase-js';

// Cliente Supabase centralizado
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas');
}

export const db = createClient(supabaseUrl, supabaseKey);

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
  is_owner?: boolean; // NOVO: campo para identificar o dono do app
  origem_cadastro?: string;
  created_at?: string;
  updated_at?: string;
}

// Funções auxiliares para operações comuns
export async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await db
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error || !data) {
    return null;
  }

  return data as User;
}

export async function createUser(userData: Partial<User>): Promise<User | null> {
  const { data, error } = await db
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar usuário:', error);
    return null;
  }

  return data as User;
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const { data, error } = await db
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar usuário:', error);
    return null;
  }

  return data as User;
}

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await db
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }

  return data as User[];
}
