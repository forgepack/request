import { useCallback, useEffect, useState } from 'react'
import { getToken, isValidToken } from '../services/token'
import { initialAuth } from '../utils/constants'
import { Auth, LoginCredentials, LoginResponse } from '../types/auth'
import { login, logout } from '../services/auth'
import { ApiInstance } from '../api/client'
import { AuthContext } from './AuthContext'

/**
 * Properties of the AuthProvider
 */
export type AuthProviderProps = {
    /** API instance for requests */
    api: ApiInstance
    /** Child components that will receive the context */
    children: React.ReactNode
}

/**
 * Authentication context provider that manages authentication state globally
 * 
 * Features:
 * - Manages persistent authentication state
 * - Automatically checks token expiration
 * - Synchronizes state between browser tabs
 * - Provides login/logout methods
 * - Automatically redirects to /login when token expires
 * 
 * @param {AuthProviderProps} props - Component properties
 * @param props.api - Axios instance for requests
 * @param props.children - Child components that will receive the context
 * @returns {JSX.Element} - Authentication context provider component
 * 
 * @example
 * ```tsx
 * import { createApiClient } from '@forgepack/request'
 * 
 * const api = createApiClient({ baseURL: 'https://api.example.com' })
 * 
 * function App() {
 *   return (
 *     <AuthProvider api={api}>
 *       <Router>
 *         <Routes />
 *       </Router>
 *     </AuthProvider>
 *   )
 * }
 * ```
 */

export const AuthProvider = ({ api, children }: AuthProviderProps) => {
    const [state, setState] = useState<Auth>(() =>
        isValidToken() ? getToken() : initialAuth
    )

    const loginUser = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const result = await login(api, '/auth/login', credentials)

        if (result.success && result.data) {
               setState(result.data)
        }

        return result
    }, [api])

    const logoutUser = useCallback(() => {
        logout()
        setState(initialAuth)
        window.location.href = '/login'
    }, [])
    /** Checks for expired token every minute */
    useEffect(() => {
        const interval = setInterval(() => {
            if (state.accessToken && !isValidToken()) {
                logoutUser()
            }
        }, 60000)
        return () => clearInterval(interval)
    }, [state.accessToken, logoutUser])
    /** Listens for changes in localStorage (e.g., logout in another tab) */
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token') {
                if (!e.newValue || !isValidToken()) {
                    setState(initialAuth)
                } else {
                    setState(getToken())
                }
            }
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, loginUser, logoutUser, isAuthenticated: isValidToken() }}>
            {children}
        </AuthContext.Provider>
    )
}
