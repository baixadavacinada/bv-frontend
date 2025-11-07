'use client'
import { BvTitleHeader, RoleGuard } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React, { useState } from 'react'
import { mockUbsData } from '@/mock/ubs'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Button } from '@/components/ui/button'
import { Edit, Plus, Syringe, X, Heart, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BvAddVaccineModal } from '@/components/design/BvAddVaccineModal'
import { BvHoursModal } from '@/components/design/BvHoursModal'
import { Toaster, toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DetailUbsProps {
  params: Promise<{ id: string }>
}

type UbsData = (typeof mockUbsData)[0]

export default function DetailUbs({ params }: DetailUbsProps) {
  const resolvedParams = React.use(params)
  const ubsId = parseInt(resolvedParams.id)
  const initialUbsData = mockUbsData.find((ubs) => ubs.id === ubsId)
  useAccessibilityValidation({ enabled: true })

  const [ubsData, setUbsData] = useState<UbsData | undefined>(initialUbsData)
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; vaccineName: string | null }>({
    isOpen: false,
    vaccineName: null,
  })

  if (!ubsData) {
    return <p>UBS não encontrada.</p>
  }

  const {
    name,
    neighborhood,
    address = 'Endereço não informado',
    phone = 'Telefone não informado',
    isFavorite = false,
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
  const handleSaveHours = (newHours: typeof openingHours, newWaitTime: string) => {
    setUbsData((prev) =>
      prev ? { ...prev, openingHours: newHours, averageWaitTime: newWaitTime } : undefined,
    )
    setIsHoursModalOpen(false)
    toast.success('Horários atualizados com sucesso!')
  }

  const handleAddVaccine = (newVaccineName: string) => {
    if (newVaccineName && !vaccines.includes(newVaccineName)) {
      setUbsData((prev) =>
        prev ? { ...prev, vaccines: [...vaccines, newVaccineName] } : undefined,
      )
      toast.success(`${newVaccineName} foi adicionada.`)
    }
    setIsVaccineModalOpen(false)
  }

  const handleRemoveRequest = (vaccineName: string) => {
    setDeleteAlert({ isOpen: true, vaccineName: vaccineName })
  }

  const handleRemoveVaccine = () => {
    const vaccineToRemove = deleteAlert.vaccineName
    if (!vaccineToRemove) return
    setUbsData((prev) =>
      prev ? { ...prev, vaccines: vaccines.filter((v) => v !== vaccineToRemove) } : undefined,
    )
    toast.error(`${vaccineToRemove} foi removida da lista.`)
    setDeleteAlert({ isOpen: false, vaccineName: null })
  }

  const handleFavoriteToggle = () => {
    setUbsData((prev) =>
      prev
        ? {
            ...prev,
            isFavorite: !prev.isFavorite,
          }
        : undefined,
    )
    toast.success(
      !isFavorite ? `"${name}" adicionada aos favoritos!` : `"${name}" removida dos favoritos.`,
    )
  }

  const handleShare = () => {
    toast.info(`Compartilhando "${name}"...`)
  }

  return (
    <RoleGuard allowedRoles={['admin', 'agent']}>
      <div>
        <BvTitleHeader title={`SOBRE: ${name}`} className="mb-8" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>
        <div className="mt-8 mb-8 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            aria-label="Compartilhar UBS"
            className="text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          >
            <Share2 className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'Desfavoritar UBS' : 'Favoritar UBS'}
            className="text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          >
            <Heart className={cn('h-6 w-6', isFavorite && 'fill-purple-700 text-purple-700')} />
          </Button>
          <Button
            onClick={() => alert('Avaliar UBS')}
            className="bg-purple-700 text-white hover:bg-purple-800"
          >
            Avaliar
          </Button>
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

        <div className="mt-8 mb-8 flex w-full items-center justify-between">
          <Button
            className="w-full"
            variant="default"
            size="sm"
            onClick={() => setIsHoursModalOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>

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

        <div className="mt-8 mb-8 flex w-full items-center justify-between">
          <Button
            className="w-full"
            variant="default"
            size="sm"
            onClick={() => setIsVaccineModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar vacina
          </Button>
        </div>

        <BvTitleIco
          alt="Icone de Seringa"
          ico={SyringeIco}
          title="Vacinas disponíveis:"
          className="mt-8 mb-8"
        />

        <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-3">
          {vaccines.map((vaccine) => (
            <div
              key={vaccine}
              className="flex items-start gap-2 rounded-lg bg-green-600 p-3 text-white shadow-md"
            >
              <Syringe className="mt-1 h-5 w-5 flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">{vaccine}</span>
                  <button
                    onClick={() => handleRemoveRequest(vaccine)}
                    className="p-0 text-white/70 transition-colors hover:text-white"
                    aria-label={`Remover ${vaccine}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <span className="block text-sm opacity-90">Lote: 000000</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p>
            Confira a cartilha de vacinas para saber quais vacinas são indicadas para cada idade.
          </p>
        </div>

        <BvHoursModal
          isOpen={isHoursModalOpen}
          setIsOpen={setIsHoursModalOpen}
          currentHours={openingHours}
          currentWaitTime={averageWaitTime}
          onSave={handleSaveHours}
        />
        <BvAddVaccineModal
          isOpen={isVaccineModalOpen}
          setIsOpen={setIsVaccineModalOpen}
          onAdd={handleAddVaccine}
          existingVaccines={vaccines}
        />

        <AlertDialog
          open={deleteAlert.isOpen}
          onOpenChange={(isOpen) => setDeleteAlert({ ...deleteAlert, isOpen })}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso removerá permanentemente a vacina &quot;
                {deleteAlert.vaccineName}&quot; da lista de vacinas disponíveis nesta UBS.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setDeleteAlert({ isOpen: false, vaccineName: null })}
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRemoveVaccine}
                className="bg-red-600 hover:bg-red-700"
              >
                Sim, excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RoleGuard>
  )
}
