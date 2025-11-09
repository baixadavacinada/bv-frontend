'use client'
import { UserFormContent } from './UserFormContent'
import { Suspense } from 'react'

export default function UserFormPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UserFormContent />
    </Suspense>
  )
}
