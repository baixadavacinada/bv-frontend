'use client'

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { NavigationLoadingOverlay } from '@/components/layout/NavigationLoadingOverlay'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface NavigationLoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
})

export function useNavigationLoadingContext() {
  return useContext(NavigationLoadingContext)
}

interface NavigationLoadingProviderProps {
  children: ReactNode
}

/**
 * Provider global para gerenciar loading durante navegação
 * Detecta mudanças de rota e mostra overlay de loading
 */
export function NavigationLoadingProvider({ children }: NavigationLoadingProviderProps) {
  useAccessibilityValidation({ enabled: true })

  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Esconde o loading quando a rota muda (página carregou)
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  return (
    <NavigationLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <NavigationLoadingOverlay isLoading={isLoading} variant="skeleton" />
    </NavigationLoadingContext.Provider>
  )
}
