'use client'

import { useState, useCallback } from 'react'

export interface GeocodeResult {
  latitude: number
  longitude: number
  displayName: string
}

export interface UseGeocodingResult {
  isLoading: boolean
  error: string | null
  geocodeAddress: (address: string) => Promise<GeocodeResult | null>
}

export function useGeocoding(): UseGeocodingResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const geocodeAddress = useCallback(async (address: string): Promise<GeocodeResult | null> => {
    if (!address?.trim()) {
      setError('Endereço é obrigatório')
      return null
    }

    try {
      setIsLoading(true)
      setError(null)

      // Formatando endereço para incluir "Brasil" para melhor precisão
      const fullAddress = address.includes('Brasil') ? address : `${address}, Brasil`

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'BaixadaVacinada/1.0 (contato@baixadavacinada.com)', // Requerido pela API
          },
        },
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar coordenadas')
      }

      const data = await response.json()

      if (!data || data.length === 0) {
        setError('Endereço não encontrado')
        return null
      }

      const result = data[0]
      const geocoded: GeocodeResult = {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        displayName: result.display_name,
      }

      return geocoded
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar coordenadas'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    geocodeAddress,
  }
}
