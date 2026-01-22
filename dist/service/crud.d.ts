import { AxiosInstance } from 'axios';
import { ErrorMessage } from '../component/errorMessage';
import { Search } from '../component/request';
export declare const login: <Auth>(api: AxiosInstance, url: string, object: Auth) => Promise<Auth | ErrorMessage[]>;
export declare const reset: <Auth>(api: AxiosInstance, url: string, object: Auth) => Promise<Auth | ErrorMessage[]>;
export declare const logout: () => void;
export declare const changePassword: <User>(api: AxiosInstance, data: User) => Promise<User | ErrorMessage[]>;
export declare const create: <T>(api: AxiosInstance, url: string, object: T) => Promise<any>;
export declare const createAll: <T>(api: AxiosInstance, url: string, object: T[]) => Promise<T | ErrorMessage[]>;
export declare const retrieve: <T>(api: AxiosInstance, url: string, search?: Search, signal?: AbortSignal) => Promise<T | ErrorMessage[]>;
export declare const update: <T>(api: AxiosInstance, url: string, object: T) => Promise<T | ErrorMessage[]>;
export declare const remove: <T>(api: AxiosInstance, url: string, id: string) => Promise<T | ErrorMessage[]>;
export declare const removeComposite: <T>(api: AxiosInstance, url: string, object: Object, one: string, two: string, three: string, four: string) => Promise<T | ErrorMessage[]>;
export declare const removeAll: <T>(api: AxiosInstance, url: string) => Promise<T | ErrorMessage[]>;
//# sourceMappingURL=crud.d.ts.map