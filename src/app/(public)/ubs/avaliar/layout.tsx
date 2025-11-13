'use client'

import { useAuth } from '@/hooks/use-firebase-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AvaliarLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && (user.role === 'admin' || user.role === 'agent')) {
      // Redirecionar agent e admin para gestão de UBS
      router.push('/gestao-ubs')
    }
  }, [user, loading, router])

  // Se o usuário é admin ou agent, não renderizar nada (enquanto redireciona)
  if (!loading && user && (user.role === 'admin' || user.role === 'agent')) {
    return null
  }

  // Se está carregando, mostrar nada (para evitar flash de conteúdo)
  if (loading) {
    return null
  }

  return children
}
