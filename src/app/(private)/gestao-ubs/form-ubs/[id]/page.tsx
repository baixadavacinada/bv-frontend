'use client'
import { BvTitleHeader } from '@/components'
import { UbsForm } from '@/components/design/BvUbsFrom' // Ajuste o caminho para seu UbsForm
import { useHealthUnits } from '@/hooks/use-health-units'
import { HealthUnit } from '@/types/health-units'
import { notFound } from 'next/navigation'
import { Suspense, useEffect } from 'react'

export default function UbsPage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useHealthUnits()
  const { id } = params
  const isNew = id === 'novo'
  let initialData: HealthUnit | undefined = undefined
  let title = ''

  if (isLoading) {
    return <div>Carregando...</div>
  }
  if (!data) {
    return <div>Falha ao carregar os dados.</div>
  }
  console.log(data)
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
        <UbsForm initialData={initialData} />
      </div>
    </Suspense>
  )
}
