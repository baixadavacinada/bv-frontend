'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

/**
 * Hook para gerenciar o estado de loading durante navegação
 * Usa React's useTransition para detectar quando a navegação está ocorrendo
 */
export function useNavigationLoading() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const push = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href)
      })
    },
    [router],
  )

  const replace = useCallback(
    (href: string) => {
      startTransition(() => {
        router.replace(href)
      })
    },
    [router],
  )

  const back = useCallback(() => {
    startTransition(() => {
      router.back()
    })
  }, [router])

  return {
    isLoading: isPending,
    push,
    replace,
    back,
  }
}
