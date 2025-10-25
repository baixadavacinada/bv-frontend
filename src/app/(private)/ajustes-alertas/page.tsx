'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BvButton, BvTitleHeader } from '@/components'
import { BvNotificationToggle } from '@/components/design/BvNotificationToggle'
import { TitleSection } from '@/components/sections/TitleSection'
import DataIcon from '@/assets/icons/profile.svg'
import * as z from 'zod'
import Tag from '@/components/design/Tag'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import SecondDoseModal from '@/components/common/SecondDoseModal'

const alertSchema = z.object({
  notifications: z.object({
    allUsers: z.boolean(),
    appointment: z.boolean(),
    newUsers: z.boolean(),
    newVaccines: z.boolean(),
    newUBS: z.boolean(),
    newVaccineRecords: z.boolean(),
    newSecondDoseReminders: z.boolean(),
  }),
})

export type AlertSettingsFormData = z.infer<typeof alertSchema>

const vaccines = ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo']

export default function AlertSettingsPage() {
  const [showSecondDoseModal, setShowSecondDoseModal] = useState(false)

  const { watch, setValue } = useForm<AlertSettingsFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      notifications: {
        allUsers: false,
        appointment: false,
        newUsers: false,
        newVaccines: false,
        newUBS: false,
        newVaccineRecords: false,
        newSecondDoseReminders: false,
      },
    },
  })

  const notifications = watch('notifications')

  const toggleNotification = (key: keyof typeof notifications) => {
    setValue(`notifications.${key}`, !notifications[key])
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl pb-4">
        <BvTitleHeader title="Ajustes de notificações" className="mb-8" />

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <TitleSection icon={DataIcon} title="Notificações do sistema">
                <div className="space-y-4">
                  <BvNotificationToggle
                    label="Lembretes para todos os usuários"
                    checked={notifications.allUsers}
                    onChange={() => toggleNotification('allUsers')}
                  />
                </div>
              </TitleSection>
              <TitleSection icon={DataIcon} title="Notificações para agentes de saúde">
                <div className="space-y-4">
                  <BvNotificationToggle
                    label="Alertas de novos cadastros de usuários"
                    checked={notifications.newUsers}
                    onChange={() => toggleNotification('newUsers')}
                  />
                  <BvNotificationToggle
                    label="Alerta de novas vacinas adicionadas na aplicação"
                    checked={notifications.newVaccines}
                    onChange={() => toggleNotification('newVaccines')}
                  />
                  <BvNotificationToggle
                    label="Alerta de novas UBSs cadastradas"
                    checked={notifications.newUBS}
                    onChange={() => toggleNotification('newUBS')}
                  />
                </div>
              </TitleSection>
              <TitleSection icon={DataIcon} title="Notificações para usuários finais (moradores)">
                <div className="space-y-4">
                  <BvNotificationToggle
                    label="Lembretes de agendamento"
                    checked={notifications.appointment}
                    onChange={() => toggleNotification('appointment')}
                  />
                  <BvNotificationToggle
                    label="Novos registros de vacinação"
                    checked={notifications.newVaccineRecords}
                    onChange={() => toggleNotification('newVaccineRecords')}
                  />
                  <BvNotificationToggle
                    label="Lembretes da segunda dose"
                    checked={notifications.newSecondDoseReminders}
                    onChange={() => toggleNotification('newSecondDoseReminders')}
                  />
                </div>
              </TitleSection>
              <TitleSection icon={DataIcon} title="Alertas para segunda dose">
                <div className="space-y-4">
                  <p className="text-base font-normal">
                    Escolha quais vacinas terão lembrete automático para aplicação da 2ª dose.
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-6">
                    {vaccines.map((vaccine) => (
                      <Tag key={vaccine} label={vaccine} />
                    ))}
                  </div>

                  <BvButton
                    title="Adicionar vacina"
                    rightIcon={<PlusIcon />}
                    onClick={() => setShowSecondDoseModal(true)}
                    className="w-full"
                  />
                </div>
              </TitleSection>
            </div>
          </div>
        </div>
      </div>

      <SecondDoseModal isOpen={showSecondDoseModal} onClose={() => setShowSecondDoseModal(false)} />
    </div>
  )
}
