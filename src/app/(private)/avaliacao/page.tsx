'use client'

import { RoleGuard } from '@/components'

export default function AssessmentsPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'agent', 'public']} requireAuth>
      <div>Avaliação</div>
    </RoleGuard>
  )
}
