import { ChoiceGroup } from '@/components/ui/ChoiceGroup'
import { TextField } from '@/components/ui/TextField'
import {
  ACTIVITY_OPTIONS,
  GOAL_OPTIONS,
  SEX_OPTIONS,
  TRAINING_OPTIONS,
} from '@/features/profile/profileOptions'
import type { QuizFormApi } from '../useQuizForm'

type StepProps = Pick<QuizFormApi, 'form' | 'errors' | 'setField'>

export function StepAbout({ form, errors, setField }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <TextField
        label="Idade"
        inputMode="numeric"
        value={form.age}
        onChange={(e) => setField('age', e.target.value)}
        error={errors.age}
      />
      <ChoiceGroup
        legend="Sexo (usado na equação de estimativa de energia)"
        options={SEX_OPTIONS}
        value={form.sex}
        onChange={(v) => setField('sex', v)}
        error={errors.sex}
      />
    </div>
  )
}

export function StepBody({ form, errors, setField }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <TextField
        label="Peso atual (kg)"
        inputMode="decimal"
        value={form.weightKg}
        onChange={(e) => setField('weightKg', e.target.value)}
        error={errors.weightKg}
      />
      <TextField
        label="Altura (cm)"
        inputMode="decimal"
        value={form.heightCm}
        onChange={(e) => setField('heightCm', e.target.value)}
        error={errors.heightCm}
      />
    </div>
  )
}

export function StepGoal({ form, errors, setField }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <ChoiceGroup
        legend="Qual é o seu objetivo?"
        options={GOAL_OPTIONS}
        value={form.goal}
        onChange={(v) => setField('goal', v)}
        error={errors.goal}
      />
      {form.goal !== '' && form.goal !== 'maintain' && (
        <TextField
          label="Peso desejado (kg)"
          inputMode="decimal"
          value={form.targetWeightKg}
          onChange={(e) => setField('targetWeightKg', e.target.value)}
          error={errors.targetWeightKg}
        />
      )}
    </div>
  )
}

export function StepRoutine({ form, errors, setField }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <ChoiceGroup
        legend="Com que frequência você treina?"
        options={TRAINING_OPTIONS}
        value={form.trainingFrequency}
        onChange={(v) => setField('trainingFrequency', v)}
        error={errors.trainingFrequency}
      />
      <ChoiceGroup
        legend="Seu nível de atividade física"
        options={ACTIVITY_OPTIONS}
        value={form.activityLevel}
        onChange={(v) => setField('activityLevel', v)}
        error={errors.activityLevel}
      />
    </div>
  )
}
