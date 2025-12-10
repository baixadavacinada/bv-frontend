'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useNavigationLoadingContext } from '@/components/providers/NavigationLoadingProvider'

/**
 * Hook para usar com botões de navegação
 * Ativa automaticamente o loading quando o usuário clica
 */
export function useNavigateWithLoading() {
  const router = useRouter()
  const { setIsLoading } = useNavigationLoadingContext()

  const navigate = useCallback(
    (href: string) => {
      setIsLoading(true)
      router.push(href)
    },
    [router, setIsLoading],
  )

  const replace = useCallback(
    (href: string) => {
      setIsLoading(true)
      router.replace(href)
    },
    [router, setIsLoading],
  )

  const back = useCallback(() => {
    setIsLoading(true)
    router.back()
  }, [router, setIsLoading])

  return { navigate, replace, back, setIsLoading }
}
