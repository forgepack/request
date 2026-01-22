/**
 * Interface que representa uma mensagem de erro de validação
 * @interface ErrorMessage
 */
export interface ErrorMessage {
    /** Nome do campo que contém o erro */
    field: string,
    /** Mensagem descritiva do erro */
    message: string
}