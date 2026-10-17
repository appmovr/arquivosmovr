import type { ActivityLevel, Goal, Sex, TrainingFrequency } from '@/types/profile'

export interface Option<T extends string> {
  value: T
  label: string
  description?: string
}

export const SEX_OPTIONS: readonly Option<Sex>[] = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
]

export const GOAL_OPTIONS: readonly Option<Goal>[] = [
  { value: 'lose', label: 'Emagrecer', description: 'Déficit moderado de calorias' },
  { value: 'maintain', label: 'Manter o peso', description: 'Calorias de manutenção' },
  { value: 'gain', label: 'Ganhar massa', description: 'Superávit moderado de calorias' },
]

export const ACTIVITY_OPTIONS: readonly Option<ActivityLevel>[] = [
  { value: 'sedentary', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
  { value: 'light', label: 'Levemente ativo', description: 'Exercício leve 1 a 3 dias por semana' },
  { value: 'moderate', label: 'Moderadamente ativo', description: 'Exercício moderado 3 a 5 dias por semana' },
  { value: 'high', label: 'Muito ativo', description: 'Exercício intenso 6 a 7 dias por semana' },
  { value: 'very_high', label: 'Extremamente ativo', description: 'Treino muito intenso ou trabalho físico pesado' },
]

export const TRAINING_OPTIONS: readonly Option<TrainingFrequency>[] = [
  { value: 'none', label: 'Não treino' },
  { value: '1-2', label: '1 a 2 dias por semana' },
  { value: '3-4', label: '3 a 4 dias por semana' },
  { value: '5-6', label: '5 a 6 dias por semana' },
  { value: 'daily', label: 'Todos os dias' },
]

export function labelOf<T extends string>(options: readonly Option<T>[], value: T): string {
  return options.find((o) => o.value === value)?.label ?? value
}

export function isOneOf<T extends string>(options: readonly Option<T>[], value: unknown): value is T {
  return options.some((o) => o.value === value)
}
