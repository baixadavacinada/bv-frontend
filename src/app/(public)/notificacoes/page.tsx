'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useMemo } from 'react'
import { PlusIcon } from 'lucide-react'
import * as z from 'zod'

import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { BvNotificationToggle } from '@/components/design/BvNotificationToggle'
import { TitleSection } from '@/components/sections/TitleSection'
import SecondDoseModal from '@/components/common/SecondDoseModal'
import Tag from '@/components/design/Tag'
import { useAuth } from '@/hooks/use-firebase-auth'
import DataIcon from '@/assets/icons/profile.svg'

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

type NotificationConfig = {
  key: keyof AlertSettingsFormData['notifications']
  label: string
}

type NotificationSection = {
  title: string
  icon: string
  notifications: NotificationConfig[]
  description?: string
  hasVaccineSelection?: boolean
}

type RoleConfig = {
  title: string
  sections: NotificationSection[]
}

// Configurações por role
const ROLE_CONFIGURATIONS: Record<string, RoleConfig> = {
  public: {
    title: 'Notificações',
    sections: [
      {
        title: 'Configurar notificações',
        icon: DataIcon,
        notifications: [
          { key: 'newSecondDoseReminders', label: 'Lembretes da segunda dose' },
          // { key: 'appointment', label: 'Lembretes de agendamentos' },
          { key: 'newVaccineRecords', label: 'Novos registros de vacinação' },
        ],
      },
    ],
  },
  agent: {
    title: 'Ajustes de alertas',
    sections: [
      {
        title: 'Notificações para usuários',
        icon: DataIcon,
        notifications: [
          { key: 'appointment', label: 'Lembretes de agendamento' },
          { key: 'newVaccineRecords', label: 'Novos registros de vacinação' },
          { key: 'newSecondDoseReminders', label: 'Lembretes da segunda dose' },
        ],
      },
      {
        title: 'Alertas para segunda dose',
        icon: DataIcon,
        notifications: [],
        description: 'Escolha quais vacinas terão lembrete automático para aplicação da 2ª dose.',
        hasVaccineSelection: true,
      },
    ],
  },
  admin: {
    title: 'Ajustes de notificações',
    sections: [
      {
        title: 'Notificações do sistema',
        icon: DataIcon,
        notifications: [{ key: 'allUsers', label: 'Lembretes para todos os usuários' }],
      },
      {
        title: 'Notificações para equipe técnica',
        icon: DataIcon,
        notifications: [
          { key: 'newUsers', label: 'Alertas de novos cadastros de usuários' },
          { key: 'newVaccines', label: 'Alerta de novas vacinas adicionadas na aplicação' },
          { key: 'newUBS', label: 'Alerta de novas UBSs cadastradas' },
        ],
      },
      {
        title: 'Notificações para usuários finais (moradores)',
        icon: DataIcon,
        notifications: [
          { key: 'appointment', label: 'Lembretes de agendamento' },
          { key: 'newVaccineRecords', label: 'Novos registros de vacinação' },
          { key: 'newSecondDoseReminders', label: 'Lembretes da segunda dose' },
        ],
      },
      {
        title: 'Alertas para segunda dose',
        icon: DataIcon,
        notifications: [],
        description: 'Escolha quais vacinas terão lembrete automático para aplicação da 2ª dose.',
        hasVaccineSelection: true,
      },
    ],
  },
}

const vaccines = ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo']

// seção de vacinas
const VaccineSelectionSection = ({ onAddVaccine }: { onAddVaccine: () => void }) => (
  <>
    <div className="grid grid-cols-2 gap-4 py-6">
      {vaccines.map((vaccine) => (
        <Tag key={vaccine} label={vaccine} />
      ))}
    </div>
    <BvButton
      title="Adicionar vacina"
      rightIcon={<PlusIcon />}
      onClick={onAddVaccine}
      className="w-full"
    />
  </>
)

// seção de notificações
const NotificationSectionComponent = ({
  section,
  notifications,
  onToggle,
  onAddVaccine,
}: {
  section: NotificationSection
  notifications: AlertSettingsFormData['notifications']
  onToggle: (key: keyof AlertSettingsFormData['notifications']) => void
  onAddVaccine?: () => void
}) => (
  <TitleSection icon={section.icon} title={section.title}>
    <div className="space-y-4">
      {section.description && <p className="text-base font-normal">{section.description}</p>}

      {section.notifications.map((config) => (
        <BvNotificationToggle
          key={config.key}
          label={config.label}
          checked={notifications[config.key]}
          onChange={() => onToggle(config.key)}
        />
      ))}

      {section.hasVaccineSelection && onAddVaccine && (
        <VaccineSelectionSection onAddVaccine={onAddVaccine} />
      )}
    </div>
  </TitleSection>
)

export default function NotificationsPage() {
  const [showSecondDoseModal, setShowSecondDoseModal] = useState(false)
  const { user } = useAuth()

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
  const userRole = user?.role || 'public'

  const roleConfig = useMemo(
    () => ROLE_CONFIGURATIONS[userRole] || ROLE_CONFIGURATIONS.public,
    [userRole],
  )

  const toggleNotification = (key: keyof typeof notifications) => {
    setValue(`notifications.${key}`, !notifications[key])
  }

  const handleAddVaccine = () => {
    setShowSecondDoseModal(true)
  }

  return (
    <RoleGuard requireAuth={true}>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl pb-4">
          <BvTitleHeader title={roleConfig.title} className="mb-8" />

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                {roleConfig.sections.map((section, index) => (
                  <NotificationSectionComponent
                    key={`${section.title}-${index}`}
                    section={section}
                    notifications={notifications}
                    onToggle={toggleNotification}
                    onAddVaccine={section.hasVaccineSelection ? handleAddVaccine : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <SecondDoseModal
          isOpen={showSecondDoseModal}
          onClose={() => setShowSecondDoseModal(false)}
        />
      </div>
    </RoleGuard>
  )
}
