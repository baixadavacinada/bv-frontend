'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import Image from 'next/image'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { BvButton } from '@/components'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const router = useRouter()

  return (
    <div>
      <div className="mb-8 text-center">
        <Image
          src="/criola-logo.png"
          alt="Logo Criola"
          width={80}
          height={80}
          className="mx-auto mb-4"
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Baixada Vacinada</h1>
        <p className="text-lg text-gray-600">Crie sua conta e acompanhe sua vacinação!</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Criar nova conta</h2>

        <RegisterForm />

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <BvButton
              onClick={() => router.push('/login')}
              className="font-mediu hover:underline"
              variant="link"
              title="Faça login aqui"
            />
          </p>
        </div>
      </div>

      <AccessibilityLoadingIndicator
        isLoading={false}
        isValidating={isValidating}
        loadingMessage="Carregando página"
      />
    </div>
  )
}
