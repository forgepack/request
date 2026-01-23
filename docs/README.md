# Documentação - @forgepack/request

Documentação completa do pacote React para gerenciamento de requisições HTTP com autenticação JWT.

## 📚 Índice

### Guias de Uso
- [Instalação e Configuração](./getting-started.md)
- [Autenticação](./authentication.md)  
- [Proteção de Rotas](./route-protection.md)
- [Requisições e Paginação](./requests.md)
- [Operações CRUD](./crud-operations.md)
- [Gerenciamento de Tokens](./token-management.md)

### Exemplos Práticos
- [Formulário de Login](./examples/login-form.md)
- [Lista de Usuários](./examples/users-list.md)
- [Dashboard Completo](./examples/dashboard.md)
- [Serviços de Usuário](./examples/user-service.md)

### Referência da API
- [Hooks](./api/hooks.md)
- [Componentes](./api/components.md)
- [Serviços](./api/services.md)
- [Tipos TypeScript](./api/types.md)
- [Utilitários](./api/utilities.md)

## 🚀 Recursos Principais

- **🔐 Autenticação JWT** - Sistema completo com interceptors automáticos
- **🛡️ Proteção de Rotas** - Controle de acesso baseado em roles
- **📊 Requisições Reativas** - Hooks com estado automático
- **⚡ CRUD Simplificado** - Operações padronizadas
- **🔑 Tokens Seguros** - Validação e gerenciamento automático
- **📱 Interface Responsiva** - Estados de loading e erro

## 💡 Filosofia do Pacote

Este pacote foi desenvolvido para eliminar o boilerplate comum em aplicações React que precisam de:

1. **Autenticação JWT segura** com renovação automática
2. **Interceptors HTTP** para adicionar tokens automaticamente  
3. **Gerenciamento de estado** para requisições
4. **Proteção de rotas** baseada em permissões
5. **Operações CRUD** padronizadas e reutilizáveis

## 🎯 Casos de Uso Ideais

- Aplicações SPA (React, Next.js, Vite)
- Dashboards administrativos
- Portais de usuário
- APIs REST com autenticação JWT
- Sistemas com múltiplos níveis de permissão

## 📋 Pré-requisitos

- React 18+
- React Router DOM 6+
- TypeScript (recomendado)
- Axios (incluído como dependência)