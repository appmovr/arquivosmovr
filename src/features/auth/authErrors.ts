import { FIREBASE_NOT_CONFIGURED } from '@/services/firebase'

const MESSAGES: Record<string, string> = {
  [FIREBASE_NOT_CONFIGURED]:
    'O Firebase ainda não está configurado. Preencha o arquivo .env.local e reinicie o servidor.',
  'auth/email-already-in-use': 'Já existe uma conta com este e-mail.',
  'auth/invalid-email': 'Digite um e-mail válido.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  'auth/network-request-failed': 'Sem conexão. Verifique sua internet e tente de novo.',
  'auth/operation-not-allowed':
    'O login por e-mail e senha não está ativado no Firebase. Ative em Authentication > Método de login.',
  'auth/user-disabled': 'Esta conta foi desativada.',
}

/** Converte um erro do Firebase em uma mensagem clara em português. */
export function getAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : ''
  return MESSAGES[code] ?? 'Não foi possível concluir. Tente novamente.'
}
