/**
 * Interface que representa os dados de autenticação do usuário
 * @interface Auth
 */
export interface Auth {
    /** Token de acesso JWT para autenticação */
    readonly accessToken: string,
    /** Token para renovação da sessão */
	refreshToken: string,
    /** Tipo do token (geralmente "Bearer") */
	tokenType: string,
    /** Lista de roles/permissões do usuário */
	role: string[]
}

/**
 * Interface para credenciais de login
 * @interface LoginCredentials
 */
export interface LoginCredentials {
    /** Nome de usuário ou email */
    username: string,
    /** Senha do usuário */
    password: string
}

/**
 * Interface para resposta de login
 * @interface LoginResponse
 */
export interface LoginResponse {
    /** Indica se o login foi bem-sucedido */
    success: boolean,
    /** Dados de autenticação (se sucesso) */
    data?: Auth,
    /** Erros de validação (se falha) */
    errors?: Array<{ field: string; message: string }>
}

/**
 * Interface para alteração de senha
 * @interface ChangePasswordData
 */
export interface ChangePasswordData {
    /** Senha atual */
    currentPassword: string,
    /** Nova senha */
    newPassword: string,
    /** Confirmação da nova senha */
    confirmPassword?: string
}

/**
 * Interface genérica para reset de senha
 * @interface ResetPasswordData
 */
export interface ResetPasswordData {
    /** Email para reset */
    email?: string,
    /** Token de reset */
    token?: string,
    /** Nova senha */
    newPassword?: string
}