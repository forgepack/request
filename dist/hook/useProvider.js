"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.AuthContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const token_1 = require("../service/token");
const auth_1 = require("../component/auth");
const crud_1 = require("../service/crud");
exports.AuthContext = (0, react_1.createContext)(auth_1.initialAuth);
const AuthProvider = ({ api, children }) => {
    const [state, setState] = (0, react_1.useState)(() => (0, token_1.isValidToken)() ? (0, token_1.getToken)() : auth_1.initialAuth);
    const loginUser = (0, react_1.useCallback)(async (credentials) => {
        const result = await (0, crud_1.login)(api, '/auth/login', credentials);
        if (!Array.isArray(result)) {
            setState(result);
            return { success: true, data: result };
        }
        return { success: false, errors: result };
    }, []);
    const logoutUser = (0, react_1.useCallback)(() => {
        (0, crud_1.logout)();
        setState(auth_1.initialAuth);
        window.location.href = '/login';
    }, []);
    // Verifica token expirado a cada minuto
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (state.accessToken && !(0, token_1.isValidToken)()) {
                logoutUser();
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [state.accessToken, logoutUser]);
    // Escuta mudanças no localStorage (ex.: logout em outra aba)
    (0, react_1.useEffect)(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                if (!e.newValue || !(0, token_1.isValidToken)()) {
                    setState(auth_1.initialAuth);
                }
                else {
                    setState((0, token_1.getToken)());
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    return ((0, jsx_runtime_1.jsx)(exports.AuthContext.Provider, { value: { ...state, loginUser, logoutUser, isAuthenticated: (0, token_1.isValidToken)() }, children: children }));
};
exports.AuthProvider = AuthProvider;
