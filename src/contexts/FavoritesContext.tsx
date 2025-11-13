'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

interface FavoritesContextType {
  favorites: Set<string>
  toggleFavorite: (ubsId: string) => void
  isFavorite: (ubsId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ubsFavorites')
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        setFavorites(new Set(parsed))
      } catch (e) {
        console.error('Erro ao carregar favoritos:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Salvar favoritos no localStorage e no backend
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ubsFavorites', JSON.stringify(Array.from(favorites)))

      // Sincronizar com backend se usuário estiver autenticado
      const auth = getAuth()
      if (auth.currentUser) {
        syncFavoritesWithBackend(Array.from(favorites))
      }
    }
  }, [favorites, isLoaded])

  const toggleFavorite = (ubsId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ubsId)) {
        newSet.delete(ubsId)
      } else {
        newSet.add(ubsId)
      }
      return newSet
    })
  }

  const isFavorite = (ubsId: string) => {
    return favorites.has(ubsId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Função para sincronizar favoritos com backend
async function syncFavoritesWithBackend(favorites: string[]) {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) return

    const idToken = await user.getIdToken()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

    const favoritesHealthUnit = favorites.map((healthUnitId) => ({
      healthUnitId,
      isFavorite: true,
      addedAt: new Date(),
    }))

    const response = await fetch(`${apiUrl}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        favoritesHealthUnit,
      }),
    })

    if (!response.ok) {
      console.warn('Failed to sync favorites with backend')
    }
  } catch (error) {
    console.error('Error syncing favorites with backend:', error)
  }
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider')
  }
  return context
}
