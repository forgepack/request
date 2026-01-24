import { AxiosInstance } from 'axios'
import { Page } from '../types/response'
import { Search } from '../types/request'

/**
 * Executes a paginated request to a specific endpoint
 * 
 * Features:
 * - Builds URL with search parameters
 * - Adds pagination parameters
 * - Sort support
 * - Request cancellation via AbortSignal
 * 
 * @param api - Configured Axios instance
 * @param endpoint - API endpoint (without leading slash)
 * @param search - Optional search and pagination parameters
 * @param signal - Signal for request cancellation
 * @returns Promise with paginated data
 * 
 * @throws {Error} Throws error if request fails
 * 
 * @example
 * ```typescript
 * const controller = new AbortController()
 * const result = await fetchPage(
 *   api, 
 *   'users', 
 *   { page: 0, size: 10, value: 'search term' },
 *   controller.signal
 * )
 * ```
 */
export const fetchPage = async (api: AxiosInstance, endpoint: string, search?: Search, signal?: AbortSignal): Promise<Page> => {
    const uri = search?.value?.trim()
        ? `/${endpoint}?value=${encodeURIComponent(search.value)}`
        : `/${endpoint}`
    const params: Record<string, unknown> = {
                page: search?.page,
                size: search?.size
            }
    if (search?.sort?.order && search?.sort?.key) {
        params.sort = `${search.sort.key},${search.sort.order}`
    }

    const { data } = await api.get<Page>(uri, {
        params: Object.keys(params).length > 0 ? params : undefined,
        signal
    })

    return data
}