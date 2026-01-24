import { Auth } from '../types/auth'
import { ErrorMessage } from '../types/error'
import { Search } from '../types/request'
import { Page, PageInfo } from '../types/response'
import { Header, Payload } from '../types/token'

/**
 * Empty initial state for authentication data
 * @constant
 */
export const initialAuth: Auth = {
    accessToken: '',
	refreshToken: '',
	tokenType: '',
	role: []
}

/**
 * Empty initial state for error messages
 * @constant
 */
export const initialErrorMessage: ErrorMessage = {
    field: '',
    message: ''
}

/**
 * Default configuration for searches and pagination
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
 * Empty initial state for pagination information
 * @constant
 */
export const initialPageInfo: PageInfo = {
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0
}

/**
 * Empty initial state for paginated responses
 * @constant
 */
export const initialPage: Page = {
    content: [],
    page: initialPageInfo
}

/**
 * Empty initial state for token header
 * @constant
 */
export const initialHeader: Header = {
    alg: '',
    typ: ''
}

/**
 * Empty initial state for token payload
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