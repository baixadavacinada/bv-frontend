'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { toggleFavoriteHealthUnit } from '@/services/actions/favorites-actions'

interface FavoritesContextType {
  favorites: Set<string>
  toggleFavorite: (ubsId: string) => Promise<void>
  isFavorite: (ubsId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

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
  }, [])

  const toggleFavorite = async (ubsId: string) => {
    try {
      setFavorites((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(ubsId)) {
          newSet.delete(ubsId)
        } else {
          newSet.add(ubsId)
        }
        return newSet
      })

      // Salvar no localStorage
      const newFavorites = Array.from(favorites)
      if (favorites.has(ubsId)) {
        newFavorites.splice(newFavorites.indexOf(ubsId), 1)
      } else {
        newFavorites.push(ubsId)
      }
      localStorage.setItem('ubsFavorites', JSON.stringify(newFavorites))

      // Sincronizar com backend usando toggle endpoint
      const auth = getAuth()
      if (auth.currentUser) {
        await toggleFavoriteHealthUnit(ubsId)
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error)
      throw error
    }
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

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider')
  }
  return context
}
