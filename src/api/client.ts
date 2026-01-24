import axios, { AxiosInstance } from "axios"
import { getToken, removeToken } from "../services/token"

/**
 * Configuration options for the API client
 * @interface ApiClientOptions
 */
export type ApiClientOptions = {
    /** Base URL of the API */
    baseURL: string
    /** Callback executed when receiving 401 (Unauthorized) error */
    onUnauthorized?: () => void
    /** Callback executed when receiving 403 (Forbidden) error */
    onForbidden?: () => void
}

/**
 * Creates a configured Axios client instance with interceptors for JWT authentication
 * 
 * @param options - Client configuration options
 * @returns Configured Axios instance with request/response interceptors
 * 
 * @example
 * ```typescript
 * const api = createApiClient({
 *   baseURL: 'https://api.example.com',
 *   onUnauthorized: () => window.location.href = '/login',
 *   onForbidden: () => alert('Access denied')
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