/**
 * @fileoverview Pacote React para gerenciamento de requisições HTTP com autenticação JWT
 * @author Marcelo Gadelha
 * @version 1.0.3
 * @license Apache License 2.0
 *
 * Este pacote fornece uma solução completa para:
 * - Autenticação JWT com interceptors automáticos
 * - Hooks React para requisições e gerenciamento de estado
 * - Componentes de autenticação e autorização
 * - Operações CRUD padronizadas
 * - Gerenciamento de tokens e paginação
 */
export * from './api/client';
export * from './types/auth';
export * from './types/error';
export * from './types/request';
export * from './types/response';
export * from './types/token';
export * from './hooks/AuthContext';
export * from './hooks/AuthProvider';
export * from './hooks/useAuth';
export * from './hooks/useRequest';
export * from './services/api';
export * from './services/auth';
export * from './services/crud';
export * from './services/token';
export * from './utils/constants';
//# sourceMappingURL=index.d.ts.map