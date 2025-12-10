'use client'

import React from 'react'
import { PageLoadingFallback } from './PageLoadingFallback'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface NavigationLoadingOverlayProps {
  isLoading: boolean
  variant?: 'skeleton' | 'spinner'
}

/**
 * Componente overlay que aparece durante a navegação entre páginas
 * Mantém a tela bloqueada com um loading visual
 */
export function NavigationLoadingOverlay({
  isLoading,
  variant = 'skeleton',
}: NavigationLoadingOverlayProps) {
  useAccessibilityValidation({ enabled: true })

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex h-full w-full items-center justify-center">
        {variant === 'skeleton' ? (
          <div className="w-full max-w-2xl px-6">
            <PageLoadingFallback variant="list" title={true} />
          </div>
        ) : (
          // Spinner simples
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-gray-600" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 dark:border-t-blue-400" />
            </div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Carregando...</p>
          </div>
        )}
      </div>
    </div>
  )
}
