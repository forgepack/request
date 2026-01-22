"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeader = exports.decodeJwt = exports.getPayload = exports.removeToken = exports.setToken = exports.getToken = exports.isValidToken = void 0;
const constants_1 = require("../utils/constants");
/**
 * Verifica se uma string é um JSON válido
 *
 * @param json - String a ser verificada
 * @returns true se for JSON válido, false caso contrário
 */
const isValidJSON = (json) => {
    try {
        JSON.parse(json);
        return true;
    }
    catch {
        return false;
    }
};
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
const isValidToken = () => {
    try {
        const token = (0, exports.getToken)();
        if (!(token === null || token === void 0 ? void 0 : token.accessToken))
            return false;
        const { exp } = (0, exports.getPayload)();
        if (typeof exp !== 'number')
            return false;
        return exp * 1000 > Date.now();
    }
    catch {
        return false;
    }
};
exports.isValidToken = isValidToken;
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
const getToken = () => {
    let token = `${localStorage.getItem(`token`)}`;
    return isValidJSON(token) ? JSON.parse(token) : constants_1.initialAuth;
};
exports.getToken = getToken;
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
const setToken = (token) => {
    localStorage.setItem(`token`, JSON.stringify(token));
};
exports.setToken = setToken;
/**
 * Remove o token JWT do localStorage
 *
 * @example
 * ```typescript
 * removeToken() // Usuário será deslogado
 * ```
 */
const removeToken = () => {
    localStorage.removeItem('token');
};
exports.removeToken = removeToken;
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
const getPayload = () => {
    try {
        const token = (0, exports.getToken)();
        if (!(token === null || token === void 0 ? void 0 : token.accessToken))
            return constants_1.initialPayload;
        const base64 = token.accessToken.split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const payload = decodeURIComponent(atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
        return isValidJSON(payload) ? JSON.parse(payload) : constants_1.initialPayload;
    }
    catch {
        return constants_1.initialPayload;
    }
};
exports.getPayload = getPayload;
/**
 * Decodifica o token JWT e retorna o payload como string
 *
 * @deprecated Use getPayload() para uma abordagem mais segura
 * @returns String com payload decodificado ou null se inválido
 */
const decodeJwt = () => {
    if ((0, exports.getToken)() !== null) {
        var base64Url = (0, exports.getToken)().accessToken.split('.')[1];
        var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return base64;
    }
    else {
        return null;
    }
};
exports.decodeJwt = decodeJwt;
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
const getHeader = () => {
    try {
        const token = (0, exports.getToken)();
        if (!(token === null || token === void 0 ? void 0 : token.accessToken))
            return constants_1.initialHeader;
        const base64 = token.accessToken.split('.')[0]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const header = decodeURIComponent(atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
        return isValidJSON(header) ? JSON.parse(header) : constants_1.initialHeader;
    }
    catch {
        return constants_1.initialHeader;
    }
};
exports.getHeader = getHeader;
