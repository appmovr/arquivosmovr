import { useEffect } from 'react'

/** Atualiza o título da aba do navegador. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · MOVR` : 'MOVR'
  }, [title])
}
