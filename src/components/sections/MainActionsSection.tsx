'use client'

import { useRouter } from 'next/navigation'
import { BvCardPrimary } from '@/components/design/BvCardPrimary'
import { useAppTranslations } from '@/hooks/use-translations'
import HospitalIcon from '@/assets/icons/hospital.svg'
import RegisterIcon from '@/assets/icons/register.svg'
import SettingsIcon from '@/assets/icons/settings.svg'
import EvaluationIcon from '@/assets/icons/evaluation.svg'
import VaccineIcon from '@/assets/icons/seringa.svg'
import NotificationsIcon from '@/assets/icons/phone-notifications.svg'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { ActionType, usePermissions } from '@/hooks/use-permissions'
import { StaticImageData } from 'next/image'

interface ActionItem {
  id: ActionType
  title: string
  description: string
  icon: string | StaticImageData
  action: () => void
  variant?: 'stacked' | 'image-first'
  isFullWidth?: boolean
}

export function MainActionsSection() {
  const router = useRouter()
  const { cards } = useAppTranslations()
  const { getAllowedActions } = usePermissions()

  useAccessibilityValidation({ enabled: true })

  const actionMap: Record<ActionType, ActionItem> = {
    ubs: {
      id: 'ubs',
      title: cards('ubs.title'),
      description: cards('ubs.description'),
      icon: HospitalIcon,
      action: () => router.push('/ubs'),
      variant: 'stacked',
    },
    evaluation: {
      id: 'evaluation',
      title: cards('evaluation.title'),
      description: cards('evaluation.description'),
      icon: EvaluationIcon,
      action: () => router.push('/ubs/avaliar'),
      variant: 'stacked',
    },
    cartilha: {
      id: 'cartilha',
      title: cards('cartilha.title'),
      description: cards('cartilha.description'),
      icon: VaccineIcon,
      action: () => router.push('/cartilha-vacinas'),
      variant: 'stacked',
    },
    vaccination: {
      id: 'vaccination',
      title: cards('vaccination.title'),
      description: cards('vaccination.description'),
      icon: RegisterIcon,
      action: () => router.push('/vacinacao'),
      variant: 'stacked',
    },
    settings: {
      id: 'settings',
      title: cards('settings.title'),
      description: cards('settings.description'),
      icon: SettingsIcon,
      action: () => router.push('/configuracoes'),
      variant: 'image-first',
      isFullWidth: true,
    },
    notifications: {
      id: 'notifications',
      title: cards('notifications.title'),
      description: cards('notifications.description'),
      icon: NotificationsIcon,
      action: () => router.push('/notificacoes'),
      variant: 'stacked',
    },
    'ubs-management': {
      id: 'ubs-management',
      title: cards('ubsManagement.title'),
      description: cards('ubsManagement.description'),
      icon: HospitalIcon,
      action: () => router.push('/gestao-ubs'),
      variant: 'stacked',
    },
    'user-management': {
      id: 'user-management',
      title: cards('userManagement.title'),
      description: cards('userManagement.description'),
      icon: RegisterIcon,
      action: () => router.push('/gestao-usuarios'),
      variant: 'stacked',
    },
    'vaccine-management': {
      id: 'vaccine-management',
      title: cards('vaccineManagement.title'),
      description: cards('vaccineManagement.description'),
      icon: VaccineIcon,
      action: () => router.push('/gestao-vacinas'),
      variant: 'stacked',
    },
  }

  const allowedActions = getAllowedActions()
    .map((actionId) => actionMap[actionId])
    .filter(Boolean)

  const regularActions = allowedActions.filter((action) => !action.isFullWidth)
  const fullWidthActions = allowedActions.filter((action) => action.isFullWidth)

  return (
    <section className="mb-8" aria-labelledby="main-actions-section">
      <h2 id="main-actions-heading" className="sr-only">
        Ações principais
      </h2>

      {/* Grid responsivo para ações regulares */}
      {regularActions.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularActions.map((action) => (
            <BvCardPrimary
              key={action.id}
              icon={action.icon}
              title={action.title}
              description={action.description}
              onClick={action.action}
              variant={action.variant}
            />
          ))}

          {/* Para mobile: mostra actions em fullwidth no grid se existir */}
          {fullWidthActions.map((action) => (
            <div key={`${action.id}-mobile`} className="lg:hidden">
              <BvCardPrimary
                icon={action.icon}
                title={action.title}
                description={action.description}
                onClick={action.action}
              />
            </div>
          ))}
        </div>
      )}

      {/* Para desktop: mostra actions em largura total */}
      {fullWidthActions.map((action) => (
        <div key={`${action.id}-desktop`} className="hidden lg:block">
          <BvCardPrimary
            icon={action.icon}
            title={action.title}
            description={action.description}
            onClick={action.action}
            variant={action.variant}
          />
        </div>
      ))}
    </section>
  )
}
