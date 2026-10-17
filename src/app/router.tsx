import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { GuestRoute } from '@/features/auth/components/GuestRoute'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { RequireProfile } from '@/features/profile/components/RequireProfile'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { QuizPage } from '@/pages/QuizPage'
import { NutritionPage } from '@/pages/NutritionPage'
import { WorkoutsPage } from '@/pages/WorkoutsPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    // Rotas públicas: quem já está logado é redirecionado para o início
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'entrar', element: <LoginPage /> },
          { path: 'cadastro', element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    // Rotas protegidas: exigem login
    element: <ProtectedRoute />,
    children: [
      {
        // Quiz: exige login, mas não exige perfil (é onde o perfil é criado)
        element: <AuthLayout />,
        children: [{ path: 'quiz', element: <QuizPage /> }],
      },
      {
        // App principal: exige login e quiz concluído
        element: <RequireProfile />,
        children: [
          {
            path: '/',
            element: <AppShell />,
            children: [
              { index: true, element: <HomePage /> },
              { path: 'alimentacao', element: <NutritionPage /> },
              { path: 'treinos', element: <WorkoutsPage /> },
              { path: 'perfil', element: <ProfilePage /> },
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
      },
    ],
  },
])
