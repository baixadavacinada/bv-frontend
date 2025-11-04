'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginForm } from '@/components/auth/LoginForm'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { BvButton } from '@/components'

function LoginPageContent() {
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Verifica se veio da página de registro
    if (searchParams.get('registered') === 'true') {
      setShowWelcomeMessage(true)
      // Remove o parâmetro da URL para evitar que a mensagem persista após refresh
      router.replace('/login')
      // Remove a mensagem após 10 segundos
      setTimeout(() => setShowWelcomeMessage(false), 10000)
    }
  }, [searchParams, router])

  if (showResetPassword) {
    return (
      <div className="mx-auto mt-8 max-w-md">
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
          <h1 className="text-2xl font-bold text-gray-900">Baixada Vacinada</h1>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <ResetPasswordForm onBack={() => setShowResetPassword(false)} />
        </div>

        <AccessibilityLoadingIndicator
          isLoading={false}
          isValidating={isValidating}
          loadingMessage="Carregando formulário"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
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
        <p className="text-lg text-gray-600">Bem-vindo(a) à nossa plataforma de vacinação!</p>
      </div>

      {showWelcomeMessage && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="font-medium">Conta criada com sucesso!</p>
          </div>
          <p className="mt-1 text-sm">Agora você pode fazer login com suas credenciais.</p>
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Entrar na sua conta</h2>

        <LoginForm />

        <div className="mt-6 space-y-4 text-center text-sm">
          <BvButton
            onClick={() => setShowResetPassword(true)}
            className="text-primary"
            variant="ghost"
            title="Esqueceu sua senha?"
          >
            Esqueceu sua senha?
          </BvButton>

          <div className="border-t pt-4">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <BvButton
                onClick={() => router.push('/registro-usuario')}
                className="text-primary font-medium hover:underline"
                variant="link"
                title="Cadastre-se aqui"
              />
            </p>
          </div>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
