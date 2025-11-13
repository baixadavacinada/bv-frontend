'use client'

import { useAuth } from '@/hooks/use-firebase-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import VaccinationRegisterForm from './VaccinationRegisterForm'

export default function VaccinationRegisterScreen() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if user is not authenticated
      router.push('/login?redirect=/vacinacao')
    }
  }, [user, isLoading, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p>Verificando autenticação...</p>
      </div>
    )
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null
  }

  return <VaccinationRegisterForm />
}
