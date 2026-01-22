"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPage = void 0;
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
const fetchPage = async (api, endpoint, search, signal) => {
    var _a, _b, _c;
    const uri = ((_a = search === null || search === void 0 ? void 0 : search.value) === null || _a === void 0 ? void 0 : _a.trim())
        ? `/${endpoint}?value=${encodeURIComponent(search.value)}`
        : `/${endpoint}`;
    const params = {
        page: search === null || search === void 0 ? void 0 : search.page,
        size: search === null || search === void 0 ? void 0 : search.size
    };
    if (((_b = search === null || search === void 0 ? void 0 : search.sort) === null || _b === void 0 ? void 0 : _b.order) && ((_c = search === null || search === void 0 ? void 0 : search.sort) === null || _c === void 0 ? void 0 : _c.key)) {
        params.sort = `${search.sort.key},${search.sort.order}`;
    }
    const { data } = await api.get(uri, {
        params: Object.keys(params).length > 0 ? params : undefined,
        signal
    });
    return data;
};
exports.fetchPage = fetchPage;
