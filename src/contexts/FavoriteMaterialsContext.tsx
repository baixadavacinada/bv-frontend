'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { toggleFavoriteEducationalMaterial } from '@/services/actions/educational-materials-actions'

interface FavoriteMaterialsContextType {
  favoriteMaterials: Set<string>
  toggleFavoriteMaterial: (materialId: string, link?: string) => Promise<void>
  isFavoriteMaterial: (materialId: string) => boolean
}

const FavoriteMaterialsContext = createContext<FavoriteMaterialsContextType | undefined>(undefined)

export function FavoriteMaterialsProvider({ children }: { children: React.ReactNode }) {
  const [favoriteMaterials, setFavoriteMaterials] = useState<Set<string>>(new Set())

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteMaterials')
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        setFavoriteMaterials(new Set(parsed))
      } catch (e) {
        console.error('Erro ao carregar favoritos de materiais:', e)
      }
    }
  }, [])

  const toggleMaterialFavorite = async (materialId: string, link?: string) => {
    try {
      let newSet = new Set<string>()

      setFavoriteMaterials((prev) => {
        newSet = new Set(prev)
        if (newSet.has(materialId)) {
          newSet.delete(materialId)
        } else {
          newSet.add(materialId)
        }
        return newSet
      })

      // Salvar no localStorage com o novo estado
      localStorage.setItem('favoriteMaterials', JSON.stringify(Array.from(newSet)))

      // Sincronizar com backend
      const auth = getAuth()
      if (auth.currentUser) {
        await toggleFavoriteEducationalMaterial(materialId, link)
      }
    } catch (error) {
      console.error('Erro ao alternar favorito de material:', error)
      throw error
    }
  }

  const isFavoriteMaterial = (materialId: string) => {
    return favoriteMaterials.has(materialId)
  }

  return (
    <FavoriteMaterialsContext.Provider
      value={{
        favoriteMaterials,
        toggleFavoriteMaterial: toggleMaterialFavorite,
        isFavoriteMaterial,
      }}
    >
      {children}
    </FavoriteMaterialsContext.Provider>
  )
}

export function useFavoriteMaterials() {
  const context = useContext(FavoriteMaterialsContext)
  if (!context) {
    throw new Error('useFavoriteMaterials deve ser usado dentro de FavoriteMaterialsProvider')
  }
  return context
}
