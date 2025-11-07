'use client'

import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { DeleteModal } from '@/components/common/DeleteModal'
import { ManagementTable } from '@/components/common/ManagementTable'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  perfil: string
}

export default function UserManagementPage() {
  const router = useRouter()
  useAccessibilityValidation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Nome usuário', perfil: 'Perfil usuário' },
    { id: '2', name: 'Nome usuário', perfil: 'Perfil usuário' },
    { id: '3', name: 'Nome usuário', perfil: 'Perfil usuário' },
    { id: '4', name: 'Nome usuário', perfil: 'Perfil usuário' },
  ])

  const getUserFields = (user: User) => [
    {
      key: 'name',
      value: user.name,
      showIcon: true,
    },
    {
      key: 'perfil',
      value: user.perfil,
      showIcon: false,
    },
  ]

  const handleAddUser = () => {
    router.push('/gestao-usuarios/formulario')
  }

  const handleEdit = (user: User) => {
    router.push(`/gestao-usuarios/formulario?id=${user.id}`)
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setUserToDelete(null)
      toast.success('Usuário removido com sucesso')
    }
  }

  return (
    <RoleGuard
      allowedRoles={['admin', 'agent']}
      requireAuth={true}
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-600">
            Acesso negado. Você não tem permissão para acessar esta página.
          </p>
        </div>
      }
    >
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
          <BvTitleHeader title="Gestão de usuários" className="mb-8" />

          <div className="space-y-8">
            <p className="text-base font-normal">
              Aqui você pode adicionar e remover usuários. Também é possível editar e validar
              alterações nas carteiras de vacinação dos moradores.
            </p>

            <BvButton
              title="Adicionar usuário"
              className="mt-8 w-full lg:w-min"
              onClick={handleAddUser}
              rightIcon={<PlusIcon />}
            />

            <p className="mt-8 mb-6 text-xl font-bold">Lista de usuários</p>
          </div>

          <ManagementTable<User>
            data={users}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            tableHeader={{
              left: 'Nome | Perfil',
              right: 'Ações',
            }}
            searchConfig={{
              enabled: true,
              placeholder: 'Buscar usuário',
              searchKeys: ['name', 'perfil'],
              emptyMessage: 'Nenhum usuário encontrado na lista',
            }}
            getItemFields={getUserFields}
          />
        </div>

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName={userToDelete ? `"${userToDelete.name}"` : 'o usuário selecionado'}
        />
      </div>
    </RoleGuard>
  )
}
