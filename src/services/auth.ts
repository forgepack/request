import { AxiosInstance } from 'axios'
import { ErrorMessage } from '../types/error'
import { Auth, LoginCredentials, LoginResponse, ChangePasswordData, ResetPasswordData } from '../types/auth'
import { removeToken, setToken } from './token'

/**
 * Processes API response errors and converts to standardized format
 * 
 * @param error - Axios error object
 * @returns Array of formatted error messages
 */
const addError = (error: any): ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    if (error.response?.data?.validationErrors) {
        error.response.data.validationErrors.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        errorMessage.push({ 
            field: 'Error', 
            message: error.response?.data?.message || 'Internal Error' 
        })
    }
    return errorMessage
}

/**
 * Performs user login and stores the returned token
 * 
 * @param api - Configured Axios instance
 * @param url - Login endpoint
 * @param credentials - User credentials
 * @returns Promise with formatted login response
 * 
 * @example
 * ```typescript
 * const result = await login(api, '/auth/login', { 
 *   username: 'user', 
 *   password: 'pass' 
 * })
 * 
 * if (result.success) {
 *   console.log('Logged in!', result.data)
 * } else {
 *   console.error('Errors:', result.errors)
 * }
 * ```
 */
export const login = async (api: AxiosInstance, url: string, credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await api.post<Auth>(url, credentials)
        setToken(response.data)
        return {
            success: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            success: false,
            errors: addError(error)
        }
    }
}

/**
 * Performs user password reset and updates the token
 * 
 * @param api - Configured Axios instance
 * @param url - Password reset endpoint
 * @param data - Password reset data
 * @returns Promise with auth data or error array
 */
export const reset = async (api: AxiosInstance, url: string, data: ResetPasswordData): Promise<LoginResponse> => {
    try {
        const response = await api.put<Auth>(url, data)
        setToken(response.data)
        return {
            success: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            success: false,
            errors: addError(error)
        }
    }
}

/**
 * Removes token from localStorage and logs out the user
 */
export const logout = () => {
    removeToken()
}

/**
 * Changes the authenticated user's password
 * 
 * @param api - Configured Axios instance
 * @param data - Password change data
 * @returns Promise with success response or errors
 */
export const changePassword = async (api: AxiosInstance, data: ChangePasswordData): Promise<{ success: boolean; errors?: ErrorMessage[] }> => {
    try {
        await api.put(`/user/changePassword`, data)
        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            errors: addError(error)
        }
    }
}