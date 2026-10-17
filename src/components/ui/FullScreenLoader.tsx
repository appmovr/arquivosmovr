import { LoaderCircle } from 'lucide-react'

/** Tela de carregamento enquanto a sessão é verificada. */
export function FullScreenLoader() {
  return (
    <div role="status" className="grid min-h-screen place-items-center">
      <LoaderCircle className="size-8 animate-spin text-lime" aria-hidden="true" />
      <span className="sr-only">Carregando</span>
    </div>
  )
}
