import { Outlet } from 'react-router-dom'
import { SidebarNav } from './SidebarNav'
import { BottomNav } from './BottomNav'
import { Logo } from '@/components/ui/Logo'

/**
 * Layout base: sidebar no desktop, barra inferior no celular.
 * Será o ponto onde as rotas protegidas entram quando a autenticação existir.
 */
export function AppShell() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center px-5 pb-2 pt-[calc(1.25rem+env(safe-area-inset-top))] lg:hidden">
          <Logo />
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-28 pt-4 sm:px-8 lg:pb-12 lg:pt-10">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
