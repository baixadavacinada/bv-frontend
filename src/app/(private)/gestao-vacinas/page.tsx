'use client'

import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { DeleteConfirmationDialog } from '@/components/common/DeleteConfirmationDialog'
import { ManagementTable } from '@/components/common/ManagementTable'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation'
import { useVaccineManagement } from '@/services/vaccine-management'
import { Vaccine } from '@/types/vaccines'
import { PlusIcon, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

export default function VaccineManagementPage() {
  useAccessibilityValidation()
  const router = useRouter()
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [loading, setLoading] = useState(true)

  const { listVaccines, canManageVaccines, deleteVaccine } = useVaccineManagement()

  const loadVaccines = useCallback(async () => {
    try {
      setLoading(true)
      const vaccines = await listVaccines()
      setVaccines(vaccines)
    } catch (error) {
      console.error('Erro ao carregar vacinas:', error)
      toast.error('Erro ao carregar lista de vacinas')
    } finally {
      setLoading(false)
    }
  }, [listVaccines])

  useEffect(() => {
    loadVaccines()

    const handleStorageChange = () => {
      loadVaccines()
    }

    window.addEventListener('storage', handleStorageChange)

    const handleRefreshVaccines = () => {
      loadVaccines()
    }

    window.addEventListener('refreshVaccines', handleRefreshVaccines)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('refreshVaccines', handleRefreshVaccines)
    }
  }, [loadVaccines])

  useEffect(() => {
    const handleFocus = () => {
      loadVaccines()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [loadVaccines])

  const { isOpen, itemName, isDeleting, openDeleteDialog, closeDeleteDialog, handleDelete } =
    useDeleteConfirmation({
      onConfirm: async (id) => {
        const vaccineToDelete = vaccines.find((v) => v.id === id)
        if (!vaccineToDelete) {
          throw new Error('Vacina não encontrada')
        }
        await deleteVaccine(id)
        setVaccines(vaccines.filter((v) => v.id !== id))
      },
      successMessage: 'Vacina deletada com sucesso',
    })

  const getVaccineFields = (vaccine: Vaccine) => [
    {
      key: 'name',
      value: vaccine.name,
      showIcon: true,
    },
    {
      key: 'doses',
      value: vaccine.doses && vaccine.doses.length > 0 ? vaccine.doses.join(', ') : 'Não informado',
      showIcon: false,
    },
  ]

  const handleAddVaccine = () => {
    router.push('/gestao-vacinas/formulario')
  }

  const handleEdit = (vaccine: Vaccine) => {
    router.push(`/gestao-vacinas/formulario?id=${vaccine.id}`)
  }

  const handleDeleteClick = (vaccine: Vaccine) => {
    openDeleteDialog('vaccine', vaccine.id, vaccine.name)
  }

  const handleConfirmDelete = async () => {
    if (itemName) {
      const vaccineId = vaccines.find((v) => v.name === itemName)?.id
      if (vaccineId) {
        await handleDelete('vaccine', vaccineId, itemName)
      }
    }
  }

  return (
    <RoleGuard allowedRoles={['admin', 'agent']} requireAuth>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
          <BvTitleHeader title="Gestão de vacinas" className="mb-8" />

          <div className="space-y-8">
            <p className="text-base font-normal">
              Aqui você pode adicionar e remover as vacinas. Também pode atualizar os dados de
              vacinas com segundas doses.
            </p>

            {canManageVaccines && (
              <BvButton
                title="Adicionar vacina"
                className="mt-8 w-full lg:w-min"
                onClick={handleAddVaccine}
                rightIcon={<PlusIcon />}
              />
            )}

            <p className="mt-8 mb-6 text-xl font-bold">Lista de vacinas</p>
          </div>

          {loading ? (
            <div className="mt-8 flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-gray-600">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Carregando vacinas...</span>
              </div>
            </div>
          ) : (
            <ManagementTable<Vaccine>
              data={vaccines}
              onEdit={canManageVaccines ? handleEdit : undefined}
              onDelete={canManageVaccines ? handleDeleteClick : undefined}
              tableHeader={{
                left: 'Vacina | Doses',
                right: canManageVaccines ? 'Ações' : '',
              }}
              searchConfig={{
                enabled: true,
                placeholder: 'Buscar vacina',
                searchKeys: ['name', 'manufacturer', 'description'],
                emptyMessage: 'Nenhuma vacina encontrada na lista',
              }}
              getItemFields={getVaccineFields}
            />
          )}
        </div>

        <DeleteConfirmationDialog
          isOpen={isOpen}
          itemName={itemName}
          itemType="vaccine"
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteDialog}
          actionLabel="Sim, deletar"
        />
      </div>
    </RoleGuard>
  )
}
