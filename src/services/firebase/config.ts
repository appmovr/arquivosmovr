/**
 * Configuração do Firebase lida de variáveis de ambiente (VITE_FIREBASE_*).
 * Nenhuma credencial real fica no código. Veja `.env.example`.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const REQUIRED_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'] as const

/** True somente quando as variáveis essenciais foram preenchidas. */
export const isFirebaseConfigured: boolean = REQUIRED_KEYS.every(
  (key) => typeof firebaseConfig[key] === 'string' && firebaseConfig[key]!.trim() !== '',
)
