'use server'

import { getAuth } from 'firebase/auth'

interface FavoriteHealthUnit {
  healthUnitId: string
  isFavorite: boolean
  addedAt: Date
}

export async function updateUserFavorites(favorites: string[]): Promise<void> {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      throw new Error('User not authenticated')
    }

    const idToken = await user.getIdToken()

    // Transformar array de IDs em objeto com estrutura esperada
    const favoritesHealthUnit: FavoriteHealthUnit[] = favorites.map((healthUnitId) => ({
      healthUnitId,
      isFavorite: true,
      addedAt: new Date(),
    }))

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/profile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          favoritesHealthUnit,
        }),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to update favorites')
    }

    const data = await response.json()
    console.log('Favorites updated successfully:', data)
  } catch (error) {
    console.error('Error updating favorites:', error)
    throw error
  }
}
