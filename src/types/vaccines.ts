/**
 * Tipos para o sistema de gestão de vacinas
 */

export interface Vaccine {
  id: string
  _id?: string
  name: string
  manufacturer?: string
  ageGroup?: string
  doses?: string[]
  batchNumber?: string
  lote?: string
  description?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  createdBy?: string

  recommendedAge?: string
  intervalBetweenDoses?: number
  contraindications?: string[]
  sideEffects?: string[]
}

export interface CreateVaccineRequest {
  name: string
  manufacturer: string
  ageGroup: string
  doses: string[]
  description: string
  lote: string
  createdBy?: string
}

export interface UpdateVaccineRequest {
  name?: string
  manufacturer?: string
  ageGroup?: string
  doses?: string[]
  lote?: string
  description?: string
  isActive?: boolean
}

export interface VaccineListResponse {
  vaccines: Vaccine[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiVaccineData {
  _id?: string
  id?: string
  name: string
  manufacturer?: string
  ageGroup?: string
  doses?: string[]
  lote?: string
  batchNumber?: string
  description?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  created_at?: string
  updated_at?: string
  createdBy?: string
}
