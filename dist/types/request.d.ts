/**
 * Interface que define os parâmetros de ordenação
 * @interface Sort
 */
export interface Sort {
    /** Campo pelo qual ordenar */
    key: string;
    /** Direção da ordenação */
    order: 'ASC' | 'DESC';
}
/**
 * Interface que define os parâmetros de busca e paginação
 * @interface Search
 */
export interface Search {
    /** Termo de busca/filtro */
    value?: string;
    /** Número da página (baseado em zero) */
    page?: number;
    /** Quantidade de itens por página */
    size?: number;
    /** Configuração de ordenação */
    sort?: Sort;
}
//# sourceMappingURL=request.d.ts.map