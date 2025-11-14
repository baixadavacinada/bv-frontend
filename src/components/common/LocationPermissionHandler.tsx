'use client'

import { useEffect, useState } from 'react'
import { LocationPermissionModal } from '@/components/common/LocationPermissionModal'
import { useGeolocation, GeolocationCoords } from '@/hooks/use-geolocation'
import { useLocationContext } from '@/contexts/LocationContext'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const LOCATION_SHOWN_KEY = 'bv_location_modal_shown'
const LOCATION_COORDS_KEY = 'bv_user_coordinates'

export function LocationPermissionHandler() {
  useAccessibilityValidation({ enabled: true })

  const [showModal, setShowModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const { requestGeolocation, isLoading } = useGeolocation()
  const { setUserCoords } = useLocationContext()

  useEffect(() => {
    try {
      const savedCoords = localStorage.getItem(LOCATION_COORDS_KEY)
      if (savedCoords) {
        const coords = JSON.parse(savedCoords)
        setUserCoords(coords)
      }

      const wasShown = localStorage.getItem(LOCATION_SHOWN_KEY)

      if (!wasShown) {
        setShowModal(true)
        localStorage.setItem(LOCATION_SHOWN_KEY, 'true')
      }
    } catch (err) {
      console.error('❌ Erro ao verificar modal de localização:', err)
    }

    setIsInitialized(true)
  }, [setUserCoords])

  const handlePermit = async (coords?: GeolocationCoords) => {
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
  }

  const handleClose = () => {
    setShowModal(false)
  }

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
