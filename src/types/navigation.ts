import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  /** Route path */
  to: string
  /** Visible label (pt-BR) */
  label: string
  icon: LucideIcon
}
