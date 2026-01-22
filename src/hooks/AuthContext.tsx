import { createContext } from 'react'
import { Auth, LoginCredentials, LoginResponse } from '../types/auth'
import { initialAuth } from '../utils/constants'

/**
 * Interface que estende Auth com métodos de autenticação
 * @interface AuthContextType
 */
export interface AuthContextType extends Auth {
    /** Função para autenticar um usuário */
    loginUser: (credentials: LoginCredentials) => Promise<LoginResponse>
    /** Função para desautenticar o usuário */
    logoutUser: () => void
    /** Indica se o usuário está autenticado */
    isAuthenticated: boolean
}

/**
 * Contexto React para gerenciamento de autenticação
 * @constant
 */
export const AuthContext = createContext<AuthContextType>(initialAuth as AuthContextType)