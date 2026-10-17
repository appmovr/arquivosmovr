import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/config/navigation'
import { cn } from '@/utils/cn'

/** Barra de navegação inferior para celulares e tablets (abaixo de lg). */
export function BottomNav() {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-surface-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors',
                  isActive ? 'text-white' : 'text-mute-faint',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('size-6', isActive && 'text-lime')} aria-hidden="true" />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
