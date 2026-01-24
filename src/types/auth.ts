/**
 * Interface representing user authentication data
 * @interface Auth
 */
export interface Auth {
    /** JWT access token for authentication */
    readonly accessToken: string,
    /** Token for session renewal */
	refreshToken: string,
    /** Token type (usually "Bearer") */
	tokenType: string,
    /** List of user roles/permissions */
	role: string[]
}

/**
 * Interface for login credentials
 * @interface LoginCredentials
 */
export interface LoginCredentials {
    /** Username or email */
    username: string,
    /** User password */
    password: string
}

/**
 * Interface for login response
 * @interface LoginResponse
 */
export interface LoginResponse {
    /** Indicates if login was successful */
    success: boolean,
    /** Authentication data (if successful) */
    data?: Auth,
    /** Validation errors (if failed) */
    errors?: Array<{ field: string; message: string }>
}

/**
 * Interface for password change
 * @interface ChangePasswordData
 */
export interface ChangePasswordData {
    /** Current password */
    currentPassword: string,
    /** New password */
    newPassword: string,
    /** New password confirmation */
    confirmPassword?: string
}

/**
 * Generic interface for password reset
 * @interface ResetPasswordData
 */
export interface ResetPasswordData {
    /** Email for reset */
    email?: string,
    /** Reset token */
    token?: string,
    /** New password */
    newPassword?: string
}