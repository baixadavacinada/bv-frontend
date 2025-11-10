'use server'

import { CreateHealthUnits } from '@/types/health-units'
import { apiClient } from '../api'

export const listHealthUnits = async () => {
  const endpoint = '/public/health-units?isActive=true'

  try {
    const data = await apiClient.get(endpoint)
    console.log(data)
    return data
  } catch (error) {
    console.error('Falha ao buscar unidades de saúde:', error)
    throw error
  }
}

export const createHealtUnits = async (data: CreateHealthUnits) => {
  const endpoint = '/admin/health-units'

  try {
    const result = await apiClient.post(endpoint, data)

    return result
  } catch (error) {
    console.error('Falha ao criar unidades de saúde:', error)
    throw error
  }
}

export const updateHealthUnits = async (id: string | number, data: CreateHealthUnits) => {
  const endpoint = `admin/health-units/${id}`

  try {
    const result = await apiClient.put(endpoint, data)
    return result
  } catch (error) {
    console.error('Falha ao atualizar unidades de saúde:', error)
    throw error
  }
}

export const deleteHealthUnits = async (id: string) => {
  const endpoint = `admin/health-units/{id}`.replace('{id}', id)

  try {
    const result = await apiClient.delete(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao deletar unidades de saúde:', error)
    throw error
  }
}

export const toggleFavoriteHealthUnit = async (id: string | number, isFavorite: boolean) => {
  const endpoint = `admin/health-units/${id}/favorite`

  try {
    const result = await apiClient.patch(endpoint, { isFavorite })
    return result
  } catch (error) {
    console.error('Falha ao alternar favorito da unidade de saúde:', error)
    throw error
  }
}

export const getHealthUnitById = async (id: string | number) => {
  const endpoint = `public/health-units/${id}`

  try {
    const result = await apiClient.get(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao obter unidade de saúde por ID:', error)
    throw error
  }
}

export const getVaccines = async () => {
  const endpoint = 'admin/vaccines'

  try {
    const result = await apiClient.get(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao obter vacinas:', error)
    throw error
  }
}
