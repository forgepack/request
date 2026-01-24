import { useCallback, useEffect, useRef, useState } from 'react'
import { ErrorMessage } from '../types/error'
import { initialErrorMessage, initialPage } from '../utils/constants'
import { Page } from '../types/response'
import { Search } from '../types/request'
import { fetchPage } from '../services/api'
import { AxiosInstance } from 'axios'

/**
 * React hook for managing paginated HTTP requests with state
 * 
 * Features:
 * - Manages loading, data and error state
 * - Supports pagination and search
 * - Automatic cancellation of pending requests
 * - Automatic re-execution when parameters change
 * 
 * @param api - Configured Axios instance
 * @param endpoint - API endpoint (without leading slash)
 * @param search - Optional search and pagination parameters
 * @returns Object containing response, error, loading and request function
 * 
 * @example
 * ```typescript
 * const { response, error, loading, request } = useRequest(
 *   apiClient, 
 *   'users', 
 *   { page: 0, size: 10, value: 'search term' }
 * )
 * 
 * // Re-execute manually
 * await request()
 * ```
 */
export const useRequest = (api: AxiosInstance, endpoint: string, search?: Search) => {
	const [response, setResponse] = useState<Page>(initialPage)
	const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
	const [loading, setLoading] = useState<boolean>(false)
	const abortControllerRef = useRef<AbortController | null>(null)

	const request = useCallback(async () => {
		abortControllerRef.current?.abort()
		const controller = new AbortController()
		abortControllerRef.current = controller

		try {
			setLoading(true)
			setError([initialErrorMessage])
			const data = await fetchPage(api, endpoint, search, controller.signal)
			setResponse(data)
		} catch (requestError) {
			setError([requestError as ErrorMessage])
		} finally {
			setLoading(false)
			abortControllerRef.current = null
		}
	}, [endpoint, search])

	useEffect(() => {
		request()
		return () => abortControllerRef.current?.abort()
	}, [request])

	return { response, error, loading, request }
}