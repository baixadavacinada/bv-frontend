'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface GeolocationCoords {
  latitude: number
  longitude: number
}

export interface LocationContextType {
  userCoords: GeolocationCoords | null
  setUserCoords: (coords: GeolocationCoords | null) => void
  showLocationModal: () => void
  hideLocationModal: () => void
  isLocationModalOpen: boolean
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined)

export interface LocationProviderProps {
  children: ReactNode
}

/**
 * Provider para gerenciar o contexto de localização global
 * Fornece acesso à localização do usuário em toda a aplicação
 */
export function LocationProvider({ children }: LocationProviderProps) {
  const [userCoords, setUserCoordsState] = useState<GeolocationCoords | null>(null)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const setUserCoords = useCallback((coords: GeolocationCoords | null) => {
    setUserCoordsState(coords)
  }, [])

  const showLocationModal = useCallback(() => {
    setIsLocationModalOpen(true)
  }, [])

  const hideLocationModal = useCallback(() => {
    setIsLocationModalOpen(false)
  }, [])

  const value: LocationContextType = {
    userCoords,
    setUserCoords,
    showLocationModal,
    hideLocationModal,
    isLocationModalOpen,
  }

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocationContext deve ser usado dentro de LocationProvider')
  }
  return context
}
