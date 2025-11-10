'use client'

import { useState, useCallback, useEffect } from 'react'

export interface GeolocationCoords {
  latitude: number
  longitude: number
  accuracy?: number
}

export interface UseGeolocationReturn {
  coords: GeolocationCoords | null
  isLoading: boolean
  error: string | null
  hasPermission: boolean | null
  requestGeolocation: () => Promise<GeolocationCoords | null>
  clearLocation: () => void
  checkPermission: () => void
}

const STORAGE_KEY = 'bv_geolocation_permission'
const COORDS_STORAGE_KEY = 'bv_user_coords'

/**
 * Hook para gerenciar geolocalização do usuário
 * Persiste permissão e coordenadas no localStorage
 * Fornece métodos para requisitar e limpar localização
 */
export function useGeolocation(): UseGeolocationReturn {
  const [coords, setCoords] = useState<GeolocationCoords | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  // Verificar se há coordenadas armazenadas ao montar
  useEffect(() => {
    try {
      const storedPermission = localStorage.getItem(STORAGE_KEY)
      const storedCoords = localStorage.getItem(COORDS_STORAGE_KEY)

      if (storedPermission) {
        setHasPermission(storedPermission === 'granted')
      }

      if (storedCoords) {
        const parsedCoords = JSON.parse(storedCoords) as GeolocationCoords
        setCoords(parsedCoords)
      }
    } catch (err) {
      console.error('Erro ao carregar geolocalização armazenada:', err)
    }
  }, [])

  const requestGeolocation = useCallback(async (): Promise<GeolocationCoords | null> => {
    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation não é suportado neste navegador'
      setError(errorMsg)
      return null
    }

    setIsLoading(true)
    setError(null)

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: GeolocationCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          }

          setCoords(coords)
          setHasPermission(true)
          setError(null)
          setIsLoading(false)

          // Armazenar coordenadas e permissão
          try {
            localStorage.setItem(STORAGE_KEY, 'granted')
            localStorage.setItem(COORDS_STORAGE_KEY, JSON.stringify(coords))
          } catch (err) {
            console.error('Erro ao armazenar geolocalização:', err)
          }

          resolve(coords)
        },
        (geoError) => {
          let errorMsg = 'Erro ao obter localização'

          // Mensagens de erro específicas
          switch (geoError.code) {
            case geoError.PERMISSION_DENIED:
              errorMsg = 'Permissão de localização negada pelo usuário'
              setHasPermission(false)
              break
            case geoError.POSITION_UNAVAILABLE:
              errorMsg = 'Posição não disponível'
              break
            case geoError.TIMEOUT:
              errorMsg = 'Tempo limite para obter localização'
              break
          }

          setError(errorMsg)
          setIsLoading(false)
          console.error('Geolocation error:', errorMsg, geoError)

          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })
  }, [])

  const clearLocation = useCallback(() => {
    setCoords(null)
    setError(null)
    try {
      localStorage.removeItem(COORDS_STORAGE_KEY)
    } catch (err) {
      console.error('Erro ao limpar geolocalização:', err)
    }
  }, [])

  const checkPermission = useCallback(() => {
    if (!navigator.geolocation) {
      setHasPermission(false)
      return
    }

    // Tentar verificar permissão através de uma chamada rápida
    navigator.geolocation.getCurrentPosition(
      () => {
        setHasPermission(true)
      },
      (error) => {
        if (error.code === 1) {
          // PERMISSION_DENIED
          setHasPermission(false)
        }
      },
      { timeout: 0, maximumAge: Infinity },
    )
  }, [])

  return {
    coords,
    isLoading,
    error,
    hasPermission,
    requestGeolocation,
    clearLocation,
    checkPermission,
  }
}
