import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { FullScreenLoader } from '@/components/ui/FullScreenLoader'
import { logout } from '@/services/firebase'
import { useProfile } from '../useProfile'

/** Só deixa passar quem já fez o quiz. Os demais vão para /quiz. */
export function RequireProfile() {
  const { profile, status, errorMessage, reload } = useProfile()
  const [leaving, setLeaving] = useState(false)

  if (status === 'error') {
    return (
      <main className="mx-auto grid min-h-screen max-w-md place-content-center gap-5 px-5">
        <h1 className="font-wide text-2xl font-black">Não foi possível carregar seus dados</h1>
        <p role="alert" className="text-mute">{errorMessage}</p>
        <div className="flex gap-3">
          <Button onClick={reload}>Tentar de novo</Button>
          <Button
            variant="secondary"
            loading={leaving}
            onClick={() => {
              setLeaving(true)
              void logout().finally(() => setLeaving(false))
            }}
          >
            Sair da conta
          </Button>
        </div>
      </main>
    )
  }

  if (status !== 'ready') return <FullScreenLoader />
  if (!profile) return <Navigate to="/quiz" replace />
  return <Outlet />
}
