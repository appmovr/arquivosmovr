import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

/** Layout das telas de login e cadastro (sem navegação do app). */
export function AuthLayout() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10 pt-[calc(2.5rem+env(safe-area-inset-top))]">
      <Logo className="mb-10 text-3xl" />
      <Outlet />
    </main>
  )
}
