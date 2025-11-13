'use server'

import { CreateHealthUnits, Survey } from '@/types/health-units'
import { apiClient } from '../api'

export const listHealthUnits = async () => {
  try {
    const data = await apiClient.get('/api/public/health-units?isActive=true')
    return data
  } catch (error) {
    console.error('Falha ao buscar unidades de saúde:', error)
    throw error
  }
}

export const createHealtUnits = async (data: CreateHealthUnits) => {
  const endpoint = '/api/admin/health-units'

  try {
    const result = await apiClient.post(endpoint, data)

    return result
  } catch (error) {
    console.error('Falha ao criar unidades de saúde:', error)
    throw error
  }
}

export const updateHealthUnits = async (id: string | number, data: CreateHealthUnits) => {
  const endpoint = `/api/admin/health-units/${id}`

  try {
    const result = await apiClient.put(endpoint, data)
    return result
  } catch (error) {
    console.error('Falha ao atualizar unidades de saúde:', error)
    throw error
  }
}

export const deleteHealthUnits = async (id: string) => {
  const endpoint = `/api/admin/health-units/{id}`.replace('{id}', id)

  try {
    const result = await apiClient.delete(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao deletar unidades de saúde:', error)
    throw error
  }
}

export const toggleFavoriteHealthUnit = async (id: string | number, isFavorite: boolean) => {
  const endpoint = `/api/admin/health-units/${id}/favorite`

  try {
    const result = await apiClient.patch(endpoint, { isFavorite })
    return result
  } catch (error) {
    console.error('Falha ao alternar favorito da unidade de saúde:', error)
    throw error
  }
}

export const getHealthUnitById = async (id: string | number) => {
  const endpoint = `/api/public/health-units/${id}`

  try {
    const result = await apiClient.get(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao obter unidade de saúde por ID:', error)
    throw error
  }
}

export const getVaccines = async () => {
  const endpoint = '/api/admin/vaccines'

  try {
    const result = await apiClient.get(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao obter vacinas:', error)
    throw error
  }
}

export const submitSurvey = async (data: Survey) => {
  const endpoint = '/api/public/feedback'
  try {
    // Sempre enviar como anônimo a menos que especificamente indicado
    const surveyData = {
      ...data,
      isAnonymous: data.isAnonymous !== false ? true : false,
    }
    const result = await apiClient.post(endpoint, surveyData)
    return result
  } catch (error) {
    console.error('Falha ao enviar pesquisa:', error)
    throw error
  }
}
