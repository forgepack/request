"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAll = exports.removeComposite = exports.remove = exports.update = exports.retrieve = exports.createAll = exports.create = void 0;
// Códigos de status HTTP:
// Respostas de informação (100-199),
// Respostas de sucesso (200-299),
// Redirecionamentos (300-399)
// Erros do cliente (400-499)
// Erros do servidor (500-599).
/**
 * Processa erros de resposta da API e converte em formato padronizado
 *
 * @param error - Objeto de erro do Axios
 * @returns Array de mensagens de erro formatadas
 */
const addError = (error) => {
    var _a, _b;
    let errorMessage = [];
    if (error.response.data.validationErrors !== undefined) {
        (_b = (_a = error.response.data) === null || _a === void 0 ? void 0 : _a.validationErrors) === null || _b === void 0 ? void 0 : _b.forEach((element) => {
            errorMessage.push({ field: element.field, message: element.message });
        });
    }
    else {
        errorMessage.push({ field: 'Error', message: 'Internal Error' });
    }
    return errorMessage;
};
/**
 * Cria um novo registro na API
 *
 * @template T - Tipo do objeto a ser criado
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param object - Dados do objeto a ser criado
 * @returns Promise com dados criados ou array de erros
 *
 * @example
 * ```typescript
 * const result = await create(api, 'users', { name: 'João', email: 'joao@exemplo.com' })
 * ```
 */
const create = async (api, url, object) => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.create = create;
/**
 * Cria múltiplos registros de uma vez na API
 *
 * @template T - Tipo dos objetos a serem criados
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param object - Array de objetos a serem criados
 * @returns Promise com dados criados ou array de erros
 */
const createAll = async (api, url, object) => {
    return await api.post(`/${url}/createAll`, object)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.createAll = createAll;
/**
 * Busca/recupera registros da API com suporte a paginação e busca
 *
 * Comportamentos:
 * - Sem search: busca todos os registros
 * - Com page/size: busca paginada
 * - Com sort: busca paginada e ordenada
 *
 * @template T - Tipo dos dados retornados
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param search - Parâmetros opcionais de busca/paginação
 * @param signal - Signal para cancelamento da requisição
 * @returns Promise com dados encontrados ou array de erros
 *
 * @example
 * ```typescript
 * // Busca simples
 * const all = await retrieve(api, 'users')
 *
 * // Busca paginada
 * const page = await retrieve(api, 'users', { page: 0, size: 10 })
 *
 * // Busca com filtro e ordenação
 * const filtered = await retrieve(api, 'users', {
 *   value: 'João',
 *   page: 0,
 *   size: 10,
 *   sort: { key: 'name', order: 'ASC' }
 * })
 * ```
 */
const retrieve = async (api, url, search, signal) => {
    var _a, _b, _c;
    if ((search === null || search === void 0 ? void 0 : search.page) === undefined && (search === null || search === void 0 ? void 0 : search.size) === undefined) {
        return await api.get(`/${url}`)
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
    else if (((_a = search === null || search === void 0 ? void 0 : search.sort) === null || _a === void 0 ? void 0 : _a.order) === undefined) {
        return await api.get(`/${url}?value=${search === null || search === void 0 ? void 0 : search.value}`, { params: { page: search === null || search === void 0 ? void 0 : search.page, size: search === null || search === void 0 ? void 0 : search.size }, signal })
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
    else {
        return await api.get(`/${url}?value=${search === null || search === void 0 ? void 0 : search.value}`, { params: { page: search === null || search === void 0 ? void 0 : search.page, size: search === null || search === void 0 ? void 0 : search.size, sort: `${(_b = search === null || search === void 0 ? void 0 : search.sort) === null || _b === void 0 ? void 0 : _b.key},${(_c = search === null || search === void 0 ? void 0 : search.sort) === null || _c === void 0 ? void 0 : _c.order}` }, signal })
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
};
exports.retrieve = retrieve;
/**
 * Atualiza um registro existente na API
 *
 * @template T - Tipo do objeto a ser atualizado
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param object - Dados atualizados do objeto
 * @returns Promise com dados atualizados ou array de erros
 *
 * @example
 * ```typescript
 * const result = await update(api, 'users', { id: 1, name: 'João Silva' })
 * ```
 */
const update = async (api, url, object) => {
    return await api.put(`/${url}`, object)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.update = update;
/**
 * Remove um registro específico da API
 *
 * @template T - Tipo da resposta
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param id - ID do registro a ser removido
 * @returns Promise com resposta ou array de erros
 *
 * @example
 * ```typescript
 * const result = await remove(api, 'users', '123')
 * ```
 */
const remove = async (api, url, id) => {
    return await api.delete(`/${url}/${id}`)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.remove = remove;
/**
 * Remove registros com chave composta (múltiplos IDs)
 *
 * @template T - Tipo da resposta
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param object - Objeto com dados para remoção
 * @param one - Primeiro identificador
 * @param two - Segundo identificador
 * @param three - Terceiro identificador (opcional)
 * @param four - Quarto identificador (opcional)
 * @returns Promise com resposta ou array de erros
 */
const removeComposite = async (api, url, object, one, two, three, four) => {
    if (three !== '' && four !== '') {
        return await api.delete(`/${url}`, object)
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
    else {
        return await api.delete(`/${url}/${one}/${two}`, object)
            .then(response => { return response.data; })
            .catch(error => { return addError(error); });
    }
};
exports.removeComposite = removeComposite;
/**
 * Remove todos os registros de um endpoint específico
 *
 * @template T - Tipo da resposta
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @returns Promise com resposta ou array de erros
 *
 * @example
 * ```typescript
 * const result = await removeAll(api, 'temp-data')
 * ```
 */
const removeAll = async (api, url) => {
    return await api.delete(`/${url}`)
        .then(response => { return response.data; })
        .catch(error => { return addError(error); });
};
exports.removeAll = removeAll;
