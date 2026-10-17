import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { subscribeToAuth } from '@/services/firebase'

export interface AuthContextValue {
  /** Usuário autenticado ou `null`. */
  user: User | null
  /** `true` até o Firebase informar o estado inicial da sessão. */
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      subscribeToAuth((nextUser) => {
        setUser(nextUser)
        setLoading(false)
      }),
    [],
  )

  const value = useMemo(() => ({ user, loading }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
