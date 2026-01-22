import { AxiosInstance } from 'axios'
import { ErrorMessage } from '../types/error'
import { Search } from '../types/request'

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
const addError = (error: any): ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    if (error.response.data.validationErrors !== undefined) {
        error.response.data?.validationErrors?.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        errorMessage.push({ field: 'Error', message: 'Internal Error' })
    }
    return errorMessage
}

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
export const create = async <T,>(api: AxiosInstance, url: string, object: T) => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

/**
 * Cria múltiplos registros de uma vez na API
 * 
 * @template T - Tipo dos objetos a serem criados
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param object - Array de objetos a serem criados
 * @returns Promise com dados criados ou array de erros
 */
export const createAll = async <T,>(api: AxiosInstance, url: string, object: T[]) => {
    return await api.post<T>(`/${url}/createAll`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

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
export const retrieve = async <T,>(api: AxiosInstance, url: string, search?: Search, signal?: AbortSignal) => {
    if (search?.page === undefined && search?.size === undefined) {
        return await api.get<T>(`/${url}`)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else if (search?.sort?.order === undefined) {
        return await api.get<T>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size }, signal })
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else {
        return await api.get<T>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size, sort: `${search?.sort?.key},${search?.sort?.order}` }, signal })
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    }
}

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
export const update = async <T,>(api: AxiosInstance, url: string, object: T) => {
    return await api.put<T>(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

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
export const remove = async <T,>(api: AxiosInstance, url: string, id: string) => {
    return await api.delete<T>(`/${url}/${id}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

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
export const removeComposite = async <T,>(api: AxiosInstance, url: string, object: Object, one: string, two: string, three: string, four: string) => {
    if (three !== '' && four !== '') {
        return await api.delete<T>(`/${url}`, object)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else {
        return await api.delete<T>(`/${url}/${one}/${two}`, object)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    }
}

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
export const removeAll = async <T,>(api: AxiosInstance, url: string) => {
    return await api.delete<T>(`/${url}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}