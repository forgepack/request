import axios, { AxiosInstance } from "axios"
import { getToken, removeToken } from "../services/token"

/**
 * Opções de configuração para o cliente da API
 * @interface ApiClientOptions
 */
export type ApiClientOptions = {
    /** URL base da API */
    baseURL: string
    /** Callback executado quando recebe erro 401 (Unauthorized) */
    onUnauthorized?: () => void
    /** Callback executado quando recebe erro 403 (Forbidden) */
    onForbidden?: () => void
}

/**
 * Cria uma instância configurada do cliente Axios com interceptors para autenticação JWT
 * 
 * @param options - Opções de configuração do cliente
 * @returns Instância configurada do Axios com interceptors de request/response
 * 
 * @example
 * ```typescript
 * const api = createApiClient({
 *   baseURL: 'https://api.exemplo.com',
 *   onUnauthorized: () => window.location.href = '/login',
 *   onForbidden: () => alert('Acesso negado')
 * })
 * ```
 */
export const createApiClient = (options: ApiClientOptions): AxiosInstance => {
    const api = axios.create({
        baseURL: options.baseURL,
        headers: { 'content-type': 'application/json' }
    })

    api.interceptors.request.use(async config => {
        const token = getToken()?.accessToken
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`
        }
        return config
    })

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                removeToken()
                options.onUnauthorized?.()
            }
            if (error.response?.status === 403) {
                options.onForbidden?.()
            }
            return Promise.reject(error)
        }
    )
    return api
}