'use client'

import { BvTitleHeader } from '@/components'
import { UbsForm } from '@/components/design/BvUbsFrom'
import { Suspense } from 'react'

/**
 * Página para adicionar uma nova Unidade Básica de Saúde
 * Route: /gestao-ubs/adicionar
 *
 * Componente wrapper que chama o formulário compartilhado sem dados iniciais
 */
export default function AdicionarUbsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="container mx-auto p-8">
        <BvTitleHeader title="Adicionar UBS" className="mb-8" />
        <UbsForm slug="novo" />
      </div>
    </Suspense>
  )
}
