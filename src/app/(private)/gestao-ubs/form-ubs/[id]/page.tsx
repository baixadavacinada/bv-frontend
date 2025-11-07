import { BvTitleHeader } from '@/components'
import { UbsForm } from '@/components/design/BvUbsFrom' // Ajuste o caminho para seu UbsForm
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type UbsData = {
  nome: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  latitude: number
  longitude: number
}

async function getUbsById(id: string): Promise<UbsData | null> {
  try {
    const res = await fetch(`https://sua-api.com/api/ubs/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar UBS:', error)
    return null
  }
}

export default async function UbsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'novo'

  let initialData: UbsData | undefined = undefined
  let title = ''

  if (isNew) {
    title = 'Adicionar UBS'
  } else {
    title = 'Editar UBS'
    const data = await getUbsById(id)

    if (!data) {
      notFound()
    }
    initialData = data
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
