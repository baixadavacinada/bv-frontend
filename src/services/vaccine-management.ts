/**
 * Serviço para gerenciamento de vacinas
 * Operações CRUD de vacinas com fallback local
 */

import { useCallback, useMemo } from 'react'
import { apiClient } from './api'
import { useAuth } from '@/hooks/use-firebase-auth'
import {
  Vaccine,
  CreateVaccineRequest,
  UpdateVaccineRequest,
  ApiVaccineData,
} from '@/types/vaccines'

const localVaccines = new Map<string, Vaccine>()

/**
 * Hook para gerenciamento de vacinas
 */
export function useVaccineManagement() {
  const { user } = useAuth()

  const canManageVaccines = useMemo(
    () => user?.permissions.includes('write_vaccines') || user?.role === 'admin' || false,
    [user?.permissions, user?.role],
  )

  const canReadVaccines = useMemo(
    () =>
      user?.permissions.includes('read_vaccines') ||
      user?.role === 'admin' ||
      user?.role === 'agent' ||
      false,
    [user?.permissions, user?.role],
  )

  const convertApiToVaccine = useCallback((apiVaccine: ApiVaccineData): Vaccine => {
    return {
      id: apiVaccine._id || apiVaccine.id || '',
      _id: apiVaccine._id,
      name: apiVaccine.name || '',
      manufacturer: apiVaccine.manufacturer,
      ageGroup: apiVaccine.ageGroup,
      doses: apiVaccine.doses || [],
      batchNumber: apiVaccine.batchNumber,
      lote: apiVaccine.batchNumber,
      description: apiVaccine.description,
      isActive: apiVaccine.isActive !== false,
      createdAt: apiVaccine.createdAt || apiVaccine.created_at,
      updatedAt: apiVaccine.updatedAt || apiVaccine.updated_at,
      createdBy: apiVaccine.createdBy,
    }
  }, [])

  // Mescla vacinas da API com vacinas locais
  const mergeWithLocalVaccines = useCallback((apiVaccines: Vaccine[]): Vaccine[] => {
    const mergedVaccines = [...apiVaccines]

    localVaccines.forEach((localVaccine) => {
      const existingIndex = mergedVaccines.findIndex((vaccine) => vaccine.id === localVaccine.id)
      if (existingIndex >= 0) {
        mergedVaccines[existingIndex] = localVaccine
      } else {
        mergedVaccines.push(localVaccine)
      }
    })

    return mergedVaccines
  }, [])

  // Aplica filtro de busca nas vacinas
  const applySearchFilter = useCallback((vaccines: Vaccine[], search: string): Vaccine[] => {
    if (!search?.trim()) return vaccines

    const searchLower = search.toLowerCase()
    return vaccines.filter(
      (vaccine) =>
        vaccine.name?.toLowerCase().includes(searchLower) ||
        vaccine.manufacturer?.toLowerCase().includes(searchLower) ||
        vaccine.description?.toLowerCase().includes(searchLower),
    )
  }, [])

  /**
   * Lista vacinas com busca
   */
  const listVaccines = useCallback(
    async (search?: string, page = 1, limit = 20): Promise<Vaccine[]> => {
      try {
        const params = new URLSearchParams()
        params.append('page', page.toString())
        params.append('limit', limit.toString())

        if (search?.trim()) {
          params.append('search', search.trim())
        }

        const response = await apiClient.get<{
          success: boolean
          data: ApiVaccineData[]
          message: string
          count: number
        }>(`/api/public/vaccines?${params}`)

        const apiVaccines = (response.data || []).map(convertApiToVaccine)

        let vaccines = mergeWithLocalVaccines(apiVaccines)
        vaccines = applySearchFilter(vaccines, search || '')

        return vaccines
      } catch (error) {
        console.warn('Erro ao listar vacinas, usando fallback:', error)

        const fallbackVaccines = Array.from(localVaccines.values())
        return applySearchFilter(fallbackVaccines, search || '')
      }
    },
    [convertApiToVaccine, mergeWithLocalVaccines, applySearchFilter],
  )

  /**
   * Busca vacina por ID
   */
  const getVaccineById = useCallback(
    async (id: string): Promise<Vaccine> => {
      const localVaccine = localVaccines.get(id)
      if (localVaccine) {
        return localVaccine
      }

      try {
        const response = await apiClient.get<{
          message: string
          data: ApiVaccineData
        }>(`/api/admin/vaccines/${id}`)

        return convertApiToVaccine(response.data)
      } catch (error) {
        console.warn('Erro ao buscar vacina:', error)

        try {
          const vaccines = await listVaccines()
          const foundVaccine = vaccines.find((vaccine) => vaccine.id === id)
          if (foundVaccine) {
            return foundVaccine
          }
        } catch (listError) {
          console.warn('Erro ao buscar na lista:', listError)
        }

        throw new Error(`Vacina ${id} não encontrada`)
      }
    },
    [convertApiToVaccine, listVaccines],
  )

  /**
   * Cria nova vacina
   */
  const createVaccine = useCallback(
    async (vaccineData: CreateVaccineRequest): Promise<Vaccine> => {
      try {
        const requestData = {
          name: vaccineData.name,
          manufacturer: vaccineData.manufacturer,
          ageGroup: vaccineData.ageGroup,
          doses: vaccineData.doses,
          description: vaccineData.description,
          batchNumber: vaccineData.lote,
        }

        console.log('Enviando dados para API:', JSON.stringify(requestData, null, 2))

        const response = await apiClient.post<ApiVaccineData>('/api/admin/vaccines', requestData)

        console.log('Resposta da API:', response)
        const newVaccine = convertApiToVaccine(response)

        if (newVaccine.id && localVaccines.has(newVaccine.id)) {
          localVaccines.delete(newVaccine.id)
        }

        return newVaccine
      } catch (error) {
        console.error('Erro ao criar vacina:', error)

        // Fallback: cria localmente
        const newVaccineId = `vaccine_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const newVaccine: Vaccine = {
          id: newVaccineId,
          name: vaccineData.name,
          manufacturer: vaccineData.manufacturer,
          ageGroup: vaccineData.ageGroup,
          doses: vaccineData.doses,
          batchNumber: vaccineData.lote,
          lote: vaccineData.lote,
          description: vaccineData.description,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: user?.uid || 'unknown-user',
        }

        localVaccines.set(newVaccineId, newVaccine)
        await new Promise((resolve) => setTimeout(resolve, 500))

        return newVaccine
      }
    },
    [convertApiToVaccine, user?.uid],
  )

  /**
   * Atualiza vacina existente
   */
  const updateVaccine = useCallback(
    async (id: string, vaccineData: UpdateVaccineRequest): Promise<Vaccine> => {
      try {
        const requestData: Record<string, unknown> = {}

        if (vaccineData.name !== undefined) requestData.name = vaccineData.name
        if (vaccineData.manufacturer !== undefined)
          requestData.manufacturer = vaccineData.manufacturer
        if (vaccineData.ageGroup !== undefined) requestData.ageGroup = vaccineData.ageGroup
        if (vaccineData.doses !== undefined) requestData.doses = vaccineData.doses
        if (vaccineData.description !== undefined) requestData.description = vaccineData.description
        if (vaccineData.isActive !== undefined) requestData.isActive = vaccineData.isActive
        if (vaccineData.lote !== undefined) requestData.batchNumber = vaccineData.lote

        const response = await apiClient.put<ApiVaccineData>(
          `/api/admin/vaccines/${id}`,
          requestData,
        )

        const updatedVaccine = convertApiToVaccine(response)

        if (localVaccines.has(id)) {
          localVaccines.delete(id)
        }

        return updatedVaccine
      } catch (error) {
        console.warn('Erro ao atualizar vacina na API, atualizando localmente:', error)

        // Fallback: atualiza localmente
        const existingVaccine = await getVaccineById(id)
        const updatedVaccine: Vaccine = {
          ...existingVaccine,
          name: vaccineData.name || existingVaccine.name,
          manufacturer: vaccineData.manufacturer || existingVaccine.manufacturer,
          ageGroup: vaccineData.ageGroup || existingVaccine.ageGroup,
          doses: vaccineData.doses || existingVaccine.doses,
          batchNumber: vaccineData.lote || existingVaccine.batchNumber,
          lote: vaccineData.lote || existingVaccine.lote,
          description: vaccineData.description || existingVaccine.description,
          isActive:
            vaccineData.isActive !== undefined ? vaccineData.isActive : existingVaccine.isActive,
          updatedAt: new Date().toISOString(),
        }

        localVaccines.set(id, updatedVaccine)
        await new Promise((resolve) => setTimeout(resolve, 500))

        return updatedVaccine
      }
    },
    [convertApiToVaccine, getVaccineById],
  )

  /**
   * Deleta vacina
   */
  const deleteVaccine = useCallback(
    async (id: string): Promise<void> => {
      try {
        await apiClient.delete(`/api/admin/vaccines/${id}`)

        if (localVaccines.has(id)) {
          localVaccines.delete(id)
        }
      } catch (error) {
        console.warn('Erro ao deletar vacina na API, removendo localmente:', error)

        if (localVaccines.has(id)) {
          localVaccines.delete(id)
        } else {
          try {
            const existingVaccine = await getVaccineById(id)
            const updatedVaccine: Vaccine = {
              ...existingVaccine,
              isActive: false,
              updatedAt: new Date().toISOString(),
            }
            localVaccines.set(id, updatedVaccine)
          } catch (getError) {
            console.error('Erro ao marcar vacina como inativa:', getError)
          }
        }

        throw error
      }
    },
    [getVaccineById],
  )

  return {
    canManageVaccines,
    canReadVaccines,
    listVaccines,
    getVaccineById,
    createVaccine,
    updateVaccine,
    deleteVaccine,
  }
}
