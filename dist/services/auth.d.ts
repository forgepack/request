import { AxiosInstance } from 'axios';
import { ErrorMessage } from '../types/error';
import { LoginCredentials, LoginResponse, ChangePasswordData, ResetPasswordData } from '../types/auth';
/**
 * Realiza login do usuário e armazena o token retornado
 *
 * @param api - Instância do Axios configurada
 * @param url - Endpoint de login
 * @param credentials - Credenciais do usuário
 * @returns Promise com resposta de login formatada
 *
 * @example
 * ```typescript
 * const result = await login(api, '/auth/login', {
 *   username: 'user',
 *   password: 'pass'
 * })
 *
 * if (result.success) {
 *   console.log('Logado!', result.data)
 * } else {
 *   console.error('Erros:', result.errors)
 * }
 * ```
 */
export declare const login: (api: AxiosInstance, url: string, credentials: LoginCredentials) => Promise<LoginResponse>;
/**
 * Realiza reset de senha do usuário e atualiza o token
 *
 * @param api - Instância do Axios configurada
 * @param url - Endpoint de reset de senha
 * @param data - Dados para reset da senha
 * @returns Promise com dados de auth ou array de erros
 */
export declare const reset: (api: AxiosInstance, url: string, data: ResetPasswordData) => Promise<LoginResponse>;
/**
 * Remove o token do localStorage e desloga o usuário
 */
export declare const logout: () => void;
/**
 * Altera a senha do usuário autenticado
 *
 * @param api - Instância do Axios configurada
 * @param data - Dados para alteração da senha
 * @returns Promise com resposta de sucesso ou erros
 */
export declare const changePassword: (api: AxiosInstance, data: ChangePasswordData) => Promise<{
    success: boolean;
    errors?: ErrorMessage[];
}>;
//# sourceMappingURL=auth.d.ts.map