import { Auth } from '../types/auth'
import { initialAuth, initialHeader, initialPayload } from '../utils/constants'
import { Header, Payload } from '../types/token'

/**
 * Verifies if a string is valid JSON
 * 
 * @param json - String to be verified
 * @returns true if valid JSON, false otherwise
 */
const isValidJSON = (json: string) => {
    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}

/**
 * Verifies if the current JWT token is valid and not expired
 * 
 * @returns true if token is valid and not expired, false otherwise
 * 
 * @example
 * ```typescript
 * if (isValidToken()) {
 *   // User authenticated
 * } else {
 *   // Redirect to login
 * }
 * ```
 */
export const isValidToken = (): boolean => {
    try {
        const token = getToken()
        if (!token?.accessToken) return false

        const { exp } = getPayload()
        if (typeof exp !== 'number') return false

        return exp * 1000 > Date.now()
    } catch {
        return false
    }
}

/**
 * Retrieves the JWT token stored in localStorage
 * 
 * @returns Auth object with token data or initial state if invalid
 * 
 * @example
 * ```typescript
 * const token = getToken()
 * console.log(token.accessToken)
 * ```
 */
export const getToken = (): Auth => {
    let token: string = `${localStorage.getItem(`token`)}`
    return isValidJSON(token) ? JSON.parse(token) : initialAuth
}

/**
 * Stores the JWT token in localStorage
 * 
 * @param token - Authentication data to be stored
 * 
 * @example
 * ```typescript
 * setToken({
 *   accessToken: 'jwt-token',
 *   refreshToken: 'refresh-token',
 *   tokenType: 'Bearer',
 *   role: ['USER']
 * })
 * ```
 */
export const setToken = (token: any): void => {
    localStorage.setItem(`token`, JSON.stringify(token))
}

/**
 * Removes the JWT token from localStorage
 * 
 * @example
 * ```typescript
 * removeToken() // User will be logged out
 * ```
 */
export const removeToken = () => {
    localStorage.removeItem('token')
}

/**
 * Decodes and returns the JWT token payload
 * 
 * @returns Payload object with token information or initial state if invalid
 * 
 * @example
 * ```typescript
 * const payload = getPayload()
 * console.log(payload.exp) // Expiration date
 * console.log(payload.sub) // Subject (user ID)
 * ```
 */
export const getPayload = (): Payload => {
    try {
        const token = getToken()
        if (!token?.accessToken) return initialPayload;

        const base64 = token.accessToken.split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/')

        const payload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )

        return isValidJSON(payload) ? JSON.parse(payload) : initialPayload
    } catch {
        return initialPayload
    }
}

/**
 * Decodes the JWT token and returns the payload as string
 * 
 * @deprecated Use getPayload() for a safer approach
 * @returns String with decoded payload or null if invalid
 */
export const decodeJwt = () => {
    if (getToken() !== null) {
        var base64Url = getToken().accessToken.split('.')[1];
        var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return base64
    } else {
        return null
    }
}

/**
 * Decodes and returns the JWT token header
 * 
 * @returns Header object with header information or initial state if invalid
 * 
 * @example
 * ```typescript
 * const header = getHeader()
 * console.log(header.alg) // Algorithm used
 * console.log(header.typ) // Token type
 * ```
 */
export const getHeader = (): Header => {
    try {
        const token = getToken()
        if (!token?.accessToken) return initialHeader

        const base64 = token.accessToken.split('.')[0]
            .replace(/-/g, '+')
            .replace(/_/g, '/')

        const header = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )

        return isValidJSON(header) ? JSON.parse(header) : initialHeader
    } catch {
        return initialHeader
    }
}