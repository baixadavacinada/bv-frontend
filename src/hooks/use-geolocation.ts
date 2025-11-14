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
const TIMESTAMP_STORAGE_KEY = 'bv_geolocation_timestamp'
const EXPIRATION_DAYS = 15
const EXPIRATION_MS = EXPIRATION_DAYS * 24 * 60 * 60 * 1000

// Distância mínima em metros para considerar que a localização mudou
const MIN_DISTANCE_CHANGE = 500

/**
 * Calcula a distância entre dois pontos usando a fórmula de Haversine
 * Retorna a distância em metros
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000 // Raio da Terra em metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Verifica se o cache de geolocalização expirou
 */
function isCacheExpired(): boolean {
  try {
    const timestamp = localStorage.getItem(TIMESTAMP_STORAGE_KEY)
    if (!timestamp) return true

    const storedTime = parseInt(timestamp, 10)
    const now = Date.now()
    return now - storedTime > EXPIRATION_MS
  } catch {
    return true
  }
}

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
      // Verificar se o cache expirou
      if (isCacheExpired()) {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(COORDS_STORAGE_KEY)
        localStorage.removeItem(TIMESTAMP_STORAGE_KEY)
        setHasPermission(null)
        setCoords(null)
        return
      }

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
          const newCoords: GeolocationCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          }

          // Verificar se a localização mudou significativamente
          const storedCoords = localStorage.getItem(COORDS_STORAGE_KEY)
          if (storedCoords) {
            try {
              const oldCoords = JSON.parse(storedCoords) as GeolocationCoords
              const distance = calculateDistance(
                oldCoords.latitude,
                oldCoords.longitude,
                newCoords.latitude,
                newCoords.longitude,
              )

              // Se a localização mudou mais de 500m, limpar cache
              if (distance > MIN_DISTANCE_CHANGE) {
                localStorage.removeItem(STORAGE_KEY)
                localStorage.removeItem(TIMESTAMP_STORAGE_KEY)
                setHasPermission(null)
              }
            } catch (err) {
              console.error('Erro ao comparar localizações:', err)
            }
          }

          setCoords(newCoords)
          setHasPermission(true)
          setError(null)
          setIsLoading(false)

          // Armazenar coordenadas, permissão e timestamp
          try {
            localStorage.setItem(STORAGE_KEY, 'granted')
            localStorage.setItem(COORDS_STORAGE_KEY, JSON.stringify(newCoords))
            localStorage.setItem(TIMESTAMP_STORAGE_KEY, Date.now().toString())
          } catch (err) {
            console.error('Erro ao armazenar geolocalização:', err)
          }

          resolve(newCoords)
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
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(TIMESTAMP_STORAGE_KEY)
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
