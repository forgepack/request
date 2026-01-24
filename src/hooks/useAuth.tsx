import { useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthContext, AuthContextType } from './AuthContext'

/**
 * Hook to access authentication context
 * 
 * @returns Authentication context with state and methods
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
 * Route protection component that verifies authentication and authorization
 * 
 * Behavior:
 * - If user has allowed role: renders content (Outlet)
 * - If authenticated but without permission: redirects to /notAllowed  
 * - If not authenticated: redirects to /login
 * 
 * @param props - Component properties
 * @param props.allowedRoles - Array of roles that have access to the route
 * @returns Conditional navigation component
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