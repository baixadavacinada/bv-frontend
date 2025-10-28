# Integração de Autenticação Frontend-Backend

## Visão Geral

Este documento descreve como o sistema de autenticação foi alinhado entre frontend e backend para garantir consistência e segurança no MVP do Baixada Vacinada.

## Sistema de Permissões

### Novo Padrão de Permissões (read_*/write_*)

O sistema agora usa permissões granulares baseadas em ações:

```typescript
type Permission = 
  | 'read_users'          // Visualizar usuários
  | 'write_users'         // Gerenciar usuários
  | 'read_health_units'   // Visualizar unidades de saúde
  | 'write_health_units'  // Gerenciar unidades de saúde
  | 'read_vaccines'       // Visualizar vacinas
  | 'write_vaccines'      // Gerenciar vacinas
  | 'read_appointments'   // Visualizar agendamentos
  | 'write_appointments'  // Gerenciar agendamentos
  | 'read_notifications'  // Visualizar notificações
  | 'write_notifications' // Gerenciar notificações
  | 'read_analytics'      // Visualizar análises
  | 'write_analytics'     // Gerenciar análises
  | 'read_reports'        // Visualizar relatórios
  | 'write_reports'       // Gerenciar relatórios
```

### Mapeamento de Roles para Permissões

```typescript
const ROLE_PERMISSIONS = {
  admin: [
    'read_users', 'write_users',
    'read_health_units', 'write_health_units',
    'read_vaccines', 'write_vaccines',
    'read_appointments', 'write_appointments',
    'read_notifications', 'write_notifications',
    'read_analytics', 'write_analytics',
    'read_reports', 'write_reports'
  ],
  agent: [
    'read_vaccines', 'write_vaccines',
    'read_appointments', 'write_appointments',
    'read_reports'
  ],
  public: []
}
```

## Endpoints da API

### Endpoints Atualizados

- **Profile**: `/api/profile` (GET, POST)
- **User Role Update**: `/api/users/:uid/role` (PUT)
- **List Users**: `/api/users` (GET)

### Headers Obrigatórios

```typescript
{
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Como Usar no Frontend

### 1. Hook useAuth

```tsx
import { useAuth } from '@/hooks/use-firebase-auth'

function MyComponent() {
  const { 
    user, 
    hasPermission, 
    hasRole, 
    canManageUsers,
    canManageVaccines 
  } = useAuth()

  if (hasPermission('write_users')) {
    // Usuário pode gerenciar usuários
  }

  if (hasRole(['admin', 'agent'])) {
    // Usuário é admin ou agente
  }
}
```

### 2. RoleGuard Component

```tsx
import { RoleGuard } from '@/components/auth/RoleGuard'

// Proteger por role
<RoleGuard allowedRoles={['admin']}>
  <AdminPanel />
</RoleGuard>

// Proteger por permissão
<RoleGuard requiredPermissions={['write_users']}>
  <UserManagement />
</RoleGuard>

// Proteger por múltiplas permissões (requer todas)
<RoleGuard 
  requiredPermissions={['read_reports', 'write_reports']} 
  requireAll={true}
>
  <ReportsPanel />
</RoleGuard>

// Proteger por múltiplas permissões (requer pelo menos uma)
<RoleGuard 
  requiredPermissions={['read_vaccines', 'write_vaccines']} 
  requireAll={false}
>
  <VaccinesView />
</RoleGuard>
```

### 3. Verificação Manual de Permissões

```tsx
const { hasPermission } = useAuth()

// Verificar uma permissão
const canEdit = hasPermission('write_vaccines')

// Verificar múltiplas permissões (pelo menos uma)
const canView = hasPermission(['read_vaccines', 'write_vaccines'])

// Verificar múltiplas permissões (todas obrigatórias)
const canManage = hasPermission(['read_users', 'write_users'], true)
```

## Segurança

### Validação Dupla
- Frontend: Controle de UI e UX
- Backend: Validação autoritativa usando middleware `firebaseAuthAdvanced`

### JWT Token Management
- Tokens armazenados em cookies HTTPOnly (produção)
- Renovação automática no frontend
- Validação rigorosa no backend

### Cache Strategy
- Cache local de 30 minutos para perfis
- Invalidação automática no logout
- Refresh manual disponível

## Migração de Código Antigo

### Substituições Necessárias

```typescript
// ANTES
hasPermission('manage_users')
hasPermission('manage_vaccines') 
hasPermission('view_reports')

// DEPOIS
hasPermission('write_users')
hasPermission('write_vaccines')
hasPermission('read_reports')
```

### Endpoints Antigos vs Novos

```typescript
// ANTES
'/api/auth/profile'
'/api/auth/profile/role'
'/api/auth/users'

// DEPOIS  
'/api/profile'
'/api/users/:uid/role'
'/api/users'
```

## Exemplos de Uso Comum

### Dashboard Admin
```tsx
<RoleGuard allowedRoles={['admin']}>
  <AdminDashboard />
</RoleGuard>
```

### Gestão de Vacinas
```tsx
<RoleGuard requiredPermissions={['read_vaccines']}>
  <VaccinesList />
  
  <RoleGuard requiredPermissions={['write_vaccines']}>
    <AddVaccineButton />
  </RoleGuard>
</RoleGuard>
```

### Relatórios
```tsx
<RoleGuard requiredPermissions={['read_reports']}>
  <ReportsView />
</RoleGuard>
```

## Troubleshooting

### Problemas Comuns

1. **Token Expirado**: O hook automaticamente renova tokens
2. **Permissões Inconsistentes**: Verifique se o backend foi atualizado
3. **Cache Desatualizado**: Use `refreshUser()` para forçar atualização

### Debug

```tsx
const { user } = useAuth()
console.log('User permissions:', user?.permissions)
console.log('User role:', user?.role)
```

## Performance

- Cache de 30 minutos reduz chamadas desnecessárias
- Lazy loading de permissões
- Otimização de re-renders com React Context

## Próximos Passos

1. Implementar logs de auditoria
2. Adicionar permissões por UBS específica
3. Sistema de notificações de mudanças de permissão