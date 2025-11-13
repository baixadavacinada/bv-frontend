'use client'

import { useAuth } from '@/hooks/use-firebase-auth'
import { Toaster } from 'sonner'

/**
 * Renderiza o Toaster apenas para usuários autenticados
 */
export function ToasterWithAuth() {
  const { user } = useAuth()

  // Apenas renderiza o Toaster se o usuário estiver logado
  if (!user) {
    return null
  }

  return <Toaster />
}
