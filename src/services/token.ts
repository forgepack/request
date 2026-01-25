import { Auth } from '../types/auth'
import { initialAuth, initialHeader, initialPayload } from '../utils/constants'
import { Header, Payload } from '../types/token'

/**
 * Verifies if a string is valid JSON
 * 
 * @param {string} json - String to be validated as JSON
 * @returns {boolean} true if the string is valid JSON, false otherwise
 * 
 * @internal This is a utility function used internally by token operations
 * 
 * @example
 * ```typescript
 * isValidJSON('{"key": "value"}') // true
 * isValidJSON('invalid json')     // false
 * isValidJSON('')                 // false
 * ```
 */
const isValidJSON = (json: string): boolean => {
    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}

/**
 * Verifies if the current JWT token stored in localStorage is valid and not expired
 * 
 * @returns {boolean} true if token exists, is valid and not expired; false otherwise
 * 
 * @example
 * ```typescript
 * if (isValidToken()) {
 *   // Allow access
 *   console.log('User is authenticated')
 * } else {
 *   console.log('Session expired or invalid')
 *   window.location.href = '/login'
 * }
 * ```
 */
export const isValidToken = (): boolean => {
    try {
        const token = getToken()
        if (!token?.accessToken) return false

        const { exp } = getPayload()
        if (typeof exp !== 'number') return false

        /** exp is in seconds, Date.now() is in milliseconds */
        return exp * 1000 > Date.now()
    } catch {
        return false
    }
}

/**
 * Retrieves the JWT token stored in localStorage
 * 
 * @returns {Auth} Auth object with token data, or initialAuth if token is missing/invalid
 * 
 * @example
 * ```typescript
 * // Basic retrieval
 * const token = getToken()
 * console.log(auth.accessToken)  // JWT string
 * console.log(auth.tokenType)    // 'Bearer'
 * console.log(auth.role)         // ['USER', 'ADMIN']
 * ```
 */
export const getToken = (): Auth => {
    let token: string = `${localStorage.getItem(`token`)}`
    return isValidJSON(token) ? JSON.parse(token) : initialAuth
}

/**
 * Stores JWT token and authentication data in localStorage
 * 
 * @param {Auth} token - Authentication data to be stored
 * @param {string} token.accessToken - JWT access token
 * @param {string} [token.refreshToken] - Optional refresh token
 * @param {string} token.tokenType - Token type (usually 'Bearer')
 * @param {string[]} [token.role] - User roles/permissions
 * @returns {void}
 * 
 * @example
 * ```typescript
 * // After successful login
 * const loginResponse = await api.post('/auth/login', credentials)
 * 
 * setToken({
 *   accessToken: loginResponse.data.accessToken,
 *   refreshToken: loginResponse.data.refreshToken,
 *   tokenType: 'Bearer',
 *   role: ['USER', 'ADMIN']
 * })
 * ```
 */
export const setToken = (token: Auth): void => {
    localStorage.setItem(`token`, JSON.stringify(token))
}

/**
 * Removes the JWT token from localStorage, effectively logging out the user
 * 
 * @returns {void}
 * 
 * @example
 * ```typescript
 * // Simple logout
 * removeToken()
 * window.location.href = '/login'
 * 
 * // Complete logout with backend call
 * const handleLogout = async () => {
 *   try {
 *     await api.post('/auth/logout')
 *   } finally {
 *     removeToken()
 *     navigate('/login')
 *   }
 * }
 * ```
 */
export const removeToken = () => {
    localStorage.removeItem('token')
}

/**
 * Decodes a Base64URL-encoded JWT segment (header or payload)
 * 
 * Handles the complete decoding process:
 * 1. Converts Base64URL to standard Base64
 * 2. Decodes Base64 to binary
 * 3. Properly handles Unicode characters via percent-encoding
 * 4. Parses JSON if valid
 * 
 * @template T - Type of the decoded object (Header or Payload)
 * @param {string} segment - Base64URL-encoded JWT segment
 * @param {T} fallback - Fallback value if decoding fails
 * @returns {T} Decoded and parsed object, or fallback if invalid
 * 
 * @internal This is a utility function used internally by getHeader and getPayload
 * 
 * @example
 * ```typescript
 * const header = decodeJwtSegment(token.split('.')[0], initialHeader)
 * const payload = decodeJwtSegment(token.split('.')[1], initialPayload)
 * ```
 */
const decodeJwtSegment = <T>(segment: string, fallback: T): T => {
    try {
        /** Convert Base64URL to Base64 */
        const base64 = segment
            .replace(/-/g, '+')
            .replace(/_/g, '/')

        /** Decode Base64 and handle Unicode characters properly */
        const decoded = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )

        return isValidJSON(decoded) ? JSON.parse(decoded) : fallback
    } catch {
        return fallback
    }
}

/**
 * Decodes and returns the JWT token payload (claims)
 * 
 * The payload contains user information and token metadata such as:
 * - sub: Subject (user ID)
 * - exp: Expiration timestamp (seconds since epoch)
 * - iat: Issued at timestamp
 * - Custom claims (email, name, roles, etc.)
 * 
 * @returns {Payload} Decoded payload object, or initialPayload if token is missing/invalid
 * 
 * @example
 * ```typescript
 * // Get user information from token
 * const payload = getPayload()
 * console.log(payload.exp)       // Expiration: 1735689600
 * console.log(payload.iat)       // Issued at: 1735603200
 * // Get time until expiration
 * const payload = getPayload()
 * const timeLeft = payload.exp * 1000 - Date.now()
 * const minutesLeft = Math.floor(timeLeft / 60000)
 * console.log(`Token expires in ${minutesLeft} minutes`)
 * // Access custom claims
 * const payload = getPayload()
 * const userRoles = payload.roles || []
 * ```
 */
export const getPayload = (): Payload => {
    const token = getToken()
    if (!token?.accessToken) return initialPayload

    /** Extract the payload part of the JWT */
    const payloadSegment = token.accessToken.split('.')[1]
    return decodeJwtSegment(payloadSegment, initialPayload)
}

/**
 * Decodes the JWT token and returns the payload as a JSON string
 * 
 * @deprecated Use getPayload() instead for type-safe access to payload data
 * @returns {string | null} Decoded payload as JSON string, or null if token is invalid
 * 
 * @example
 * ```typescript
 * // ❌ Deprecated approach
 * const payloadString = decodeJwt()
 * if (payloadString) {
 *   const payload = JSON.parse(payloadString)
 *   console.log(payload.exp)
 * }
 * 
 * // ✅ Use this instead
 * const payload = getPayload()
 * console.log(payload.exp)
 * ```
 */
export const decodeJwt = (): string | null => {
    const token = getToken()
    if (!token?.accessToken) return null
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
 * @returns {Header} Decoded header object, or initialHeader if token is missing/invalid
 * 
 * @example
 * ```typescript
 * // Check signing algorithm
 * const header = getHeader()
 * console.log(header.alg)  // 'HS256'
 * console.log(header.typ)  // 'JWT'
 * ```
 */
export const getHeader = (): Header => {
    const token = getToken()
    if (!token?.accessToken) return initialHeader

    /** Extract the header part of the JWT */
    const headerSegment = token.accessToken.split('.')[0]
    return decodeJwtSegment(headerSegment, initialHeader)
}