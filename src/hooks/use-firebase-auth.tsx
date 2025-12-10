'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { logout as authLogout } from '@/lib/auth-service'
import { UserRole, Permission, UserClaims } from '@/types/auth'
import { fetchUserProfile, getCachedProfile, clearCachedProfile } from '@/lib/roles-service'

export type { UserRole, Permission, UserClaims } from '@/types/auth'

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  phone?: string | null
  role: UserRole
  permissions: Permission[]
  ubsId?: string
  customClaims: UserClaims
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  error: string | null
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  hasRole: (role: UserRole | UserRole[]) => boolean
  hasPermission: (permission: Permission | Permission[], requireAll?: boolean) => boolean
  isAdmin: () => boolean
  isAgent: () => boolean
  canManageUsers: () => boolean
  canManageHealthUnits: () => boolean
  canManageVaccines: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = async () => {
    if (!firebaseUser) return

    try {
      setLoading(true)

      const token = await firebaseUser.getIdToken(true)

      let userProfile = getCachedProfile(firebaseUser.uid)

      if (!userProfile) {
        userProfile = await fetchUserProfile(token, firebaseUser.uid)
      }

      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        phone: userProfile.phone,
        role: userProfile.role,
        permissions: userProfile.permissions,
        ubsId: userProfile.ubsId,
        customClaims: {
          role: userProfile.role,
          permissions: userProfile.permissions,
          ubsId: userProfile.ubsId,
          isActive: userProfile.isActive,
        },
        isActive: userProfile.isActive,
      }

      setUser(userData)
      setError(null)

      if (typeof document !== 'undefined') {
        const isProduction = process.env.NODE_ENV === 'production'
        const secureFlag = isProduction ? 'secure;' : ''
        document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
      }
    } catch {
      setError('Erro ao atualizar dados do usuário')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (user) {
        clearCachedProfile(user.uid)
      }

      await authLogout()
      setUser(null)
      setFirebaseUser(null)
      setError(null)

      if (typeof document !== 'undefined') {
        document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    } catch {
      setError('Erro ao fazer logout')
    }
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false

    // Admin always has access to all roles (hierarchy: admin > agent > public)
    if (user.role === 'admin') return true

    if (Array.isArray(role)) {
      return role.includes(user.role)
    }

    return user.role === role
  }

  const hasPermission = (
    permission: Permission | Permission[],
    requireAll: boolean = false,
  ): boolean => {
    if (!user) return false

    if (Array.isArray(permission)) {
      if (requireAll) {
        return permission.every((perm) => user.permissions.includes(perm))
      } else {
        return permission.some((perm) => user.permissions.includes(perm))
      }
    }

    return user.permissions.includes(permission)
  }

  const isAdmin = (): boolean => hasRole('admin')
  const isAgent = (): boolean => hasRole(['admin', 'agent'])
  const canManageUsers = (): boolean => hasPermission('write_users')
  const canManageHealthUnits = (): boolean => hasPermission('write_health_units')
  const canManageVaccines = (): boolean => hasPermission('write_vaccines')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      setFirebaseUser(firebaseUser)

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken()

          if (typeof document !== 'undefined') {
            const isProduction = process.env.NODE_ENV === 'production'
            const secureFlag = isProduction ? 'secure;' : ''
            document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
          }

          let userProfile = getCachedProfile(firebaseUser.uid)

          if (!userProfile) {
            try {
              userProfile = await fetchUserProfile(token, firebaseUser.uid)
            } catch {
              userProfile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: 'public',
                permissions: [],
                isActive: true,
                emailVerified: false,
                createdAt: new Date().toISOString(),
              }
            }
          }

          const userData: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: userProfile.role,
            permissions: userProfile.permissions,
            ubsId: userProfile.ubsId,
            customClaims: {
              role: userProfile.role,
              permissions: userProfile.permissions,
              ubsId: userProfile.ubsId,
              isActive: userProfile.isActive,
            },
            isActive: userProfile.isActive,
          }

          setUser(userData)
          setError(null)
        } catch {
          setError('Erro na autenticação')
          setUser(null)

          if (typeof document !== 'undefined') {
            document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          }
        }
      } else {
        if (typeof document !== 'undefined') {
          document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
        setUser(null)
        setError(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    firebaseUser,
    loading,
    error,
    logout,
    refreshUser,
    hasRole,
    hasPermission,
    isAdmin,
    isAgent,
    canManageUsers,
    canManageHealthUnits,
    canManageVaccines,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
