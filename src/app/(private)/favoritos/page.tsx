'use client'

import { RoleGuard } from '@/components'

export default function FavoritesScreen() {
  return (
    <RoleGuard
      allowedRoles={['admin', 'agent', 'public']}
      requireAuth={true}
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-600">
            Acesso negado. Você não tem permissão para acessar esta página.
          </p>
        </div>
      }
    >
      <div aria-label="Página de favoritos do aplicativo">
        <h1>favoritos</h1>
      </div>
    </RoleGuard>
  )
}
