/**
 * Verificação de Variáveis de Ambiente
 * Ajuda a diagnosticar problemas de configuração
 */

export interface EnvCheckResult {
  isValid: boolean;
  missing: string[];
  warnings: string[];
}

/**
 * Verifica se as variáveis de ambiente obrigatórias estão configuradas
 */
export function checkEnvironmentVariables(): EnvCheckResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Variáveis OBRIGATÓRIAS para segurança
  if (!process.env.JWT_SECRET) {
    missing.push('JWT_SECRET');
  } else if (process.env.JWT_SECRET.length < 32) {
    warnings.push('JWT_SECRET deve ter no mínimo 32 caracteres');
  }

  if (!process.env.SECRET_KEY) {
    missing.push('SECRET_KEY');
  } else if (process.env.SECRET_KEY.length < 32) {
    warnings.push('SECRET_KEY deve ter no mínimo 32 caracteres');
  }

  // Variáveis do Owner (recomendadas)
  if (!process.env.ORBIAN_OWNER_EMAIL) {
    warnings.push('ORBIAN_OWNER_EMAIL não configurado - login como Owner não funcionará');
  }

  if (!process.env.ORBIAN_OWNER_PASSWORD) {
    warnings.push('ORBIAN_OWNER_PASSWORD não configurado - login como Owner não funcionará');
  }

  // Verificar banco de dados (pelo menos um deve estar configurado)
  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const hasFirebase = !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );

  if (!hasSupabase && !hasFirebase) {
    warnings.push('Nenhum banco de dados configurado (Supabase ou Firebase)');
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  };
}

/**
 * Loga o status das variáveis de ambiente (apenas no servidor)
 */
export function logEnvironmentStatus(): void {
  if (typeof window !== 'undefined') {
    return; // Não executar no cliente
  }

  const result = checkEnvironmentVariables();

  console.log('\n🔍 Verificação de Variáveis de Ambiente:');
  console.log('==========================================');

  if (result.isValid) {
    console.log('✅ Todas as variáveis obrigatórias estão configuradas');
  } else {
    console.error('❌ VARIÁVEIS OBRIGATÓRIAS FALTANDO:');
    result.missing.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
  }

  if (result.warnings.length > 0) {
    console.warn('\n⚠️  AVISOS:');
    result.warnings.forEach((warning) => {
      console.warn(`   - ${warning}`);
    });
  }

  console.log('==========================================\n');
}

/**
 * Gera um secret seguro (apenas para desenvolvimento)
 */
export function generateSecureSecret(length: number = 32): string {
  if (typeof window !== 'undefined') {
    throw new Error('generateSecureSecret só pode ser usado no servidor');
  }

  const crypto = require('crypto');
  return crypto.randomBytes(length).toString('base64');
}
