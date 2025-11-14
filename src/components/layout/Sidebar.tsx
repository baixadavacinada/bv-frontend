'use client'

import { useState } from 'react'
import { sidebarNavigation } from '@/lib/layout-navigation'
import { BvButton } from '../design/BvButton'
import { useRouter } from 'next/navigation'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { useAppTranslations } from '@/hooks/use-translations'
import {
  AccessibilityLoadingIndicator,
  useSectionAccessibilityIds,
  DEFAULT_A11Y_CONFIG,
} from '@/utils/accessibility'
import { useAuth } from '@/hooks/use-firebase-auth'
import { usePermissions } from '@/hooks/use-permissions'

export function Sidebar() {
  const router = useRouter()
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null)

  const { navigation, accessibility, common } = useAppTranslations()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()
  const { sectionId, headingId } = useSectionAccessibilityIds('sidebar')
  const { user, logout } = useAuth()

  const { filterNavigationItems } = usePermissions()
  const allowedNavigationItems = filterNavigationItems(sidebarNavigation)

  const handleNavigation = (action: (typeof sidebarNavigation)[0]) => {
    setLoadingActionId(action.id)
    announceToScreenReader(`Navegando para ${action.label}`, 'polite')
    router.push(action.href)
  }

  const handleLogout = async () => {
    try {
      setLoadingActionId('logout')
      announceToScreenReader(accessibility('actionCompleted') + ': Saindo da conta', 'assertive')

      await logout()
      router.push('/inicio')
      router.refresh()
    } catch {
      setLoadingActionId(null)
    }
  }

  const shouldShowLogout = !!user

  return (
    <aside
      id={sectionId}
      className="fixed top-16 left-0 z-40 h-[calc(100vh-64px)] w-64 overflow-y-auto rounded-r-3xl border-r border-gray-200 bg-white p-4"
      aria-labelledby={headingId}
      role="complementary"
      aria-label="Menu de navegação lateral"
    >
      <div className="flex h-full flex-col">
        <header>
          <h2 id={headingId} className="sr-only">
            {accessibility('sidebar.navigationMenu')}
          </h2>
        </header>

        {/* Menu items */}
        <nav className="flex-1" aria-label={accessibility('primaryNavigation')}>
          <ul className="space-y-5" role="list">
            {allowedNavigationItems.map((action) => {
              // Renderizar ícone corretamente dependendo do tipo
              const IconComponent = action.icon

              return (
                <li key={`sidebar-${action.id}`}>
                  <BvButton
                    title={action.label}
                    variant="ghost"
                    className="w-full justify-start gap-8 text-gray-700 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500"
                    leftIcon={<IconComponent size={24} aria-hidden="true" />}
                    aria-label={`Navegar para ${action.label}`}
                    onClick={() => handleNavigation(action)}
                    isLoading={loadingActionId === action.id}
                  />
                </li>
              )
            })}
          </ul>
        </nav>

        {shouldShowLogout && (
          <footer className="border-t border-gray-200 pt-4" aria-label="Ações da conta do usuário">
            <div aria-label={accessibility('sidebar.accountActions')}>
              <BvButton
                title={common('logout')}
                aria-label={navigation('logoutAction')}
                className="focus-visible:ring-2 focus-visible:ring-red-500"
                onClick={handleLogout}
                isLoading={loadingActionId === 'logout'}
              />
            </div>
          </footer>
        )}

        <AccessibilityLoadingIndicator
          isValidating={isValidating}
          validatingMessage={accessibility('sidebar.validatingAccessibility')}
        />
      </div>
    </aside>
  )
}
