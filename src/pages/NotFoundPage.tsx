import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'

export function NotFoundPage() {
  usePageTitle('Página não encontrada')

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="font-wide text-3xl font-black sm:text-4xl">Página não encontrada</h1>
      <p className="text-mute">O endereço que você abriu não existe no MOVR.</p>
      <Link
        to="/"
        className="rounded-xl bg-lime px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-lime-dim"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
