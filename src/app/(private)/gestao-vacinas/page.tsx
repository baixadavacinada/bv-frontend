'use client'

import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { DeleteConfirmationDialog } from '@/components/common/DeleteConfirmationDialog'
import { ManagementTable } from '@/components/common/ManagementTable'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Vaccine {
  id: string
  name: string
  dosage: string
}

export default function VaccineManagementPage() {
  useAccessibilityValidation()
  const router = useRouter()
  const [vaccines, setVaccines] = useState<Vaccine[]>([
    { id: '1', name: 'Nome vacina', dosage: 'Dose única' },
    { id: '2', name: 'Nome vacina', dosage: 'Dose única' },
    { id: '3', name: 'Nome vacina', dosage: 'Dose única' },
    { id: '4', name: 'Nome vacina', dosage: 'Dose única' },
  ])

  const { isOpen, itemName, isDeleting, openDeleteDialog, closeDeleteDialog, handleDelete } =
    useDeleteConfirmation({
      onConfirm: async (id) => {
        const vaccineToDelete = vaccines.find((v) => v.id === id)
        if (!vaccineToDelete) {
          throw new Error('Vacina não encontrada')
        }
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
      key: 'dosage',
      value: vaccine.dosage,
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

            <BvButton
              title="Adicionar vacina"
              className="mt-8 w-full lg:w-min"
              onClick={handleAddVaccine}
              rightIcon={<PlusIcon />}
            />

            <p className="mt-8 mb-6 text-xl font-bold">Lista de vacinas</p>
          </div>

          <ManagementTable<Vaccine>
            data={vaccines}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            tableHeader={{
              left: 'Vacina | Doses',
              right: 'Ações',
            }}
            searchConfig={{
              enabled: true,
              placeholder: 'Buscar vacina',
              searchKeys: ['name', 'dosage'],
              emptyMessage: 'Nenhuma vacina encontrada na lista',
            }}
            getItemFields={getVaccineFields}
          />
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
