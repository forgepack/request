import { AxiosInstance } from 'axios'
import { Page } from '../types/response'
import { Search } from '../types/request'

/**
 * Executa requisição paginada para um endpoint específico
 * 
 * Funcionalidades:
 * - Constrói URL com parâmetros de busca
 * - Adiciona parâmetros de paginação
 * - Suporte a ordenação
 * - Cancelamento de requisição via AbortSignal
 * 
 * @param api - Instância configurada do Axios
 * @param endpoint - Endpoint da API (sem barra inicial)
 * @param search - Parâmetros opcionais de busca e paginação
 * @param signal - Signal para cancelamento da requisição
 * @returns Promise com dados paginados
 * 
 * @throws {Error} Lança erro se a requisição falhar
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