import { AxiosInstance } from 'axios';
/**
 * Provedor de contexto de autenticação que gerencia o estado de autenticação globalmente
 *
 * Funcionalidades:
 * - Gerencia estado de autenticação persistente
 * - Verifica expiração de tokens automaticamente
 * - Sincroniza estado entre abas do navegador
 * - Fornece métodos de login/logout
 *
 * @param props - Propriedades do componente
 * @param props.api - Instância do Axios para requisições
 * @param props.children - Componentes filhos que receberão o contexto
 * @returns Provider component
 *
 * @example
 * ```tsx
 * <AuthProvider api={apiClient}>
 *   <App />
 * </AuthProvider>
 * ```
 */
export declare const AuthProvider: ({ api, children }: {
    api: AxiosInstance;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AuthProvider.d.ts.map