'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockGoogleLogin, setClientAuthCookies } from '@/mock/auth'
import { BvButton } from '@/components'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await mockGoogleLogin(email)

      if (result) {
        setClientAuthCookies(result.token, result.user)
        router.push('/inicio')
        router.refresh()
      } else {
        setError(
          'Email não encontrado. Tente: joao.agente@saude.gov.br ou maria.admin@saude.gov.br',
        )
      }
    } catch (err) {
      console.error('Erro no login:', err)
      setError('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <form onSubmit={handleLogin} className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>

        {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <BvButton
          type="submit"
          className="w-full"
          aria-label="Fazer login"
          disabled={isLoading}
          title={isLoading ? 'Carregando...' : 'Login'}
        />

        <div className="mt-4 rounded bg-gray-50 p-3 text-sm">
          <p className="mb-2 font-medium">Emails de teste:</p>
          <ul className="space-y-1 text-gray-600">
            <li>• joao.agente@saude.gov.br (AGENTE_SAUDE)</li>
            <li>• maria.admin@saude.gov.br (ADMIN)</li>
            <li>• carlos.morador@email.com (MORADOR)</li>
          </ul>
        </div>

        <AccessibilityLoadingIndicator
          isLoading={isLoading}
          isValidating={isValidating}
          loadingMessage="Processando login"
        />
      </form>
    </div>
  )
}
