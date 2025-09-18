'use client'
import { useRouter } from 'next/navigation'

import { navbarActions } from '@/lib/layout-navigation'
import { BvButton } from '@/components'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'
import { usePermissions } from '@/hooks/use-permissions'
import { useAppTranslations } from '@/hooks/use-translations'
import { clearClientAuthCookies } from '@/mock/auth'
import { BsArrowBarRight } from 'react-icons/bs'

export function Navbar() {
  const router = useRouter()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()
  const { navigation, accessibility } = useAppTranslations()

  const { filterNavigationItems, role } = usePermissions()
  const allowedNavigationItems = filterNavigationItems(navbarActions)

  const shouldShowLogout = role !== 'MORADOR'

  const handleNavigation = (action: (typeof navbarActions)[0]) => {
    announceToScreenReader(`Navegando para ${action.label}`, 'polite')
    router.push(action.href)
  }

  const handleLogout = () => {
    announceToScreenReader(accessibility('actionCompleted') + ': Saindo da conta', 'assertive')

    clearClientAuthCookies()
    router.push('/inicio')
    router.refresh()
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
        {allowedNavigationItems.map((action) => (
          <BvButton
            key={`navbar-${action.id}`}
            variant="ghost"
            size="icon"
            aria-label={`Navegar para ${action.label}`}
            leftIcon={<action.icon className="size-6" aria-hidden="true" />}
            onClick={() => handleNavigation(action)}
          />
        ))}

        {shouldShowLogout && (
          <div aria-label={accessibility('sidebar.accountActions')}>
            <BvButton
              variant={'ghost'}
              size="icon"
              leftIcon={<BsArrowBarRight className="size-6" aria-hidden="true" />}
              aria-label={navigation('logoutAction')}
              className="focus-visible:ring-2 focus-visible:ring-red-500"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>

      <AccessibilityLoadingIndicator
        isValidating={isValidating}
        validatingMessage="Verificando acessibilidade do menu de navegação superior"
      />
    </nav>
  )
}
