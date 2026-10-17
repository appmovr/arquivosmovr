import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { firebaseConfig, isFirebaseConfigured } from './config'

/**
 * Retorna o app Firebase ou `null` se o ambiente ainda não foi configurado.
 * A inicialização é preguiçosa: nada é conectado enquanto esta função não for chamada,
 * e ela não é chamada em nenhum lugar na Etapa 1.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
}
