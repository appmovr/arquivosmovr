import { TriangleAlert } from 'lucide-react'

/** Aviso exibido quando as variáveis VITE_FIREBASE_* não foram preenchidas. */
export function ConfigMissingNotice() {
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-surface-line bg-surface-raised p-4 text-sm">
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden="true" />
      <p className="text-mute">
        Firebase não configurado. Copie <code className="text-white">.env.example</code> para{' '}
        <code className="text-white">.env.local</code>, preencha os valores e reinicie o{' '}
        <code className="text-white">npm run dev</code>.
      </p>
    </div>
  )
}
