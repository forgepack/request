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
 * Response structure that mimics axios response
 */
export type HttpResponse<T = any> = {
    data: T
    status: number
    statusText: string
    headers: Record<string, string>
}

/**
 * Error structure that mimics axios error
 */
export type HttpError = Error & {
    response?: {
        data?: any
        status?: number
        statusText?: string
    }
}

/**
 * API Client instance that provides HTTP methods similar to axios
 */
export interface ApiInstance {
    baseURL: string
    get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>
    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>
    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>
    delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>
    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>
    interceptors: {
        request: {
            use: (onFulfilled: (config: RequestConfig) => Promise<RequestConfig>) => void
        }
        response: {
            use: (
                onFulfilled: (response: HttpResponse) => HttpResponse,
                onRejected: (error: HttpError) => Promise<never>
            ) => void
        }
    }
}

/**
 * Request configuration that mimics axios config
 */
export type RequestConfig = {
    params?: Record<string, any>
    headers?: Record<string, string>
    signal?: AbortSignal
}

/**
 * Creates a configured Fetch-based client instance with interceptors for JWT authentication and error handling
 * 
 * @param {ApiClientOptions} options - Client configuration options
 * @param {string} options.baseURL - Base URL for all API requests
 * @param {Function} [options.onUnauthorized] - Optional callback for 401 errors
 * @param {Function} [options.onForbidden] - Optional callback for 403 errors
 * @returns {ApiInstance} Configured API instance with request/response interceptors
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
export const createApiClient = (options: ApiClientOptions): ApiInstance => {
    let requestInterceptor: ((config: RequestConfig) => Promise<RequestConfig>) | null = null
    let responseInterceptor: {
        onFulfilled: (response: HttpResponse) => HttpResponse
        onRejected: (error: HttpError) => Promise<never>
    } | null = null

    /**
     * Build URL with parameters
     */
    const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
        const url = new URL(endpoint.startsWith('/') ? endpoint.slice(1) : endpoint, options.baseURL)
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value))
                }
            })
        }

        return url.toString()
    }

    /**
     * Convert Headers to plain object
     */
    const headersToObject = (headers: Headers): Record<string, string> => {
        const result: Record<string, string> = {}
        headers.forEach((value, key) => {
            result[key] = value
        })
        return result
    }

    /**
     * Make HTTP request using fetch
     */
    const makeRequest = async <T = any>(
        method: string,
        url: string,
        data?: any,
        config: RequestConfig = {}
    ): Promise<HttpResponse<T>> => {
        /** Apply request interceptor */
        if (requestInterceptor) {
            config = await requestInterceptor(config)
        }

        const fullUrl = buildUrl(url, config.params)
        
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...config.headers
        }

        /** Add JWT token if available */
        const token = getToken()?.accessToken
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }

        let body: string | undefined
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            body = JSON.stringify(data)
        }

        try {
            const response = await fetch(fullUrl, {
                method,
                headers,
                body,
                signal: config.signal
            })

            const responseData = await (async () => {
                const text = await response.text()
                try {
                    return text ? JSON.parse(text) : null
                } catch {
                    return text
                }
            })()

            const apiResponse: HttpResponse<T> = {
                data: responseData,
                status: response.status,
                statusText: response.statusText,
                headers: headersToObject(response.headers)
            }

            if (!response.ok) {
                const error: HttpError = new Error(`HTTP Error: ${response.status}`)
                error.response = {
                    data: responseData,
                    status: response.status,
                    statusText: response.statusText
                }

                /** Apply response interceptor for errors */
                if (responseInterceptor) {
                    return await responseInterceptor.onRejected(error)
                }

                throw error
            }

            /** Apply response interceptor for success */
            if (responseInterceptor) {
                return responseInterceptor.onFulfilled(apiResponse)
            }

            return apiResponse

        } catch (error: any) {
            if (error.name === 'AbortError') {
                const abortError: HttpError = new Error('Request was aborted')
                abortError.response = {
                    status: 0,
                    statusText: 'Request Aborted'
                }
                throw abortError
            }

            if (error.response) {
                /** Error already formatted by our code above */
                throw error
            }

            /** Network or other errors */
            const networkError: HttpError = new Error(error.message || 'Network Error')
            networkError.response = {
                status: 0,
                statusText: 'Network Error'
            }
            throw networkError
        }
    }

    /** Create the API instance */
    const api: ApiInstance = {
        baseURL: options.baseURL,
        
        get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
            return makeRequest<T>('GET', url, undefined, config)
        },

        post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
            return makeRequest<T>('POST', url, data, config)
        },

        put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
            return makeRequest<T>('PUT', url, data, config)
        },

        delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
            return makeRequest<T>('DELETE', url, undefined, config)
        },

        patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
            return makeRequest<T>('PATCH', url, data, config)
        },

        interceptors: {
            request: {
                use: (onFulfilled: (config: RequestConfig) => Promise<RequestConfig>) => {
                    requestInterceptor = onFulfilled
                }
            },
            response: {
                use: (
                    onFulfilled: (response: HttpResponse) => HttpResponse,
                    onRejected: (error: HttpError) => Promise<never>
                ) => {
                    responseInterceptor = { onFulfilled, onRejected }
                }
            }
        }
    }

    /** Response interceptor: Handle authentication and authorization errors */
    api.interceptors.response.use(
        (response) => response,
        async (error: HttpError) => {
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