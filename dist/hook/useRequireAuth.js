"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAuth = exports.useAuth = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const useProvider_1 = require("./useProvider");
const useAuth = () => {
    return (0, react_1.useContext)(useProvider_1.AuthContext);
};
exports.useAuth = useAuth;
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
