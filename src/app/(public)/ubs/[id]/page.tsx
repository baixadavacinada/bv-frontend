'use client'
import { BvTitleHeader } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Button } from '@/components/ui/button'
import { Syringe, Heart, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { notFound, useRouter } from 'next/navigation'
import { useHealthUnits } from '@/hooks/use-health-units' // Importar o hook e o tipo
import { HealthUnit } from '@/types/health-units'

interface DetailUbsProps {
  params: Promise<{ id: string }>
}

export default function DetailUbs({ params }: DetailUbsProps) {
  const resolvedParams = React.use(params)
  const route = useRouter()
  useAccessibilityValidation({ enabled: true })

  const { data, isLoading, error } = useHealthUnits()

  const ubsDataFromApi = React.useMemo(() => {
    if (!data) return undefined
    return data.find((unit: HealthUnit) => unit._id === resolvedParams.id)
  }, [data, resolvedParams.id])
  const [ubs, setUbs] = React.useState<HealthUnit | null>(null)

  React.useEffect(() => {
    if (ubsDataFromApi) {
      const transformedData: HealthUnit = {
        id: ubsDataFromApi._id,
        name: ubsDataFromApi.name,
        neighborhood: ubsDataFromApi.neighborhood,
        address: ubsDataFromApi.address || 'Endereço não informado',
        phone: ubsDataFromApi.phone || 'Telefone não informado',
        isFavorite: ubsDataFromApi.isFavorite || false,
        geolocation: ubsDataFromApi.geolocation,
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
        availableVaccines: !ubsDataFromApi.availableVaccines || [
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
  }, [ubsDataFromApi]) // Roda quando ubsDataFromApi for encontrado

  // 5. Lidar com estados de carregamento e erro
  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar dados:</div>
  }

  // 6. Lidar com 'não encontrado' APÓS o carregamento
  // Se não está carregando e 'ubsDataFromApi' ainda é 'undefined', não foi encontrado
  if (!ubsDataFromApi) {
    notFound()
  }

  if (!ubs) {
    return <div>Carregando...</div>
  }

  const { name, neighborhood, address, phone, operatingHours, averageWaitTime, availableVaccines } =
    ubs

  // const handleFavoriteToggle = () => {
  //   setUbs((prev) => {
  //     if (!prev) return null
  //     return { ...prev, isFavorite: !prev.isFavorite }
  //   })
  //   toast.success(
  //     !isFavorite ? `"${name}" adicionada aos favoritos!` : `"${name}" removida dos favoritos.`,
  //   )
  // }

  const handleShare = async () => {
    try {
      // Tenta escrever o texto para a área de transferência
      await navigator.clipboard.writeText(`https://https://baixadavacinada.com/usb/${ubs.id}`)
      toast.info(`Compartilhando "${name}"...`)
    } catch (err) {
      console.error('Falha ao copiar o texto: ', err)
    }
  }

  // const handleEvaluate = () => {
  //   route.push(`../ubs/avaliar/${ubs.id}/${name.replace(/\s+/g, '-').toLowerCase()}`)
  // }

  return (
    <div>
      <BvTitleHeader title={`SOBRE: ${name}`} className="mb-6" />

      <div className="mb-8 flex justify-end gap-2">
        {/* <Button
          variant="transparent"
          size="icon"
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={cn('h-5 w-5', isFavorite && 'fill-red-500 text-red-500')} />
        </Button> */}
        <Button variant="transparent" size="icon" onClick={handleShare} aria-label="Compartilhar">
          <Share2 className="h-5 w-5" />
        </Button>
        {/* <Button onClick={handleEvaluate}>Avaliar</Button> */}
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
          <iframe
            src={`https://maps.google.com/maps?q=${ubs.geolocation.lat},${ubs.geolocation.lng}&z=15&output=embed`}
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: '8px' }} // Borda arredondada
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <BvTitleIco
        alt="Icone de Calendario"
        ico={CaledarIco}
        title="Horário de funcionamento:"
        className="mt-12 mb-6"
      />
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-6 md:grid-cols-3">
        <p>Segunda: {operatingHours.monday}</p>
        <p>Terça: {operatingHours.tuesday}</p>
        <p>Quarta: {operatingHours.wednesday}</p>
        <p>Quinta: {operatingHours.thursday}</p>
        <p>Sexta: {operatingHours.friday}</p>
        <p>Sábado: {operatingHours.saturday}</p>
        <p>Domingo: {operatingHours.sunday}</p>
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
        <p>Confira a cartilha de vacinas para saber quais vacinas são indicadas para cada idade.</p>
      </div>
    </div>
  )
}
