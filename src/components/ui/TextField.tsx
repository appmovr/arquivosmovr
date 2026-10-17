import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextField({ label, error, className, ...props }: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'w-full rounded-xl border bg-surface-raised px-4 py-3.5 text-base text-white placeholder:text-mute-faint',
          error ? 'border-red-400' : 'border-surface-line',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
