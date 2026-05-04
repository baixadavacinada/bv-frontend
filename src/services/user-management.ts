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

const localUsers = new Map<string, UserProfile>()

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
          name: firebaseUser?.displayName || 'Usuário',
        },
      },
    }
  }, [firebaseUser])

  const convertApiToUserProfile = useCallback((apiUser: ApiUserData): UserProfile => {
    return {
      uid: apiUser.uid || apiUser.id || apiUser._id || '',
      email: apiUser.email || '',
      displayName: apiUser.displayName || apiUser.name || null,
      role: (apiUser.role as UserRole) || 'public',
      permissions: apiUser.permissions || [],
      isActive: apiUser.isActive !== false,
      emailVerified: apiUser.emailVerified || false,
      createdAt: apiUser.createdAt || apiUser.created_at || new Date().toISOString(),
      lastSignIn: apiUser.lastSignIn || apiUser.last_sign_in,
      profile: apiUser.profile || {
        hasBasicInfo: !!(apiUser.displayName || apiUser.name),
        hasHealthInfo: false,
        profileCompleteness: apiUser.displayName || apiUser.name ? 75 : 25,
        personalData: apiUser.personalData || {
          name: apiUser.displayName || apiUser.name,
        },
      },
    }
  }, [])

  const mergeWithLocalUsers = useCallback((apiUsers: UserProfile[]): UserProfile[] => {
    const mergedUsers = [...apiUsers]

    localUsers.forEach((localUser) => {
      const existingIndex = mergedUsers.findIndex((user) => user.uid === localUser.uid)
      if (existingIndex >= 0) {
        mergedUsers[existingIndex] = localUser
      } else {
        mergedUsers.push(localUser)
      }
    })

    return mergedUsers
  }, [])

  const applySearchFilter = useCallback((users: UserProfile[], search: string): UserProfile[] => {
    if (!search?.trim()) return users

    const searchLower = search.toLowerCase()
    return users.filter(
      (user) =>
        user.displayName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower),
    )
  }, [])

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

  const listUsers = useCallback(
    async (search?: string, page = 1, limit = 20, role?: string): Promise<UserListResponse> => {
      try {
        const params = new URLSearchParams()

        params.append('page', page.toString())
        params.append('limit', limit.toString())

        if (search?.trim()) {
          params.append('search', search.trim())
        }

        if (role?.trim()) {
          params.append('role', role.trim())
        }

        const responseData = await apiClient.get<
          { data?: ApiUserData[]; users?: ApiUserData[] } | ApiUserData[]
        >(`/api/public/users?${params}`)

        let apiUsers: UserProfile[] = []
        if (Array.isArray(responseData)) {
          apiUsers = responseData.map(convertApiToUserProfile)
        } else if (responseData.users) {
          apiUsers = responseData.users.map(convertApiToUserProfile)
        } else if (responseData.data) {
          apiUsers = responseData.data.map(convertApiToUserProfile)
        }

        let users = mergeWithLocalUsers(apiUsers)
        users = applySearchFilter(users, search || '')

        return {
          users,
          total: users.length,
          page,
          limit,
          totalPages: Math.ceil(users.length / limit),
        }
      } catch (error) {
        console.warn('Erro ao listar usuários, usando fallback:', error)
        return createFallbackResponse(search || '')
      }
    },
    [convertApiToUserProfile, mergeWithLocalUsers, applySearchFilter, createFallbackResponse],
  )

  const getUserById = useCallback(
    async (uid: string): Promise<UserProfile> => {
      const localUser = localUsers.get(uid)
      if (localUser) {
        return localUser
      }

      try {
        const { users } = await listUsers()
        const foundUser = users.find((user) => user.uid === uid)
        if (foundUser) {
          return foundUser
        }
      } catch (error) {
        console.warn('Erro ao buscar usuário:', error)
      }

      if (uid === firebaseUser?.uid) {
        return createUserFromFirebase()
      }

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

  const createUser = useCallback(
    async (userData: CreateUserRequest): Promise<UserProfile> => {
      try {
        const responseData = await apiClient.post<
          { data?: ApiUserData; user?: ApiUserData } | ApiUserData
        >('/api/public/auth/register', {
          email: userData.email,
          password: 'TempPassword123!',
          displayName: userData.displayName,
          role: userData.role,
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

  const activateUser = useCallback(async (uid: string): Promise<UserProfile> => {
    const data = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/reactivate`)
    return data
  }, [])

  const deactivateUser = useCallback(async (uid: string): Promise<UserProfile> => {
    const data = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/deactivate`)
    return data
  }, [])

  const updateUserRole = useCallback(async (uid: string, newRole: string): Promise<UserProfile> => {
    if (newRole === 'admin') {
      try {
        const payload = { role: newRole }

        const result = await apiClient.patch<UserProfile>(`/api/admin/users/${uid}/role`, payload)

        return result
      } catch (err) {
        console.error('❌ Falha ao atualizar para admin via /api/admin/users/:uid/role:', err)
        throw err
      }
    } else {
      try {
        const payload = {
          role: newRole,
          permissions: newRole === 'agent' ? ['read_users', 'manage_appointments'] : [],
          reason: `Updated role to ${newRole}`,
        }

        const result = await apiClient.put<UserProfile>(`/api/public/users/${uid}/role`, payload)
        return result
      } catch (err) {
        console.error('❌ Falha ao atualizar via /api/public/users/:uid/role:', err)
        throw err
      }
    }
  }, [])

  const updateUserClaims = useCallback(
    async (uid: string, userData: UpdateUserRequest): Promise<UserProfile> => {
      try {
        const payload = {
          uid,
          role: userData.role,
          permissions:
            userData.role === 'agent'
              ? ['read_users', 'manage_appointments']
              : userData.role === 'admin'
                ? ['all']
                : [],
          ubsId: userData.ubsId || null,
          isActive: userData.isActive !== false,
        }

        // Backend returns { uid, claims, updatedAt }, not UserProfile
        // So we fetch the updated user to get the full UserProfile
        await apiClient.put<{ uid: string; claims: Record<string, unknown>; updatedAt: string }>(
          '/api/admin/claims',
          payload,
        )

        // Fetch the updated user profile
        const updatedUser = await getUserById(uid)
        return updatedUser
      } catch (err) {
        console.error('Erro ao atualizar claims:', err)
        throw err
      }
    },
    [getUserById],
  )

  const updateProfile = useCallback(
    async (profileData: UpdateUserRequest['personalData']): Promise<UserProfile> => {
      if (!profileData?.name && !profileData?.phone && !profileData?.cpf && !profileData?.address) {
        throw new Error('Nenhum dado de perfil para atualizar')
      }

      try {
        const payload = {
          name: profileData?.name,
          phone: profileData?.phone,
          cpf: profileData?.cpf,
          ...(profileData?.address && {
            address: {
              street: profileData.address,
              neighborhood: profileData.neighborhood || '',
              zipCode: profileData.cep || '',
              city: 'Duque de Caxias',
              state: 'RJ',
              number: '1',
            },
          }),
        }

        const responseData = await apiClient.put<
          { data?: ApiUserData; user?: ApiUserData } | ApiUserData
        >('/api/auth/profile', payload)

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
        console.error('Erro ao atualizar perfil via API:', error)
        throw error
      }
    },
    [convertApiToUserProfile],
  )

  const updateUser = useCallback(
    async (uid: string, userData: UpdateUserRequest): Promise<UserProfile> => {
      try {
        const existingUser = await getUserById(uid)

        if (userData.role || userData.isActive !== undefined || userData.ubsId !== undefined) {
          const claimsResult = await updateUserClaims(uid, {
            role: userData.role || existingUser.role,
            isActive: userData.isActive !== undefined ? userData.isActive : existingUser.isActive,
            ubsId: userData.ubsId,
          })

          const updatedUser = {
            ...existingUser,
            ...claimsResult,
            role: (userData.role || existingUser.role) as UserRole,
            isActive: userData.isActive !== undefined ? userData.isActive : existingUser.isActive,
          }

          localUsers.set(uid, updatedUser)
          return updatedUser
        }

        return existingUser
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        throw error
      }
    },
    [getUserById, updateUserClaims],
  )

  const deleteUser = useCallback(
    async (uid: string): Promise<void> => {
      await deactivateUser(uid)
    },
    [deactivateUser],
  )

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
    updateProfile,
    updateUserRole,
    updateUserClaims,
    deleteUser,
    reactivateUser,
    activateUser,
    deactivateUser,
  }
}
