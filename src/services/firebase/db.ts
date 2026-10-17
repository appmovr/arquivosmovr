import { getFirestore, type Firestore } from 'firebase/firestore'
import { getFirebaseApp } from './app'
import { FIREBASE_NOT_CONFIGURED } from './auth'

/** Retorna o Firestore ou `null` se o ambiente não estiver configurado. */
export function getFirebaseDb(): Firestore | null {
  const app = getFirebaseApp()
  return app ? getFirestore(app) : null
}

export function requireDb(): Firestore {
  const db = getFirebaseDb()
  if (!db) throw { code: FIREBASE_NOT_CONFIGURED }
  return db
}
