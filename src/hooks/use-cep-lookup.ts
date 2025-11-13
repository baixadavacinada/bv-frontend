'use client'

import { useState, useCallback } from 'react'
import { useGeocoding } from './use-geocoding'

export interface CEPAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  // Adicionando coordenadas se disponíveis
  latitude?: number
  longitude?: number
}

export interface UseCEPLookupResult {
  data: CEPAddress | null
  isLoading: boolean
  error: string | null
  geocoding: boolean // Indica se está fazendo geocodificação
}

/**
 * Hook para buscar endereço por CEP usando ViaCEP API
 * Inclui geocodificação automática usando Nominatim (OpenStreetMap)
 * Simples, sem dependências externas, e com boa performance
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, lookupCEP } = useCEPLookup()
 *
 * const handleCEPChange = async (cep: string) => {
 *   const address = await lookupCEP(cep)
 *   if (address) {
 *     form.setValue('logradouro', address.logradouro)
 *     form.setValue('bairro', address.bairro)
 *     form.setValue('cidade', address.localidade)
 *     form.setValue('estado', address.uf)
 *     // Coordenadas também estarão disponíveis se geocodificação funcionar
 *     if (address.latitude && address.longitude) {
 *       form.setValue('latitude', address.latitude)
 *       form.setValue('longitude', address.longitude)
 *     }
 *   }
 * }
 * ```
 */
export function useCEPLookup() {
  const [data, setData] = useState<CEPAddress | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [geocoding, setGeocoding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { geocodeAddress } = useGeocoding()

  const lookupCEP = useCallback(
    async (cep: string): Promise<CEPAddress | null> => {
      // Remove caracteres especiais
      const cleanCEP = cep.replace(/\D/g, '')

      // Valida se tem 8 dígitos
      if (cleanCEP.length !== 8) {
        setError('CEP deve ter 8 dígitos')
        setData(null)
        return null
      }

      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)

        if (!response.ok) {
          throw new Error('Erro ao buscar CEP')
        }

        const result = await response.json()

        // ViaCEP retorna erro com propriedade "erro"
        if (result.erro) {
          setError('CEP não encontrado')
          setData(null)
          return null
        }

        let addressWithCoords = { ...result }

        // Tentar geocodificar o endereço para obter coordenadas
        if (result.logradouro && result.localidade && result.uf) {
          try {
            setGeocoding(true)
            const fullAddress = `${result.logradouro}, ${result.bairro}, ${result.localidade}, ${result.uf}, Brasil`
            const coords = await geocodeAddress(fullAddress)

            if (coords) {
              addressWithCoords = {
                ...result,
                latitude: coords.latitude,
                longitude: coords.longitude,
              }
            }
          } catch (geocodeError) {
            // Não é erro crítico se geocodificação falhar
            console.warn('Geocodificação falhou:', geocodeError)
          } finally {
            setGeocoding(false)
          }
        }

        setData(addressWithCoords)
        return addressWithCoords
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar CEP'
        setError(errorMessage)
        setData(null)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [geocodeAddress],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    data,
    isLoading,
    geocoding,
    error,
    lookupCEP,
    clearError,
  }
}
