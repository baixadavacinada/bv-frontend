'use client'

import { RoleGuard } from '@/components'

export default function AssessmentsPage() {
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
      <div>Avaliação</div>
    </RoleGuard>
  )
}
