import { UserRole, ROLE_PERMISSIONS, UserProfile } from '@/types/auth'

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
    // Try to get cached profile first
    const cachedProfile = getCachedProfile(uid)
    if (cachedProfile) {
      return cachedProfile
    }

    // Return default profile for public users
    // Profile was already synced during registration via /auth/sync
    const defaultProfile: UserProfile = {
      uid,
      email: null,
      displayName: null,
      role: 'public',
      permissions: ROLE_PERMISSIONS.public,
      isActive: true,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    }

    return defaultProfile
  } catch {
    const defaultProfile: UserProfile = {
      uid,
      email: null,
      displayName: null,
      role: 'public',
      permissions: ROLE_PERMISSIONS.public,
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
    throw new Error(data.error?.message || 'Falha ao atualizar função')
  }

  // Update cache
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
    throw new Error(data.error?.message || 'Falha ao listar usuários')
  }

  return data.data as {
    users: UserProfile[]
    total: number
    page: number
    limit: number
  }
}

export async function refreshUserProfile(token: string, uid: string): Promise<UserProfile> {
  clearCachedProfile(uid)

  return fetchUserProfile(token, uid)
}
