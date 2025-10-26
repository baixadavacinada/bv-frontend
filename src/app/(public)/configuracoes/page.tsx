'use client'

import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BvButton, BvTitleHeader } from '@/components'
import { BsSend } from 'react-icons/bs'
import { Textarea } from '@/components/ui/textarea'
import DataIcon from '@/assets/icons/profile.svg'
import SupportIcon from '@/assets/icons/suport.svg'
import { getPersonalDataSchema } from '@/schemas/personal-data-schema'
import { BvFormInput } from '@/components/design/BvFormInput'
import { TitleSection } from '@/components/sections/TitleSection'
import { BvNotificationToggle } from '@/components/design/BvNotificationToggle'
import { usePermissions } from '@/hooks/use-permissions'

export default function SettingsScreen() {
  const { role } = usePermissions()
  const isResident = role === 'MORADOR'

  const schema = useMemo(() => getPersonalDataSchema(role), [role])

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
      notifications: {
        secondDose: false,
        appointment: false,
        newVaccines: false,
      },
      supportMessage: '',
    },
  })

  const notifications = watch('notifications')
  const watchedValues = watch()

  const onSubmit = (data: typeof watchedValues) => {
    console.log('Dados do formulário:', data)
  }

  const handleSendMessage = handleSubmit(onSubmit)

  const toggleNotification = (key: keyof typeof notifications) => {
    setValue(`notifications.${key}`, !notifications[key])
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl">
        <BvTitleHeader title="Configurações" className="mb-8" />

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Coluna Esquerda */}
            <div className="space-y-8">
              {/* Dados Pessoais - Só exibe para AGENTE_SAUDE e ADMIN */}
              {!isResident && (
                <TitleSection icon={DataIcon} title="Dados pessoais">
                  <div className="space-y-4">
                    <BvFormInput
                      label="Nome:"
                      {...register('name')}
                      placeholder="Digite seu nome completo"
                      error={errors.name?.message}
                    />
                    <BvFormInput
                      label="Telefone:"
                      mask="(00) 00000-0000"
                      {...register('phone')}
                      value={watchedValues.phone}
                      placeholder="Digite seu telefone"
                      error={errors.phone?.message}
                    />
                    <BvFormInput
                      label="E-mail:"
                      type="email"
                      {...register('email')}
                      placeholder="Digite seu e-mail"
                      error={errors.email?.message}
                    />
                    <BvFormInput
                      label="CPF:"
                      mask="000.000.000-00"
                      {...register('cpf')}
                      value={watchedValues.cpf}
                      placeholder="Digite seu CPF"
                      error={errors.cpf?.message}
                    />
                  </div>
                </TitleSection>
              )}

              {/* Notificações */}
              <TitleSection icon={DataIcon} title="Notificações">
                <div className="space-y-2">
                  <BvNotificationToggle
                    label="Lembretes da segunda dose"
                    checked={notifications.secondDose}
                    onChange={() => toggleNotification('secondDose')}
                  />
                  <BvNotificationToggle
                    label="Lembretes de agendamento"
                    checked={notifications.appointment}
                    onChange={() => toggleNotification('appointment')}
                  />
                  <BvNotificationToggle
                    label="Novos registros de vacinação"
                    checked={notifications.newVaccines}
                    onChange={() => toggleNotification('newVaccines')}
                  />
                </div>
              </TitleSection>
            </div>

            {/* Coluna Direita (Suporte) */}
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
