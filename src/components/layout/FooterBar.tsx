'use client'

import clsx from 'clsx'
import { footerNavigation } from '@/lib/layout-navigation'
import { useRouter } from 'next/navigation'
import { BvButton } from '@/components'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'
import { usePermissions } from '@/hooks/use-permissions'

export function FooterBar() {
  const router = useRouter()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()

  const { filterNavigationItems } = usePermissions()
  const allowedNavigationItems = filterNavigationItems(footerNavigation)

  const handleNavigation = (action: (typeof footerNavigation)[0]) => {
    announceToScreenReader(`Navegando para ${action.label}`, 'polite')

    router.push(action.href)
  }

  return (
    <div
      role="contentinfo"
      aria-label="Navegação principal do rodapé"
      className="fixed right-0 bottom-0 left-0 z-40 rounded-t-3xl bg-white px-2 py-2"
    >
      <div className="flex justify-around">
        {allowedNavigationItems.map((action) => (
          <BvButton
            key={`footerbar-${action.id}`}
            variant="ghost"
            size="icon"
            title=""
            aria-label={`Navegar para ${action.label}`}
            leftIcon={
              <div
                className={clsx(
                  'flex size-10 items-center justify-center',
                  (action.id === 'gestao-vacinas' || action.id === 'carteira-vacinacao') &&
                    'bg-primary rounded-full',
                )}
              >
                <action.icon
                  className={clsx(
                    action.id === 'gestao-vacinas' || action.id === 'carteira-vacinacao'
                      ? 'size-5 text-white'
                      : 'size-5',
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
