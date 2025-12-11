'use client'

export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import { EducationalMaterialsFormContent } from './EducationalMaterialsFormContent'

export default function EducationalMaterialsFormPage() {
  return (
    <Suspense fallback={null}>
      <EducationalMaterialsFormContent />
    </Suspense>
  )
}
