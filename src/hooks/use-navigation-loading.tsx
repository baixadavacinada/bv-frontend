'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'

/**
 * Hook para gerenciar loading durante navegação
 * Mostra um indicador de carregamento ao navegar
 */
export function useNavigationLoading() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useCallback(
    async (path: string) => {
      setIsLoading(true)
      try {
        router.push(path)
      } finally {
        // Mantém o loading por um pouco para evitar flashing
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    },
    [router],
  )

  return {
    isLoading,
    navigate,
  }
}
