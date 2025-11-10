'use client'

import { useContext } from 'react'
import { LocationContext } from '@/contexts/LocationContext'

/**
 * Hook para acessar o contexto de localização global
 * Fornece acesso ao estado de localização do usuário
 */
export function useLocationContext() {
  const context = useContext(LocationContext)

  if (!context) {
    throw new Error('useLocationContext deve ser usado dentro de LocationProvider')
  }

  return context
}
