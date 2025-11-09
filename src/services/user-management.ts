/**
 * Serviço para gerenciamento de usuários
 * Operações CRUD de usuários com fallback local
 */

import { useCallback, useMemo } from 'react'
import { useAuth } from '@/hooks/use-firebase-auth'
import { UserRole } from '@/types/auth'
import {
  UserProfile,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  ApiUserData,
} from '@/types/user-management'
import { apiClient } from '@/services/api'

// Storage local para usuários criados/editados
const localUsers = new Map<string, UserProfile>()

/**
 * Hook para gerenciamento de usuários
 */
export function useUserManagement() {
  const { user, firebaseUser } = useAuth()

  const canManageUsers = useMemo(
    () => user?.permissions.includes('write_users') || user?.role === 'admin' || false,
    [user?.permissions, user?.role],
  )

  const canReadUsers = useMemo(
    () => user?.permissions.includes('read_users') || user?.role === 'admin' || false,
    [user?.permissions, user?.role],
  )

  const createUserFromFirebase = useCallback((): UserProfile => {
    return {
      uid: firebaseUser?.uid || '',
      email: firebaseUser?.email || '',
      displayName: firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || 'Usuário',
      role: 'public',
      permissions: [],
      isActive: true,
      emailVerified: firebaseUser?.emailVerified || false,
      createdAt: firebaseUser?.metadata?.creationTime || new Date().toISOString(),
      lastSignIn: firebaseUser?.metadata?.lastSignInTime,
      profile: {
        hasBasicInfo: !!firebaseUser?.displayName,
        hasHealthInfo: false,
        profileCompleteness: firebaseUser?.displayName ? 75 : 25,
        personalData: {
          name: firebaseUser?.displayName || '',
        },
      },
    }
  }, [firebaseUser])

  // Converte dados da API para UserProfile
  const convertApiToUserProfile = useCallback((data: ApiUserData): UserProfile => {
    return {
      uid: data.uid || data._id || data.id || `user_${Date.now()}`,
      email: data.email || '',
      displayName: data.displayName || data.name || 'Usuário',
      role: data.role || 'public',
      permissions: data.permissions || [],
      isActive: data.isActive !== false,
      emailVerified: data.emailVerified || false,
      createdAt: data.createdAt || data.created_at || new Date().toISOString(),
      lastSignIn: data.lastSignIn || data.last_sign_in,
      profile: data.profile || {
        hasBasicInfo: !!(data.displayName || data.name),
        hasHealthInfo: false,
        profileCompleteness: data.displayName || data.name ? 75 : 25,
        personalData: data.personalData || {
          name: data.displayName || data.name || '',
        },
      },
    }
  }, [])

  // Mescla usuários da API com usuários locais
  const mergeWithLocalUsers = useCallback((apiUsers: UserProfile[]): UserProfile[] => {
    const mergedUsers = [...apiUsers]

    localUsers.forEach((localUser) => {
      const existingIndex = mergedUsers.findIndex((u) => u.uid === localUser.uid)
      if (existingIndex >= 0) {
        mergedUsers[existingIndex] = localUser
      } else {
        mergedUsers.push(localUser)
      }
    })

    return mergedUsers
  }, [])

  // Aplica filtro de busca nos usuários
  const applySearchFilter = useCallback((users: UserProfile[], search: string): UserProfile[] => {
    if (!search?.trim()) return users

    const searchLower = search.toLowerCase()
    return users.filter(
      (user) =>
        user.displayName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower),
    )
  }, [])

  // Cria resposta de fallback com usuário atual
  const createFallbackResponse = useCallback(
    (search: string): UserListResponse => {
      const fallbackUsers = [createUserFromFirebase()]

      localUsers.forEach((localUser) => {
        if (localUser.uid !== firebaseUser?.uid) {
          fallbackUsers.push(localUser)
        }
      })

      const filteredUsers = applySearchFilter(fallbackUsers, search)

      return {
        users: filteredUsers,
        total: filteredUsers.length,
        page: 1,
        limit: 20,
        totalPages: 1,
      }
    },
    [firebaseUser?.uid, createUserFromFirebase, applySearchFilter],
  )

  /**
   * Lista usuários com busca
   */
  const listUsers = useCallback(
    async (search?: string): Promise<UserListResponse> => {
      try {
        const params = new URLSearchParams()

        if (search?.trim()) {
          params.append('search', search.trim())
        }

        const responseData = await apiClient.get<
          { data?: ApiUserData[]; users?: ApiUserData[] } | ApiUserData[]
        >(`/api/public/users?${params}`)

        // Extrai usuários da resposta
        let apiUsers: UserProfile[] = []
        if (Array.isArray(responseData)) {
          apiUsers = responseData.map(convertApiToUserProfile)
        } else if (responseData.users) {
          apiUsers = responseData.users.map(convertApiToUserProfile)
        } else if (responseData.data) {
          apiUsers = responseData.data.map(convertApiToUserProfile)
        }

        // Mescla com usuários locais e aplica filtro
        let users = mergeWithLocalUsers(apiUsers)
        users = applySearchFilter(users, search || '')

        return {
          users,
          total: users.length,
          page: 1,
          limit: users.length,
          totalPages: 1,
        }
      } catch (error) {
        console.warn('Erro ao listar usuários, usando fallback:', error)
        return createFallbackResponse(search || '')
      }
    },
    [convertApiToUserProfile, mergeWithLocalUsers, applySearchFilter, createFallbackResponse],
  )

  /**
   * Busca usuário por ID
   */
  const getUserById = useCallback(
    async (uid: string): Promise<UserProfile> => {
      const localUser = localUsers.get(uid)
      if (localUser) return localUser

      if (uid === firebaseUser?.uid) {
        return createUserFromFirebase()
      }

      try {
        const { users } = await listUsers()
        const foundUser = users.find((user) => user.uid === uid)
        if (foundUser) return foundUser
      } catch (error) {
        console.warn('Erro ao buscar usuário:', error)
      }

      // Cria usuário simulado para IDs temporários
      if (uid.startsWith('user_')) {
        const simulatedUser: UserProfile = {
          uid,
          email: `user${Date.now()}@example.com`,
          displayName: 'Usuário Editável',
          role: 'public',
          permissions: [],
          isActive: true,
          emailVerified: false,
          createdAt: new Date().toISOString(),
          profile: {
            hasBasicInfo: true,
            hasHealthInfo: false,
            profileCompleteness: 50,
            personalData: { name: 'Usuário Editável' },
          },
        }
        localUsers.set(uid, simulatedUser)
        return simulatedUser
      }

      throw new Error(`Usuário ${uid} não encontrado`)
    },
    [firebaseUser?.uid, createUserFromFirebase, listUsers],
  )

  /**
   * Cria novo usuário
   */
  const createUser = useCallback(
    async (userData: CreateUserRequest): Promise<UserProfile> => {
      try {
        const responseData = await apiClient.post<
          { data?: ApiUserData; user?: ApiUserData } | ApiUserData
        >('/api/public/auth/register', {
          email: userData.email,
          password: 'TempPassword123!',
          displayName: userData.displayName,
        })

        let apiUser: ApiUserData
        if ('data' in responseData && responseData.data) {
          apiUser = responseData.data
        } else if ('user' in responseData && responseData.user) {
          apiUser = responseData.user
        } else {
          apiUser = responseData as ApiUserData
        }

        return convertApiToUserProfile(apiUser)
      } catch (error) {
        console.warn('Erro ao criar usuário via API, simulando criação:', error)
      }

      // Fallback: simula criação local
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const newUser: UserProfile = {
        uid: newUserId,
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role || 'public',
        permissions: [],
        isActive: userData.isActive !== false,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        profile: {
          hasBasicInfo: !!userData.displayName,
          hasHealthInfo: false,
          profileCompleteness: userData.displayName ? 75 : 25,
          personalData: userData.personalData || { name: userData.displayName },
        },
      }

      localUsers.set(newUserId, newUser)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return newUser
    },
    [convertApiToUserProfile],
  )

  /**
   * Ativa usuário
   */
  const activateUser = useCallback(async (uid: string): Promise<UserProfile> => {
    const data = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/reactivate`)
    return data
  }, [])

  /**
   * Desativa usuário
   */
  const deactivateUser = useCallback(async (uid: string): Promise<UserProfile> => {
    const data = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/deactivate`)
    return data
  }, [])

  /**
   * Atualiza usuário existente
   */
  const updateUser = useCallback(
    async (uid: string, userData: UpdateUserRequest): Promise<UserProfile> => {
      try {
        const existingUser = await getUserById(uid)

        const statusChanged =
          userData.isActive !== undefined && userData.isActive !== existingUser.isActive

        if (statusChanged) {
          if (userData.isActive) {
            const activatedUser = await activateUser(uid)

            if (userData.displayName || userData.role || userData.personalData) {
              const updatedUser: UserProfile = {
                ...activatedUser,
                displayName: userData.displayName || activatedUser.displayName,
                role: (userData.role as UserRole) || activatedUser.role,
                profile: {
                  hasBasicInfo: !!(userData.displayName || userData.personalData?.name),
                  hasHealthInfo: activatedUser.profile?.hasHealthInfo || false,
                  profileCompleteness:
                    userData.displayName || userData.personalData?.name ? 75 : 25,
                  personalData: {
                    ...activatedUser.profile?.personalData,
                    ...userData.personalData,
                    name:
                      userData.displayName ||
                      userData.personalData?.name ||
                      activatedUser.profile?.personalData?.name,
                  },
                },
              }

              localUsers.set(uid, updatedUser)
              return updatedUser
            }

            return activatedUser
          } else {
            const deactivatedUser = await deactivateUser(uid)

            if (userData.displayName || userData.role || userData.personalData) {
              const updatedUser: UserProfile = {
                ...deactivatedUser,
                displayName: userData.displayName || deactivatedUser.displayName,
                role: (userData.role as UserRole) || deactivatedUser.role,
                profile: {
                  hasBasicInfo: !!(userData.displayName || userData.personalData?.name),
                  hasHealthInfo: deactivatedUser.profile?.hasHealthInfo || false,
                  profileCompleteness:
                    userData.displayName || userData.personalData?.name ? 75 : 25,
                  personalData: {
                    ...deactivatedUser.profile?.personalData,
                    ...userData.personalData,
                    name:
                      userData.displayName ||
                      userData.personalData?.name ||
                      deactivatedUser.profile?.personalData?.name,
                  },
                },
              }

              localUsers.set(uid, updatedUser)
              return updatedUser
            }

            return deactivatedUser
          }
        }

        // Se não houve mudança no status, tenta atualizar via API geral (se disponível)
        // Por enquanto, fallback para atualização local
        const updatedUser: UserProfile = {
          ...existingUser,
          displayName: userData.displayName || existingUser.displayName,
          role: (userData.role as UserRole) || existingUser.role,
          isActive: userData.isActive !== undefined ? userData.isActive : existingUser.isActive,
          profile: {
            hasBasicInfo: !!(userData.displayName || userData.personalData?.name),
            hasHealthInfo: existingUser.profile?.hasHealthInfo || false,
            profileCompleteness: userData.displayName || userData.personalData?.name ? 75 : 25,
            personalData: {
              ...existingUser.profile?.personalData,
              ...userData.personalData,
              name:
                userData.displayName ||
                userData.personalData?.name ||
                existingUser.profile?.personalData?.name,
            },
          },
        }

        localUsers.set(uid, updatedUser)
        await new Promise((resolve) => setTimeout(resolve, 800))

        return updatedUser
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        throw error
      }
    },
    [getUserById, activateUser, deactivateUser],
  )

  /**
   * Atualiza role do usuário
   */
  const updateUserRole = useCallback(
    async (uid: string, role: string, ubsId?: string): Promise<UserProfile> => {
      const data = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/role`, {
        role,
        ubsId,
      })
      return data
    },
    [],
  )

  /**
   * Desativa usuário (usado para "deletar")
   */
  const deleteUser = useCallback(
    async (uid: string): Promise<void> => {
      await deactivateUser(uid)
    },
    [deactivateUser],
  )

  /**
   * Reativa usuário
   */
  const reactivateUser = useCallback(async (uid: string): Promise<UserProfile> => {
    const data = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/reactivate`)
    return data
  }, [])

  return {
    canManageUsers,
    canReadUsers,
    listUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserRole,
    deleteUser,
    reactivateUser,
    activateUser,
    deactivateUser,
  }
}
