import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FullScreenLoader } from '@/components/ui/FullScreenLoader'
import { useAuth } from '../useAuth'

/** Só deixa passar quem está logado. Os demais vão para /entrar. */
export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullScreenLoader />
  if (!user) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />
  return <Outlet />
}
