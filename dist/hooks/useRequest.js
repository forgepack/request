"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequest = void 0;
const react_1 = require("react");
const constants_1 = require("../utils/constants");
const api_1 = require("../services/api");
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
const useRequest = (api, endpoint, search) => {
    const [response, setResponse] = (0, react_1.useState)(constants_1.initialPage);
    const [error, setError] = (0, react_1.useState)([constants_1.initialErrorMessage]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const abortControllerRef = (0, react_1.useRef)(null);
    const request = (0, react_1.useCallback)(async () => {
        var _a;
        (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;
        try {
            setLoading(true);
            setError([constants_1.initialErrorMessage]);
            const data = await (0, api_1.fetchPage)(api, endpoint, search, controller.signal);
            setResponse(data);
        }
        catch (requestError) {
            setError([requestError]);
        }
        finally {
            setLoading(false);
            abortControllerRef.current = null;
        }
    }, [endpoint, search]);
    (0, react_1.useEffect)(() => {
        request();
        return () => { var _a; return (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort(); };
    }, [request]);
    return { response, error, loading, request };
};
exports.useRequest = useRequest;
