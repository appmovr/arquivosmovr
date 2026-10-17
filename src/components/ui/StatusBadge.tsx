import { Hammer } from 'lucide-react'

interface StatusBadgeProps {
  label?: string
}

/** Indica que um módulo ainda está em construção. */
export function StatusBadge({ label = 'Em construção' }: StatusBadgeProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-surface-line px-2.5 py-1 text-xs font-medium text-mute">
      <Hammer className="size-3" aria-hidden="true" />
      {label}
    </span>
  )
}
