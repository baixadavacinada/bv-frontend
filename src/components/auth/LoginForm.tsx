'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BvButton, BvFormInput } from '@/components'
import { loginWithEmail, loginWithGoogle } from '@/lib/auth-service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { commonSchemas } from '@/schemas'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const loginSchema = z.object({
  email: commonSchemas.email,
  password: commonSchemas.password,
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export function LoginForm({ onSuccess, redirectTo = '/inicio' }: LoginFormProps) {
  useAccessibilityValidation({ enabled: true })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const credentials = {
        email: data.email,
        password: data.password,
      }
      await loginWithEmail(credentials)

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      await loginWithGoogle()

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login com Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <div className="space-y-4">
        <BvFormInput
          label="Email"
          type="email"
          placeholder="seu.email@exemplo.com"
          error={errors.email?.message}
          disabled={isLoading}
          {...register('email')}
        />

        <BvFormInput
          label="Senha"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          disabled={isLoading}
          {...register('password')}
        />
      </div>

      <div className="space-y-3">
        <BvButton
          type="submit"
          variant="default"
          size="default"
          className="w-full"
          disabled={isLoading}
          title={isLoading ? 'Entrando...' : 'Entrar'}
          aria-label={isLoading ? 'Fazendo login...' : 'Entrar com email e senha'}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">ou</span>
          </div>
        </div>

        <BvButton
          type="button"
          variant="outline"
          size="default"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          title={isLoading ? 'Entrando...' : 'Entrar com Google'}
          aria-label={isLoading ? 'Fazendo login com Google...' : 'Entrar com Google'}
          leftIcon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          }
        />
      </div>
    </form>
  )
}
