import type { ActivityLevel, Goal, QuizAnswers, Sex, TrainingFrequency, UserProfile } from '@/types/profile'
import { ACTIVITY_OPTIONS, GOAL_OPTIONS, SEX_OPTIONS, TRAINING_OPTIONS, isOneOf } from './profileOptions'

export const LIMITS = {
  age: { min: 18, max: 100 },
  weightKg: { min: 30, max: 300 },
  heightCm: { min: 120, max: 230 },
} as const

/** Estado do formulário: números ficam como texto até serem validados. */
export interface QuizForm {
  age: string
  sex: Sex | ''
  weightKg: string
  heightCm: string
  goal: Goal | ''
  targetWeightKg: string
  trainingFrequency: TrainingFrequency | ''
  activityLevel: ActivityLevel | ''
}

export type QuizErrors = Partial<Record<keyof QuizForm, string>>

export const EMPTY_FORM: QuizForm = {
  age: '',
  sex: '',
  weightKg: '',
  heightCm: '',
  goal: '',
  targetWeightKg: '',
  trainingFrequency: '',
  activityLevel: '',
}

/** Aceita vírgula ou ponto como separador decimal. */
export function parseNumber(value: string): number | null {
  const n = Number(value.trim().replace(',', '.'))
  return value.trim() !== '' && Number.isFinite(n) ? n : null
}

function checkRange(value: string, min: number, max: number, label: string): string | undefined {
  const n = parseNumber(value)
  if (n === null) return `Informe ${label}.`
  if (n < min || n > max) return `Use um valor entre ${min} e ${max}.`
  return undefined
}

/** Valida um passo do quiz (0 a 3) e devolve só os erros encontrados. */
export function validateStep(step: number, form: QuizForm): QuizErrors {
  const errors: QuizErrors = {}

  if (step === 0) {
    const age = checkRange(form.age, LIMITS.age.min, LIMITS.age.max, 'sua idade')
    if (age) errors.age = age === `Use um valor entre ${LIMITS.age.min} e ${LIMITS.age.max}.`
      ? `O MOVR é para maiores de ${LIMITS.age.min} anos (até ${LIMITS.age.max}).`
      : age
    if (!form.sex) errors.sex = 'Escolha uma opção.'
  }

  if (step === 1) {
    const weight = checkRange(form.weightKg, LIMITS.weightKg.min, LIMITS.weightKg.max, 'seu peso')
    if (weight) errors.weightKg = weight
    const height = checkRange(form.heightCm, LIMITS.heightCm.min, LIMITS.heightCm.max, 'sua altura')
    if (height) errors.heightCm = height
  }

  if (step === 2) {
    if (!form.goal) {
      errors.goal = 'Escolha um objetivo.'
    } else if (form.goal !== 'maintain') {
      const range = checkRange(form.targetWeightKg, LIMITS.weightKg.min, LIMITS.weightKg.max, 'o peso desejado')
      if (range) {
        errors.targetWeightKg = range
      } else {
        const current = parseNumber(form.weightKg)
        const target = parseNumber(form.targetWeightKg)
        if (current !== null && target !== null) {
          if (form.goal === 'lose' && target >= current) {
            errors.targetWeightKg = 'Para emagrecer, o peso desejado deve ser menor que o atual.'
          }
          if (form.goal === 'gain' && target <= current) {
            errors.targetWeightKg = 'Para ganhar massa, o peso desejado deve ser maior que o atual.'
          }
        }
      }
    }
  }

  if (step === 3) {
    if (!form.trainingFrequency) errors.trainingFrequency = 'Escolha uma opção.'
    if (!form.activityLevel) errors.activityLevel = 'Escolha uma opção.'
  }

  return errors
}

/** Converte o formulário em respostas tipadas. Retorna `null` se algo estiver inválido. */
export function formToAnswers(form: QuizForm): QuizAnswers | null {
  for (let step = 0; step < 4; step++) {
    if (Object.keys(validateStep(step, form)).length > 0) return null
  }
  const weightKg = parseNumber(form.weightKg)!
  return {
    age: Math.round(parseNumber(form.age)!),
    sex: form.sex as Sex,
    weightKg,
    heightCm: parseNumber(form.heightCm)!,
    goal: form.goal as Goal,
    targetWeightKg: form.goal === 'maintain' ? weightKg : parseNumber(form.targetWeightKg)!,
    trainingFrequency: form.trainingFrequency as TrainingFrequency,
    activityLevel: form.activityLevel as ActivityLevel,
  }
}

/** Pré-preenche o quiz com um perfil existente (ao refazer). */
export function profileToForm(profile: UserProfile): QuizForm {
  return {
    age: String(profile.age),
    sex: profile.sex,
    weightKg: String(profile.weightKg),
    heightCm: String(profile.heightCm),
    goal: profile.goal,
    targetWeightKg: profile.goal === 'maintain' ? '' : String(profile.targetWeightKg),
    trainingFrequency: profile.trainingFrequency,
    activityLevel: profile.activityLevel,
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/** Valida dados vindos do Firestore. Retorna `null` se o documento estiver incompleto ou inválido. */
export function parseUserProfile(data: unknown): UserProfile | null {
  if (typeof data !== 'object' || data === null) return null
  const d = data as Record<string, unknown>
  if (
    isNumber(d.age) && isNumber(d.weightKg) && isNumber(d.heightCm) && isNumber(d.targetWeightKg) &&
    isNumber(d.bmr) && isNumber(d.tdee) && isNumber(d.dailyCalorieTarget) &&
    isOneOf(SEX_OPTIONS, d.sex) && isOneOf(GOAL_OPTIONS, d.goal) &&
    isOneOf(ACTIVITY_OPTIONS, d.activityLevel) && isOneOf(TRAINING_OPTIONS, d.trainingFrequency)
  ) {
    return {
      age: d.age, sex: d.sex, weightKg: d.weightKg, heightCm: d.heightCm,
      goal: d.goal, targetWeightKg: d.targetWeightKg,
      trainingFrequency: d.trainingFrequency, activityLevel: d.activityLevel,
      bmr: d.bmr, tdee: d.tdee, dailyCalorieTarget: d.dailyCalorieTarget,
    }
  }
  return null
}
