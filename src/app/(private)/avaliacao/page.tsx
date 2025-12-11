'use client'

import { RoleGuard } from '@/components'

export const dynamic = 'force-dynamic'

export default function AssessmentsPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'agent', 'public']} requireAuth>
      <div>Avaliação</div>
    </RoleGuard>
  )
}
