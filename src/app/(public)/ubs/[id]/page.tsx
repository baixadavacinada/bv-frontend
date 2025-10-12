'use client'
import { BvTitleHeader } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React from 'react'
import Tag from '@/components/design/Tag'
import { mockUbsData } from '@/mock/ubs'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface DetailUbsProps {
  params: Promise<{ id: string }>
}

export default function DetailUbs({ params }: DetailUbsProps) {
  const resolvedParams = React.use(params)
  const ubsId = parseInt(resolvedParams.id)
  const ubsData = mockUbsData.find((ubs) => ubs.id === ubsId)

  useAccessibilityValidation({ enabled: true })

  if (!ubsData) {
    return console.error('UBS não encontrada')
  }

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
  } = ubsData
  return (
    <div>
      <BvTitleHeader title={`Sobre ${name}`} className="mb-8" />

      <dl className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

      <div className="mt-8 mb-8 flex justify-end">
        <button
          className="relative rounded-md bg-purple-700 px-6 py-2 font-medium text-white transition-colors hover:bg-purple-800"
          onClick={() => alert('Avaliar UBS')}
        >
          Avaliar
        </button>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470857.1325203243!2d-43.732171476060785!3d-22.781279808959898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99a1342b7a7239%3A0x59ce0e8ead817aa7!2sBaixada%20Fluminense%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1757530920571!5m2!1spt-BR!2sbr"
        width="100%"
        height="550"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Localização no mapa da ${name}`}
      ></iframe>

      <BvTitleIco
        alt="Icone de Calendario"
        ico={CaledarIco}
        title="Horário de funcionamento:"
        className="mt-8 mb-8"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <p>Segunda: {openingHours.monday}</p>
        <p>Terça: {openingHours.tuesday}</p>
        <p>Quarta: {openingHours.wednesday}</p>
        <p>Quinta: {openingHours.thursday}</p>
        <p>Sexta: {openingHours.friday}</p>
        <p>Sábado: {openingHours.saturday}</p>
        <p>Domingo: {openingHours.sunday}</p>
      </div>
      <div className="mt-4">
        <p>
          Tempo de espera médio para atendimento: <strong>{averageWaitTime}</strong>
        </p>
        <p>
          Telefone: <strong>{phone}</strong>
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
