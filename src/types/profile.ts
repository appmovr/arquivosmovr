export type Sex = 'male' | 'female'
export type Goal = 'lose' | 'maintain' | 'gain'
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high' | 'very_high'
export type TrainingFrequency = 'none' | '1-2' | '3-4' | '5-6' | 'daily'

/** Respostas do quiz inicial. */
export interface QuizAnswers {
  age: number
  sex: Sex
  weightKg: number
  heightCm: number
  goal: Goal
  targetWeightKg: number
  trainingFrequency: TrainingFrequency
  activityLevel: ActivityLevel
}

/** Estimativa energética calculada a partir das respostas. */
export interface CalorieEstimate {
  /** Taxa metabólica basal (kcal/dia). */
  bmr: number
  /** Gasto energético diário estimado (kcal/dia). */
  tdee: number
  /** Meta diária de calorias (kcal/dia). */
  dailyCalorieTarget: number
}

/** Documento salvo em `users/{uid}` no Firestore. */
export interface UserProfile extends QuizAnswers, CalorieEstimate {}
