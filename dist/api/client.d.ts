import { AxiosInstance } from "axios";
/**
 * Opções de configuração para o cliente da API
 * @interface ApiClientOptions
 */
export type ApiClientOptions = {
    /** URL base da API */
    baseURL: string;
    /** Callback executado quando recebe erro 401 (Unauthorized) */
    onUnauthorized?: () => void;
    /** Callback executado quando recebe erro 403 (Forbidden) */
    onForbidden?: () => void;
};
/**
 * Cria uma instância configurada do cliente Axios com interceptors para autenticação JWT
 *
 * @param options - Opções de configuração do cliente
 * @returns Instância configurada do Axios com interceptors de request/response
 *
 * @example
 * ```typescript
 * const api = createApiClient({
 *   baseURL: 'https://api.exemplo.com',
 *   onUnauthorized: () => window.location.href = '/login',
 *   onForbidden: () => alert('Acesso negado')
 * })
 * ```
 */
export declare const createApiClient: (options: ApiClientOptions) => AxiosInstance;
//# sourceMappingURL=client.d.ts.map