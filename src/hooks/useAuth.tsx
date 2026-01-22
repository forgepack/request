import { useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthContext, AuthContextType } from './AuthContext'

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
export const useAuth = (): AuthContextType => {
    return useContext(AuthContext)
}

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
export const RequireAuth = ({ allowedRoles }: any) => {
    const { role, accessToken } = useAuth()
    const location = useLocation()

    return (
        role?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : accessToken
                ? <Navigate to='/notAllowed' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}