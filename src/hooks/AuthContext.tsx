import { createContext } from 'react'
import type { Auth, LoginCredentials, LoginResponse } from '../types/auth'
import { initialAuth } from '../utils/constants'

/**
 * Interface that extends Auth with authentication methods
 * @interface AuthContextType
 */
export interface AuthContextType extends Auth {
    /** Function to authenticate a user */
    loginUser: (credentials: LoginCredentials) => Promise<LoginResponse>
    /** Function to logout the user */
    logoutUser: () => void
    /** Indicates if the user is authenticated */
    isAuthenticated: boolean
}

/**
 * React context for authentication management
 * @constant
 */
export const AuthContext = createContext<AuthContextType>(initialAuth as AuthContextType)