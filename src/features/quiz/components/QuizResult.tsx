import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { GOAL_OPTIONS, labelOf } from '@/features/profile/profileOptions'
import type { UserProfile } from '@/types/profile'

const fmt = (n: number) => n.toLocaleString('pt-BR')

export function QuizResult({ profile, onContinue }: { profile: UserProfile; onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-wide text-3xl font-black">Sua meta diária</h1>
        <p className="mt-2 text-mute">Objetivo: {labelOf(GOAL_OPTIONS, profile.goal)}.</p>
      </div>

      <Card>
        <p className="font-wide text-5xl font-black text-lime">
          {fmt(profile.dailyCalorieTarget)}
          <span className="ml-2 text-lg font-semibold text-mute-faint">kcal por dia</span>
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-mute">Metabolismo basal</dt>
            <dd className="mt-1 font-semibold">{fmt(profile.bmr)} kcal</dd>
          </div>
          <div>
            <dt className="text-mute">Gasto diário estimado</dt>
            <dd className="mt-1 font-semibold">{fmt(profile.tdee)} kcal</dd>
          </div>
        </dl>
      </Card>

      <p className="text-sm text-mute">
        É uma estimativa baseada na equação de Mifflin-St Jeor e não substitui a orientação de um
        médico ou nutricionista. Você pode refazer o quiz a qualquer momento no Perfil.
      </p>

      <Button onClick={onContinue}>Ir para o início</Button>
    </div>
  )
}
