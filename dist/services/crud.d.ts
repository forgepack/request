import { AxiosInstance } from 'axios';
import { ErrorMessage } from '../types/error';
import { Search } from '../types/request';
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
export declare const create: <T>(api: AxiosInstance, url: string, object: T) => Promise<any>;
/**
 * Cria múltiplos registros de uma vez na API
 *
 * @template T - Tipo dos objetos a serem criados
 * @param api - Instância do Axios configurada
 * @param url - Endpoint da API (sem barra inicial)
 * @param object - Array de objetos a serem criados
 * @returns Promise com dados criados ou array de erros
 */
export declare const createAll: <T>(api: AxiosInstance, url: string, object: T[]) => Promise<ErrorMessage[] | T>;
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
export declare const retrieve: <T>(api: AxiosInstance, url: string, search?: Search, signal?: AbortSignal) => Promise<ErrorMessage[] | T>;
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
export declare const update: <T>(api: AxiosInstance, url: string, object: T) => Promise<ErrorMessage[] | T>;
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
export declare const remove: <T>(api: AxiosInstance, url: string, id: string) => Promise<ErrorMessage[] | T>;
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
export declare const removeComposite: <T>(api: AxiosInstance, url: string, object: Object, one: string, two: string, three: string, four: string) => Promise<ErrorMessage[] | T>;
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
export declare const removeAll: <T>(api: AxiosInstance, url: string) => Promise<ErrorMessage[] | T>;
//# sourceMappingURL=crud.d.ts.map