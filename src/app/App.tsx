import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthContext'
import { ProfileProvider } from '@/features/profile/ProfileContext'
import { router } from './router'

export function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  )
}
