interface Sort {
    key: string;
    order: 'ASC' | 'DESC';
}
export interface Search {
    value?: string;
    page?: number;
    size?: number;
    sort?: Sort;
}
export declare const initialSearch: Search;
export {};
//# sourceMappingURL=request.d.ts.map