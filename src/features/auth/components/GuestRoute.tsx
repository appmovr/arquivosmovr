import { Navigate, Outlet } from 'react-router-dom'
import { FullScreenLoader } from '@/components/ui/FullScreenLoader'
import { useAuth } from '../useAuth'

/** Telas de login e cadastro: quem já está logado vai direto para o início. */
export function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) return <FullScreenLoader />
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}
