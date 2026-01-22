# Instalação e Configuração

## 📦 Instalação

```bash
npm install @hidrografico/request
# ou
yarn add @hidrografico/request
# ou  
pnpm add @hidrografico/request
```

## ⚙️ Configuração Inicial

### 1. Cliente da API

Primeiro, configure o cliente Axios com interceptors automáticos:

```typescript
// src/services/api.ts
import { createApiClient } from "@hidrografico/request"

export const api = createApiClient({
  baseURL: "https://api.meuservico.com",
  onUnauthorized: () => {
    // Executado quando recebe 401 (token expirado)
    console.log('Token expirado, redirecionando...')
    window.location.href = "/login"
  },
  onForbidden: () => {
    // Executado quando recebe 403 (sem permissão)
    console.log('Acesso negado')
    window.location.href = "/access-denied"  
  }
})
```

### 2. Provedor de Autenticação

Configure o `AuthProvider` na raiz da sua aplicação:

```tsx
// src/App.tsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@hidrografico/request'
import { api } from './services/api'
import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider api={api}>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
```

### 3. Configuração para Next.js

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { AuthProvider, createApiClient } from '@hidrografico/request'

const api = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  onUnauthorized: () => {
    window.location.href = "/login"
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider api={api}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
```

### 4. Configuração para Vite

```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, createApiClient } from '@hidrografico/request'
import App from './App.tsx'

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  onUnauthorized: () => window.location.href = "/login"
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider api={api}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
```

## 🔧 Opções de Configuração

### ApiClientOptions

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `baseURL` | `string` | ✅ | URL base da API |
| `onUnauthorized` | `() => void` | ❌ | Callback para erro 401 |
| `onForbidden` | `() => void` | ❌ | Callback para erro 403 |

### Variáveis de Ambiente

Recomendamos usar variáveis de ambiente para diferentes ambientes:

```env
# .env.development
VITE_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.production  
VITE_API_URL=https://api.producao.com
NEXT_PUBLIC_API_URL=https://api.producao.com
```

## ✅ Verificação da Instalação

Teste se a configuração está funcionando:

```tsx
// src/components/TestComponent.tsx
import { useAuth } from '@hidrografico/request'

export const TestComponent = () => {
  const { isAuthenticated } = useAuth()
  
  return (
    <div>
      Status: {isAuthenticated ? 'Autenticado' : 'Não autenticado'}
    </div>
  )
}
```

## 🚨 Problemas Comuns

### Erro: "AuthContext must be used within AuthProvider"

**Solução:** Verifique se o `AuthProvider` está envolvendo todos os componentes que usam hooks de autenticação.

### Token não está sendo anexado nas requisições

**Solução:** Confirme que você está usando a instância `api` criada com `createApiClient()`.

### Redirecionamentos não funcionam no Next.js

**Solução:** Use `useRouter` do Next.js em vez de `window.location`:

```typescript
import { useRouter } from 'next/router'

const router = useRouter()

const api = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  onUnauthorized: () => router.push('/login')
})
```