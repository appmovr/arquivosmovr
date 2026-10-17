import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Button } from '@/components/ui/Button'
import { SegmentedTrack } from '@/components/ui/SegmentedTrack'
import { formToAnswers, profileToForm, EMPTY_FORM } from '@/features/profile/profileValidation'
import { getProfileErrorMessage } from '@/features/profile/profileErrors'
import { useProfile } from '@/features/profile/useProfile'
import { useQuizForm } from '@/features/quiz/useQuizForm'
import { StepAbout, StepBody, StepGoal, StepRoutine } from '@/features/quiz/components/QuizSteps'
import { QuizResult } from '@/features/quiz/components/QuizResult'
import type { UserProfile } from '@/types/profile'

const STEPS = [
  { title: 'Sobre você', Component: StepAbout },
  { title: 'Suas medidas', Component: StepBody },
  { title: 'Seu objetivo', Component: StepGoal },
  { title: 'Sua rotina', Component: StepRoutine },
]

export function QuizPage() {
  usePageTitle('Quiz inicial')
  const navigate = useNavigate()
  const { profile, saveProfile } = useProfile()
  const quiz = useQuizForm(profile ? profileToForm(profile) : EMPTY_FORM)

  const [step, setStep] = useState(0)
  const [result, setResult] = useState<UserProfile | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  if (result) return <QuizResult profile={result} onContinue={() => navigate('/', { replace: true })} />

  const isLast = step === STEPS.length - 1
  const { title, Component } = STEPS[step]

  async function handleNext() {
    if (!quiz.validate(step)) return
    if (!isLast) {
      setStep(step + 1)
      return
    }
    const answers = formToAnswers(quiz.form)
    if (!answers) return
    setSaveError('')
    setSaving(true)
    try {
      setResult(await saveProfile(answers))
    } catch (error) {
      setSaveError(getProfileErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SegmentedTrack segments={STEPS.length} filled={step + 1} className="h-2" />
        <p className="mt-3 text-sm text-mute">
          Passo {step + 1} de {STEPS.length}
        </p>
        <h1 className="font-wide mt-1 text-3xl font-black">{title}</h1>
      </div>

      <Component form={quiz.form} errors={quiz.errors} setField={quiz.setField} />

      {saveError && (
        <p role="alert" className="text-sm text-red-400">
          {saveError}
        </p>
      )}

      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)} disabled={saving}>
            Voltar
          </Button>
        )}
        <Button onClick={handleNext} loading={saving} className="flex-1">
          {isLast ? 'Calcular minha meta' : 'Continuar'}
        </Button>
      </div>
    </div>
  )
}
