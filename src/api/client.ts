import axios, { AxiosInstance } from "axios"
import { getToken, removeToken } from "../services/token"

/**
 * Configuration options for the API client
 * @interface ApiClientOptions
 */
export type ApiClientOptions = {
    /** Base URL of the API (e.g., 'https://api.example.com') */
    baseURL: string
    /** Callback executed when receiving 401 (Unauthorized) error - typically used to redirect to login */
    onUnauthorized?: () => void
    /** Callback executed when receiving 403 (Forbidden) error - typically used to show access denied message */
    onForbidden?: () => void
}

/**
 * Creates a configured Axios client instance with interceptors for JWT authentication and error handling
 * 
 * @param {ApiClientOptions} options - Client configuration options
 * @param {string} options.baseURL - Base URL for all API requests
 * @param {Function} [options.onUnauthorized] - Optional callback for 401 errors
 * @param {Function} [options.onForbidden] - Optional callback for 403 errors
 * @returns {AxiosInstance} Configured Axios instance with request/response interceptors
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const api = createApiClient({ baseURL: 'https://api.example.com' })
 * 
 * // Usage with error handling callbacks
 * const api = createApiClient({
 *   baseURL: 'https://api.example.com',
 *   onUnauthorized: () => { window.location.href = '/login' },
 *   onForbidden: () => { alert('Access denied') }
 * })
 * ```
 */
export const createApiClient = (options: ApiClientOptions): AxiosInstance => {
    /** Create base Axios instance with default configuration */
    const api = axios.create({
        baseURL: options.baseURL,
        headers: { 'content-type': 'application/json' }
    })
    /** Request interceptor: Add JWT token to all requests */
    api.interceptors.request.use(async config => {
        const token = getToken()?.accessToken
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`
        }
        return config
    })
    /** Response interceptor: Handle authentication and authorization errors */
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            /** Handle 401 Unauthorized errors: Token invalid/expired */
            if (error.response?.status === 401) {
                removeToken()
                options.onUnauthorized?.()
            }
            /** Handle 403 Forbidden errors */
            if (error.response?.status === 403) {
                options.onForbidden?.()
            }
            return Promise.reject(error)
        }
    )
    return api
}