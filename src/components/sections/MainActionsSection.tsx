'use client'

import { useRouter } from 'next/navigation'
import { BvCardPrimary } from '@/components/design/BvCardPrimary'
import { useAppTranslations } from '@/hooks/use-translations'

import HospitalIcon from '@/assets/icons/hospital.svg'
import RegisterIcon from '@/assets/icons/register.svg'
import SyringeIcon from '@/assets/icons/syringe.svg'
import SettingsIcon from '@/assets/icons/settings.svg'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

export function MainActionsSection() {
  const router = useRouter()
  const { cards } = useAppTranslations()

  useAccessibilityValidation({ enabled: true })

  const mainActions = [
    {
      id: 'ubs',
      title: cards('ubs.title'),
      description: cards('ubs.description'),
      icon: HospitalIcon,
      action: () => router.push('/ubs'),
      variant: 'stacked' as const,
    },
    {
      id: 'vaccination',
      title: cards('vaccination.title'),
      description: cards('vaccination.description'),
      icon: RegisterIcon,
      action: () => console.log('Navigate to vaccination'),
      variant: 'stacked' as const,
    },

    {
      id: 'settings',
      title: cards('settings.title'),
      description: cards('settings.description'),
      icon: SettingsIcon,
      action: () => console.log('Navigate to settings'),
      variant: 'stacked' as const,
    },
  ]

  const guideAction = {
    id: 'guide',
    title: cards('guide.title'),
    description: cards('guide.description'),
    icon: SyringeIcon,
    action: () => console.log('Navigate to guide'),
    variant: 'image-first' as const,
  }

  return (
    <section className="mb-8" aria-labelledby="main-actions-section">
      <h2 id="main-actions-heading" className="sr-only">
        Ações principais
      </h2>

      {/* Mobile: 1 coluna | Tablet: 2 colunas | Desktop: 3 colunas */}
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mainActions.map((action) => (
          <BvCardPrimary
            key={action.id}
            icon={action.icon}
            title={action.title}
            description={action.description}
            onClick={action.action}
            variant={action.variant}
          />
        ))}

        <div className="lg:hidden">
          <BvCardPrimary
            key={guideAction.id}
            icon={guideAction.icon}
            title={guideAction.title}
            description={guideAction.description}
            onClick={guideAction.action}
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <BvCardPrimary
          key={guideAction.id}
          icon={guideAction.icon}
          title={guideAction.title}
          description={guideAction.description}
          onClick={guideAction.action}
          variant={guideAction.variant}
        />
      </div>
    </section>
  )
}
