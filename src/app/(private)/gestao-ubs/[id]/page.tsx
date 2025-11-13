'use client'
import { BvTitleHeader } from '@/components'
import { BvTitleIco } from '@/components/design/BvTitleIco'
import { BvShareMenu } from '@/components/design/BvShareMenu'
import { LazyUbsMap } from '@/components/design/LazyUbsMap'
import CaledarIco from '@/assets/icons/calendar.svg'
import SyringeIco from '@/assets/icons/syringe.svg'
import React, { useState } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Button } from '@/components/ui/button'
import { Syringe, Edit, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { notFound } from 'next/navigation'
import { useHealthUnits } from '@/hooks/use-health-units' // Importar o hook e o tipo
import { HealthUnit } from '@/types/health-units'
import { LazyBvHoursModal } from '@/components/design/lazy/LazyBvHoursModal'
import { LazyBvAddVaccineModal } from '@/components/design/lazy/LazyBvAddVaccineModal'
import { AlertDialog } from '@radix-ui/react-alert-dialog'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { updateHealthUnits } from '@/services/actions/ubs-actions'
import { useVaccinesList } from '@/hooks/use-vaccines-list'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'

interface DetailUbsProps {
  params: Promise<{ id: string }>
}

export default function DetailUbs({ params }: DetailUbsProps) {
  const resolvedParams = React.use(params)
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false)
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false)
  const { data: existingVaccines } = useVaccinesList()

  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; vaccineName: string | null }>({
    isOpen: false,
    vaccineName: null,
  })
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
    return <div>Erro ao carregar dados.</div>
  }

  if (!ubsDataFromApi && !isLoading) {
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

  const handleSaveHours = async (newHours: HealthUnit['operatingHours'], newWaitTime: string) => {
    const ubsId = ubs?.id
    if (!ubsId) {
      toast.error('Erro: Dados da UBS não carregados.')
      return
    }

    try {
      await updateHealthUnits(ubsId, {
        operatingHours: newHours,
      })

      setUbs((prev) =>
        prev
          ? {
              ...prev,
              operatingHours: newHours,
              averageWaitTime: newWaitTime,
            }
          : null,
      )

      toast.success('Horário atualizado com sucesso!')
      setIsHoursModalOpen(false)
    } catch (error) {
      console.error('Falha ao salvar horários:', error)
      toast.error('Não foi possível salvar. Tente novamente.')
    }
  }

  const handleAddVaccine = async (newVaccineName: string) => {
    const ubsId = ubs?.id
    if (!ubsId) {
      toast.error('Erro: Dados da UBS não carregados.')
      return
    }

    try {
      await updateHealthUnits(ubsId, {
        ...ubs,
        availableVaccines: [...ubs.availableVaccines, newVaccineName],
      })

      setUbs((prev) =>
        prev
          ? {
              ...prev,
              availableVaccines: [...prev.availableVaccines, newVaccineName],
            }
          : null,
      )
      toast.success(`${newVaccineName} foi adicionada com sucesso.`)
      setIsVaccineModalOpen(false)
    } catch (error) {
      console.error('Erro ao adicionar vacina:', error)
      toast.error('Falha ao adicionar vacina. Tente novamente.')
    }
  }

  const handleRemoveVaccine = (vaccineName: string) => {
    const ubsId = ubs?.id || ''
    if (!ubsId && !vaccineName) {
      toast.error('Erro: Dados da Vacina não carregados.')
      return
    }

    updateHealthUnits(ubsId, {
      ...ubs,
      availableVaccines: ubs.availableVaccines.filter((v) => v !== vaccineName),
    }).catch((error) => {
      console.error('Erro ao remover vacina:', error)
      toast.error('Falha ao remover vacina. Tente novamente.')
    })

    setUbs((prev) =>
      prev
        ? {
            ...prev,
            availableVaccines: prev.availableVaccines.filter((v) => v !== vaccineName),
          }
        : null,
    )
    toast.success(`${vaccineName} foi removida da lista.`)
    setDeleteAlert({ isOpen: false, vaccineName: null })
  }

  return (
    <div>
      <BvTitleHeader title={`Sobre: ${name}`} className="mb-6" />
      <div className="mb-8 flex justify-end gap-2">
        <BvShareMenu ubsName={name} ubsSlug={resolvedParams.id} neighborhood={neighborhood} />
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
        alt="Icone de Seringa"
        ico={SyringeIco}
        title="Vacinas disponíveis:"
        className="mt-12 mb-6"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {availableVaccines.map((vaccine: string, index: number) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-green-600 p-3 text-white shadow-md"
          >
            <Syringe className="mt-1 h-5 w-5 flex-shrink-0" />
            <span className="text-base font-semibold">{vaccine}</span>
            <button
              onClick={() => {
                setDeleteAlert({ isOpen: true, vaccineName: vaccine })
              }}
              className="p-0 text-white/70 transition-colors hover:text-white"
              aria-label={`Remover ${vaccine}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-primary mt-8 mb-8 flex w-full items-center justify-between">
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
      <div className="mt-6 text-center">
        <p>
          Confira o calendário de vacinação para saber quais vacinas são indicadas para cada idade.
        </p>
      </div>

      <LazyBvHoursModal
        isOpen={isHoursModalOpen}
        setIsOpen={setIsHoursModalOpen}
        currentHours={operatingHours}
        currentWaitTime={averageWaitTime}
        onSave={handleSaveHours}
      />
      <LazyBvAddVaccineModal
        isOpen={isVaccineModalOpen}
        setIsOpen={setIsVaccineModalOpen}
        onAdd={handleAddVaccine}
        existingVaccines={existingVaccines || []}
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
            <AlertDialogCancel onClick={() => setDeleteAlert({ isOpen: false, vaccineName: null })}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRemoveVaccine(deleteAlert.vaccineName || '')}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
