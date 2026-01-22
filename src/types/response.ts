/**
 * Interface que representa as informações de paginação
 * @interface PageInfo
 */
export interface PageInfo {
    /** Tamanho da página atual */
    size: number,
    /** Número da página atual */
	number: number,
    /** Total de elementos em todas as páginas */
	totalElements: number,
    /** Total de páginas disponíveis */
	totalPages: number
}

/**
 * Interface genérica que representa uma resposta paginada da API
 * @template T Tipo dos elementos contidos na página
 * @interface Page
 */
export interface Page<T = unknown> {
    /** Array com os elementos da página atual */
	content: T[],
    /** Informações de paginação */
	page: PageInfo
}

/**
 * Interface para respostas de API genéricas
 * @template T Tipo dos dados retornados
 * @interface ApiResponse
 */
export interface ApiResponse<T = unknown> {
    /** Indica se a operação foi bem-sucedida */
    success: boolean,
    /** Dados retornados (se sucesso) */
    data?: T,
    /** Mensagem de resposta */
    message?: string,
    /** Erros de validação (se falha) */
    errors?: Array<{ field: string; message: string }>
}