'use client'

import { RoleGuard } from '@/components'

export default function FavoritesScreen() {
  return (
    <RoleGuard allowedRoles={['admin', 'agent', 'public']} requireAuth>
      <div aria-label="Página de favoritos do aplicativo">
        <h1>favoritos</h1>
      </div>
    </RoleGuard>
  )
}
