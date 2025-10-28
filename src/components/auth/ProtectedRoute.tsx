'use client'

import React from 'react'
import { useAuth, UserRole } from '@/hooks/use-firebase-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requireAuth?: boolean
  fallback?: React.ReactNode
  redirectTo?: string
}

/**
 * ProtectedRoute é um componente que protege seus filhos baseado na autenticação Firebase
 * e role do usuário do backend.
 */
export function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  useAccessibilityValidation({ enabled: true })

  const { user, loading, error } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Se requer autenticação e não está carregando
    if (requireAuth && !loading) {
      // Se não tem usuário ou houve erro, redireciona
      if (!user || error) {
        router.push(redirectTo)
        return
      }

      // Se tem roles específicos e o usuário não tem permissão
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push('/acesso-negado')
        return
      }
    }
  }, [user, loading, error, requireAuth, allowedRoles, router, redirectTo])

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se tem erro de autenticação, mostra fallback ou loading
  if (error && requireAuth) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md space-y-4 text-center">
            <div className="text-red-600">
              <svg
                className="mx-auto mb-4 h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Erro de autenticação</h2>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )
    )
  }

  // Se requer autenticação e não está autenticado
  if (requireAuth && !user) {
    return fallback || null
  }

  // Se tem roles específicos e o usuário não tem permissão
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md space-y-4 text-center">
            <div className="text-amber-600">
              <svg
                className="mx-auto mb-4 h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Acesso restrito</h2>
            <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
            <p className="text-sm text-gray-500">
              Sua role atual: <span className="font-medium">{user.role}</span>
            </p>
            <button
              onClick={() => router.back()}
              className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
              Voltar
            </button>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
