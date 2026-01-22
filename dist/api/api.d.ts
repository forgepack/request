import { AxiosInstance } from "axios";
export type ApiClientOptions = {
    baseURL: string;
    onUnauthorized?: () => void;
    onForbidden?: () => void;
};
export declare const createApiClient: (options: ApiClientOptions) => AxiosInstance;
//# sourceMappingURL=api.d.ts.map