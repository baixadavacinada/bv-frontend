'use client'
import { BvButton, BvTitleHeader, UbsCardProps } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React, { useState } from 'react'
import Tag from '@/components/design/Tag'
import { Button } from '@/components/ui/button'
import { Heart, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const vaccines = ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo', 'Febre Amarela', 'Tétano']

interface DetailUbsProps {
  nameUbs: string
  timeMedia?: string
}

export default function DetailUbs({
  nameUbs = 'UBS - JD. UNIVERSO',
  timeMedia = '30 minutos',
}: DetailUbsProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const onShare = () => {
    alert(`Compartilhando: ${nameUbs}`)
  }

  const onFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>, action: () => void) => {
    e.stopPropagation()
    action()
  }

  return (
    <div>
      <BvTitleHeader title={`Sobre`} className="mb-8" />

      <div className="mb-4">
        <h2 className="text-1xl font-bold">{nameUbs}</h2>
      </div>

      <div className="mt-8 mb-8 flex justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleIconClick(e, onShare)}
            aria-label="Compartilhar"
          >
            <Share2 className="h-5 w-5 text-slate-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleIconClick(e, onFavoriteToggle)}
            aria-label={isFavorite ? 'Desfavoritar' : 'Favoritar'}
          >
            <Heart
              className={cn('h-5 w-5 text-slate-500', isFavorite && 'fill-red-500 text-red-500')}
            />
          </Button>
        </div>
        <div className="flex space-x-4">
          <button
            className="relative rounded-md bg-purple-700 px-6 py-2 font-medium text-white transition-colors hover:bg-purple-800"
            onClick={() => alert('Avaliar UBS')}
          >
            Avaliar
          </button>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470857.1325203243!2d-43.732171476060785!3d-22.781279808959898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99a1342b7a7239%3A0x59ce0e8ead817aa7!2sBaixada%20Fluminense%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1757530920571!5m2!1spt-BR!2sbr"
        width="100%"
        height="550"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <BvTitleIco
        alt="Icone de Calendario"
        ico={CaledarIco}
        title="Horário de funcionamento:"
        className="mt-8 mb-8"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <p>Segunda: 08:00 - 17:00</p>
        <p>Terça: 08:00 - 17:00</p>
        <p>Quarta: 08:00 - 17:00</p>
        <p>Quinta: 08:00 - 17:00</p>
        <p>Sexta: 08:00 - 17:00</p>
        <p>Sábado: 08:00 - 12:00</p>
        <p>Domingo: Fechado</p>
      </div>
      <div className="mt-4">
        <p>
          Tempo de espera médio para atendimento: <strong>{timeMedia}</strong>
        </p>
      </div>

      <BvTitleIco
        alt="Icone de Seringa"
        ico={SyringeIco}
        title="Vacinas disponíveis:"
        className="mt-8 mb-8"
      />
      <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {vaccines.map((vaccine) => (
          <Tag key={vaccine} label={vaccine} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <p>Confira a cartilha de vacinas para saber quais vacinas são indicadas para cada idade.</p>
      </div>
    </div>
  )
}
