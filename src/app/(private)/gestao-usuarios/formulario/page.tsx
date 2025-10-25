'use client'

import React, { Suspense } from 'react'
import { UserFormContent } from './UserFormContent'

export default function UserFormPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UserFormContent />
    </Suspense>
  )
}
