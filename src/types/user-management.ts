/**
 * Tipos para gerenciamento de usuários
 */

import { UserRole, Permission } from './auth'

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL?: string
  role: UserRole
  permissions: Permission[]
  ubsId?: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  lastSignIn?: string
  profile?: {
    hasBasicInfo: boolean
    hasHealthInfo: boolean
    profileCompleteness: number
    personalData?: {
      name?: string
      phone?: string
      cpf?: string
      address?: string
      neighborhood?: string
      cep?: string
    }
  }
  metadata?: {
    lastLogin: string
    createdAt: string
    updatedAt: string
    lastRoleUpdate: string
    updatedBy: string
  }
}

export interface CreateUserRequest {
  email: string
  displayName: string
  role: UserRole
  ubsId?: string
  isActive?: boolean
  personalData?: {
    name?: string
    phone?: string
    cpf?: string
    address?: string
    neighborhood?: string
    cep?: string
  }
}

export interface UpdateUserRequest {
  displayName?: string
  role?: UserRole
  ubsId?: string
  isActive?: boolean
  personalData?: {
    name?: string
    phone?: string
    cpf?: string
    address?: string
    neighborhood?: string
    cep?: string
  }
}

export interface UserListResponse {
  users: UserProfile[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

// Tipos para dados da API
export type ApiUserData = {
  uid?: string
  id?: string
  _id?: string
  email?: string
  displayName?: string
  name?: string
  role?: UserRole
  permissions?: Permission[]
  isActive?: boolean
  emailVerified?: boolean
  createdAt?: string
  created_at?: string
  lastSignIn?: string
  last_sign_in?: string
  profile?: UserProfile['profile']
  personalData?: {
    name?: string
    phone?: string
    cpf?: string
    address?: string
    neighborhood?: string
    cep?: string
  }
}
