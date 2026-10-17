import { Dumbbell, Plus } from 'lucide-react'
import { ActionTile } from '@/components/ui/ActionTile'

/** Atalhos principais. Ainda desabilitados: os módulos chegam em etapas futuras. */
export function QuickActions() {
  return (
    <section aria-labelledby="actions-title">
      <h2 id="actions-title" className="font-wide mb-3 text-lg font-extrabold">
        Ações rápidas
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <ActionTile
          primary
          icon={Plus}
          title="Registrar alimento"
          description="Em breve: busque e some ao seu dia"
        />
        <ActionTile
          icon={Dumbbell}
          title="Criar treino"
          description="Em breve: monte seus treinos"
        />
      </div>
    </section>
  )
}
