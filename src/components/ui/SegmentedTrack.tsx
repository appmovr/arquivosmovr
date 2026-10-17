import { cn } from '@/utils/cn'

interface SegmentedTrackProps {
  /** Quantidade de segmentos. */
  segments?: number
  /** Segmentos preenchidos (0 enquanto não houver dados reais). */
  filled?: number
  className?: string
}

/**
 * Barra de progresso em segmentos, como anilhas empilhadas numa barra.
 * Na Etapa 1 recebe `filled = 0`: nenhum dado é simulado.
 */
export function SegmentedTrack({ segments = 32, filled = 0, className }: SegmentedTrackProps) {
  return (
    <div className={cn('flex h-10 items-stretch gap-[3px]', className)} aria-hidden="true">
      {Array.from({ length: segments }, (_, i) => (
        <span
          key={i}
          className={cn('flex-1 rounded-[3px]', i < filled ? 'bg-lime' : 'bg-surface-raised')}
        />
      ))}
    </div>
  )
}
