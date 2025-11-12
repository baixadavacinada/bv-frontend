'use client'
import { BvTitleHeader } from '@/components'
import { UbsForm } from '@/components/design/BvUbsFrom' // Ajuste o caminho para seu UbsForm
import { useHealthUnits } from '@/hooks/use-health-units'
import { HealthUnit } from '@/types/health-units'
import { notFound, useParams } from 'next/navigation'
import { Suspense } from 'react'

export default function UbsPage() {
  const params = useParams()
  const { data, isLoading } = useHealthUnits()
  const id = params.id as string
  const isNew = id === 'novo'
  let initialData: HealthUnit | undefined = undefined
  let title = ''

  if (isLoading) {
    return <div>Carregando...</div>
  }
  if (!data) {
    return <div>Falha ao carregar os dados.</div>
  }

  if (isNew) {
    title = 'Adicionar UBS'
  } else {
    title = 'Editar UBS'
    const result = data.find((ubs) => ubs._id === id)

    if (!result) {
      notFound()
    }
    initialData = result
  }
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="container mx-auto p-8">
        <BvTitleHeader title={title} className="mb-8" />
        <UbsForm initialData={initialData} slug={id} />
      </div>
    </Suspense>
  )
}
