"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.logout = exports.reset = exports.login = void 0;
const token_1 = require("./token");
/**
 * Processa erros de resposta da API e converte em formato padronizado
 *
 * @param error - Objeto de erro do Axios
 * @returns Array de mensagens de erro formatadas
 */
const addError = (error) => {
    var _a, _b, _c, _d;
    let errorMessage = [];
    if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.validationErrors) {
        error.response.data.validationErrors.forEach((element) => {
            errorMessage.push({ field: element.field, message: element.message });
        });
    }
    else {
        errorMessage.push({
            field: 'Error',
            message: ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || 'Internal Error'
        });
    }
    return errorMessage;
};
/**
 * Realiza login do usuário e armazena o token retornado
 *
 * @param api - Instância do Axios configurada
 * @param url - Endpoint de login
 * @param credentials - Credenciais do usuário
 * @returns Promise com resposta de login formatada
 *
 * @example
 * ```typescript
 * const result = await login(api, '/auth/login', {
 *   username: 'user',
 *   password: 'pass'
 * })
 *
 * if (result.success) {
 *   console.log('Logado!', result.data)
 * } else {
 *   console.error('Erros:', result.errors)
 * }
 * ```
 */
const login = async (api, url, credentials) => {
    try {
        const response = await api.post(url, credentials);
        (0, token_1.setToken)(response.data);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        return {
            success: false,
            errors: addError(error)
        };
    }
};
exports.login = login;
/**
 * Realiza reset de senha do usuário e atualiza o token
 *
 * @param api - Instância do Axios configurada
 * @param url - Endpoint de reset de senha
 * @param data - Dados para reset da senha
 * @returns Promise com dados de auth ou array de erros
 */
const reset = async (api, url, data) => {
    try {
        const response = await api.put(url, data);
        (0, token_1.setToken)(response.data);
        return {
            success: true,
            data: response.data
        };
    }
    catch (error) {
        return {
            success: false,
            errors: addError(error)
        };
    }
};
exports.reset = reset;
/**
 * Remove o token do localStorage e desloga o usuário
 */
const logout = () => {
    (0, token_1.removeToken)();
};
exports.logout = logout;
/**
 * Altera a senha do usuário autenticado
 *
 * @param api - Instância do Axios configurada
 * @param data - Dados para alteração da senha
 * @returns Promise com resposta de sucesso ou erros
 */
const changePassword = async (api, data) => {
    try {
        await api.put(`/user/changePassword`, data);
        return { success: true };
    }
    catch (error) {
        return {
            success: false,
            errors: addError(error)
        };
    }
};
exports.changePassword = changePassword;
