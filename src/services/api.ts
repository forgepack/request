import { ApiInstance } from '../api/client'
import { Page } from '../types/response'
import { Search } from '../types/request'

/**
 * Executes a paginated GET request to a specific API endpoint with optional search and sorting
 * 
 * Features:
 * - Builds URL with search parameters
 * - Adds pagination parameters (page, size)
 * - Supports sorting by field and order (asc/desc)
 * - Request cancellation via AbortSignal
 * - Automatic URL encoding for search values
 * 
 * @param {ApiInstance} api - Configured API instance with authentication and base URL
 * @param {string} endpoint - API endpoint path (without leading slash, e.g., 'users' or 'posts')
 * @param {Search} [search] - Optional search, pagination and sorting parameters
 * @param {number} [search.page] - Page number (zero-indexed, default handled by backend)
 * @param {number} [search.size] - Number of items per page (default handled by backend)
 * @param {string} [search.value] - Search term for filtering results (URL encoded automatically)
 * @param {Object} [search.sort] - Sorting configuration
 * @param {string} [search.sort.key] - Field name to sort by (e.g., 'name', 'createdAt')
 * @param {'asc'|'desc'} [search.sort.order] - Sort order (ascending or descending)
 * @param {AbortSignal} [signal] - Signal for request cancellation (from AbortController)
 * @returns {Promise<Page>} Promise resolving to paginated response data
 * 
 * @throws {Error} When the HTTP request fails
 * @throws {Error} When request is aborted via signal
 * 
 * @example
 * ```typescript
 * // Most basic usage
 * const result = await fetchPage(api, 'articles')
 * 
 * // With sorting
 * const promise = fetchPage(
 *   api, 
 *   'users', 
 *   { page: 0, size: 10, sort: { key: 'createdAt', order: 'desc' } },
 *   controller.signal
 * )
 * 
 * // With cancellation support
 * const controller = new AbortController()
 * const promise = fetchPage(
 *   api, 
 *   'posts', 
 *   { page: 0, size: 10, value: 'search term' },
 *   controller.signal
 * )
 * // Cancel if needed
 * controller.abort()
 * ```
 */
export const fetchPage = async <T,>(api: ApiInstance, endpoint: string, search?: Search, signal?: AbortSignal): Promise<Page<T>> => {
    /** Build base URI with optional search query */
    const uri = search?.value?.trim()
        ? `/${endpoint}?value=${encodeURIComponent(search.value)}`
        : `/${endpoint}`
    /** Build request parameters */
    const params: Record<string, unknown> = {
                page: search?.page,
                size: search?.size
            }
    /** Add sorting parameter if provided */
    if (search?.sort?.order && search?.sort?.key) {
        params.sort = `${search.sort.key},${search.sort.order}`
    }
    /** Execute GET request with parameters and cancellation signal */
    const { data } = await api.get<Page<T>>(uri, {
        params: Object.keys(params).length > 0 ? params : undefined,
        signal
    })

    return data
}
