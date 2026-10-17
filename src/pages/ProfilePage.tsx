import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { logout } from '@/services/firebase'
import { useAuth } from '@/features/auth/useAuth'
import { useProfile } from '@/features/profile/useProfile'
import { GOAL_OPTIONS, labelOf } from '@/features/profile/profileOptions'

export function ProfilePage() {
  usePageTitle('Perfil')
  const { user } = useAuth()
  const { profile } = useProfile()
  const [leaving, setLeaving] = useState(false)

  async function handleLogout() {
    setLeaving(true)
    try {
      await logout()
    } finally {
      setLeaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-wide text-3xl font-black sm:text-4xl">Perfil</h1>

      <Card className="flex flex-col gap-5">
        <div>
          <p className="text-sm text-mute">Nome</p>
          <p className="font-semibold">{user?.displayName || 'Sem nome'}</p>
        </div>
        <div>
          <p className="text-sm text-mute">E-mail</p>
          <p className="font-semibold">{user?.email}</p>
        </div>
        <Button variant="secondary" onClick={handleLogout} loading={leaving} className="self-start">
          <LogOut className="size-4" aria-hidden="true" />
          Sair da conta
        </Button>
      </Card>

      {profile && (
        <Card className="flex flex-col gap-5">
          <h2 className="font-wide text-xl font-extrabold">Sua meta</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-mute">Meta diária</dt>
              <dd className="font-semibold">{profile.dailyCalorieTarget.toLocaleString('pt-BR')} kcal</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Objetivo</dt>
              <dd className="font-semibold">{labelOf(GOAL_OPTIONS, profile.goal)}</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Peso atual</dt>
              <dd className="font-semibold">{profile.weightKg.toLocaleString('pt-BR')} kg</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Peso desejado</dt>
              <dd className="font-semibold">{profile.targetWeightKg.toLocaleString('pt-BR')} kg</dd>
            </div>
          </dl>
          <Link
            to="/quiz"
            className="self-start rounded-xl border border-surface-line bg-surface px-5 py-3.5 text-sm font-bold transition-colors hover:bg-surface-raised"
          >
            Refazer quiz
          </Link>
        </Card>
      )}
    </div>
  )
}
