'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { BvButton, BvFormInput } from '@/components'
import { registerUser, logout } from '@/lib/auth-service'
import { useForm, useWatch } from 'react-hook-form'
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
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos e condições de privacidade',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

// Requisitos de senha
interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
  regex: RegExp
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'Pelo menos 8 caracteres',
    test: (pwd) => pwd.length >= 8,
    regex: /.{8,}/,
  },
  {
    label: 'Pelo menos uma letra maiúscula',
    test: (pwd) => /[A-Z]/.test(pwd),
    regex: /[A-Z]/,
  },
  {
    label: 'Pelo menos uma letra minúscula',
    test: (pwd) => /[a-z]/.test(pwd),
    regex: /[a-z]/,
  },
  {
    label: 'Pelo menos um número',
    test: (pwd) => /\d/.test(pwd),
    regex: /\d/,
  },
  {
    label: 'Pelo menos um caractere especial (!@#$%^&*)',
    test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    regex: /[!@#$%^&*(),.?":{}|<>]/,
  },
]

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  useAccessibilityValidation({ enabled: true })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  // Watch the password field to show requirements in real-time
  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  })

  // Calculate password requirements met
  const passwordStatus = useMemo(() => {
    return passwordRequirements.map((req) => ({
      ...req,
      met: req.test(password),
    }))
  }, [password])

  const allRequirementsMet = passwordStatus.every((req) => req.met)

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError('')

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      })

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

        <div>
          <BvFormInput
            label="Senha"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="Digite uma senha segura"
            required
          />

          {/* Password requirements checker */}
          {password && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-sm font-semibold text-gray-900">Requisitos de senha:</p>
              <ul className="space-y-2">
                {passwordStatus.map((requirement, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm"
                    role="status"
                    aria-live="polite"
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-white transition-colors ${
                        requirement.met ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {requirement.met ? '✓' : '-'}
                    </div>
                    <span
                      className={`transition-colors ${
                        requirement.met ? 'text-green-700' : 'text-gray-600'
                      }`}
                    >
                      {requirement.label}
                    </span>
                  </li>
                ))}
              </ul>

              {allRequirementsMet && (
                <div className="mt-3 flex items-center gap-2 rounded bg-green-100 p-2 text-sm text-green-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Senha atende todos os requisitos!
                </div>
              )}
            </div>
          )}
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

      {/* LGPD Terms and Conditions */}
      <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-gray-900">Termos de Privacidade (LGPD)</h3>
          <div className="mb-4 max-h-40 overflow-y-auto rounded bg-white p-3 text-xs text-gray-700">
            <p className="mb-2">
              <strong>Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018</strong>
            </p>
            <p className="mb-2">
              Ao criar sua conta na Baixada Vacinada, você concorda que seus dados pessoais serão
              coletados, processados e armazenados de forma segura, conforme estabelecido pela LGPD.
            </p>
            <p className="mb-2">
              <strong>Dados Coletados:</strong> Nome completo, endereço de email, senha e histórico
              de vacinação.
            </p>
            <p className="mb-2">
              <strong>Finalidade:</strong> Gerenciamento de sua conta, notificações sobre vacinação,
              pesquisas de satisfação e melhoria dos serviços.
            </p>
            <p className="mb-2">
              <strong>Seus Direitos:</strong> Você tem direito de acessar, corrigir, deletar ou
              solicitar portabilidade de seus dados a qualquer momento.
            </p>
            <p>
              Para mais informações, entre em contato com nosso Encarregado de Proteção de Dados
              (DPO) através do email contato@baixadavacinada.com.br
            </p>
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
              aria-required="true"
            />
            <span className="text-sm text-gray-700">
              Eu aceito os termos de privacidade e as condições de proteção de dados da LGPD
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>
      </div>

      <BvButton
        type="submit"
        title={isLoading || isSubmitting ? 'Criando conta...' : 'Criar conta'}
        variant="default"
        size="lg"
        className="w-full"
        disabled={isLoading || isSubmitting || !allRequirementsMet}
      />
    </form>
  )
}
