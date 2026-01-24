import { AxiosInstance } from 'axios'
import { ErrorMessage } from '../types/error'
import { Search } from '../types/request'

// HTTP status codes:
// Informational responses (100-199),
// Success responses (200-299),
// Redirects (300-399)
// Client errors (400-499)
// Server errors (500-599).

/**
 * Processes API response errors and converts to standardized format
 * 
 * @param error - Axios error object
 * @returns Array of formatted error messages
 */
const addError = (error: any): ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    if (error.response.data.validationErrors !== undefined) {
        error.response.data?.validationErrors?.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        errorMessage.push({ field: 'Error', message: 'Internal Error' })
    }
    return errorMessage
}

/**
 * Creates a new record in the API
 * 
 * @template T - Type of object to be created
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @param object - Object data to be created
 * @returns Promise with created data or error array
 * 
 * @example
 * ```typescript
 * const result = await create(api, 'users', { name: 'John', email: 'john@example.com' })
 * ```
 */
export const create = async <T,>(api: AxiosInstance, url: string, object: T) => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Creates multiple records at once in the API
 * 
 * @template T - Type of objects to be created
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @param object - Array of objects to be created
 * @returns Promise with created data or error array
 */
export const createAll = async <T,>(api: AxiosInstance, url: string, object: T[]) => {
    return await api.post<T>(`/${url}/createAll`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Retrieves records from the API with pagination and search support
 * 
 * Behaviors:
 * - Without search: retrieves all records
 * - With page/size: paginated search
 * - With sort: paginated and sorted search
 * 
 * @template T - Type of returned data
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @param search - Optional search/pagination parameters
 * @param signal - Signal for request cancellation
 * @returns Promise with found data or error array
 * 
 * @example
 * ```typescript
 * // Simple search
 * const all = await retrieve(api, 'users')
 * 
 * // Paginated search
 * const page = await retrieve(api, 'users', { page: 0, size: 10 })
 * 
 * // Search with filter and sorting
 * const filtered = await retrieve(api, 'users', {
 *   value: 'John',
 *   page: 0,
 *   size: 10,
 *   sort: { key: 'name', order: 'ASC' }
 * })
 * ```
 */
export const retrieve = async <T,>(api: AxiosInstance, url: string, search?: Search, signal?: AbortSignal) => {
    if (search?.page === undefined && search?.size === undefined) {
        return await api.get<T>(`/${url}`)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else if (search?.sort?.order === undefined) {
        return await api.get<T>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size }, signal })
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else {
        return await api.get<T>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size, sort: `${search?.sort?.key},${search?.sort?.order}` }, signal })
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    }
}

/**
 * Updates an existing record in the API
 * 
 * @template T - Type of object to be updated
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @param object - Updated object data
 * @returns Promise with updated data or error array
 * 
 * @example
 * ```typescript
 * const result = await update(api, 'users', { id: 1, name: 'John Silva' })
 * ```
 */
export const update = async <T,>(api: AxiosInstance, url: string, object: T) => {
    return await api.put<T>(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Removes a specific record from the API
 * 
 * @template T - Type of response
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @param id - ID of record to be removed
 * @returns Promise with response or error array
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
 * Removes records with composite key (multiple IDs)
 * 
 * @template T - Type of response
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @param object - Object with data for removal
 * @param one - First identifier
 * @param two - Second identifier  
 * @param three - Third identifier (optional)
 * @param four - Fourth identifier (optional)
 * @returns Promise with response or error array
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
 * Removes all records from a specific endpoint
 * 
 * @template T - Type of response
 * @param api - Configured Axios instance
 * @param url - API endpoint (without leading slash)
 * @returns Promise with response or error array
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