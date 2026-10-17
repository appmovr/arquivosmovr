import type { ButtonHTMLAttributes } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary'
          ? 'bg-lime text-ink hover:bg-lime-dim'
          : 'border border-surface-line bg-surface text-white hover:bg-surface-raised',
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}
