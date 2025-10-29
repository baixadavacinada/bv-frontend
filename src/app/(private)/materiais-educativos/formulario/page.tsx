'use client'

import React, { Suspense } from 'react'
import { EducationalMaterialsFormContent } from './EducationalMaterialsFormContent'

export default function EducationalMaterialsFormPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EducationalMaterialsFormContent />
    </Suspense>
  )
}
