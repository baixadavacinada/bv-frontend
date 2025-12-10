'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import DataIcon from '@/assets/icons/profile.svg'
import { getPersonalDataSchema } from '@/schemas/personal-data-schema'
import { BvFormInput } from '@/components/design/BvFormInput'
import { TitleSection } from '@/components/sections/TitleSection'
import { BvNotificationToggle } from '@/components/design/BvNotificationToggle'
import { useAuth } from '@/hooks/use-firebase-auth'
import { toast } from 'sonner'
import { getAuth } from 'firebase/auth'
import { ApiClient } from '@/services/api'

export default function SettingsScreen() {
  const { user, refreshUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const firebaseAuth = getAuth()

  const schema = useMemo(() => getPersonalDataSchema(user?.role || 'public'), [user?.role])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      cpf: '',
      acceptWhatsAppNotifications: false,
      notifications: {
        secondDose: false,
        appointment: false,
        newVaccines: false,
      },
      supportMessage: '',
    },
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '')
      setValue('email', user.email || '')
    }
  }, [user, setValue])

  const notifications = watch('notifications')
  const watchedValues = watch()

  const emptyFields = {
    name: !watchedValues.name || watchedValues.name.trim() === '',
    phone: !watchedValues.phone || watchedValues.phone.trim() === '',
    cpf: !watchedValues.cpf || watchedValues.cpf.trim() === '',
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')

    // Formata apenas dígitos
    if (cleaned.length <= 11) {
      if (cleaned.length <= 2) return cleaned
      if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }

    // Se tiver código de país (55), retorna com +55
    if (cleaned.length >= 12) {
      const countryCode = cleaned.slice(0, 2)
      const areaCode = cleaned.slice(2, 4)
      const firstPart = cleaned.slice(4, 9)
      const secondPart = cleaned.slice(9, 13)
      return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`
    }

    return value
  }

  const onSave = async (data: typeof watchedValues) => {
    if (!firebaseAuth.currentUser) {
      toast.error('Usuário não autenticado')
      return
    }

    try {
      setIsLoading(true)

      const apiClient = new ApiClient()

      await apiClient.put('/api/auth/profile', {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        acceptWhatsAppNotifications: data.acceptWhatsAppNotifications,
        notifications: data.notifications,
      })

      await refreshUser()

      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Erro ao salvar as configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = handleSubmit(onSave)

  const toggleNotification = (key: keyof typeof notifications) => {
    setValue(`notifications.${key}`, !notifications[key])
  }

  return (
    <RoleGuard allowedRoles={['admin', 'agent', 'public']} requireAuth>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl">
          <BvTitleHeader title="Configurações" className="mb-8" />

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Coluna Esquerda */}
              <div className="space-y-8">
                {/* Dados Pessoais - Exibe para qualquer usuário logado */}
                <TitleSection icon={DataIcon} title="Dados pessoais">
                  <div className="space-y-4">
                    <BvFormInput
                      label="Nome:"
                      {...register('name')}
                      placeholder="Ex: João da Silva"
                      className={
                        emptyFields.name
                          ? 'border-yellow-300 bg-yellow-50 placeholder:text-gray-400'
                          : 'placeholder:text-gray-400'
                      }
                      error={errors.name?.message}
                    />
                    <BvFormInput
                      label="Telefone/WhatsApp (opcional):"
                      type="tel"
                      {...register('phone')}
                      placeholder="(XX) 99999-9999"
                      className={
                        emptyFields.phone
                          ? 'border-yellow-300 bg-yellow-50 placeholder:text-gray-400'
                          : 'placeholder:text-gray-400'
                      }
                      onChange={(e) => {
                        e.target.value = formatPhoneNumber(e.target.value)
                      }}
                      error={errors.phone?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Para contato e notificações por WhatsApp
                    </p>

                    <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-4">
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          {...register('acceptWhatsAppNotifications')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // Ao marcar WhatsApp, marca as notificações
                              setValue('notifications.secondDose', true)
                              setValue('notifications.newVaccines', true)
                            } else {
                              // Ao desmarcar WhatsApp, desmarca as notificações
                              setValue('notifications.secondDose', false)
                              setValue('notifications.newVaccines', false)
                            }
                          }}
                          className="h-5 w-5 cursor-pointer rounded border-green-300 text-green-600"
                        />
                        <div>
                          <span className="font-medium text-green-900">
                            Receber notificações por WhatsApp
                          </span>
                          <p className="mt-1 text-xs text-green-700">
                            Atualizações sobre vacinação disponível e lembretes importantes
                          </p>
                        </div>
                      </label>
                    </div>
                    <BvFormInput
                      label="E-mail:"
                      type="email"
                      {...register('email')}
                      placeholder="Digite seu e-mail"
                      className="placeholder:text-gray-400"
                      error={errors.email?.message}
                    />
                    <BvFormInput
                      label="CPF:"
                      mask="000.000.000-00"
                      {...register('cpf')}
                      value={watchedValues.cpf}
                      placeholder="Ex: 123.456.789-00"
                      className={
                        emptyFields.cpf
                          ? 'border-yellow-300 bg-yellow-50 placeholder:text-gray-400'
                          : 'placeholder:text-gray-400'
                      }
                      error={errors.cpf?.message}
                    />
                  </div>
                </TitleSection>
                {/* Notificações */}
                <TitleSection icon={DataIcon} title="Notificações">
                  <div className="space-y-2">
                    <BvNotificationToggle
                      label="Lembretes da segunda dose"
                      checked={notifications.secondDose}
                      onChange={() => toggleNotification('secondDose')}
                    />
                    {/* <BvNotificationToggle
                    label="Lembretes de agendamento"
                    checked={notifications.appointment}
                    onChange={() => toggleNotification('appointment')}
                  /> */}
                    <BvNotificationToggle
                      label="Novos registros de vacinação"
                      checked={notifications.newVaccines}
                      onChange={() => toggleNotification('newVaccines')}
                    />
                  </div>

                  <div className="mt-6">
                    <BvButton
                      title="Salvar"
                      onClick={handleSaveSettings}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </div>
                </TitleSection>
              </div>

              {/* Coluna Direita (Suporte) */}
              {/* <div>
              <TitleSection icon={SupportIcon} title="Suporte">
                <div className="space-y-4">
                  <p className="text-base text-gray-700">
                    Em caso de dúvidas, entre em contato com a gente pelo número (XX) XXXX-XXX ou
                    escreva sua pergunta no campo abaixo.
                  </p>

                  <div className="space-y-2">
                    <Textarea {...register('supportMessage')} placeholder="Escreva aqui" rows={4} />
                    {errors.supportMessage && (
                      <p className="text-sm text-red-500">{errors.supportMessage.message}</p>
                    )}
                  </div>

                  <BvButton
                    title="Enviar"
                    rightIcon={<BsSend />}
                    onClick={handleSendMessage}
                    className="w-full"
                  />

                  <BvButton
                    title="Avalie nossa aplicação!"
                    variant="outline"
                    onClick={() => {
                      alert('Redirecionando para avaliação...')
                    }}
                    className="w-full"
                  />
                </div>
              </TitleSection>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
