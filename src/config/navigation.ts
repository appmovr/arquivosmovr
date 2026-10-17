import { Dumbbell, House, User, Utensils } from 'lucide-react'
import type { NavItem } from '@/types/navigation'

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Início', icon: House },
  { to: '/alimentacao', label: 'Alimentação', icon: Utensils },
  { to: '/treinos', label: 'Treinos', icon: Dumbbell },
  { to: '/perfil', label: 'Perfil', icon: User },
]
