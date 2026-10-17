import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/config/navigation'
import { cn } from '@/utils/cn'
import { Logo } from '@/components/ui/Logo'

/** Navegação lateral para telas largas (lg+). */
export function SidebarNav() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-surface-line px-5 py-8 lg:flex">
      <Logo className="px-3" />
      <nav aria-label="Principal" className="mt-10 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-surface-raised text-white'
                  : 'text-mute hover:bg-surface hover:text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('size-5', isActive && 'text-lime')} aria-hidden="true" />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
