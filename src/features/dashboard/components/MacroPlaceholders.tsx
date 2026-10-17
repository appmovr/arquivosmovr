import { Beef, Droplet, Wheat } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SegmentedTrack } from '@/components/ui/SegmentedTrack'

const MACROS = [
  { label: 'Proteínas', icon: Beef },
  { label: 'Carboidratos', icon: Wheat },
  { label: 'Gorduras', icon: Droplet },
]

/** Espaços reservados para os macronutrientes. Sem valores simulados. */
export function MacroPlaceholders() {
  return (
    <section aria-labelledby="macros-title">
      <h2 id="macros-title" className="font-wide mb-3 text-lg font-extrabold">
        Macronutrientes
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {MACROS.map(({ label, icon: Icon }) => (
          <Card key={label} className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{label}</span>
              <Icon className="size-4 text-lime" aria-hidden="true" />
            </div>
            <p className="font-wide mt-3 text-2xl font-extrabold">
              —<span className="ml-1 text-sm font-semibold text-mute-faint">g</span>
            </p>
            <SegmentedTrack segments={12} className="mt-3 h-2" />
          </Card>
        ))}
      </div>
    </section>
  )
}
