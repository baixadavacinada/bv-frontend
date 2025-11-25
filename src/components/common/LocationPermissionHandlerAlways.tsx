'use client'

import { useEffect, useState, useCallback } from 'react'
import { LocationPermissionModal } from '@/components/common/LocationPermissionModal'
import { useGeolocation, GeolocationCoords } from '@/hooks/use-geolocation'
import { useLocationContext } from '@/contexts/LocationContext'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const LOCATION_COORDS_KEY = 'bv_user_coordinates'

/**
 * Handler de permissão de localização para páginas que usam localização
 * Diferentemente do LocationPermissionHandler, este SEMPRE mostra o modal
 * na primeira vez que é renderizado (a menos que o usuário tenha negado antes)
 */
export function LocationPermissionHandlerAlways() {
  useAccessibilityValidation({ enabled: true })

  const [showModal, setShowModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasUserDenied, setHasUserDenied] = useState(false)
  const { requestGeolocation, isLoading } = useGeolocation()
  const { setUserCoords } = useLocationContext()

  useEffect(() => {
    if (isInitialized) {
      return
    }

    try {
      const savedCoords = localStorage.getItem(LOCATION_COORDS_KEY)
      if (savedCoords) {
        const coords = JSON.parse(savedCoords)
        setUserCoords(coords)
        setIsInitialized(true)
        return
      }

      // Se não tem coordenadas salvas, mostra o modal
      if (!hasUserDenied) {
        setShowModal(true)
      }
    } catch (err) {
      console.error('❌ Erro ao verificar modal de localização:', err)
    }

    setIsInitialized(true)
  }, [isInitialized, hasUserDenied, setUserCoords])

  const handlePermit = useCallback(
    async (coords?: GeolocationCoords) => {
      if (coords) {
        setUserCoords(coords)
        localStorage.setItem(LOCATION_COORDS_KEY, JSON.stringify(coords))
      } else {
        const newCoords = await requestGeolocation()
        if (newCoords) {
          setUserCoords(newCoords)
          localStorage.setItem(LOCATION_COORDS_KEY, JSON.stringify(newCoords))
        }
      }
      setShowModal(false)
    },
    [requestGeolocation, setUserCoords],
  )

  const handleClose = useCallback(() => {
    setShowModal(false)
    setHasUserDenied(true)
  }, [])

  if (!isInitialized) {
    return null
  }

  return (
    <LocationPermissionModal
      isOpen={showModal}
      onClose={handleClose}
      onPermit={handlePermit}
      loading={isLoading}
    />
  )
}
