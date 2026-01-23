# Hooks

## useAuth

Hook principal para gerenciamento de autenticação.

### Retorno

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `accessToken` | `string` | Token JWT atual |
| `refreshToken` | `string` | Token de renovação |
| `tokenType` | `string` | Tipo do token (Bearer) |
| `role` | `string[]` | Permissões do usuário |
| `loginUser` | `(credentials: any) => Promise<any>` | Função de login |
| `logoutUser` | `() => void` | Função de logout |
| `isAuthenticated` | `boolean` | Status de autenticação |

### Exemplo

```tsx
import { useAuth } from '@forgepack/request'

const { loginUser, logoutUser, isAuthenticated, role } = useAuth()
```

---

## useRequest

Hook para requisições HTTP paginadas com gerenciamento automático de estado.

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `api` | `AxiosInstance` | ✅ | Instância do Axios |
| `endpoint` | `string` | ✅ | Endpoint da API |
| `search` | `Search` | ❌ | Parâmetros de busca |

### Retorno

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `response` | `Page<T>` | Dados da resposta paginada |
| `error` | `ErrorMessage[]` | Array de erros |
| `loading` | `boolean` | Estado de carregamento |
| `request` | `() => Promise<void>` | Função para re-executar |

### Exemplo

```tsx
import { useRequest } from '@forgepack/request'
import { api } from '../services/api'

const { response, error, loading, request } = useRequest(api, 'users', {
  page: 0,
  size: 10,
  value: 'search term'
})
```

### Interface Search

```typescript
interface Search {
  value?: string     // Termo de busca
  page?: number      // Página (base 0)
  size?: number      // Itens por página
  sort?: {           // Ordenação
    key: string
    order: 'ASC' | 'DESC'
  }
}
```

### Interface Page

```typescript
interface Page<T = unknown> {
  content: T[]       // Dados da página
  page: {
    size: number           // Tamanho da página
    number: number         // Número da página atual
    totalElements: number  // Total de elementos
    totalPages: number     // Total de páginas
  }
}
```

---

## Hook Personalizado - useAuthStatus

Exemplo de hook personalizado usando o pacote:

```tsx
// src/hooks/useAuthStatus.ts
import { useAuth, isValidToken } from '@forgepack/request'

export const useAuthStatus = () => {
  const auth = useAuth()
  
  return {
    ...auth,
    isTokenValid: isValidToken(),
    hasRole: (role: string) => auth.role.includes(role),
    hasAnyRole: (roles: string[]) => roles.some(role => auth.role.includes(role)),
    isAdmin: auth.role.includes('ADMIN'),
    isUser: auth.role.includes('USER')
  }
}
```