import { useState } from 'react'
import { EMPTY_FORM, validateStep, type QuizErrors, type QuizForm } from '@/features/profile/profileValidation'

export function useQuizForm(initial: QuizForm = EMPTY_FORM) {
  const [form, setForm] = useState<QuizForm>(initial)
  const [errors, setErrors] = useState<QuizErrors>({})

  function setField<K extends keyof QuizForm>(key: K, value: QuizForm[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  /** Valida o passo atual, mostra os erros e retorna se está tudo certo. */
  function validate(step: number): boolean {
    const found = validateStep(step, form)
    setErrors(found)
    return Object.keys(found).length === 0
  }

  return { form, errors, setField, validate }
}

export type QuizFormApi = ReturnType<typeof useQuizForm>
