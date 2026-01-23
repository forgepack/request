# _Request_

![github](https://img.shields.io/github/stars/forgepack/request "Github")
![github](https://img.shields.io/github/stars/gadelhati/maps-front "Github")
	
![Node.js](https://img.shields.io/badge/Node.js-22.20.0-339933?logo=node.js)
![npm](https://img.shields.io/badge/npm-11.6.2-CB3837?logo=npm)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)

## Start a new project

```bash
mkdir package-name
cd package-name
npm init
```

> .json file created:
```json
{
  "name": "package-name",
  "version": "1.0.0",
  "description": "Package Description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["palavra-chave1", "palavra-chave2"],
  "author": "Name",
  "license": "MIT"
}
```

## Publicar no _npm_

```bash
# Login no npm
npm login
# Constrói
npm run build
# Simula publicação
npm pack
# Publicar o pacote, na primeira vez
npm publish --access public
```

## Atualizar versões
> Quando fizer mudanças:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

npm publish
```

## Uso pelo consumidor (Vite, React, Next, Node, etc.)

### 📦 **Instalação**

```bash
npm install @hidrografico/request
```

### ⚙️ **Configuração Básica**

```typescript
// 1. Configure o cliente da API
import { createApiClient } from "@hidrografico/request"

export const api = createApiClient({
  baseURL: "https://api.meuservico.com",
  onUnauthorized: () => window.location.href = "/login",
  onForbidden: () => window.location.href = "/notAllowed"
})

// 2. Configure o provedor de autenticação
import { AuthProvider } from '@hidrografico/request'

function App() {
  return (
    <AuthProvider api={api}>
      <YourApp />
    </AuthProvider>
  )
}
```

### 🚀 **Principais Recursos**

- **🔐 Autenticação JWT** - Login automático com interceptors
- **🛡️ Proteção de Rotas** - Componente `RequireAuth` baseado em roles
- **📊 Hook de Requisições** - `useRequest` com paginação e busca
- **⚡ Operações CRUD** - Funções prontas para create, read, update, delete
- **🔑 Gerenciamento de Tokens** - Validação e decodificação automática
- **📱 Responsivo** - Estados de loading, erro e paginação

### 📚 **Complete Documentation**

For detailed examples, usage guides, and API references, please visit:
**[Complete Documentation](./docs/README.md)**

### 🎯 **Quick Example**

```tsx
// Authentication hook
const { loginUser, isAuthenticated, role } = useAuth()

// Hook for paginated requests
const { response, loading, error } = useRequest(api, 'users', {
  page: 0, size: 10, value: 'busca'
})

// Route protection
<RequireAuth allowedRoles={['ADMIN']}>
  <AdminPanel />
</RequireAuth>
```

## Developers
> [Gadelha TI](https://github.com/gadelhati)

## **License**

> This project is licensed under the **MIT License** - see the [MIT LICENSE]( https://choosealicense.com/licenses/mit/) file for details.

```text
MIT License

Copyright (c) 2024 Gadelha TI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

<div align="center">

Request

**⭐ Did you like the project? Leave a star! ⭐**