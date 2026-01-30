/**
 * @forgepack/request - Complete HTTP client with JWT authentication for React
 * 
 * @packageDocumentation
 * @module @forgepack/request
 * 
 * @description
 * Production-ready solution for HTTP requests and JWT authentication in React applications
 * 
 * @example
 * **Quick Start**
 * ```typescript
 * import { createApiClient, AuthProvider, useAuth, useRequest } from '@forgepack/request'
 * 
 * // 1. Create API client
 * const api = createApiClient({
 *   baseURL: 'https://api.example.com',
 *   onUnauthorized: () => window.location.href = '/login'
 * })
 * 
 * // 2. Wrap app with AuthProvider
 * function App() {
 *   return (
 *     <AuthProvider api={api}>
 *       <Router>
 *         <Routes />
 *       </Router>
 *     </AuthProvider>
 *   )
 * }
 * 
 * // 3. Use authentication
 * function LoginPage() {
 *   const { loginUser } = useAuth()
 *   
 *   const handleLogin = async (credentials) => {
 *     const result = await loginUser(credentials)
 *     if (result.success) {
 *       navigate('/dashboard')
 *     }
 *   }
 *   
 *   return <LoginForm onSubmit={handleLogin} />
 * }
 * 
 * // 4. Fetch data with hooks
 * function UsersPage() {
 *   const { response, loading, error } = useRequest(
 *     api,
 *     'users',
 *     { page: 0, size: 10 }
 *   )
 *   
 *   if (loading) return <Spinner />
 *   if (error[0]?.message) return <Error message={error[0].message} />
 *   
 *   return <UserList users={response.content} />
 * }
 * 
 * // 5. Protect routes
 * <Route path="/admin" element={<RequireAuth allowedRoles={['ADMIN']} />}>
 *   <Route index element={<AdminDashboard />} />
 * </Route>
 * ```
 * 
 * @see {@link https://forgepack.dev/packages/request | Complete Documentation}
 * @see {@link https://github.com/forgepack/request | GitHub Repository}
 * @see {@link https://www.npmjs.com/package/@forgepack/request | NPM Package}
 * 
 * @fileoverview React package for managing HTTP requests with JWT authentication
 * @author Marcelo Gadelha {@link https://github.com/gadelhati}
 * @version 1.1.14
 * @license MIT License
 * 
 * @remarks
 * This package requires React 16.8+ (hooks support) and axios as peer dependencies
 * 
 * Complete solution for JWT authentication in React applications:
 * - Automatic JWT authentication with Axios interceptors
 * - React hooks for requests and state management (useAuth, useRequest)
 * - Authentication and authorization components (AuthProvider, RequireAuth)
 * - Standardized CRUD operations with error handling
 * - Token management with automatic expiration checks
 * - Pagination and search support for API requests
 * - Request cancellation via AbortController
 * - TypeScript support with comprehensive type definitions
 */

/**
 * API client creation and configuration utilities
 * 
 * @example
 * ```typescript
 * import { createApiClient } from '@forgepack/request'
 * 
 * const api = createApiClient({
 *   baseURL: process.env.REACT_APP_API_URL,
 *   onUnauthorized: () => navigate('/login'),
 *   onForbidden: () => toast.error('Access denied')
 * })
 * ```
 */
export * from './api/client'

/**
 * Type definitions for authentication, errors, requests, responses and tokens
 * 
 * @example
 * ```typescript
 * import type { Auth, LoginCredentials, ErrorMessage, Page } from '@forgepack/request'
 * 
 * const credentials: LoginCredentials = {
 *   username: 'user@example.com',
 *   password: 'password123'
 * }
 * ```
 */
export * from './types/auth'
export * from './types/error'  
export * from './types/request'
export * from './types/response'
export * from './types/token'

/**
 * React hooks for authentication and request management
 * 
 * @example
 * ```typescript
 * import { AuthProvider, useAuth, useRequest } from '@forgepack/request'
 * 
 * // Authentication hook
 * const { isAuthenticated, loginUser, logoutUser, role } = useAuth()
 * 
 * // Request hook with pagination
 * const { response, loading, error, request } = useRequest(
 *   api,
 *   'posts',
 *   { page: 0, size: 20, sort: { key: 'createdAt', order: 'desc' } }
 * )
 * ```
 */
export * from './hooks/AuthContext'
export * from './hooks/AuthProvider'
export * from './hooks/useAuth'
export * from './hooks/useRequest'

/**
 * Service layer for API operations, authentication, CRUD and token management
 * 
 * @example
 * ```typescript
 * import { login, create, retrieve, update, remove, fetchPage } from '@forgepack/request'
 * 
 * // Authentication
 * const result = await login(api, '/auth/login', credentials)
 * 
 * // CRUD operations
 * const newUser = await create(api, 'users', userData)
 * const users = await retrieve(api, 'users', { page: 0, size: 10 })
 * const updated = await update(api, 'users', { id: 1, name: 'New Name' })
 * await remove(api, 'users', '1')
 * 
 * // Paginated fetch
 * const page = await fetchPage(api, 'posts', { page: 0, size: 20 })
 * ```
 */
export * from './services/api'
export * from './services/auth'
export * from './services/crud'
export * from './services/token'

/**
 * Utility constants and default values
 * 
 * @example
 * ```typescript
 * import { initialAuth, initialPage, initialErrorMessage } from '@forgepack/request'
 * 
 * const [auth, setAuth] = useState(initialAuth)
 * const [page, setPage] = useState(initialPage)
 * ```
 */
export * from './utils/constants'
