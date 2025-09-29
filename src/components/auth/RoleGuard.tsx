'use client'

import { useAuth, UserRole } from '@/mock/auth'

interface RoleGuardProps {
  allowedRoles?: UserRole[]
  requireAuth?: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

/**
 * RoleGuard é um componente que protege seus filhos baseado na role do usuário.
 * Usar para seções complexas, paginas ou layouts inteiros.
 **/

export function RoleGuard({
  allowedRoles,
  requireAuth = false,
  fallback = null,
  children,
}: RoleGuardProps) {
  const { isAuthenticated, role } = useAuth()

  // Se requer autenticação e não está autenticado
  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>
  }

  // Se tem roles específicos e o usuário não tem permissão
  if (allowedRoles && (!isAuthenticated || !allowedRoles.includes(role as UserRole))) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
