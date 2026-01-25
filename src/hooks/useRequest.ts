import { useCallback, useEffect, useRef, useState } from 'react'
import { ErrorMessage } from '../types/error'
import { initialErrorMessage, initialPage } from '../utils/constants'
import { Page } from '../types/response'
import { Search } from '../types/request'
import { fetchPage } from '../services/api'
import { AxiosInstance } from 'axios'

/**
 * Return type of the useRequest hook
 */
export type UseRequestReturn = {
    /** Paginated response data from the API */
    response: Page
    /** Array of error messages if request failed */
    error: ErrorMessage[]
    /** Loading state indicator */
    loading: boolean
    /** Function to manually trigger a new request */
    request: () => Promise<void>
}

/**
 * React hook for managing paginated HTTP requests with automatic state management
 * 
 * Features:
 * - Manages loading, data and error states automatically
 * - Supports pagination and search/filtering
 * - Automatic cancellation of pending requests on unmount or parameter change
 * - Automatic re-execution when endpoint or search parameters change
 * - Request deduplication via AbortController
 * 
 * @param {AxiosInstance} api - Configured Axios instance with authentication
 * @param {string} endpoint - API endpoint path (without leading slash, e.g., 'users' or 'posts')
 * @param {Search} [search] - Optional search and pagination parameters
 * @param {number} [search.page] - Page number (zero-indexed)
 * @param {number} [search.size] - Number of items per page
 * @param {string} [search.value] - Search term for filtering results
 * @returns {UseRequestReturn} Object containing response data, error state, loading indicator and manual request function
 * 
 * @example
 * ```typescript
 * // Basic usage with pagination
 * const { response, error, loading, request } = useRequest(
 *   apiClient, 
 *   'users', 
 *   { page: 0, size: 10 }
 * )
 * 
 * // Access paginated data
 * const { response, loading } = useRequest(
 *   apiClient, 
 *   'posts', 
 *   { page: 0, size: 10, value: 'search term' }
 * )
 * 
 * // Re-execute manually to refresh data
 * await request()
 * ```
 */

export const useRequest = (api: AxiosInstance, endpoint: string, search?: Search): UseRequestReturn => {
	const [response, setResponse] = useState<Page>(initialPage)
	const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
	const [loading, setLoading] = useState<boolean>(false)
	const abortControllerRef = useRef<AbortController | null>(null)

	/**
	 * Executes the API request with automatic cancellation of previous pending requests
	 * 
	 * @throws {ErrorMessage} When the request fails
	 */
	const request = useCallback(async () => {
		/** Cancel any ongoing request */
		abortControllerRef.current?.abort()
		const controller = new AbortController()
		abortControllerRef.current = controller

		try {
			setLoading(true)
			setError([initialErrorMessage])
			const data = await fetchPage(api, endpoint, search, controller.signal)
			setResponse(data)
		} catch (requestError) {
			/** Ignore abort errors */
            if ((requestError as Error).name !== 'AbortError') {
                setError([requestError as ErrorMessage])
            }
		} finally {
			setLoading(false)
			abortControllerRef.current = null
		}
	}, [api, endpoint, search])

	/** Automatically execute request on mount and when dependencies change */
	useEffect(() => {
		request()
		/** Cleanup: cancel request on unmount or dependency change */
		return () => abortControllerRef.current?.abort()
	}, [request])

	return { response, error, loading, request }
}
