'use client'
import { UserFormContent } from './UserFormContent'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function UserFormPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UserFormContent />
    </Suspense>
  )
}
