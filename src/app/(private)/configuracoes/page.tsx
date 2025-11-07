'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BvButton, BvTitleHeader } from '@/components'
import DataIcon from '@/assets/icons/profile.svg'
import { getPersonalDataSchema } from '@/schemas/personal-data-schema'
import { BvFormInput } from '@/components/design/BvFormInput'
import { TitleSection } from '@/components/sections/TitleSection'
import { BvNotificationToggle } from '@/components/design/BvNotificationToggle'
import { usePermissions } from '@/hooks/use-permissions'
import { useAuth } from '@/hooks/use-firebase-auth'
import { toast } from 'sonner'
import { getAuth } from 'firebase/auth'

export default function SettingsScreen() {
  const { role } = usePermissions()
  const { user, refreshUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const firebaseAuth = getAuth()

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

  // Preencher dados quando user é carregado
  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '')
      setValue('email', user.email || '')
    }
  }, [user, setValue])

  const notifications = watch('notifications')
  const watchedValues = watch()

  // Verificar quais campos estão vazios
  const emptyFields = {
    name: !watchedValues.name || watchedValues.name.trim() === '',
    phone: !watchedValues.phone || watchedValues.phone.trim() === '',
    cpf: !watchedValues.cpf || watchedValues.cpf.trim() === '',
  }

  const onSave = async (data: typeof watchedValues) => {
    if (!firebaseAuth.currentUser) {
      toast.error('Usuário não autenticado')
      return
    }

    try {
      setIsLoading(true)
      const token = await firebaseAuth.currentUser.getIdToken()

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          cpf: data.cpf,
          notifications: data.notifications,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar dados')
      }

      // Atualizar contexto do usuário
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
                  <div className={emptyFields.name ? 'border-l-4 border-yellow-500 pl-3' : ''}>
                    <BvFormInput
                      label="Nome:"
                      {...register('name')}
                      placeholder="Ex: João da Silva"
                      className="placeholder:text-gray-400"
                      error={errors.name?.message}
                    />
                  </div>
                  <div className={emptyFields.phone ? 'border-l-4 border-yellow-500 pl-3' : ''}>
                    <BvFormInput
                      label="Telefone:"
                      mask="(00) 00000-0000"
                      {...register('phone')}
                      value={watchedValues.phone}
                      placeholder="Ex: (21) 98765-4321"
                      className="placeholder:text-gray-400"
                      error={errors.phone?.message}
                    />
                  </div>
                  <BvFormInput
                    label="E-mail:"
                    type="email"
                    {...register('email')}
                    placeholder="Digite seu e-mail"
                    className="placeholder:text-gray-400"
                    error={errors.email?.message}
                  />
                  <div className={emptyFields.cpf ? 'border-l-4 border-yellow-500 pl-3' : ''}>
                    <BvFormInput
                      label="CPF:"
                      mask="000.000.000-00"
                      {...register('cpf')}
                      value={watchedValues.cpf}
                      placeholder="Ex: 123.456.789-00"
                      className="placeholder:text-gray-400"
                      error={errors.cpf?.message}
                    />
                  </div>
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
  )
}
