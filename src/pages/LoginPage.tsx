import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { isFirebaseConfigured, loginWithEmail } from '@/services/firebase'
import { getAuthErrorMessage } from '@/features/auth/authErrors'
import { ConfigMissingNotice } from '@/features/auth/components/ConfigMissingNotice'

export function LoginPage() {
  usePageTitle('Entrar')
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await loginWithEmail(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err))
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-wide text-3xl font-black">Entrar</h1>
        <p className="mt-2 text-mute">Acesse sua conta para continuar.</p>
      </div>

      {!isFirebaseConfigured && <ConfigMissingNotice />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Senha"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" loading={submitting} disabled={!isFirebaseConfigured || !email || !password}>
          Entrar
        </Button>
      </form>

      <p className="text-sm text-mute">
        Ainda não tem conta?{' '}
        <Link to="/cadastro" className="font-semibold text-lime underline-offset-4 hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  )
}
