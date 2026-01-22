import { Auth } from '../types/auth'
import { ErrorMessage } from '../types/error'
import { Search } from '../types/request'
import { Page, PageInfo } from '../types/response'
import { Header, Payload } from '../types/token'

/**
 * Estado inicial vazio para dados de autenticação
 * @constant
 */
export const initialAuth: Auth = {
    accessToken: '',
	refreshToken: '',
	tokenType: '',
	role: []
}

/**
 * Estado inicial vazio para mensagens de erro
 * @constant
 */
export const initialErrorMessage: ErrorMessage = {
    field: '',
    message: ''
}

/**
 * Configuração padrão para buscas e paginação
 * @constant
 */
export const initialSearch: Search = {
    value: '',
    page: 0,
    size: 15,
    sort: {
        key: 'id',
        order: 'ASC',
    }
}

/**
 * Estado inicial vazio para informações de paginação
 * @constant
 */
export const initialPageInfo: PageInfo = {
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0
}

/**
 * Estado inicial vazio para respostas paginadas
 * @constant
 */
export const initialPage: Page = {
    content: [],
    page: initialPageInfo
}

/**
 * Estado inicial vazio para cabeçalho de token
 * @constant
 */
export const initialHeader: Header = {
    alg: '',
    typ: ''
}

/**
 * Estado inicial vazio para payload de token
 * @constant
 */
export const initialPayload: Payload = {
    jti: '',
    iss: '',
    iat: 0,
    nbf: 0,
    exp: 0,
    sub: '',
    aud: ''
}