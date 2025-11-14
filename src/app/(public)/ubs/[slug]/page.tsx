'use client'
import { BvTitleHeader } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import { BvShareMenu } from '@/components/design/BvShareMenu'
import { LazyUbsMap } from '@/components/design/LazyUbsMap'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Button } from '@/components/ui/button'
import { Syringe, Heart, Plus } from 'lucide-react'
import { notFound, useRouter } from 'next/navigation'
import { useHealthUnits } from '@/hooks/use-health-units'
import { HealthUnit } from '@/types/health-units'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'
import { toSlug } from '@/utils/slug'
import { toggleFavoriteHealthUnit } from '@/services/actions/favorites-actions'
import SecondDoseModal from '@/components/common/SecondDoseModal'
import {
  saveSecondDoseConfiguration,
  getSecondDoseConfiguration,
} from '@/services/second-dose-service'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-firebase-auth'

interface DetailUbsProps {
  params: Promise<{ slug: string }>
}

export default function DetailUbs({ params }: DetailUbsProps) {
  const resolvedParams = React.use(params)
  const route = useRouter()
  const { user } = useAuth()
  useAccessibilityValidation({ enabled: true })

  const { data, isLoading, error } = useHealthUnits()
  const [showSecondDoseModal, setShowSecondDoseModal] = React.useState(false)
  const [selectedVaccines, setSelectedVaccines] = React.useState<string[]>([])

  const ubsDataFromApi = React.useMemo(() => {
    if (!data) return undefined
    let found = data.find((unit: HealthUnit) => unit._id === resolvedParams.slug)

    if (!found) {
      found = data.find((unit: HealthUnit) => {
        const nameSlug = toSlug(unit.name)
        return nameSlug === resolvedParams.slug
      })
    }

    return found
  }, [data, resolvedParams.slug])

  const [ubs, setUbs] = React.useState<HealthUnit | null>(null)
  // Carregar vacinas selecionadas ao abrir a página
  React.useEffect(() => {
    const loadSelectedVaccines = async () => {
      try {
        const config = await getSecondDoseConfiguration?.()
        if (config && config.selectedVaccines) {
          setSelectedVaccines(config.selectedVaccines)
        }
      } catch (error) {
        console.error('Erro ao carregar vacinas selecionadas:', error)
      }
    }

    if (user) {
      loadSelectedVaccines()
    }
  }, [user])
  const [isLiked, setIsLiked] = React.useState(false)

  React.useEffect(() => {
    if (ubsDataFromApi) {
      const likedUbs = localStorage.getItem('liked_ubs')
      const likedList = likedUbs ? JSON.parse(likedUbs) : []
      setIsLiked(likedList.includes(ubsDataFromApi._id))

      const transformedData: HealthUnit = {
        id: ubsDataFromApi._id,
        name: ubsDataFromApi.name,
        neighborhood: ubsDataFromApi.neighborhood,
        address: ubsDataFromApi.address || 'Endereço não informado',
        phone: ubsDataFromApi.phone || 'Telefone não informado',
        isFavorite: ubsDataFromApi.isFavorite || false,
        geolocation: ubsDataFromApi.geolocation,
        city: ubsDataFromApi.city,
        state: ubsDataFromApi.state,
        zipCode: ubsDataFromApi.zipCode,
        operatingHours: {
          monday: ubsDataFromApi.operatingHours?.monday || '08:00 - 17:00',
          tuesday: ubsDataFromApi.operatingHours?.tuesday || '08:00 - 17:00',
          wednesday: ubsDataFromApi.operatingHours?.wednesday || '08:00 - 17:00',
          thursday: ubsDataFromApi.operatingHours?.thursday || '08:00 - 17:00',
          friday: ubsDataFromApi.operatingHours?.friday || '08:00 - 17:00',
          saturday: ubsDataFromApi.operatingHours?.saturday || '08:00 - 12:00',
          sunday: ubsDataFromApi.operatingHours?.sunday || 'Fechado',
        },
        averageWaitTime: '30 minutos',
        availableVaccines: ubsDataFromApi.availableVaccines || [
          'Influenza',
          'Covid-19',
          'Hepatite B',
          'Sarampo',
          'Febre Amarela',
          'Tétano',
        ],
      }
      setUbs(transformedData)
    }
  }, [ubsDataFromApi])

  if (isLoading) {
    return (
      <SkeletonLoader
        count={1}
        variant="card"
        height="h-64"
        width="w-full"
        ariaLabel="Carregando detalhes da unidade de saúde"
      />
    )
  }

  if (error) {
    return <div>Erro ao carregar dados:</div>
  }

  if (!ubsDataFromApi) {
    notFound()
  }

  if (!ubs) {
    return (
      <SkeletonLoader
        count={1}
        variant="card"
        height="h-64"
        width="w-full"
        ariaLabel="Carregando dados da unidade de saúde"
      />
    )
  }

  const { name, neighborhood, address, phone, operatingHours, averageWaitTime, availableVaccines } =
    ubs

  const handleEvaluate = () => {
    const slug = toSlug(name)
    route.push(`/ubs/avaliar/${slug}`)
  }

  const handleToggleLike = async () => {
    try {
      const newState = !isLiked

      if (ubsDataFromApi?._id) {
        await toggleFavoriteHealthUnit(ubsDataFromApi._id)
      }

      setIsLiked(newState)

      const likedUbs = localStorage.getItem('liked_ubs')
      let likedList = likedUbs ? JSON.parse(likedUbs) : []

      if (newState) {
        if (!likedList.includes(ubsDataFromApi._id)) {
          likedList.push(ubsDataFromApi._id)
        }
      } else {
        likedList = likedList.filter((id: string) => id !== ubsDataFromApi._id)
      }

      localStorage.setItem('liked_ubs', JSON.stringify(likedList))
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error)
      setIsLiked(!isLiked)
    }
  }

  const handleAddVaccine = () => {
    setShowSecondDoseModal(true)
  }

  return (
    <div>
      <BvTitleHeader title={`Sobre: ${name}`} className="mb-6 break-words" />

      <div className="mb-8 flex justify-end gap-1">
        <button
          onClick={handleToggleLike}
          aria-label={isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Heart
            className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            aria-hidden="true"
          />
        </button>
        <BvShareMenu ubsName={name} ubsSlug={resolvedParams.slug} neighborhood={neighborhood} />
        <Button onClick={handleEvaluate} className="block sm:block md:block">
          Avaliar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold">Nome:</dt>
              <dd className="border-b py-2">{name}</dd>
            </div>
            <div>
              <dt className="font-semibold">Bairro:</dt>
              <dd className="border-b py-2">{neighborhood}</dd>
            </div>
            <div>
              <dt className="font-semibold">Endereço:</dt>
              <dd className="border-b py-2">{address}</dd>
            </div>
          </dl>

          <div className="mt-4 space-y-2">
            <p>
              Tempo de espera médio: <strong>{averageWaitTime}</strong>
            </p>
            <p>
              Telefone: <strong>{phone}</strong>
            </p>
          </div>
        </div>

        <div>
          <LazyUbsMap
            latitude={ubs.geolocation.lat}
            longitude={ubs.geolocation.lng}
            ubsName={name}
          />
        </div>
      </div>

      <BvTitleIco
        alt="Icone de Calendario"
        ico={CaledarIco}
        title="Horário de funcionamento:"
        className="mt-12 mb-6"
      />
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-6 md:grid-cols-3">
        <p>Segunda: {operatingHours.monday == '-' ? 'Fechado' : operatingHours.monday}</p>
        <p>Terça: {operatingHours.tuesday == '-' ? 'Fechado' : operatingHours.tuesday}</p>
        <p>Quarta: {operatingHours.wednesday == '-' ? 'Fechado' : operatingHours.wednesday}</p>
        <p>Quinta: {operatingHours.thursday == '-' ? 'Fechado' : operatingHours.thursday}</p>
        <p>Sexta: {operatingHours.friday == '-' ? 'Fechado' : operatingHours.friday}</p>
        <p>Sábado: {operatingHours.saturday == '-' ? 'Fechado' : operatingHours.saturday}</p>
        <p>Domingo: {operatingHours.sunday == '-' ? 'Fechado' : operatingHours.sunday}</p>
      </div>

      <BvTitleIco
        alt="Icone de Seringa"
        ico={SyringeIco}
        title="Vacinas disponíveis:"
        className="mt-12 mb-6"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {availableVaccines.map((vaccine, index: number) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-green-600 p-3 text-white shadow-md"
          >
            <Syringe className="mt-1 h-5 w-5 flex-shrink-0" />
            <span className="text-base font-semibold">{vaccine}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p>
          Confira o calendário de vacinação para saber quais vacinas são indicadas para cada idade.
        </p>
      </div>

      {user && (
        <div className="mt-8">
          <Button onClick={handleAddVaccine} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar vacina
          </Button>
        </div>
      )}

      <SecondDoseModal
        isOpen={showSecondDoseModal}
        onClose={() => setShowSecondDoseModal(false)}
        onSelectVaccines={async (vaccines, createdBy) => {
          try {
            setSelectedVaccines(vaccines)
            if (createdBy) {
              await saveSecondDoseConfiguration({
                selectedVaccines: vaccines,
                createdBy,
              })
              toast.success('Vacinas de segunda dose salvas com sucesso!')
            }
          } catch (error) {
            console.error('Erro ao salvar configuração:', error)
            toast.error('Erro ao salvar configuração de segunda dose')
          }
          setShowSecondDoseModal(false)
        }}
      />
    </div>
  )
}
