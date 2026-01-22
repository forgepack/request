# Tipos TypeScript

## Interfaces Principais

### Auth

Interface que representa os dados de autenticação do usuário.

```typescript
interface Auth {
  readonly accessToken: string  // Token JWT de acesso
  refreshToken: string         // Token para renovação
  tokenType: string           // Tipo do token (Bearer)
  role: string[]             // Permissões do usuário
}
```

**Exemplo:**
```typescript
const auth: Auth = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refreshToken: "refresh_token_here",
  tokenType: "Bearer",
  role: ["USER", "ADMIN"]
}
```

### LoginCredentials

Interface para credenciais de login.

```typescript
interface LoginCredentials {
  username: string  // Nome de usuário ou email
  password: string  // Senha do usuário
}
```

### LoginResponse

Interface para resposta de login tipada.

```typescript
interface LoginResponse {
  success: boolean                              // Indica sucesso
  data?: Auth                                  // Dados de auth (se sucesso)
  errors?: Array<{ field: string; message: string }> // Erros (se falha)
}
```

**Exemplo:**
```typescript
const result: LoginResponse = await loginUser({ 
  username: "user", 
  password: "pass" 
})

if (result.success && result.data) {
  console.log('Token:', result.data.accessToken)
} else if (result.errors) {
  console.error('Erros:', result.errors)
}
```

### ChangePasswordData

Interface para alteração de senha.

```typescript
interface ChangePasswordData {
  currentPassword: string      // Senha atual
  newPassword: string         // Nova senha
  confirmPassword?: string    // Confirmação (opcional)
}
```

---

### ErrorMessage

Interface para mensagens de erro de validação.

```typescript
interface ErrorMessage {
  field: string    // Campo que contém o erro
  message: string  // Mensagem descritiva
}
```

**Exemplo:**
```typescript
const errors: ErrorMessage[] = [
  { field: "username", message: "Usuário é obrigatório" },
  { field: "password", message: "Senha deve ter no mínimo 6 caracteres" }
]
```

---

### Search

Interface para parâmetros de busca e paginação.

```typescript
interface Search {
  value?: string    // Termo de busca
  page?: number     // Número da página (base 0)
  size?: number     // Quantidade de itens por página
  sort?: Sort       // Configuração de ordenação
}

interface Sort {
  key: string                // Campo para ordenação
  order: 'ASC' | 'DESC'     // Direção da ordenação
}
```

**Exemplo:**
```typescript
const searchParams: Search = {
  value: "João",
  page: 0,
  size: 20,
  sort: {
    key: "name",
    order: "ASC"
  }
}
```

---

### Page

Interface genérica para respostas paginadas.

```typescript
interface Page<T = unknown> {
  content: T[]     // Array com os dados da página
  page: PageInfo   // Informações de paginação
}

interface PageInfo {
  size: number           // Tamanho da página
  number: number         // Número da página atual
  totalElements: number  // Total de elementos
  totalPages: number     // Total de páginas
}
```

**Exemplo:**
```typescript
const usersPage: Page<User> = {
  content: [
    { id: 1, name: "João", email: "joao@email.com" },
    { id: 2, name: "Maria", email: "maria@email.com" }
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 50,
    totalPages: 5
  }
}
```

---

### Token

Interfaces para estrutura de tokens JWT.

```typescript
interface Token {
  header: Header      // Cabeçalho do token
  payload: Payload    // Dados do token
  signature: string   // Assinatura
}

interface Header {
  alg: string  // Algoritmo (ex: "HS256")
  typ: string  // Tipo (ex: "JWT")
}

interface Payload {
  jti: string   // ID único do token
  iss: string   // Emissor
  iat: number   // Data de emissão (timestamp Unix)
  nbf: number   // Não válido antes de (timestamp Unix)
  exp: number   // Data de expiração (timestamp Unix)
  sub: string   // Subject (ID do usuário)
  aud: string   // Audiência
}
```

**Exemplo:**
```typescript
const payload: Payload = {
  jti: "unique-token-id",
  iss: "https://auth.exemplo.com",
  iat: 1674567890,  // Timestamp Unix
  nbf: 1674567890,
  exp: 1674654290,  // 24h depois
  sub: "user123",
  aud: "https://api.exemplo.com"
}

// Verificar se token está expirado
const isExpired = payload.exp * 1000 < Date.now()
```

---

### AuthContextType

Interface do contexto de autenticação que estende `Auth`.

```typescript
interface AuthContextType extends Auth {
  loginUser: (credentials: any) => Promise<any>  // Função de login
  logoutUser: () => void                        // Função de logout
  isAuthenticated: boolean                      // Status de autenticação
}
```

---

### ApiClientOptions

Opções para configuração do cliente da API.

```typescript
type ApiClientOptions = {
  baseURL: string                    // URL base da API
  onUnauthorized?: () => void        // Callback para erro 401
  onForbidden?: () => void          // Callback para erro 403
}
```

---

## Utilitários de Tipo

### Exemplos de Uso em Componentes

```typescript
import type { 
  Auth, 
  ErrorMessage, 
  Search, 
  Page,
  AuthContextType 
} from '@hidrografico/request'

// Propriedades de componente
interface UserListProps {
  searchParams: Search
  onError: (errors: ErrorMessage[]) => void
}

// Estado de componente
interface LoginState {
  user: Auth | null
  errors: ErrorMessage[]
  loading: boolean
}

// Hook personalizado
const useUserData = (): {
  users: Page<User>
  loading: boolean
  search: (params: Search) => void
} => {
  // implementação
}

// Contexto tipado
const useTypedAuth = (): AuthContextType => {
  return useAuth()
}
```

### Generic Types

```typescript
// Função genérica para CRUD
const createEntity = async <T>(
  api: AxiosInstance, 
  endpoint: string, 
  data: T
): Promise<T | ErrorMessage[]> => {
  // implementação
}

// Hook genérico para listagem
const useEntityList = <T>(
  endpoint: string, 
  search?: Search
): {
  data: Page<T>
  loading: boolean
  error: ErrorMessage[]
} => {
  // implementação
}
```

### Type Guards

```typescript
// Verificar se é erro
const isErrorArray = (result: any): result is ErrorMessage[] => {
  return Array.isArray(result) && 
         result.length > 0 && 
         'field' in result[0] && 
         'message' in result[0]
}

// Verificar se tem dados
const hasContent = <T>(page: Page<T>): boolean => {
  return page.content.length > 0
}

// Uso
const result = await createUser(userData)

if (isErrorArray(result)) {
  // Tratar erros
  console.error(result)
} else {
  // Usuário criado com sucesso
  console.log(result)
}
```