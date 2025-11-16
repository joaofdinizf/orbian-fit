// ============================================
// ORBIAN FIT - TIPOS COMPLETOS DO SISTEMA
// ============================================

// ============================================
// 1. USUÁRIOS E AUTENTICAÇÃO
// ============================================

export type TipoUsuario = 'professor' | 'aluno';

export type User = {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  tipoUsuario: TipoUsuario;
  telefone?: string | null;
  planoAtualSlug?: string | null;
  professorIdVinculado?: string | null;
  isEmbaixador: boolean;
  origemCadastro?: string | null;
  betaStartDate?: string | null;
  betaEndDate?: string | null;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 2. PLANOS (PROFESSORES E ALUNOS)
// ============================================

export type TipoPlano = 'personal' | 'aluno';

export type Plano = {
  id: string;
  slug: string;
  tipoPlano: TipoPlano;
  nomeExibicao: string;
  descricaoCurta: string;
  precoMensal: number;
  maxAlunosAtivos?: number | null;
  isBeta: boolean;
  visivelNaPaginaPublica: boolean;
  createdAt: string;
  updatedAt: string;
};

// Planos de Professor
export type PlanoPersonalSlug = 
  | 'personal_20'      // Básico - 20 alunos
  | 'personal_50'      // Premium - 50 alunos
  | 'personal_50_plus' // Elite - ilimitado
  | 'beta_full_120';   // Beta - 4 alunos, 120 dias

// Planos de Aluno
export type PlanoAlunoSlug = 
  | 'aluno_orbian'     // Assinatura R$ 19,90
  | 'aluno_beta_base'; // Beta gratuito 120 dias

// ============================================
// 3. ASSINATURAS E PAGAMENTOS
// ============================================

export type StatusAssinatura = 'ativa' | 'pendente' | 'cancelada' | 'expirada';

export type Assinatura = {
  id: string;
  userId: string;
  planoSlug: string;
  mercadoPagoSubscriptionId?: string | null;
  status: StatusAssinatura;
  dataInicio: string;
  dataProximoCobranca?: string | null;
  dataFim?: string | null;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 4. MARKETPLACE - TIPOS DE CONSULTORIA
// ============================================

export type TipoAtendimento = 'videochamada' | 'chat' | 'audio' | 'misto';

export type TipoConsultoria = {
  id: string;
  titulo: string;
  descricaoCurta: string;
  duracao: number; // em dias ou minutos
  tipoAtendimento: TipoAtendimento;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 5. MARKETPLACE - CONSULTORIAS DO PROFESSOR
// ============================================

export type ConsultoriaProfessor = {
  id: string;
  professorId: string;
  tipoConsultoriaId: string;
  precoBase: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 6. MARKETPLACE - CONSULTORIAS VENDIDAS
// ============================================

export type StatusConsultoria = 
  | 'pendentePagamento' 
  | 'pago' 
  | 'emAndamento' 
  | 'concluido' 
  | 'cancelado';

export type TipoVenda = 'consultoria_app' | 'acompanhamento_direto';

export type ConsultoriaVendida = {
  id: string;
  alunoId: string;
  professorId: string;
  consultoriaProfessorId: string;
  valorCobrado: number;
  taxaOrbianPercent: number;
  valorTaxaOrbian: number;
  valorProfessorLiquido: number;
  status: StatusConsultoria;
  tipoVenda: TipoVenda;
  mercadoPagoPaymentId?: string | null;
  mercadoPagoPreferenceId?: string | null;
  converteuEmAlunoDoProfessor: boolean;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 7. LEADS (ACOMPANHAMENTO DIRETO)
// ============================================

export type StatusLead = 'novo' | 'contatado' | 'convertido' | 'perdido';

export type Lead = {
  id: string;
  alunoId: string;
  professorId: string;
  objetivos?: string | null;
  mensagem?: string | null;
  status: StatusLead;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 8. CONFIGURAÇÕES GLOBAIS
// ============================================

export type ConfigGlobal = {
  id: string;
  chave: string;
  valor: string;
  descricao?: string | null;
  updatedAt: string;
};

// Configurações importantes:
// - max_beta_professores: 10
// - max_beta_alunos: 10
// - desconto_aluno_orbian_percent: 10
// - taxa_orbian_consultoria_percent: 5

// ============================================
// 9. PERFIL PÚBLICO DO PROFESSOR
// ============================================

export type PerfilPublicoProfessor = {
  id: string;
  professorId: string;
  slug: string; // URL amigável: /professor/joao-silva
  bio?: string | null;
  especialidades?: string[] | null;
  fotoPerfil?: string | null;
  fotoCapaUrl?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 10. HELPERS E UTILITÁRIOS
// ============================================

export const DESCONTO_ALUNO_ORBIAN_PERCENT = 10;
export const TAXA_ORBIAN_CONSULTORIA_PERCENT = 5;
export const MAX_BETA_PROFESSORES = 10;
export const MAX_BETA_ALUNOS = 10;

export function calcularPrecoComDesconto(precoBase: number, descontoPercent: number): number {
  return precoBase * (1 - descontoPercent / 100);
}

export function calcularTaxaOrbian(valorCobrado: number, taxaPercent: number): number {
  return valorCobrado * (taxaPercent / 100);
}

export function calcularValorLiquido(valorCobrado: number, taxaOrbian: number): number {
  return valorCobrado - taxaOrbian;
}

// ============================================
// 11. TIPOS DE RESPOSTA DA API
// ============================================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
