import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Auth,
  type User,
} from 'firebase/auth'
import { getFirebaseApp } from './app'

/** Código usado quando o .env.local ainda não foi preenchido. */
export const FIREBASE_NOT_CONFIGURED = 'movr/firebase-not-configured'

/** Retorna o Auth do Firebase ou `null` se o ambiente não estiver configurado. */
export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp()
  return app ? getAuth(app) : null
}

function requireAuth(): Auth {
  const auth = getFirebaseAuth()
  if (!auth) throw { code: FIREBASE_NOT_CONFIGURED }
  return auth
}

export async function registerWithEmail(name: string, email: string, password: string): Promise<User> {
  const auth = requireAuth()
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
  return credential.user
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(requireAuth(), email, password)
  return credential.user
}

export async function logout(): Promise<void> {
  await signOut(requireAuth())
}

/**
 * Observa o estado de autenticação. Retorna a função para cancelar a inscrição.
 * Sem Firebase configurado, informa "sem usuário" imediatamente.
 */
export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth()
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}
