import { Auth } from '../component/auth';
import { AxiosInstance } from 'axios';
export interface AuthContextType extends Auth {
    loginUser: (credentials: any) => Promise<any>;
    logoutUser: () => void;
    isAuthenticated: boolean;
}
export declare const AuthContext: import("react").Context<AuthContextType>;
export declare const AuthProvider: ({ api, children }: {
    api: AxiosInstance;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=useProvider.d.ts.map