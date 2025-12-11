'use client'

export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import { VaccineFormContent } from './VaccineFormContent'

export default function VaccineFormPage() {
  return (
    <Suspense fallback={null}>
      <VaccineFormContent />
    </Suspense>
  )
}
