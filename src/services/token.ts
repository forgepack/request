import { Auth } from '../types/auth'
import { initialAuth, initialHeader, initialPayload } from '../utils/constants'
import { Header, Payload } from '../types/token'

/**
 * Verifica se uma string é um JSON válido
 * 
 * @param json - String a ser verificada
 * @returns true se for JSON válido, false caso contrário
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
 * Verifica se o token JWT atual é válido e não expirado
 * 
 * @returns true se o token for válido e não expirado, false caso contrário
 * 
 * @example
 * ```typescript
 * if (isValidToken()) {
 *   // Usuário autenticado
 * } else {
 *   // Redirecionar para login
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
 * Recupera o token JWT armazenado no localStorage
 * 
 * @returns Objeto Auth com dados do token ou estado inicial se inválido
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
 * Armazena o token JWT no localStorage
 * 
 * @param token - Dados de autenticação a serem armazenados
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
 * Remove o token JWT do localStorage
 * 
 * @example
 * ```typescript
 * removeToken() // Usuário será deslogado
 * ```
 */
export const removeToken = () => {
    localStorage.removeItem('token')
}

/**
 * Decodifica e retorna o payload do token JWT
 * 
 * @returns Objeto Payload com informações do token ou estado inicial se inválido
 * 
 * @example
 * ```typescript
 * const payload = getPayload()
 * console.log(payload.exp) // Data de expiração
 * console.log(payload.sub) // Subject (ID do usuário)
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
 * Decodifica o token JWT e retorna o payload como string
 * 
 * @deprecated Use getPayload() para uma abordagem mais segura
 * @returns String com payload decodificado ou null se inválido
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
 * Decodifica e retorna o cabeçalho do token JWT
 * 
 * @returns Objeto Header com informações do cabeçalho ou estado inicial se inválido
 * 
 * @example
 * ```typescript
 * const header = getHeader()
 * console.log(header.alg) // Algoritmo usado
 * console.log(header.typ) // Tipo do token
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