/**
 * Interface representing pagination information
 * @interface PageInfo
 */
export interface PageInfo {
    /** Current page size */
    size: number,
    /** Current page number */
	number: number,
    /** Total elements across all pages */
	totalElements: number,
    /** Total available pages */
	totalPages: number
}

/**
 * Generic interface representing a paginated API response
 * @template T Type of elements contained in the page
 * @interface Page
 */
export interface Page<T = unknown> {
    /** Array with current page elements */
	content: T[],
    /** Pagination information */
	page: PageInfo
}

/**
 * Interface for generic API responses
 * @template T Type of returned data
 * @interface ApiResponse
 */
export interface ApiResponse<T = unknown> {
    /** Indicates if the operation was successful */
    success: boolean,
    /** Returned data (if successful) */
    data?: T,
    /** Response message */
    message?: string,
    /** Validation errors (if failed) */
    errors?: Array<{ field: string; message: string }>
}