import type { ActivityLevel, CalorieEstimate, Goal, QuizAnswers } from '@/types/profile'

/** Multiplicadores de atividade (valores clássicos de Harris-Benedict). */
const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  very_high: 1.9,
}

/** Ajuste diário em kcal conforme o objetivo. */
const GOAL_ADJUSTMENT_KCAL: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
}

/** Equação de Mifflin-St Jeor para a taxa metabólica basal. */
export function calculateBmr(
  answers: Pick<QuizAnswers, 'sex' | 'weightKg' | 'heightCm' | 'age'>,
): number {
  const { sex, weightKg, heightCm, age } = answers
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return Math.round(base + (sex === 'male' ? 5 : -161))
}

/**
 * Estima a meta diária de calorias.
 * Para emagrecer, a meta nunca fica abaixo da taxa metabólica basal.
 * É uma estimativa, não uma prescrição médica ou nutricional.
 */
export function estimateCalories(answers: QuizAnswers): CalorieEstimate {
  const bmr = calculateBmr(answers)
  const tdee = Math.round(bmr * ACTIVITY_FACTORS[answers.activityLevel])
  let target = tdee + GOAL_ADJUSTMENT_KCAL[answers.goal]
  if (answers.goal === 'lose') target = Math.max(target, bmr)
  return { bmr, tdee, dailyCalorieTarget: Math.round(target) }
}
