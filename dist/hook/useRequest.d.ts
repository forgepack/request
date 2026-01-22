import { ErrorMessage } from '../component/errorMessage';
import { Page } from '../component/response';
import { Search } from '../component/request';
import { AxiosInstance } from 'axios';
export declare const useRequest: (api: AxiosInstance, endpoint: string, search?: Search) => {
    response: Page<unknown>;
    error: ErrorMessage[];
    loading: boolean;
    request: () => Promise<void>;
};
//# sourceMappingURL=useRequest.d.ts.map