<div align="center">
<h1> @forgepack/request </h1>
</div>

**Production-ready HTTP client with JWT authentication for React**

[![npm version](https://img.shields.io/npm/v/@forgepack/request?color=blue)](https://www.npmjs.com/package/@forgepack/request)
[![npm downloads](https://img.shields.io/npm/dm/@forgepack/request)](https://www.npmjs.com/package/@forgepack/request)
[![GitHub stars](https://img.shields.io/github/stars/forgepack/request?style=social)](https://github.com/forgepack/request)
[![license](https://img.shields.io/npm/l/@forgepack/request)](https://github.com/forgepack/request/blob/main/LICENSE)

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Axios](https://img.shields.io/badge/Axios-Latest-5A29E4?logo=axios)](https://axios-http.com/)

[Documentation](https://forgepack.dev/packages/request) • [NPM Package](https://www.npmjs.com/package/@forgepack/request) • [GitHub](https://github.com/forgepack/request) • [Report Bug](https://github.com/forgepack/request/issues)

## Summary

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Using CRUD Operations](#using-crud-operations)
- [Route Protection](#route-protection)
- [When to Use](#when-to-use)
- [Works well with](#works-well-with)
- [Key Features](#key-features)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Author and Developers](#author-and-developers)
- [License](#license)

## Description

`@forgepack/request` is a complete, opinionated HTTP client built on top of Axios for React applications. It provides automatic JWT authentication, request/response interceptors, React hooks for state management, and standardized CRUD operations—everything you need to handle API communication in modern React apps.

**Perfect for:** Teams building React applications with JWT-based backends who want a plug-and-play solution that handles authentication, authorization, and API requests with minimal boilerplate.

# Consumer use

## Installation
```bash
# npm
npm install @forgepack/request

# yarn
yarn add @forgepack/request

# pnpm
pnpm add @forgepack/request
```

### Peer Dependencies

Make sure you have these installed:
```json
{
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0",
  "axios": ">=1.0.0",
  "react-router-dom": ">=6.0.0" // Optional, only if using RequireAuth
}
```

## Quick Start

### Configure the API client
```typescript
import { createApiClient } from "@forgepack/request"

export const api = createApiClient({
  baseURL: "https://api.service.com",
  /** Called on 401 errors */
  onUnauthorized: () => window.location.href = "/login",
  /** Called on 403 errors */
  onForbidden: () => window.location.href = "/notAllowed"
})
```

### Configure the authentication provider
```typescript
import { AuthProvider } from '@forgepack/request'
import { api } from './api/client'

function App() {
  return (
    <AuthProvider api={api}>
      <YourApp />
    </AuthProvider>
  )
}
```

### Use in Components
```typescript
import { useAuth } from '@forgepack/request'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (credentials) => {
    const result = await loginUser(credentials)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      console.error('Login failed:', result.errors)
    }
  }

  return (
    <div>
      {/* Your login form here */}
    </div>
  )
}
```

## Using CRUD Operations
```typescript
import { create, retrieve, update, remove } from '@forgepack/request'
import { api } from './api/client'

// Create
const newUser = await create(api, 'users', {
  name: 'John Snow',
  email: 'john@example.com'
})

// Retrieve all
const allUsers = await retrieve(api, 'users')

// Retrieve paginated
const page = await retrieve(api, 'users', { page: 0, size: 10 })

// Update
const updated = await update(api, 'users', {
  id: 1,
  name: 'John Smith'
})

// Delete
await remove(api, 'users', '1')
```

## Route Protection
```typescript
import { RequireAuth } from '@forgepack/request'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes - any authenticated user */}
      <Route path="/dashboard" element={<RequireAuth allowedRoles={['USER', 'ADMIN']}><Dashboard /></RequireAuth>} />
      
      {/* Admin-only routes */}
      <Route path="/admin" element={<RequireAuth allowedRoles={['ADMIN']}><AdminPanel /></RequireAuth>} />
    </Routes>
  )
}
```

### Token Management
```typescript
import { getToken, getPayload, isValidToken } from '@forgepack/request'

/** Check if token is valid */
if (isValidToken()) {
  console.log('User is authenticated')
}

/** Get token data */
const auth = getToken()
console.log(auth.accessToken)
console.log(auth.role)

/** Decode payload */
const payload = getPayload()
console.log('User ID:', payload.sub)
console.log('Expires at:', new Date(payload.exp * 1000))
```

## When to Use

### Perfect for:
- ✅ React applications (16.8+)
- ✅ JWT-based authentication
- ✅ RESTful APIs
- ✅ Applications requiring role-based access control
- ✅ Projects that need standardized CRUD operations
- ✅ Teams wanting to reduce authentication boilerplate

### Use not recommended when:
- ❌ GraphQL APIs (use Apollo Client instead)
- ❌ Non-JWT authentication (OAuth2, session-based, etc.)
- ❌ Server-side rendering with Next.js (token management relies on localStorage)
- ❌ React Native (localStorage not available)

## Works well with

Complete your React stack with other @forgepack packages:
| Package | Description |
|---------|-------------|
| [@forgepack/auth-jwt](https://www.npmjs.com/package/@forgepack/auth-jwt) | Backend JWT authentication utilities |
| [@forgepack/crud](https://www.npmjs.com/package/@forgepack/crud) | Advanced CRUD components with forms |
| [@forgepack/layout](https://www.npmjs.com/package/@forgepack/layout) | Responsive layout components |
| [@forgepack/modal](https://www.npmjs.com/package/@forgepack/modal) | Modal dialogs for CRUD operations |
| [@forgepack/datatable](https://www.npmjs.com/package/@forgepack/datatable) | Data tables with pagination and sorting |

## Key Features

- **🔐 Autenticação JWT** - Automatic login with interceptors
- **🛡️ Route Protection** - Role-based `RequireAuth` component
- **📊 Request Hook** - `useRequest` with pagination and search
- **⚡ CRUD Operations** - Ready-to-use functions for create, read, update, delete.
- **🔑 Token Management** - Automatic validation and decoding
- **📱 Responsive** - Loading, error, and pagination states

## Complete Documentation

For detailed examples, usage guides, and API references, please visit:
**[Complete Documentation](./docs/README.md)**

# Developer usage

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Clone repository
git clone https://github.com/forgepack/request.git
cd request

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Author and Developers
- GitHub: [Gadelha TI](https://github.com/gadelhati)
- Website: [forgepack.dev](https://forgepack.dev)

## **License**

This project is licensed under the **MIT License** - see the [MIT LICENSE]( https://choosealicense.com/licenses/mit/) file for details.

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

**⭐ Did you like the project? Leave a star! ⭐**

Made with ❤️ by the Forgepack team

[Documentation](https://forgepack.dev/packages/request) • [NPM](https://www.npmjs.com/package/@forgepack/request) • [GitHub](https://github.com/forgepack/request) • [Issues](https://github.com/forgepack/request/issues)

</div>