/**
 * Interface defining sort parameters
 * @interface Sort
 */
export interface Sort {
    /** Field to sort by */
    key: string,
    /** Sort direction */
    order: 'ASC' | 'DESC'
}

/**
 * Interface defining search and pagination parameters
 * @interface Search
 */
export interface Search {
    /** Search/filter term */
    value?: string,
    /** Page number (zero-based) */
    page?: number,
    /** Number of items per page */
    size?: number,
    /** Sort configuration */
    sort?: Sort
}