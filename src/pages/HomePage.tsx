import { usePageTitle } from '@/hooks/usePageTitle'
import { DailySummaryCard } from '@/features/dashboard/components/DailySummaryCard'
import { MacroPlaceholders } from '@/features/dashboard/components/MacroPlaceholders'
import { QuickActions } from '@/features/dashboard/components/QuickActions'

/**
 * Início: estrutura visual do dashboard.
 * A autenticação ainda não existe, então esta tela é apenas a base do layout.
 */
export function HomePage() {
  usePageTitle()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-wide text-3xl font-black sm:text-4xl">Início</h1>
        <p className="mt-2 text-mute">Acompanhe sua alimentação e seus treinos do dia.</p>
      </div>
      <DailySummaryCard />
      <MacroPlaceholders />
      <QuickActions />
    </div>
  )
}
