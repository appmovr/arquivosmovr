import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { requireDb } from '@/services/firebase'
import type { UserProfile } from '@/types/profile'
import { parseUserProfile } from './profileValidation'

const userDoc = (uid: string) => doc(requireDb(), 'users', uid)

/** Lê o perfil do usuário. Retorna `null` se ele ainda não fez o quiz. */
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(userDoc(uid))
  return snapshot.exists() ? parseUserProfile(snapshot.data()) : null
}

/** Salva (ou atualiza) o perfil em `users/{uid}`, sem apagar outros campos. */
export async function saveUserProfile(uid: string, profile: UserProfile): Promise<void> {
  await setDoc(userDoc(uid), { ...profile, updatedAt: serverTimestamp() }, { merge: true })
}
