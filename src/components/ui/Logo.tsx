import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
}

/** Logo textual do MOVR. O "O" em verde-limão lembra o disco de uma anilha. */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn('font-wide select-none text-2xl font-black leading-none', className)}
      aria-label="MOVR"
    >
      M<span className="text-lime">O</span>VR
    </span>
  )
}
