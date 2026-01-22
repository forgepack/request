"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const token_1 = require("../service/token");
const createApiClient = (options) => {
    const api = axios_1.default.create({
        baseURL: options.baseURL,
        headers: { 'content-type': 'application/json' }
    });
    api.interceptors.request.use(async (config) => {
        var _a;
        const token = (_a = (0, token_1.getToken)()) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    api.interceptors.response.use((response) => response, (error) => {
        var _a, _b, _c, _d;
        if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
            (0, token_1.removeToken)();
            (_b = options.onUnauthorized) === null || _b === void 0 ? void 0 : _b.call(options);
        }
        if (((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) === 403) {
            (_d = options.onForbidden) === null || _d === void 0 ? void 0 : _d.call(options);
        }
        return Promise.reject(error);
    });
    return api;
};
exports.createApiClient = createApiClient;
