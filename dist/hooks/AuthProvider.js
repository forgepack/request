"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const token_1 = require("../services/token");
const constants_1 = require("../utils/constants");
const auth_1 = require("../services/auth");
const AuthContext_1 = require("./AuthContext");
/**
 * Provedor de contexto de autenticação que gerencia o estado de autenticação globalmente
 *
 * Funcionalidades:
 * - Gerencia estado de autenticação persistente
 * - Verifica expiração de tokens automaticamente
 * - Sincroniza estado entre abas do navegador
 * - Fornece métodos de login/logout
 *
 * @param props - Propriedades do componente
 * @param props.api - Instância do Axios para requisições
 * @param props.children - Componentes filhos que receberão o contexto
 * @returns Provider component
 *
 * @example
 * ```tsx
 * <AuthProvider api={apiClient}>
 *   <App />
 * </AuthProvider>
 * ```
 */
const AuthProvider = ({ api, children }) => {
    const [state, setState] = (0, react_1.useState)(() => (0, token_1.isValidToken)() ? (0, token_1.getToken)() : constants_1.initialAuth);
    const loginUser = (0, react_1.useCallback)(async (credentials) => {
        const result = await (0, auth_1.login)(api, '/auth/login', credentials);
        if (result.success && result.data) {
            setState(result.data);
        }
        return result;
    }, [api]);
    const logoutUser = (0, react_1.useCallback)(() => {
        (0, auth_1.logout)();
        setState(constants_1.initialAuth);
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
                    setState(constants_1.initialAuth);
                }
                else {
                    setState((0, token_1.getToken)());
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    return ((0, jsx_runtime_1.jsx)(AuthContext_1.AuthContext.Provider, { value: { ...state, loginUser, logoutUser, isAuthenticated: (0, token_1.isValidToken)() }, children: children }));
};
exports.AuthProvider = AuthProvider;
