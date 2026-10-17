import { FIREBASE_NOT_CONFIGURED } from '@/services/firebase'

const MESSAGES: Record<string, string> = {
  [FIREBASE_NOT_CONFIGURED]: 'O Firebase ainda não está configurado. Preencha o .env.local e reinicie o servidor.',
  'permission-denied':
    'Sem permissão para acessar seus dados. Publique as regras do arquivo firestore.rules no console do Firebase.',
  unavailable: 'Sem conexão com o servidor. Verifique sua internet e tente de novo.',
  'failed-precondition':
    'O Firestore ainda não foi criado neste projeto. Crie o banco em Firestore Database no console do Firebase.',
  'not-found':
    'O Firestore ainda não foi criado neste projeto. Crie o banco em Firestore Database no console do Firebase.',
}

export function getProfileErrorMessage(error: unknown): string {
  const raw =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : ''
  const code = raw.replace('firestore/', '')
  return MESSAGES[code] ?? 'Não foi possível acessar seus dados. Tente novamente.'
}
