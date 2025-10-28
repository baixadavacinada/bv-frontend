'use client'

import React, { useState } from 'react'
import { BvButton, BvFormInput } from '@/components'
import { resetPassword } from '@/lib/auth-service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

interface ResetPasswordFormProps {
  onSuccess?: () => void
  onBack?: () => void
}

export function ResetPasswordForm({ onSuccess, onBack }: ResetPasswordFormProps) {
  useAccessibilityValidation({ enabled: true })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const email = watch('email')

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setError('')

    try {
      await resetPassword(data.email)
      setSuccess(true)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email de recuperação')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-6 text-center" role="status" aria-live="polite">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-blue-700">
          <div className="mb-4 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Email enviado!</h3>
          <p className="mb-4">Enviamos um link de recuperação de senha para:</p>
          <p className="mb-4 font-medium text-blue-800">{email}</p>
          <p className="text-sm">
            Verifique sua caixa de entrada e siga as instruções no email para redefinir sua senha.
            Não esqueça de verificar a pasta de spam.
          </p>
        </div>

        {onBack && (
          <BvButton
            type="button"
            variant="outline"
            title="Voltar ao login"
            onClick={onBack}
            className="w-full"
          />
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Recuperar senha</h2>
        <p className="text-gray-600">
          Digite seu email para receber um link de recuperação de senha
        </p>
      </div>

      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <BvFormInput
        label="Email"
        type="email"
        placeholder="seu.email@exemplo.com"
        error={errors.email?.message}
        disabled={isLoading}
        required
        {...register('email')}
      />

      <div className="space-y-3">
        <BvButton
          type="submit"
          variant="default"
          size="default"
          title={isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
          className="w-full"
          disabled={isLoading}
          aria-label={isLoading ? 'Enviando email...' : 'Enviar link de recuperação'}
        />

        {onBack && (
          <BvButton
            type="button"
            variant="outline"
            title="Voltar ao login"
            onClick={onBack}
            className="w-full"
          />
        )}
      </div>
    </form>
  )
}
