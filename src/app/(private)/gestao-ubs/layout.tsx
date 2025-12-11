'use client'

export const dynamic = 'force-dynamic'

import { RoleGuard } from '@/components'

export default function GestaoUbsLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin', 'agent']} requireAuth>
      {children}
    </RoleGuard>
  )
}
