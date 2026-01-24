/**
 * @packageDocumentation
 * @module @forgepack/request
 * @see {@link https://forgepack.dev/packages/request | Complete Documentation}
 * @fileoverview React package for managing HTTP requests with JWT authentication
 * @author Marcelo Gadelha
 * @version 1.0.3
 * @license Apache License 2.0
 * 
 * Complete solution for JWT authentication in React applications:
 * - Automatic JWT authentication with interceptors
 * - React hooks for requests and state management
 * - Authentication and authorization components
 * - Standardized CRUD operations
 * - Token management and pagination
 */

// API client and configurations
export * from './api/client'

// Types and interfaces
export * from './types/auth'
export * from './types/error'  
export * from './types/request'
export * from './types/response'
export * from './types/token'

// React hooks for state management
export * from './hooks/AuthContext'
export * from './hooks/AuthProvider'
export * from './hooks/useAuth'
export * from './hooks/useRequest'

// Services for data operations
export * from './services/api'
export * from './services/auth'
export * from './services/crud'
export * from './services/token'

// Utilities and constants
export * from './utils/constants'
