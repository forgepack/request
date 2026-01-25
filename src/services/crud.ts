import { AxiosInstance } from 'axios'
import { ErrorMessage } from '../types/error'
import { Search } from '../types/request'
import { fetchPage } from './api'
import { Page } from '../types/response'

/**
 * HTTP Status Code Reference:
 * - 1xx: Informational responses
 * - 2xx: Success responses
 * - 3xx: Redirects
 * - 4xx: Client errors
 * - 5xx: Server errors
 */

/**
 * Processes API response errors and converts to standardized format
 * 
 * @param {any} error - Axios error object from catch block
 * @returns {ErrorMessage[]} Array of formatted error messages with field and message properties
 * 
 * @internal This is a utility function used internally by CRUD operations
 */
const addError = (error: any): ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    if (error.response.data.validationErrors !== undefined) {
        error.response.data?.validationErrors?.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        errorMessage.push({ field: 'Error', message: error.response?.data?.message || 'Internal Server Error' })
    }
    return errorMessage
}

/**
 * Creates a new record in the API via POST request
 * 
 * @template T - Type of object to be created
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash, e.g., 'users')
 * @param {T} object - Object data to be created
 * @returns {Promise<T | ErrorMessage[]>} Promise resolving to created data or array of errors
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * // Create a user
 * const result = await create(api, 'users', { name: 'John Snow', email: 'john@example.com', role: 'USER' })
 * ```
 */
export const create = async <T,>(api: AxiosInstance, url: string, object: T): Promise<T | ErrorMessage[]> => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Creates multiple records at once in the API via batch POST request
 * 
 * @template T - Type of objects to be created
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash, e.g., 'users')
 * @param {T[]} object - Array of objects to be created
 * @returns {Promise<T | ErrorMessage[]>} Promise resolving to created data or array of errors
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * // Create multiple users at once
 * const users = [
 *   { name: 'John Doe', email: 'john@example.com' },
 *   { name: 'Jane Smith', email: 'jane@example.com' },
 *   { name: 'Bob Johnson', email: 'bob@example.com' }
 * ]
 * 
 * const result = await createAll(api, 'users', users)
 * ```
 */
export const createAll = async <T,>(api: AxiosInstance, url: string, object: T[]): Promise<T | ErrorMessage[]> => {
    return await api.post<T>(`/${url}/createAll`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Retrieves records from the API with optional pagination, search, and sorting support
 * 
 * This function delegates to `fetchPage` for paginated requests and handles
 * unpaginated retrieval directly.
 * 
 * Behaviors based on parameters:
 * - Without search: retrieves all records
 * - With page/size: paginated search
 * - With sort: paginated and sorted search
 * 
 * @template T - Type of individual items in the response
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash, e.g., 'users')
 * @param {Search} [search] - Optional search, pagination and sorting parameters
 * @param {number} [search.page] - Page number (zero-indexed)
 * @param {number} [search.size] - Number of items per page
 * @param {string} [search.value] - Search term for filtering
 * @param {Object} [search.sort] - Sorting configuration
 * @param {string} [search.sort.key] - Field name to sort by
 * @param {'asc'|'desc'} [search.sort.order] - Sort order
 * @param {AbortSignal} [signal] - Signal for request cancellation
 * @returns {Promise<T[] | Page<T> | ErrorMessage[]>} Promise resolving to:
 *   - Array of items (unpaginated)
 *   - Page object (paginated)
 *   - Array of errors (on failure)
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * // Simple search
 * const allUsers = await retrieve(api, 'users')
 * 
 * // Paginated search
 * const page = await retrieve(api, 'users', { page: 0, size: 10 })
 * 
 * // Search with filter + pagination + sorting
 * const filtered = await retrieve(api, 'users', {
 *   value: 'John',
 *   page: 0,
 *   size: 10,
 *   sort: { key: 'name', order: 'ASC' }
 * })
 * 
 * // With cancellation support
 * const controller = new AbortController()
 * const promise = retrieve(api, 'posts', { page: 0, size: 15 }, controller.signal)
 * ```
 */
export const retrieve = async <T>(api: AxiosInstance, url: string, search?: Search, signal?: AbortSignal): Promise<Page<T> | ErrorMessage[]> => {
    try{
        return await fetchPage(api, url, search, signal)
    }catch(error) {
        return addError(error)
    }
}

/**
 * Updates an existing record in the API via PUT request
 * 
 * @template T - Type of object to be updated
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash, e.g., 'users')
 * @param {T} object - Updated object data (must include identifier)
 * @returns {Promise<T | ErrorMessage[]>} Promise resolving to response or array of errors
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * const result = await update(api, 'users', { id: 1, name: 'John Silva' })
 * ```
 */
export const update = async <T,>(api: AxiosInstance, url: string, object: T): Promise<T | ErrorMessage[]> => {
    return await api.put<T>(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Removes a specific record from the API via DELETE request
 * 
 * @template T - Type of response
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash, e.g., 'users')
 * @param {string} id - ID of the record to be removed
 * @returns {Promise<T | ErrorMessage[]>} Promise resolving to response or array of errors
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * const result = await remove(api, 'users', '123')
 * ```
 */
export const remove = async <T,>(api: AxiosInstance, url: string, id: string) => {
    return await api.delete<T>(`/${url}/${id}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Removes a record with composite key (multiple identifiers) via DELETE request
 * 
 * @template T - Type of response
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash)
 * @param {Object} object - Object with additional data for deletion (if needed by backend)
 * @param {string} one - First identifier segment
 * @param {string} two - Second identifier segment
 * @param {string} three - Third identifier segment (optional, pass '' if unused)
 * @param {string} four - Fourth identifier segment (optional, pass '' if unused)
 * @returns {Promise<T | ErrorMessage[]>} Promise resolving to response or array of errors
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * // Delete with 2-part composite key
 * const result = await removeComposite(api, 'user-roles', {}, 'user-123', 'role-admin', '', '')
  * ```
 */
export const removeComposite = async <T,>(api: AxiosInstance, url: string, object: Object, one: string, two: string, three: string, four: string) => {
    if (three !== '' && four !== '') {
        return await api.delete<T>(`/${url}`, object)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else {
        return await api.delete<T>(`/${url}/${one}/${two}`, object)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    }
}

/**
 * Removes all records from a specific endpoint via DELETE request
 * 
 * ⚠️ **WARNING**: This is a destructive operation that removes ALL records.
 * Use with extreme caution and ensure this is the intended action.
 * 
 * @template T - Type of response
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} url - API endpoint path (without leading slash)
 * @returns {Promise<T | ErrorMessage[]>} Promise resolving to response or array of errors
 * 
 * @throws {never} Never throws - all errors are caught and returned as ErrorMessage[]
 * 
 * @example
 * ```typescript
 * const result = await removeAll(api, 'temp-data')
 * ```
 */
export const removeAll = async <T,>(api: AxiosInstance, url: string) => {
    return await api.delete<T>(`/${url}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}