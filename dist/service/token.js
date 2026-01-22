"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeader = exports.decodeJwt = exports.getPayload = exports.removeToken = exports.setToken = exports.getToken = exports.isValidToken = void 0;
const auth_1 = require("../component/auth");
const token_1 = require("../component/token");
const isValidJSON = (json) => {
    try {
        JSON.parse(json);
        return true;
    }
    catch {
        return false;
    }
};
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
const getToken = () => {
    let token = `${localStorage.getItem(`token`)}`;
    return isValidJSON(token) ? JSON.parse(token) : auth_1.initialAuth;
};
exports.getToken = getToken;
const setToken = (token) => {
    localStorage.setItem(`token`, JSON.stringify(token));
};
exports.setToken = setToken;
const removeToken = () => {
    localStorage.removeItem('token');
};
exports.removeToken = removeToken;
const getPayload = () => {
    try {
        const token = (0, exports.getToken)();
        if (!(token === null || token === void 0 ? void 0 : token.accessToken))
            return token_1.initialPayload;
        const base64 = token.accessToken.split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const payload = decodeURIComponent(atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
        return isValidJSON(payload) ? JSON.parse(payload) : token_1.initialPayload;
    }
    catch {
        return token_1.initialPayload;
    }
};
exports.getPayload = getPayload;
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
const getHeader = () => {
    try {
        const token = (0, exports.getToken)();
        if (!(token === null || token === void 0 ? void 0 : token.accessToken))
            return token_1.initialHeader;
        const base64 = token.accessToken.split('.')[0]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const header = decodeURIComponent(atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
        return isValidJSON(header) ? JSON.parse(header) : token_1.initialHeader;
    }
    catch {
        return token_1.initialHeader;
    }
};
exports.getHeader = getHeader;
