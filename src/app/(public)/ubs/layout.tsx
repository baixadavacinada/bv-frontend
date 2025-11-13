'use client'

import { useAuth } from '@/hooks/use-firebase-auth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function UbsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isAvaliarRoute = pathname.includes('/avaliar')

  useEffect(() => {
    if (!loading && user && (user.role === 'admin' || user.role === 'agent') && !isAvaliarRoute) {
      router.push('/')
    }
  }, [user, loading, router, isAvaliarRoute])

  if (!loading && user && (user.role === 'admin' || user.role === 'agent') && !isAvaliarRoute) {
    return null
  }

  if (loading) {
    return null
  }

  return children
}
