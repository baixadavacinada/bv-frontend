'use server'

import { apiClient } from '../api'

/**
 * Toggle favorite status for an educational material
 */
export const toggleFavoriteEducationalMaterial = async (userId: string, materialId: string) => {
  const endpoint = `/api/admin/users/${userId}/educational-materials/favorite`

  try {
    const result = await apiClient.patch(endpoint, { materialId })
    return result
  } catch (error) {
    console.error('Falha ao alternar favorito do material educativo:', error)
    throw error
  }
}

/**
 * Get user's favorite educational materials
 */
export const getUserFavoriteEducationalMaterials = async (userId: string) => {
  const endpoint = `/api/admin/users/${userId}/educational-materials/favorites`

  try {
    const result = await apiClient.get(endpoint)
    return result
  } catch (error) {
    console.error('Falha ao obter materiais educativos favoritos:', error)
    throw error
  }
}
