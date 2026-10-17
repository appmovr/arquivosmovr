import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl border border-surface-line bg-surface p-5 sm:p-6', className)}
      {...props}
    />
  )
}
