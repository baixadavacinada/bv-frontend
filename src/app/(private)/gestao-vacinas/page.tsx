'use client'

import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { DeleteModal } from '@/components/common/DeleteModal'
import { ManagementTable } from '@/components/common/ManagementTable'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Vaccine {
  id: string
  name: string
  dosage: string
}

export default function VaccineManagementPage() {
  useAccessibilityValidation()
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [vaccineToDelete, setVaccineToDelete] = useState<Vaccine | null>(null)
  const [vaccines, setVaccines] = useState<Vaccine[]>([
    { id: '1', name: 'Nome vacina', dosage: 'Dose única' },
    { id: '2', name: 'Nome vacina', dosage: 'Dose única' },
    { id: '3', name: 'Nome vacina', dosage: 'Dose única' },
    { id: '4', name: 'Nome vacina', dosage: 'Dose única' },
  ])

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
    setVaccineToDelete(vaccine)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    if (vaccineToDelete) {
      setVaccines(vaccines.filter((v) => v.id !== vaccineToDelete.id))
      setVaccineToDelete(null)
      toast.success('Vacina removida com sucesso')
    } else {
      toast.error('Erro ao remover vacina')
    }
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
    setVaccineToDelete(null)
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

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName={vaccineToDelete ? `"${vaccineToDelete.name}"` : 'a vacina selecionada'}
        />
      </div>
    </RoleGuard>
  )
}
