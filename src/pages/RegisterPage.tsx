import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { isFirebaseConfigured, registerWithEmail } from '@/services/firebase'
import { getAuthErrorMessage } from '@/features/auth/authErrors'
import { ConfigMissingNotice } from '@/features/auth/components/ConfigMissingNotice'

const MIN_PASSWORD_LENGTH = 6

export function RegisterPage() {
  usePageTitle('Criar conta')
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const passwordError =
    password.length > 0 && password.length < MIN_PASSWORD_LENGTH
      ? `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
      : ''
  const confirmError = confirm.length > 0 && confirm !== password ? 'As senhas não são iguais.' : ''
  const canSubmit =
    isFirebaseConfigured &&
    name.trim() !== '' &&
    email !== '' &&
    password.length >= MIN_PASSWORD_LENGTH &&
    confirm === password

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSubmit) return
    setError('')
    setSubmitting(true)
    try {
      await registerWithEmail(name.trim(), email.trim(), password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err))
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-wide text-3xl font-black">Criar conta</h1>
        <p className="mt-2 text-mute">Leva menos de um minuto.</p>
      </div>

      {!isFirebaseConfigured && <ConfigMissingNotice />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="Nome"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          required
        />
        <TextField
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirmError}
          required
        />
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <Button type="submit" loading={submitting} disabled={!canSubmit}>
          Criar conta
        </Button>
      </form>

      <p className="text-sm text-mute">
        Já tem conta?{' '}
        <Link to="/entrar" className="font-semibold text-lime underline-offset-4 hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}
