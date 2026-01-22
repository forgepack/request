"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContext = void 0;
const react_1 = require("react");
const constants_1 = require("../utils/constants");
/**
 * Contexto React para gerenciamento de autenticação
 * @constant
 */
exports.AuthContext = (0, react_1.createContext)(constants_1.initialAuth);
