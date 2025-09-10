'use client'
import { useRouter } from 'next/navigation'

import { navbarActions } from '@/lib/layout-navigation'
import { BvButton } from '@/components'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'

export function Navbar() {
  const router = useRouter()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()

  const handleNavigation = (action: (typeof navbarActions)[0]) => {
    announceToScreenReader(`Navegando para ${action.label}`, 'polite')

    // TODO: implementar tracking de cliques
    router.push(action.href)
  }

  return (
    <nav
      className="sticky top-0 z-50 flex h-16 items-center justify-between bg-indigo-600 px-4 text-white"
      aria-label="Navegação superior"
    >
      <div className="flex items-center gap-4">
        {/* TODO: Alterar logo */}
        <div className="text-lg font-semibold">Baixada Vacinada</div>
      </div>

      <div className="flex items-center gap-1" role="group" aria-label="Ações rápidas">
        {navbarActions.map((action) => (
          <BvButton
            key={`navbar-${action.id}`}
            variant="ghost"
            size="icon"
            aria-label={`Navegar para ${action.label}`}
            leftIcon={<action.icon className="size-6" aria-hidden="true" />}
            onClick={() => handleNavigation(action)}
          />
        ))}
      </div>

      <AccessibilityLoadingIndicator
        isValidating={isValidating}
        validatingMessage="Verificando acessibilidade do menu de navegação superior"
      />
    </nav>
  )
}
