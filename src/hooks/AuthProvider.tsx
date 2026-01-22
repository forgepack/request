import { useCallback, useEffect, useState } from 'react'
import { getToken, isValidToken } from '../services/token'
import { initialAuth } from '../utils/constants'
import { Auth, LoginCredentials, LoginResponse } from '../types/auth'
import { login, logout } from '../services/auth'
import { AxiosInstance } from 'axios'
import { AuthContext } from './AuthContext'

/**
 * Provedor de contexto de autenticação que gerencia o estado de autenticação globalmente
 * 
 * Funcionalidades:
 * - Gerencia estado de autenticação persistente
 * - Verifica expiração de tokens automaticamente
 * - Sincroniza estado entre abas do navegador
 * - Fornece métodos de login/logout
 * 
 * @param props - Propriedades do componente
 * @param props.api - Instância do Axios para requisições
 * @param props.children - Componentes filhos que receberão o contexto
 * @returns Provider component
 * 
 * @example
 * ```tsx
 * <AuthProvider api={apiClient}>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider = ({ api, children }: {
    api: AxiosInstance
    children: React.ReactNode
}) => {
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
    // Verifica token expirado a cada minuto
    useEffect(() => {
        const interval = setInterval(() => {
            if (state.accessToken && !isValidToken()) {
                logoutUser()
            }
        }, 60000)
        return () => clearInterval(interval)
    }, [state.accessToken, logoutUser])
    // Escuta mudanças no localStorage (ex.: logout em outra aba)
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