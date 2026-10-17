import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { QuizAnswers, UserProfile } from '@/types/profile'
import { useAuth } from '@/features/auth/useAuth'
import { estimateCalories } from './calorieCalculator'
import { getProfileErrorMessage } from './profileErrors'
import { fetchUserProfile, saveUserProfile } from './profileService'

export type ProfileStatus = 'idle' | 'loading' | 'ready' | 'error'

export interface ProfileContextValue {
  profile: UserProfile | null
  status: ProfileStatus
  errorMessage: string
  /** Tenta carregar o perfil de novo. */
  reload: () => void
  /** Calcula a meta, salva no Firestore e atualiza o perfil em memória. */
  saveProfile: (answers: QuizAnswers) => Promise<UserProfile>
}

export const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const uid = user?.uid ?? null

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [status, setStatus] = useState<ProfileStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setProfile(null)
    setErrorMessage('')
    if (!uid) {
      setStatus('idle')
      return
    }

    let cancelled = false
    setStatus('loading')
    fetchUserProfile(uid)
      .then((loaded) => {
        if (cancelled) return
        setProfile(loaded)
        setStatus('ready')
      })
      .catch((error) => {
        if (cancelled) return
        setErrorMessage(getProfileErrorMessage(error))
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [uid, attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])

  const saveProfile = useCallback(
    async (answers: QuizAnswers): Promise<UserProfile> => {
      if (!uid) throw new Error('Usuário não autenticado.')
      const next: UserProfile = { ...answers, ...estimateCalories(answers) }
      await saveUserProfile(uid, next)
      setProfile(next)
      setStatus('ready')
      return next
    },
    [uid],
  )

  const value = useMemo(
    () => ({ profile, status, errorMessage, reload, saveProfile }),
    [profile, status, errorMessage, reload, saveProfile],
  )
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
