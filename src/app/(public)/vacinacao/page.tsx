'use client'

export const dynamic = 'force-dynamic'

import { useAuth } from '@/hooks/use-firebase-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import VaccinationRegisterForm from './VaccinationRegisterForm'
import { Loader2 } from 'lucide-react'

export default function VaccinationRegisterScreen() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/vacinacao')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" aria-hidden="true" />
          <p className="text-lg font-medium text-gray-700">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <VaccinationRegisterForm />
}
