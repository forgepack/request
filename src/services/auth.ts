import { AxiosInstance } from 'axios'
import { ErrorMessage } from '../types/error'
import { Auth, LoginCredentials, LoginResponse, ChangePasswordData, ResetPasswordData } from '../types/auth'
import { removeToken, setToken } from './token'

/**
 * Processes API response errors and converts them to standardized format
 * 
 * @param {any} error - Axios error object
 * @returns {ErrorMessage[]} Array of formatted error messages with field and message properties
 * 
 * @internal This is a utility function used internally by auth service methods
 * 
 * @example
 * ```typescript
 * // Validation errors response
 * {
 *   validationErrors: [
 *     { field: 'email', message: 'Invalid email format' },
 *     { field: 'password', message: 'Password too short' }
 *   ]
 * }
 * ```
 */
const addError = (error: any): ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    /** Check for validation errors in the response */
    if (error.response?.data?.validationErrors) {
        error.response.data.validationErrors.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        /** General errors */
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
 * @param {AxiosInstance} api - Configured Axios instance with base URL
 * @param {string} url - Login endpoint path (e.g., '/auth/login')
 * @param {LoginCredentials} credentials - User login credentials
 * @param {string} credentials.username - Username or email
 * @param {string} credentials.password - User password
 * @returns {Promise<LoginResponse>} Promise resolving to login response with success flag and data/errors
 * 
 * @throws {never} Never throws - all errors are caught and returned in response
 * 
 * @example
 * ```typescript
 * // Successful login
 * const result = await login(api, '/auth/login', { 
 *   username: 'john@snow.com', 
 *   password: 'SecurePass123!' 
 * })
 * 
 * if (result.success) {
 *   // Navigate to dashboard
 *   console.log('Logged in!', result.data)
 * } else {
 *   // Display errors to user
 *   result.errors?.forEach(error => {
 *     console.log(`${error.field}: ${error.message}`)
 *   })
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
 * Performs password reset using a reset token and updates authentication
 * 
 * @param {AxiosInstance} api - Configured Axios instance
 * @param {string} url - Password reset endpoint path (e.g., '/auth/reset-password')
 * @param {ResetPasswordData} data - Password reset data
 * @param {string} data.token - Password reset token (from email)
 * @param {string} data.newPassword - New password to set
 * @returns {Promise<LoginResponse>} Promise with auth data on success or errors on failure
 * 
 * @throws {never} Never throws - all errors are caught and returned in response
 * 
 * @example
 * ```typescript
 * ```
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
 * Logs out the current user by removing authentication data from localStorage
 * 
 * This function only clears local storage. For complete logout:
 * - Call this function to clear local data
 * - Redirect user to login page
 * 
 * @returns {void}
 * 
 * @example
 * ```typescript
 * logout()
 * window.location.href = '/login'
 * ```
 */
export const logout = () => {
    removeToken()
}

/**
 * Changes the password for an authenticated user
 * 
 * Requires user to be authenticated (valid token in localStorage).
 * User must provide current password for verification.
 * 
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {ChangePasswordData} data - Password change data
 * @param {string} data.currentPassword - Current password for verification
 * @param {string} data.newPassword - New password to set
 * @param {string} data.confirmPassword - Confirm password to set
 * @returns {Promise<{success: boolean; errors?: ErrorMessage[]}>} Promise with success status and optional errors
 * 
 * @throws {never} Never throws - all errors are caught and returned in response
 * 
 * @example
 * ```typescript
 * // Password change in user settings
 * const result = await changePassword(api, {
 *   currentPassword: 'OldPass123!',
 *   newPassword: 'NewSecurePass456!',
 *   confirmPassword: 'NewSecurePass456!'
 * })
 * if (result.success) {
 *   alert('Password changed successfully')
 * } else {
 *   // Display errors
 *   result.errors?.forEach(err => {
 *     if (err.field === 'currentPassword') {
 *       console.error('Current password is incorrect')
 *     }
 *   })
 * }
 * ```
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
