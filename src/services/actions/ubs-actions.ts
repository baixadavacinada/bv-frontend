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
