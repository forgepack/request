import { Auth } from '../types/auth';
import { Header, Payload } from '../types/token';
/**
 * Verifica se o token JWT atual é válido e não expirado
 *
 * @returns true se o token for válido e não expirado, false caso contrário
 *
 * @example
 * ```typescript
 * if (isValidToken()) {
 *   // Usuário autenticado
 * } else {
 *   // Redirecionar para login
 * }
 * ```
 */
export declare const isValidToken: () => boolean;
/**
 * Recupera o token JWT armazenado no localStorage
 *
 * @returns Objeto Auth com dados do token ou estado inicial se inválido
 *
 * @example
 * ```typescript
 * const token = getToken()
 * console.log(token.accessToken)
 * ```
 */
export declare const getToken: () => Auth;
/**
 * Armazena o token JWT no localStorage
 *
 * @param token - Dados de autenticação a serem armazenados
 *
 * @example
 * ```typescript
 * setToken({
 *   accessToken: 'jwt-token',
 *   refreshToken: 'refresh-token',
 *   tokenType: 'Bearer',
 *   role: ['USER']
 * })
 * ```
 */
export declare const setToken: (token: any) => void;
/**
 * Remove o token JWT do localStorage
 *
 * @example
 * ```typescript
 * removeToken() // Usuário será deslogado
 * ```
 */
export declare const removeToken: () => void;
/**
 * Decodifica e retorna o payload do token JWT
 *
 * @returns Objeto Payload com informações do token ou estado inicial se inválido
 *
 * @example
 * ```typescript
 * const payload = getPayload()
 * console.log(payload.exp) // Data de expiração
 * console.log(payload.sub) // Subject (ID do usuário)
 * ```
 */
export declare const getPayload: () => Payload;
/**
 * Decodifica o token JWT e retorna o payload como string
 *
 * @deprecated Use getPayload() para uma abordagem mais segura
 * @returns String com payload decodificado ou null se inválido
 */
export declare const decodeJwt: () => string | null;
/**
 * Decodifica e retorna o cabeçalho do token JWT
 *
 * @returns Objeto Header com informações do cabeçalho ou estado inicial se inválido
 *
 * @example
 * ```typescript
 * const header = getHeader()
 * console.log(header.alg) // Algoritmo usado
 * console.log(header.typ) // Tipo do token
 * ```
 */
export declare const getHeader: () => Header;
//# sourceMappingURL=token.d.ts.map