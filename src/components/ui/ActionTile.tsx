import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ActionTileProps {
  icon: LucideIcon
  title: string
  description: string
  /** Destaque em verde-limão para a ação principal. */
  primary?: boolean
}

/** Ação rápida. Nesta etapa é apenas visual: fica desabilitada até o módulo existir. */
export function ActionTile({ icon: Icon, title, description, primary = false }: ActionTileProps) {
  return (
    <button
      type="button"
      disabled
      className={cn(
        'flex w-full cursor-not-allowed items-center gap-4 rounded-2xl p-5 text-left',
        primary ? 'bg-lime text-ink' : 'border border-surface-line bg-surface text-white',
      )}
    >
      <span
        className={cn(
          'grid size-12 shrink-0 place-items-center rounded-xl',
          primary ? 'bg-ink text-lime' : 'bg-surface-raised text-lime',
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="font-wide block text-base font-bold">{title}</span>
        <span className={cn('block text-sm', primary ? 'text-ink/70' : 'text-mute')}>
          {description}
        </span>
      </span>
    </button>
  )
}
