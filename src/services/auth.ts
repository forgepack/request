import { AxiosInstance } from 'axios'
import { ErrorMessage } from '../types/error'
import { Auth, LoginCredentials, LoginResponse, ChangePasswordData, ResetPasswordData } from '../types/auth'
import { removeToken, setToken } from './token'

/**
 * Processa erros de resposta da API e converte em formato padronizado
 * 
 * @param error - Objeto de erro do Axios
 * @returns Array de mensagens de erro formatadas
 */
const addError = (error: any): ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    if (error.response?.data?.validationErrors) {
        error.response.data.validationErrors.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        errorMessage.push({ 
            field: 'Error', 
            message: error.response?.data?.message || 'Internal Error' 
        })
    }
    return errorMessage
}

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
export const login = async (api: AxiosInstance, url: string, credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await api.post<Auth>(url, credentials)
        setToken(response.data)
        return {
            success: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            success: false,
            errors: addError(error)
        }
    }
}

/**
 * Realiza reset de senha do usuário e atualiza o token
 * 
 * @param api - Instância do Axios configurada
 * @param url - Endpoint de reset de senha
 * @param data - Dados para reset da senha
 * @returns Promise com dados de auth ou array de erros
 */
export const reset = async (api: AxiosInstance, url: string, data: ResetPasswordData): Promise<LoginResponse> => {
    try {
        const response = await api.put<Auth>(url, data)
        setToken(response.data)
        return {
            success: true,
            data: response.data
        }
    } catch (error: any) {
        return {
            success: false,
            errors: addError(error)
        }
    }
}

/**
 * Remove o token do localStorage e desloga o usuário
 */
export const logout = () => {
    removeToken()
}

/**
 * Altera a senha do usuário autenticado
 * 
 * @param api - Instância do Axios configurada
 * @param data - Dados para alteração da senha
 * @returns Promise com resposta de sucesso ou erros
 */
export const changePassword = async (api: AxiosInstance, data: ChangePasswordData): Promise<{ success: boolean; errors?: ErrorMessage[] }> => {
    try {
        await api.put(`/user/changePassword`, data)
        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            errors: addError(error)
        }
    }
}