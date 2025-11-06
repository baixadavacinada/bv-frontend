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
import { useAuth } from '@/hooks/use-firebase-auth'
import { StaticImageData } from 'next/image'

interface ActionItem {
  id: ActionType
  title: string
  description: string
  icon: string | StaticImageData
  action: () => void
  variant?: 'stacked' | 'image-first'
  isFullWidth?: boolean
  requiresAuth?: boolean
}

export function MainActionsSection() {
  const router = useRouter()
  const { cards } = useAppTranslations()
  const { hasPermission } = usePermissions()
  const { user } = useAuth()

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
      action: () => router.push('/vacinacao'),
      variant: 'stacked',
    },
    {
      id: 'settings',
      title: cards('settings.title'),
      description: cards('settings.description'),
      icon: SettingsIcon,
      action: () => router.push('/configuracoes'),
      variant: 'image-first',
      isFullWidth: true,
      requiresAuth: true,
    },
    {
      id: 'guide',
      title: cards('guide.title'),
      description: cards('guide.description'),
      icon: SyringeIcon,
      action: () => router.push('/cartilha-vacinas'),
      variant: 'stacked',
    },
    {
      id: 'user-register',
      title: cards('manageUsers.title'),
      description: cards('manageUsers.description'),
      icon: RegisterIcon,
      action: () => router.push('/registro-usuario'),
      variant: 'stacked',
    },

    {
      id: 'ubs-management',
      title: cards('ubsManagement.title'),
      description: cards('ubsManagement.description'),
      icon: HospitalIcon,
      action: () => router.push('/gestao-ubs'),
      variant: 'stacked',
    },
    {
      id: 'user-management',
      title: cards('userManagement.title'),
      description: cards('userManagement.description'),
      icon: RegisterIcon,
      action: () => router.push('/gestao-usuarios'),
      variant: 'stacked',
    },
    {
      id: 'vaccine-management',
      title: cards('vaccineManagement.title'),
      description: cards('vaccineManagement.description'),
      icon: AlertIcon,
      action: () => router.push('/gestao-vacinas'),
      variant: 'stacked',
    },
    {
      id: 'educational-materials',
      title: cards('educationalMaterials.title'),
      description: cards('educationalMaterials.description'),
      icon: AlertIcon,
      action: () => router.push('/materiais-educativos'),
      variant: 'stacked',
    },
    {
      id: 'alert-settings',
      title: cards('alertSettings.title'),
      description: cards('alertSettings.description'),
      icon: SettingsIcon,
      action: () => router.push('/ajustes-alertas'),
      variant: 'stacked',
    },
    {
      id: 'assessments',
      title: cards('assessments.title'),
      description: cards('assessments.description'),
      icon: SettingsIcon,
      action: () => router.push('/avaliacao'),
      variant: 'stacked',
    },
  ]

  // Filtra as ações baseado nas permissões do usuário
  const allowedActions = allActions.filter((action) => {
    // Se a ação requer autenticação e usuário não está logado, filtra
    if (action.requiresAuth && !user) {
      return false
    }
    return hasPermission(action.id)
  })

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
