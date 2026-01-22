interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}
export interface Page<T = unknown> {
    content: T[];
    page: PageInfo;
}
export declare const initialPage: Page;
export {};
//# sourceMappingURL=response.d.ts.map