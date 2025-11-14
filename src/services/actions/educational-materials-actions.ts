'use client'

import { apiClient } from '../api'

interface FavoriteMaterial {
  materialId: string
  link?: string
  addedAt: Date
}

/**
 * Toggle favorite status for an educational material
 */
export const toggleFavoriteEducationalMaterial = async (
  materialId: string,
  link?: string,
): Promise<FavoriteMaterial[]> => {
  try {
    const result = await apiClient.post<FavoriteMaterial[]>(
      '/api/public/user/favorite-materials/toggle',
      { materialId, link },
    )
    return result || []
  } catch (error) {
    console.error('Falha ao alternar favorito do material educativo:', error)
    throw error
  }
}

/**
 * Get user's favorite educational materials
 */
export const getUserFavoriteEducationalMaterials = async (): Promise<FavoriteMaterial[]> => {
  try {
    const result = await apiClient.get<FavoriteMaterial[]>('/api/public/user/favorite-materials')
    return result || []
  } catch (error) {
    console.error('Falha ao obter materiais educativos favoritos:', error)
    throw error
  }
}
