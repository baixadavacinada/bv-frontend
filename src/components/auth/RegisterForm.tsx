'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BvButton, BvFormInput } from '@/components'
import { registerUser, logout } from '@/lib/auth-service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { commonSchemas } from '@/schemas'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const registerSchema = z
  .object({
    displayName: commonSchemas.fullName,
    email: commonSchemas.email,
    password: commonSchemas.strongPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  useAccessibilityValidation({ enabled: true })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError('')

    try {
      await registerUser(
        {
          email: data.email,
          displayName: data.displayName,
        },
        data.password,
      )

      await logout()

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/login?registered=true')
      }
    } catch (err: unknown) {
      const error = err as { message?: string }
      setError(error.message || 'Erro ao criar conta')
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
          label="Nome completo"
          type="text"
          {...register('displayName')}
          error={errors.displayName?.message}
          placeholder="Digite seu nome completo"
          required
        />

        <BvFormInput
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Digite seu email"
          required
        />

        <BvFormInput
          label="Senha"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="Digite uma senha segura"
          required
        />

        <div className="mt-2 text-sm text-gray-600">
          <p>A senha deve ter:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Pelo menos 6 caracteres</li>
            <li>Pelo menos uma letra maiúscula</li>
            <li>Pelo menos um número</li>
          </ul>
        </div>

        <BvFormInput
          label="Confirmar senha"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          placeholder="Digite a senha novamente"
          required
        />
      </div>

      <BvButton
        type="submit"
        title={isLoading || isSubmitting ? 'Criando conta...' : 'Criar conta'}
        variant="default"
        size="lg"
        className="w-full"
        disabled={isLoading || isSubmitting}
      />
    </form>
  )
}
