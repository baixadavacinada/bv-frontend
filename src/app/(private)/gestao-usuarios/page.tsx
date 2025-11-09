'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { DeleteModal } from '@/components/common/DeleteModal'
import { ManagementTable } from '@/components/common/ManagementTable'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useAuth } from '@/hooks/use-firebase-auth'
import { useUserManagement } from '@/services/user-management'
import { UserProfile } from '@/types/user-management'
import { ROLE_DISPLAY_NAMES } from '@/types/auth'

interface UserTableItem extends UserProfile {
  id: string
}

export default function UserManagementPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { canManageUsers, canReadUsers, listUsers, deleteUser } = useUserManagement()

  useAccessibilityValidation()

  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null)

  const listUsersRef = useRef(listUsers)
  listUsersRef.current = listUsers

  /**
   * Cria fallback com perfil do usuário atual
   */
  const createCurrentUserFallback = useCallback((): UserProfile[] => {
    if (!user) return []

    return [
      {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName,
        photoURL: user.photoURL || undefined,
        role: user.role,
        permissions: user.permissions,
        ubsId: user.customClaims?.ubsId,
        isActive: user.isActive,
        emailVerified: true,
        createdAt: new Date().toISOString(),
      },
    ]
  }, [user])

  /**
   * Carrega lista de usuários
   */
  const loadUsers = useCallback(
    async (search = '') => {
      try {
        setLoading(true)
        setError(null)

        const response = await listUsersRef.current(search)

        setUsers(response.users)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar usuários'
        console.error('Erro ao carregar usuários:', err)
        setError(errorMessage)

        // Fallback apenas para admin
        if (user?.role === 'admin') {
          setUsers(createCurrentUserFallback())
          toast.error(`${errorMessage} - Mostrando apenas seu perfil`)
        } else {
          toast.error(errorMessage)
        }
      } finally {
        setLoading(false)
      }
    },
    [user?.role, createCurrentUserFallback],
  )

  /**
   * Carrega usuários ao montar componente
   */
  useEffect(() => {
    if (canReadUsers || user?.role === 'admin') {
      loadUsers(searchTerm)
    }
  }, [canReadUsers, user?.role, loadUsers, searchTerm])

  /**
   * Adapta usuários para formato da tabela
   */
  const prepareUsersForTable = (users: UserProfile[]): UserTableItem[] => {
    return users.map((user) => ({
      ...user,
      id: user.uid,
    }))
  }

  const getUserTableFields = (user: UserTableItem) => [
    {
      key: 'name',
      value: user.displayName || user.email || 'Nome não informado',
      showIcon: true,
    },
    {
      key: 'perfil',
      value: ROLE_DISPLAY_NAMES[user.role] || user.role,
      showIcon: false,
    },
    {
      key: 'status',
      value: user.isActive ? 'Ativo' : 'Inativo',
      showIcon: false,
    },
  ]

  const handleAddUser = () => {
    router.push('/gestao-usuarios/formulario')
  }

  const handleEditUser = (user: UserTableItem) => {
    router.push(`/gestao-usuarios/formulario?id=${user.uid}`)
  }

  const handleDeleteClick = (user: UserTableItem) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!userToDelete) return

    try {
      await deleteUser(userToDelete.uid)
      setUsers(users.filter((u) => u.uid !== userToDelete.uid))
      toast.success('Usuário removido com sucesso')

      handleCloseModal()
      loadUsers(searchTerm)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover usuário'
      toast.error(errorMessage)
    }
  }

  const handleRefresh = () => {
    loadUsers(searchTerm)
  }

  const tableUsers = prepareUsersForTable(users)

  return (
    <RoleGuard allowedRoles={['admin']} requireAuth>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
          <BvTitleHeader title="Gestão de usuários" className="mb-8" />

          <div className="space-y-8">
            <p className="text-base font-normal">
              Aqui você pode adicionar e remover usuários. Também é possível editar e validar
              alterações nas carteiras de vacinação dos moradores.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {canManageUsers && (
                <BvButton
                  title="Adicionar usuário"
                  className="w-full sm:w-auto"
                  onClick={handleAddUser}
                  rightIcon={<PlusIcon />}
                />
              )}

              <BvButton
                title="Atualizar lista"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleRefresh}
                rightIcon={<RefreshCw />}
                disabled={loading}
              />
            </div>

            {/* Cabeçalho da lista */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xl font-bold">Lista de usuários</p>
              {users.length > 0 && (
                <p className="text-sm text-gray-600">
                  Total: {users.length} usuário{users.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-medium">Erro ao carregar usuários:</p>
              <p className="text-sm">{error}</p>
              <BvButton
                title="Tentar novamente"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => loadUsers(searchTerm)}
              />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-8 flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-gray-600">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Carregando usuários...</span>
              </div>
            </div>
          )}

          {/* Tabela de usuários */}
          {!loading && !error && (
            <ManagementTable<UserTableItem>
              data={tableUsers}
              onEdit={canManageUsers ? handleEditUser : undefined}
              onDelete={canManageUsers ? handleDeleteClick : undefined}
              tableHeader={{
                left: 'Nome | Perfil',
                right: canManageUsers ? 'Ações' : '',
              }}
              searchConfig={{
                enabled: true,
                placeholder: 'Buscar usuário',
                searchKeys: ['displayName', 'role'],
                emptyMessage: searchTerm
                  ? 'Nenhum usuário encontrado para esta busca'
                  : 'Nenhum usuário cadastrado no sistema',
              }}
              getItemFields={getUserTableFields}
              isDeleteDisabled={(user) => !user.isActive}
            />
          )}
        </div>

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName={
            userToDelete
              ? `"${userToDelete.displayName || userToDelete.email}"`
              : 'o usuário selecionado'
          }
        />
      </div>
    </RoleGuard>
  )
}
