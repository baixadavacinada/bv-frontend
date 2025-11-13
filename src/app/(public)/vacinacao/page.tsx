'use client'

import { useAuth } from '@/hooks/use-firebase-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import VaccinationRegisterForm from './VaccinationRegisterForm'

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
      <div className="flex min-h-[200px] items-center justify-center">
        <p>Verificando autenticação...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <VaccinationRegisterForm />
}
