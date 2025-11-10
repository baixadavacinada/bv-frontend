'use client'

import { useEffect, useState } from 'react'
import { LocationPermissionModal } from '@/components/common/LocationPermissionModal'
import { useGeolocation, GeolocationCoords } from '@/hooks/use-geolocation'
import { useLocationContext } from '@/contexts/LocationContext'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const LOCATION_SHOWN_KEY = 'bv_location_modal_shown'
const LOCATION_COORDS_KEY = 'bv_user_coordinates'

/**
 * Componente que gerencia a exibição do modal de geolocalização
 * Mostra o modal apenas uma vez por sessão/dispositivo
 * Integra com o contexto de localização global
 */
export function LocationPermissionHandler() {
  useAccessibilityValidation({ enabled: true })

  const [showModal, setShowModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const { requestGeolocation, isLoading } = useGeolocation()
  const { setUserCoords } = useLocationContext()

  // Verificar se deve mostrar o modal e restaurar coordenadas
  useEffect(() => {
    try {
      // Primeiro, tentar restaurar coordenadas salvas
      const savedCoords = localStorage.getItem(LOCATION_COORDS_KEY)
      if (savedCoords) {
        const coords = JSON.parse(savedCoords)
        setUserCoords(coords)
      }

      const wasShown = localStorage.getItem(LOCATION_SHOWN_KEY)

      // Mostrar apenas se não foi mostrado antes
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
      // Salvar coordenadas no localStorage
      localStorage.setItem(LOCATION_COORDS_KEY, JSON.stringify(coords))
    } else {
      // Tentar obter localização mesmo sem permissão prévia
      const newCoords = await requestGeolocation()
      if (newCoords) {
        setUserCoords(newCoords)
        // Salvar coordenadas no localStorage
        localStorage.setItem(LOCATION_COORDS_KEY, JSON.stringify(newCoords))
      }
    }
    setShowModal(false)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  // Não renderizar até estar inicializado
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
