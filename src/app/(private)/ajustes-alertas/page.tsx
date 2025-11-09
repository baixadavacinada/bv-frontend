'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AlertSettingsRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/notificacoes')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Redirecionando para notificações...</p>
      </div>
    </div>
  )
}
