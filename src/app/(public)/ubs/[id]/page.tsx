'use client'
import { BvTitleHeader } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React from 'react'
import { mockUbsData } from '@/mock/ubs'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Button } from '@/components/ui/button'
import { Syringe, Heart, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { notFound, useRouter } from 'next/navigation'

interface DetailUbsProps {
  params: Promise<{ id: string }>
}

export default function DetailUbs({ params }: DetailUbsProps) {
  const resolvedParams = React.use(params)
  const ubsId = parseInt(resolvedParams.id)
  const initialUbsData = mockUbsData.find((ubs) => ubs.id === ubsId)
  const route = useRouter()

  useAccessibilityValidation({ enabled: true })

  if (!initialUbsData) {
    notFound()
  }
  const [ubs, setUbs] = React.useState(initialUbsData)
  const {
    name,
    neighborhood,
    address = 'Endereço não informado',
    phone = 'Telefone não informado',
    openingHours = {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado',
    },
    averageWaitTime = '30 minutos',
    vaccines = ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo', 'Febre Amarela', 'Tétano'],
    isFavorite,
  } = ubs

  const handleFavoriteToggle = () => {
    setUbs((prev) => ({
      ...prev,
      isFavorite: !prev.isFavorite,
    }))
    toast.success(
      !isFavorite ? `"${name}" adicionada aos favoritos!` : `"${name}" removida dos favoritos.`,
    )
  }

  const handleShare = () => {
    toast.info(`Compartilhando "${name}"...`)
  }

  const handleEvaluate = () => {
    route.push(`../ubs/avaliar/${ubsId}/${name.replace(/\s+/g, '-').toLowerCase()}`)
  }

  return (
    <div>
      <BvTitleHeader title={`SOBRE: ${name}`} className="mb-6" />

      <div className="mb-8 flex justify-end gap-2">
        <Button
          variant="transparent"
          size="icon"
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={cn('h-5 w-5', isFavorite && 'fill-red-500 text-red-500')} />
        </Button>
        <Button variant="transparent" size="icon" onClick={handleShare} aria-label="Compartilhar">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button onClick={handleEvaluate}>Avaliar</Button>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470857.1325203243!2d-43.732171476060785!3d-22.781279808959898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99a1342b7a7239%3A0x59ce0e8ead817aa7!2sBaixada%20Fluminense%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1757530920571!5m2!1spt-BR!2sbr"
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
        <p>Segunda: {openingHours.monday}</p>
        <p>Terça: {openingHours.tuesday}</p>
        <p>Quarta: {openingHours.wednesday}</p>
        <p>Quinta: {openingHours.thursday}</p>
        <p>Sexta: {openingHours.friday}</p>
        <p>Sábado: {openingHours.saturday}</p>
        <p>Domingo: {openingHours.sunday}</p>
      </div>

      <BvTitleIco
        alt="Icone de Seringa"
        ico={SyringeIco}
        title="Vacinas disponíveis:"
        className="mt-12 mb-6"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {vaccines.map((vaccine) => (
          <div
            key={vaccine}
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
