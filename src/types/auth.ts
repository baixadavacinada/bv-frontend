/**
 * Tipos compartilhados para autenticação - Frontend
 * Deve ser mantido em sincronia com o backend
 */

export type UserRole = 'admin' | 'agent' | 'public'

export type Permission =
  | 'read_users'
  | 'write_users'
  | 'read_health_units'
  | 'write_health_units'
  | 'read_vaccines'
  | 'write_vaccines'
  | 'read_appointments'
  | 'write_appointments'
  | 'read_notifications'
  | 'write_notifications'
  | 'read_analytics'
  | 'write_analytics'
  | 'read_reports'
  | 'write_reports'

export interface UserClaims {
  role: UserRole
  permissions: Permission[]
  ubsId?: string
  isActive: boolean
  metadata?: {
    lastRoleUpdate: string
    updatedBy?: string
    department?: string
    region?: string
  }
}

export interface UserProfile extends UserClaims {
  uid: string
  email: string | null
  displayName?: string | null
  photoURL?: string
  phone?: string | null
  emailVerified: boolean
  createdAt: string
  lastSignIn?: string
}

// Mapeamento de roles para permissões padrão
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'read_users',
    'write_users',
    'read_health_units',
    'write_health_units',
    'read_vaccines',
    'write_vaccines',
    'read_appointments',
    'write_appointments',
    'read_notifications',
    'write_notifications',
    'read_analytics',
    'write_analytics',
    'read_reports',
    'write_reports',
  ],
  agent: [
    'read_vaccines',
    'write_vaccines',
    'read_appointments',
    'write_appointments',
    'read_reports',
  ],
  public: [],
}

// Interface para requests de atualização de claims
export interface ClaimsUpdateRequest {
  uid: string
  role?: UserRole
  permissions?: Permission[]
  ubsId?: string
  isActive?: boolean
}

// Interface para responses da API
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

export interface ClaimsUpdateResponse {
  success: boolean
  data?: {
    uid: string
    claims: UserClaims
    updatedAt: string
  }
  error?: {
    code: string
    message: string
  }
}

// Helper types para componentes
export interface RoleGuardProps {
  allowedRoles?: UserRole[]
  requiredPermissions?: Permission[]
  requireAll?: boolean // Se true, requer TODAS as permissões. Se false, requer PELO MENOS UMA
  fallback?: React.ReactNode
  children: React.ReactNode
}

// Mapeamento de roles para display
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  admin: 'Administrador',
  agent: 'Profissional de Saúde',
  public: 'Usuário Público',
}

// Mapeamento de permissões para display
export const PERMISSION_DISPLAY_NAMES: Record<Permission, string> = {
  read_users: 'Visualizar Usuários',
  write_users: 'Gerenciar Usuários',
  read_health_units: 'Visualizar Unidades de Saúde',
  write_health_units: 'Gerenciar Unidades de Saúde',
  read_vaccines: 'Visualizar Vacinas',
  write_vaccines: 'Gerenciar Vacinas',
  read_appointments: 'Visualizar Agendamentos',
  write_appointments: 'Gerenciar Agendamentos',
  read_notifications: 'Visualizar Notificações',
  write_notifications: 'Gerenciar Notificações',
  read_analytics: 'Visualizar Análises',
  write_analytics: 'Gerenciar Análises',
  read_reports: 'Visualizar Relatórios',
  write_reports: 'Gerenciar Relatórios',
}
