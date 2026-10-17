# MOVR WEB

Plataforma fitness responsiva para alimentação, calorias e criação manual de treinos.

**Status: Etapa 1 concluída** — base técnica e visual. Ainda não existem login, quiz, banco de dados, registro de alimentos, treinos funcionais, PDF, histórico ou PWA completo.

## Requisitos

- Node.js 18.18+ (testado com Node 22)
- npm 9+

## Instalação e execução

```bash
npm install          # instala as dependências
npm run dev          # servidor local em http://localhost:5173
npm run build        # verifica os tipos (tsc) e gera a versão de produção em dist/
npm run preview      # serve a versão de produção localmente
npm run typecheck    # apenas verificação de tipos
```

## Variáveis de ambiente (Firebase)

O Firebase **não está conectado** nesta etapa. Quando você criar o projeto no console do Firebase:

1. Copie `.env.example` para `.env.local`.
2. Preencha as variáveis `VITE_FIREBASE_*` com os dados do app web (Configurações do projeto > Seus aplicativos).
3. Nunca commite `.env.local` (já está no `.gitignore`) e nunca coloque chaves privadas ou de administrador no frontend.

`src/services/firebase/config.ts` expõe `isFirebaseConfigured`, e `getFirebaseApp()` retorna `null` enquanto as variáveis estiverem vazias.

## Estrutura

```
src/
  app/                 App e rotas
  components/
    layout/            AppShell, SidebarNav (desktop), BottomNav (celular)
    ui/                Logo, Card, StatusBadge, SegmentedTrack, ActionTile
  config/              navegação
  features/dashboard/  componentes do dashboard (resumo, macros, ações rápidas)
  hooks/               hooks reutilizáveis
  pages/               páginas (Início, Alimentação, Treinos, Perfil, 404)
  services/firebase/   configuração do Firebase (sem credenciais)
  styles/              estilos globais e tokens da marca
  types/               tipos TypeScript
  utils/               utilitários
```

## Identidade visual

Preto `#090909`, branco `#FFFFFF`, verde-limão `#B7FF3C`, cinzas para superfícies e texto secundário. Fonte Archivo (variável, com eixo de largura), instalada localmente via `@fontsource-variable/archivo`.
