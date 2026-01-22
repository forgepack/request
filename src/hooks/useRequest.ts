import { useCallback, useEffect, useRef, useState } from 'react'
import { ErrorMessage } from '../types/error'
import { initialErrorMessage, initialPage } from '../utils/constants'
import { Page } from '../types/response'
import { Search } from '../types/request'
import { fetchPage } from '../services/api'
import { AxiosInstance } from 'axios'

/**
 * Hook React para gerenciamento de requisições HTTP paginadas com estado
 * 
 * Funcionalidades:
 * - Gerencia estado de loading, dados e erros
 * - Suporte a paginação e busca
 * - Cancelamento automático de requisições pendentes
 * - Re-execução automática quando parâmetros mudam
 * 
 * @param api - Instância configurada do Axios
 * @param endpoint - Endpoint da API (sem barra inicial)
 * @param search - Parâmetros opcionais de busca e paginação
 * @returns Objeto contendo response, error, loading e função request
 * 
 * @example
 * ```typescript
 * const { response, error, loading, request } = useRequest(
 *   apiClient, 
 *   'users', 
 *   { page: 0, size: 10, value: 'search term' }
 * )
 * 
 * // Re-executar manualmente
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