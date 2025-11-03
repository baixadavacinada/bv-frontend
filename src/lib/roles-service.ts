import { UserRole, Permission, ROLE_PERMISSIONS, UserProfile } from '@/types/auth'

interface RoleUpdateRequest {
  uid: string
  role: UserRole
  ubsId?: string
  isActive?: boolean
}

interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

const CACHE_KEY = 'user_profile_cache'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

interface CachedProfile {
  profile: UserProfile
  timestamp: number
}

export function getCachedProfile(uid: string): UserProfile | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${uid}`)
    if (!cached) return null

    const { profile, timestamp }: CachedProfile = JSON.parse(cached)

    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_KEY}_${uid}`)
      return null
    }

    return profile
  } catch {
    return null
  }
}

export function setCachedProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return

  try {
    const cached: CachedProfile = {
      profile,
      timestamp: Date.now(),
    }
    localStorage.setItem(`${CACHE_KEY}_${profile.uid}`, JSON.stringify(cached))
  } catch {}
}

export function clearCachedProfile(uid: string): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(`${CACHE_KEY}_${uid}`)
  } catch {}
}

export async function fetchUserProfile(token: string, uid: string): Promise<UserProfile> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data: ApiResponse<UserProfile> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || 'Failed to fetch profile')
    }

    setCachedProfile(data.data)

    return data.data
  } catch {
    const defaultProfile: UserProfile = {
      uid,
      email: null,
      displayName: null,
      role: 'admin',
      permissions: ROLE_PERMISSIONS.admin,
      isActive: true,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    }

    return defaultProfile
  }
}

export async function updateUserRole(
  token: string,
  request: RoleUpdateRequest,
): Promise<UserProfile> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${request.uid}/role`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: request.role,
        ubsId: request.ubsId,
        isActive: request.isActive,
      }),
    },
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `HTTP ${response.status}`)
  }

  const data: ApiResponse<UserProfile> = await response.json()

  if (!data.success || !data.data) {
    throw new Error(data.error?.message || 'Failed to update role')
  }

  setCachedProfile(data.data)

  return data.data
}

export async function listUsers(
  token: string,
  page = 1,
  limit = 20,
): Promise<{
  users: UserProfile[]
  total: number
  page: number
  limit: number
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `HTTP ${response.status}`)
  }

  const data: ApiResponse = await response.json()

  if (!data.success) {
    throw new Error(data.error?.message || 'Failed to list users')
  }

  return data.data as {
    users: UserProfile[]
    total: number
    page: number
    limit: number
  }
}

export async function createUserProfile(
  token: string,
  firebaseUser: { uid: string; email: string | null; displayName: string | null },
): Promise<UserProfile> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        role: 'admin', // Default role
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data: ApiResponse<UserProfile> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || 'Failed to create profile')
    }

    setCachedProfile(data.data)

    return data.data
  } catch {
    const defaultProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      role: 'admin',
      permissions: ROLE_PERMISSIONS.admin,
      isActive: true,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    }

    setCachedProfile(defaultProfile)

    return defaultProfile
  }
}

export async function refreshUserProfile(token: string, uid: string): Promise<UserProfile> {
  clearCachedProfile(uid)

  return fetchUserProfile(token, uid)
}
