import type { LucideIcon } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: LucideIcon
}

/** Página base para módulos futuros. */
export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  usePageTitle(title)

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-wide text-3xl font-black sm:text-4xl">{title}</h1>
      <Card className="flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-surface-raised text-lime">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <StatusBadge />
        <p className="max-w-prose text-mute">{description}</p>
      </Card>
    </div>
  )
}
