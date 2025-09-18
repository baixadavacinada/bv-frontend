'use client'

import { useRouter } from 'next/navigation'
import { BvCardPrimary } from '@/components/design/BvCardPrimary'
import { useAppTranslations } from '@/hooks/use-translations'

import HospitalIcon from '@/assets/icons/hospital.svg'
import RegisterIcon from '@/assets/icons/register.svg'
import SyringeIcon from '@/assets/icons/syringe.svg'
import SettingsIcon from '@/assets/icons/settings.svg'
import AlertIcon from '@/assets/icons/phone-notifications.svg'
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
  const { hasPermission } = usePermissions()

  useAccessibilityValidation({ enabled: true })

  const allActions: ActionItem[] = [
    {
      id: 'ubs',
      title: cards('ubs.title'),
      description: cards('ubs.description'),
      icon: HospitalIcon,
      action: () => router.push('/ubs'),
      variant: 'stacked',
    },
    {
      id: 'vaccination',
      title: cards('vaccination.title'),
      description: cards('vaccination.description'),
      icon: RegisterIcon,
      action: () => console.log('Navigate to vaccination'),
      variant: 'stacked',
    },
    {
      id: 'settings',
      title: cards('settings.title'),
      description: cards('settings.description'),
      icon: SettingsIcon,
      action: () => console.log('Navigate to settings'),
      variant: 'image-first',
      isFullWidth: true,
    },
    {
      id: 'guide',
      title: cards('guide.title'),
      description: cards('guide.description'),
      icon: SyringeIcon,
      action: () => console.log('Navigate to guide'),
      variant: 'stacked',
    },
    {
      id: 'user-register',
      title: cards('manageUsers.title'),
      description: cards('manageUsers.description'),
      icon: RegisterIcon,
      action: () => console.log('Navigate to user management'),
      variant: 'stacked',
    },
    {
      id: 'alert-settings',
      title: cards('alertSettings.title'),
      description: cards('alertSettings.description'),
      icon: AlertIcon,
      action: () => console.log('Navigate to alert settings'),
      variant: 'stacked',
    },
  ]

  // Filtra as ações baseado nas permissões do usuário
  const allowedActions = allActions.filter((action) => hasPermission(action.id))

  // Separa as ações normais do guide (que tem layout especial)
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

          {/* Para mobile: mostra guide no grid se existir */}
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

      {/* Para desktop: mostra guide em largura total */}
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
