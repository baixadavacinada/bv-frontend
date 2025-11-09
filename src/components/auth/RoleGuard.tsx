'use client'

import { useAuth, UserRole, Permission } from '@/hooks/use-firebase-auth'
import AccessDenied from './AccessDenied'

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
  fallback,
  children,
}: RoleGuardProps) {
  const { user, loading, hasRole, hasPermission } = useAuth()

  // Define o fallback padrão como AccessDenied se não for fornecido
  const defaultFallback = fallback !== undefined ? fallback : <AccessDenied />

  if (loading) {
    return <div suppressHydrationWarning>{defaultFallback}</div>
  }

  if (requireAuth && !user) {
    return <>{defaultFallback}</>
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !hasRole(allowedRoles)) {
      return <>{defaultFallback}</>
    }
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    if (!user || !hasPermission(requiredPermissions, requireAll)) {
      return <>{defaultFallback}</>
    }
  }

  return <>{children}</>
}
