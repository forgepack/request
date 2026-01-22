"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialPayload = exports.initialHeader = exports.initialPage = exports.initialPageInfo = exports.initialSearch = exports.initialErrorMessage = exports.initialAuth = void 0;
/**
 * Estado inicial vazio para dados de autenticação
 * @constant
 */
exports.initialAuth = {
    accessToken: '',
    refreshToken: '',
    tokenType: '',
    role: []
};
/**
 * Estado inicial vazio para mensagens de erro
 * @constant
 */
exports.initialErrorMessage = {
    field: '',
    message: ''
};
/**
 * Configuração padrão para buscas e paginação
 * @constant
 */
exports.initialSearch = {
    value: '',
    page: 0,
    size: 15,
    sort: {
        key: 'id',
        order: 'ASC',
    }
};
/**
 * Estado inicial vazio para informações de paginação
 * @constant
 */
exports.initialPageInfo = {
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0
};
/**
 * Estado inicial vazio para respostas paginadas
 * @constant
 */
exports.initialPage = {
    content: [],
    page: exports.initialPageInfo
};
/**
 * Estado inicial vazio para cabeçalho de token
 * @constant
 */
exports.initialHeader = {
    alg: '',
    typ: ''
};
/**
 * Estado inicial vazio para payload de token
 * @constant
 */
exports.initialPayload = {
    jti: '',
    iss: '',
    iat: 0,
    nbf: 0,
    exp: 0,
    sub: '',
    aud: ''
};
