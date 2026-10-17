import { Card } from '@/components/ui/Card'
import { SegmentedTrack } from '@/components/ui/SegmentedTrack'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useProfile } from '@/features/profile/useProfile'

/**
 * Resumo diário. A meta vem do perfil do usuário; o consumo continua em branco
 * até o registro de alimentos existir (próximas etapas).
 */
export function DailySummaryCard() {
  const { profile } = useProfile()

  const stats = [
    { label: 'Meta', value: profile ? profile.dailyCalorieTarget.toLocaleString('pt-BR') : '—' },
    { label: 'Consumidas', value: '—' },
    { label: 'Restantes', value: '—' },
  ]

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-wide text-xl font-extrabold sm:text-2xl">Resumo do dia</h2>
        <StatusBadge label="Registro em breve" />
      </div>

      <SegmentedTrack className="mt-6" />

      <dl className="mt-6 grid grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm text-mute">{label}</dt>
            <dd className="font-wide mt-1 text-2xl font-extrabold text-white sm:text-3xl">
              {value}
              <span className="ml-1 text-sm font-semibold text-mute-faint">kcal</span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-sm text-mute">
        O consumo e as calorias restantes aparecem aqui quando o registro de alimentos estiver pronto.
      </p>
    </Card>
  )
}
