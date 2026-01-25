import { useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthContext, AuthContextType } from './AuthContext'

/**
 * Hook to access authentication context
 * 
 * @returns {AuthContextType} Authentication context with state and methods
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * ```typescript
 * function ProfilePage() {
 *   const { isAuthenticated, loginUser, logoutUser, role } = useAuth()
 *   if (!isAuthenticated) {
 *     return <p>Not authenticated</p>
 *   }
 *   return <div>User profile</div>
 * }
 * ```
 */

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

/**
 * Properties of the RequireAuth component
 */
export type RequireAuthProps = {
    /** Array of roles allowed to access the route */
    allowedRoles: string[]
}

/**
 * Route protection component that verifies authentication and authorization based on roles
 * 
 * Behavior:
 * - If user has allowed role: renders content (Outlet)
 * - If authenticated but without permission: redirects to /notAllowed  
 * - If not authenticated: redirects to /login
 * 
 * @param {RequireAuthProps} props - Component properties
 * @param {string[]} props.allowedRoles - Array of roles that have access to the route
 * @returns {JSX.Element} Conditional navigation component
 * 
 * @example
 * ```tsx
 * // Protecting admin route
 * <Route path="/admin" element={<RequireAuth allowedRoles={['ADMIN']} />}>
 *   <Route index element={<AdminDashboard />} />
 *   <Route path="users" element={<UserManagement />} />
 * </Route>
 * 
 * // Multiple roles
 * <Route path="/moderator" element={<RequireAuth allowedRoles={['ADMIN', 'MODERATOR']} />}>
 *   <Route index element={<ModeratorPanel />} />
 * </Route>
 * ```
 */

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
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
