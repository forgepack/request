import { Auth } from '../component/auth';
import { Header, Payload } from '../component/token';
export declare const isValidToken: () => boolean;
export declare const getToken: () => Auth;
export declare const setToken: (token: any) => void;
export declare const removeToken: () => void;
export declare const getPayload: () => Payload;
export declare const decodeJwt: () => string | null;
export declare const getHeader: () => Header;
//# sourceMappingURL=token.d.ts.map