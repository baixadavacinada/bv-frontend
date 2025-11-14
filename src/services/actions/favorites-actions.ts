'use client'

import { apiClient } from '../api'

interface FavoriteHealthUnit {
  healthUnitId: string
  isFavorite: boolean
  addedAt: Date
}

interface FavoriteMaterial {
  materialId: string
  addedAt: Date
}

/**
 * Adiciona ou remove uma UBS dos favoritos do usuário
 */
export async function toggleFavoriteHealthUnit(
  healthUnitId: string,
): Promise<FavoriteHealthUnit[]> {
  try {
    const response = await apiClient.post<FavoriteHealthUnit[]>(
      '/api/public/user/favorite-health-units/toggle',
      {
        healthUnitId,
      },
    )

    console.log('Health unit favorite toggled:', response)
    return response || []
  } catch (error) {
    console.error('Error toggling health unit favorite:', error)
    throw error
  }
}

/**
 * Adiciona ou remove um material educativo dos favoritos do usuário
 */
export async function toggleFavoriteMaterial(materialId: string): Promise<FavoriteMaterial[]> {
  try {
    const response = await apiClient.post<FavoriteMaterial[]>(
      '/api/public/user/favorite-materials/toggle',
      {
        materialId,
      },
    )

    console.log('Material favorite toggled:', response)
    return response || []
  } catch (error) {
    console.error('Error toggling material favorite:', error)
    throw error
  }
}
