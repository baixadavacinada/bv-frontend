'use client'

export const dynamic = 'force-dynamic'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useMemo, useEffect } from 'react'
import { PlusIcon, ArrowRight } from 'lucide-react'
import * as z from 'zod'
import Link from 'next/link'

import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { BvNotificationToggle } from '@/components/design/BvNotificationToggle'
import { TitleSection } from '@/components/sections/TitleSection'
import SecondDoseModal from '@/components/common/SecondDoseModal'
import Tag from '@/components/design/Tag'
import { NotificationTemplateSelector } from '@/components/admin/NotificationTemplateSelector'
import { SecondDoseCombinationSelector } from '@/components/admin/SecondDoseCombinationSelector'
import {
  NotificationFrequencyControl,
  type NotificationFrequency,
} from '@/components/admin/NotificationFrequencyControl'
import { SaveNotificationConfirmDialog } from '@/components/admin/SaveNotificationConfirmDialog'
import { useAuth } from '@/hooks/use-firebase-auth'
import {
  saveSecondDoseConfiguration,
  getSecondDoseConfiguration,
} from '@/services/second-dose-service'
import {
  saveNotificationSettings,
  getNotificationSettings,
} from '@/services/notificationSettingsService'
import { toast } from 'sonner'
import DataIcon from '@/assets/icons/profile.svg'

const alertSchema = z.object({
  notifications: z.object({
    todos_usuarios: z.boolean(),
    agendamento: z.boolean(),
    novos_usuarios: z.boolean(),
    novas_vacinas: z.boolean(),
    novas_ubs: z.boolean(),
    novos_registros_vacinacao: z.boolean(),
    lembretes_segunda_dose: z.boolean(),
  }),
  templateSettings: z
    .record(
      z.string(),
      z.object({
        enabled: z.boolean(),
        templateId: z.string().optional(),
        frequency: z.enum(['instant', 'daily', 'weekly', 'never']),
      }),
    )
    .optional(),
})

export type AlertSettingsFormData = z.infer<typeof alertSchema>

type NotificationConfig = {
  key: keyof AlertSettingsFormData['notifications']
  label: string
  enableTemplate?: boolean // Se deve mostrar selector de template
  description?: string // Subtítulo explicativo do switch
  templateCategory?: 'appointment' | 'vaccine' | 'reminder' | 'system' | 'general'
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
          {
            key: 'lembretes_segunda_dose',
            label: 'Lembretes da segunda dose',
            enableTemplate: true,
            description: 'Receba lembretes para tomar a segunda dose da vacina',
            templateCategory: 'reminder',
          },
          {
            key: 'novos_registros_vacinacao',
            label: 'Novos registros de vacinação',
            enableTemplate: true,
            description: 'Notificações quando uma dose for registrada no seu histórico',
            templateCategory: 'vaccine',
          },
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
          {
            key: 'novos_registros_vacinacao',
            label: 'Novos registros de vacinação',
            enableTemplate: true,
            description: 'Notifique os usuários quando uma dose for registrada',
            templateCategory: 'vaccine',
          },
          {
            key: 'lembretes_segunda_dose',
            label: 'Lembretes da segunda dose',
            enableTemplate: true,
            description: 'Envie lembretes para usuários que precisam tomar a segunda dose',
            templateCategory: 'reminder',
          },
        ],
      },
    ],
  },
  admin: {
    title: 'Ajustes de notificações',
    sections: [
      {
        title: 'Notificações do sistema',
        icon: DataIcon,
        notifications: [
          {
            key: 'todos_usuarios',
            label: 'Lembretes para todos os usuários',
            enableTemplate: true,
            description: 'Envie notificações para todos os usuários do sistema',
          },
        ],
      },
      {
        title: 'Notificações para equipe técnica',
        icon: DataIcon,
        notifications: [
          {
            key: 'novos_usuarios',
            label: 'Alertas de novos cadastros de usuários',
            enableTemplate: true,
            description: 'Receba notificação quando novos usuários se registrarem',
            templateCategory: 'system',
          },
          {
            key: 'novas_vacinas',
            label: 'Alerta de novas vacinas adicionadas na aplicação',
            enableTemplate: true,
            description: 'Notifique quando uma vacina for adicionada ao sistema',
            templateCategory: 'vaccine',
          },
          {
            key: 'novas_ubs',
            label: 'Alerta de novas UBSs cadastradas',
            enableTemplate: true,
            description: 'Receba notificação quando uma nova unidade de saúde for cadastrada',
            templateCategory: 'system',
          },
        ],
      },
      {
        title: 'Notificações para usuários finais (moradores)',
        icon: DataIcon,
        notifications: [
          {
            key: 'lembretes_segunda_dose',
            label: 'Lembretes da segunda dose',
            enableTemplate: true,
            description: 'Notifique os moradores sobre lembretes da segunda dose',
            templateCategory: 'reminder',
          },
        ],
      },
    ],
  },
}

const VaccineSelectionSection = ({
  onAddVaccine,
  selectedVaccines,
  onRemoveVaccine,
}: {
  onAddVaccine: () => void
  selectedVaccines: string[]
  onRemoveVaccine: (vaccine: string) => void
}) => (
  <>
    {selectedVaccines.length > 0 && (
      <div className="mb-6 space-y-3">
        <p className="text-sm font-medium text-gray-700">Vacinas selecionadas:</p>
        <div className="flex flex-wrap gap-2">
          {selectedVaccines.map((vaccine) => (
            <Tag key={vaccine} label={vaccine} compact onRemove={() => onRemoveVaccine(vaccine)} />
          ))}
        </div>
      </div>
    )}
    <BvButton
      title="Adicionar vacina"
      rightIcon={<PlusIcon />}
      onClick={onAddVaccine}
      className="w-full"
    />
  </>
)

const NotificationSectionComponent = ({
  section,
  notifications,
  onToggle,
  onAddVaccine,
  selectedVaccines,
  onRemoveVaccine,
  selectedSecondDoseCombinations,
  onSelectSecondDoseCombination,
  onRemoveSecondDoseCombination,
  templateSettings,
  onTemplateSelect,
  onFrequencyChange,
}: {
  section: NotificationSection
  notifications: AlertSettingsFormData['notifications']
  onToggle: (key: keyof AlertSettingsFormData['notifications']) => void
  onAddVaccine?: () => void
  selectedVaccines?: string[]
  onRemoveVaccine?: (vaccine: string) => void
  selectedSecondDoseCombinations?: string[]
  onSelectSecondDoseCombination?: (combinationId: string) => void
  onRemoveSecondDoseCombination?: (combinationId: string) => void
  templateSettings: Record<
    string,
    { enabled: boolean; templateId?: string; frequency: NotificationFrequency }
  >
  onTemplateSelect: (notificationKey: string, templateId: string) => void
  onFrequencyChange: (notificationKey: string, frequency: NotificationFrequency) => void
}) => (
  <TitleSection icon={section.icon} title={section.title}>
    <div className="space-y-4">
      {section.description && <p className="text-base font-normal">{section.description}</p>}

      {section.notifications.map((config) => {
        const settingKey = config.key as string
        const isEnabled = notifications[config.key]
        const settings = templateSettings[settingKey] || {
          enabled: false,
          templateId: '',
          frequency: 'weekly',
        }

        return (
          <div key={config.key} className="space-y-3">
            <BvNotificationToggle
              label={config.label}
              checked={isEnabled}
              onChange={() => onToggle(config.key)}
            />

            {isEnabled && config.enableTemplate && (
              <div className="ml-4 space-y-3 border-l-4 border-blue-200 pl-4">
                <NotificationTemplateSelector
                  enabled={isEnabled}
                  onTemplateSelect={(templateId) => onTemplateSelect(settingKey, templateId)}
                  selectedTemplateId={settings.templateId}
                  category={config.templateCategory}
                />

                {config.key === 'lembretes_segunda_dose' &&
                  selectedSecondDoseCombinations &&
                  onSelectSecondDoseCombination &&
                  onRemoveSecondDoseCombination && (
                    <SecondDoseCombinationSelector
                      selectedCombinations={selectedSecondDoseCombinations}
                      onSelectCombination={onSelectSecondDoseCombination}
                      onRemoveCombination={onRemoveSecondDoseCombination}
                    />
                  )}

                <NotificationFrequencyControl
                  frequency={settings.frequency || 'weekly'}
                  onChange={(freq) => onFrequencyChange(settingKey, freq)}
                  label="Com que frequência deseja receber?"
                  showDescription={true}
                />
              </div>
            )}
          </div>
        )
      })}

      {section.hasVaccineSelection && onAddVaccine && selectedVaccines && onRemoveVaccine && (
        <div className="space-y-4">
          <VaccineSelectionSection
            onAddVaccine={onAddVaccine}
            selectedVaccines={selectedVaccines}
            onRemoveVaccine={onRemoveVaccine}
          />
        </div>
      )}
    </div>
  </TitleSection>
)

export default function NotificationsPage() {
  const [showSecondDoseModal, setShowSecondDoseModal] = useState(false)
  const [selectedSecondDoseCombinations, setSelectedSecondDoseCombinations] = useState<string[]>([])
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([])
  const [createdByEmail, setCreatedByEmail] = useState<string>('')
  const [showConfirmSave, setShowConfirmSave] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const { user } = useAuth()

  const { watch, setValue, getValues } = useForm<AlertSettingsFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      notifications: {
        todos_usuarios: false,
        agendamento: false,
        novos_usuarios: false,
        novas_vacinas: false,
        novas_ubs: false,
        novos_registros_vacinacao: false,
        lembretes_segunda_dose: false,
      },
      templateSettings: {},
    },
  })

  const notifications = watch('notifications')
  const templateSettings = watch('templateSettings') || {}
  const userRole = user?.role || 'public'

  const roleConfig = useMemo(
    () => ROLE_CONFIGURATIONS[userRole] || ROLE_CONFIGURATIONS.public,
    [userRole],
  )

  const toggleNotification = (key: keyof typeof notifications) => {
    setValue(`notifications.${key}`, !notifications[key])
  }

  const handleTemplateSelect = (notificationKey: string, templateId: string) => {
    const currentSettings = templateSettings[notificationKey] || {
      enabled: true,
      frequency: 'weekly' as NotificationFrequency,
    }
    setValue(`templateSettings.${notificationKey}`, {
      ...currentSettings,
      templateId,
    })
  }

  const handleFrequencyChange = (notificationKey: string, frequency: NotificationFrequency) => {
    const currentSettings = templateSettings[notificationKey] || {
      enabled: true,
      templateId: '',
    }
    setValue(`templateSettings.${notificationKey}`, {
      ...currentSettings,
      frequency,
    })
  }

  const handleSelectSecondDoseCombination = (combinationId: string) => {
    setSelectedSecondDoseCombinations((prev) => [...prev, combinationId])
  }

  const handleRemoveSecondDoseCombination = (combinationId: string) => {
    setSelectedSecondDoseCombinations((prev) => prev.filter((c) => c !== combinationId))
  }

  const handleAddVaccine = () => {
    setShowSecondDoseModal(true)
  }

  const handleRemoveVaccine = (vaccine: string) => {
    setSelectedVaccines((prev) => prev.filter((v) => v !== vaccine))
  }

  const handleSaveNotifications = async () => {
    try {
      setIsSaving(true)
      const formData = getValues()

      await saveNotificationSettings({
        notifications: formData.notifications,
        templateSettings: (formData.templateSettings || {}) as Record<
          string,
          { enabled: boolean; templateId?: string; frequency: NotificationFrequency }
        >,
      })

      setLastSavedAt(new Date())
      setShowConfirmSave(false)
      toast.success('✓ Notificações agendadas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar notificações:', error)
      toast.error('Erro ao salvar configurações de notificação')
    } finally {
      setIsSaving(false)
    }
  }

  // Carregar vacinas selecionadas e configurações de notificações
  useEffect(() => {
    const loadConfigurations = async () => {
      try {
        // Carregar configurações de vacinas
        const vaccineConfig = await getSecondDoseConfiguration()
        if (vaccineConfig && vaccineConfig.selectedVaccines) {
          setSelectedVaccines(vaccineConfig.selectedVaccines)
          setCreatedByEmail(vaccineConfig.createdBy || '')
        }

        // Carregar configurações de notificações salvas
        const notificationConfig = await getNotificationSettings()
        if (notificationConfig.success && notificationConfig.data) {
          // Atualizar form com dados salvos
          const notifKeys = Object.keys(notificationConfig.data.notifications)
          notifKeys.forEach((key) => {
            const typedKey = key as keyof AlertSettingsFormData['notifications']
            setValue(`notifications.${typedKey}`, notificationConfig.data!.notifications[key])
          })

          // Atualizar template settings
          if (notificationConfig.data.templateSettings) {
            Object.entries(notificationConfig.data.templateSettings).forEach(([key, value]) => {
              setValue(`templateSettings.${key}`, value)
            })
          }

          setLastSavedAt(new Date())
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
      }
    }

    if (user) {
      loadConfigurations()
    }
  }, [user, setValue])

  return (
    <RoleGuard requireAuth={true}>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl pb-4">
          <BvTitleHeader title={roleConfig.title} className="mb-8" />

          {(userRole === 'admin' || userRole === 'agent') && (
            <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    💡 <strong>Dica:</strong> Você pode gerenciar e personalizar os templates de
                    notificações ao final desta página.
                  </p>
                </div>
              </div>
            </div>
          )}

          {createdByEmail && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
              ✓ Vacinas selecionadas por: <strong>{createdByEmail}</strong>
            </div>
          )}

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
                    selectedVaccines={selectedVaccines}
                    onRemoveVaccine={handleRemoveVaccine}
                    selectedSecondDoseCombinations={selectedSecondDoseCombinations}
                    onSelectSecondDoseCombination={handleSelectSecondDoseCombination}
                    onRemoveSecondDoseCombination={handleRemoveSecondDoseCombination}
                    templateSettings={templateSettings}
                    onTemplateSelect={handleTemplateSelect}
                    onFrequencyChange={handleFrequencyChange}
                  />
                ))}
                <div className="space-y-3">
                  <BvButton
                    title={isSaving ? 'Salvando...' : 'Agendar Disparos'}
                    onClick={() => setShowConfirmSave(true)}
                    disabled={isSaving || !Object.values(notifications).some(Boolean)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  />
                  {lastSavedAt && (
                    <p className="text-center text-sm text-gray-600">
                      ✓ Última atualização: {lastSavedAt.toLocaleString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {(userRole === 'admin' || userRole === 'agent') && (
            <div className="mt-12 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-8">
              <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-blue-900">
                    Gerenciar Templates de Notificações
                  </h3>
                  <p className="text-blue-700">
                    Acesse o painel para criar, editar e enviar templates de notificações
                    personalizados.
                  </p>
                </div>
                <Link href="/gestao-templates" className="shrink-0">
                  <button
                    className="rounded-lg bg-blue-600 p-3 text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
                    title="Gerenciar Templates"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <SaveNotificationConfirmDialog
          isOpen={showConfirmSave}
          isLoading={isSaving}
          onConfirm={handleSaveNotifications}
          onCancel={() => setShowConfirmSave(false)}
        />

        <SecondDoseModal
          isOpen={showSecondDoseModal}
          onClose={() => setShowSecondDoseModal(false)}
          onSelectVaccines={async (vaccines, createdBy) => {
            try {
              setSelectedVaccines(vaccines)
              if (createdBy) {
                setCreatedByEmail(createdBy)
                await saveSecondDoseConfiguration({
                  selectedVaccines: vaccines,
                  createdBy,
                })
                toast.success('Vacinas de segunda dose salvas com sucesso!')
              }
            } catch (error) {
              console.error('Erro ao salvar configuração:', error)
              toast.error('Erro ao salvar configuração de segunda dose')
            }
            setShowSecondDoseModal(false)
          }}
        />
      </div>
    </RoleGuard>
  )
}
