'use client'

import clsx from 'clsx'
import { footerNavigation } from '@/lib/layout-navigation'
import { useRouter } from 'next/navigation'
import { BvButton } from '@/components'
import { useAppTranslations } from '@/hooks/use-translations'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'

export function FooterBar() {
  const router = useRouter()
  const { accessibility } = useAppTranslations()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()

  const handleNavigation = (action: (typeof footerNavigation)[0]) => {
    announceToScreenReader(`Navegando para ${action.label}`, 'polite')

    // TODO: implementar tracking de cliques
    router.push(action.href)
  }

  return (
    <div
      role="contentinfo"
      aria-label={accessibility('siteFooter')}
      className="fixed right-0 bottom-0 left-0 z-40 rounded-t-3xl bg-white px-2 py-2"
    >
      <div className="flex justify-around">
        {footerNavigation.map((action) => (
          <BvButton
            key={`footerbar-${action.id}`}
            variant="ghost"
            size="icon"
            aria-label={`Navegar para ${action.label}`}
            leftIcon={
              <div
                className={clsx(
                  'flex size-10 items-center justify-center',
                  action.id === 'carteira-vacinacao' && 'rounded-full bg-indigo-600',
                )}
              >
                <action.icon
                  className={clsx(
                    action.id === 'carteira-vacinacao' ? 'size-5 text-white' : 'size-5',
                  )}
                />
              </div>
            }
            onClick={() => handleNavigation(action)}
          />
        ))}
      </div>

      <AccessibilityLoadingIndicator
        isValidating={isValidating}
        validatingMessage="Verificando acessibilidade do menu rodapé"
      />
    </div>
  )
}
