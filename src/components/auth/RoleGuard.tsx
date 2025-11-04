'use client'

import { useAuth, UserRole, Permission } from '@/hooks/use-firebase-auth'

interface RoleGuardProps {
  allowedRoles?: UserRole[]
  requiredPermissions?: Permission[]
  requireAll?: boolean // Se true, requer TODAS as permissões. Se false, requer PELO MENOS UMA
  requireAuth?: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function RoleGuard({
  allowedRoles,
  requiredPermissions,
  requireAll = false,
  requireAuth = false,
  fallback = null,
  children,
}: RoleGuardProps) {
  const { user, loading, hasRole, hasPermission } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (requireAuth && !user) {
    return <>{fallback}</>
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !hasRole(allowedRoles)) {
      return <>{fallback}</>
    }
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    if (!user || !hasPermission(requiredPermissions, requireAll)) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}
