import { ErrorMessage } from '../types/error';
import { Page } from '../types/response';
import { Search } from '../types/request';
import { AxiosInstance } from 'axios';
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
export declare const useRequest: (api: AxiosInstance, endpoint: string, search?: Search) => {
    response: Page<unknown>;
    error: ErrorMessage[];
    loading: boolean;
    request: () => Promise<void>;
};
//# sourceMappingURL=useRequest.d.ts.map