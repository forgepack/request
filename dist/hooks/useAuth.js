"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAuth = exports.useAuth = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("./AuthContext");
/**
 * Hook para acessar o contexto de autenticação
 *
 * @returns Contexto de autenticação com estado e métodos
 *
 * @example
 * ```typescript
 * const { isAuthenticated, loginUser, logoutUser, role } = useAuth()
 * ```
 */
const useAuth = () => {
    return (0, react_1.useContext)(AuthContext_1.AuthContext);
};
exports.useAuth = useAuth;
/**
 * Componente de proteção de rotas que verifica autenticação e autorização
 *
 * Comportamento:
 * - Se usuário tem role permitida: renderiza conteúdo (Outlet)
 * - Se autenticado mas sem permissão: redireciona para /notAllowed
 * - Se não autenticado: redireciona para /login
 *
 * @param props - Propriedades do componente
 * @param props.allowedRoles - Array de roles que têm acesso à rota
 * @returns Componente de navegação condicional
 *
 * @example
 * ```tsx
 * <Route path="/admin" element={<RequireAuth allowedRoles={['ADMIN']} />}>
 *   <Route index element={<AdminDashboard />} />
 * </Route>
 * ```
 */
const RequireAuth = ({ allowedRoles }) => {
    const { role, accessToken } = (0, exports.useAuth)();
    const location = (0, react_router_dom_1.useLocation)();
    return ((role === null || role === void 0 ? void 0 : role.find((role) => allowedRoles === null || allowedRoles === void 0 ? void 0 : allowedRoles.includes(role)))
        ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})
        : accessToken
            ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: '/notAllowed', state: { from: location }, replace: true })
            : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: '/login', state: { from: location }, replace: true }));
};
exports.RequireAuth = RequireAuth;
