'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { navbarActions } from '@/lib/layout-navigation'
import { BvButton } from '@/components'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'
import { usePermissions } from '@/hooks/use-permissions'
import { useAppTranslations } from '@/hooks/use-translations'
import { useAuth } from '@/hooks/use-firebase-auth'
import { BsArrowBarRight } from 'react-icons/bs'

export function Navbar() {
  const router = useRouter()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()
  const { navigation, accessibility } = useAppTranslations()
  const { user, logout } = useAuth()

  const { filterNavigationItems, role } = usePermissions()
  let allowedNavigationItems = filterNavigationItems(navbarActions)

  // Mostrar configurações apenas se usuário está logado
  if (!user) {
    allowedNavigationItems = allowedNavigationItems.filter((item) => item.id !== 'configuracao')
  }

  const shouldShowLogout = !!user

  const handleNavigation = (action: (typeof navbarActions)[0]) => {
    announceToScreenReader(`Navegando para ${action.label}`, 'polite')

    if (action.id === 'profile') {
      const profileHref = role === 'public' ? '/login' : '/perfil'
      router.push(profileHref)
    } else {
      router.push(action.href)
    }
  }

  const handleLogout = async () => {
    try {
      announceToScreenReader(accessibility('actionCompleted') + ': Saindo da conta', 'assertive')

      await logout()
      router.push('/')
      router.refresh()
    } catch {
      // Error handling can be added here if needed
    }
  }

  return (
    <nav
      className="bg-primary text-primary-foreground sticky top-0 z-50 flex h-16 items-center justify-between px-4"
      aria-label="Navegação superior"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="Logo Criola"
          width={40}
          height={40}
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
        <div className="hidden text-lg font-semibold md:block">Baixada Vacinada</div>
      </div>

      <div className="flex items-center gap-1" role="group" aria-label="Ações rápidas">
        {allowedNavigationItems.map((action) => (
          <BvButton
            key={`navbar-${action.id}`}
            variant="ghost"
            size="icon"
            title=""
            aria-label={`Navegar para ${action.id}`}
            leftIcon={<action.icon className="size-6" aria-hidden="true" />}
            onClick={() => handleNavigation(action)}
          />
        ))}

        {shouldShowLogout && (
          <div aria-label={accessibility('sidebar.accountActions')}>
            <BvButton
              variant={'ghost'}
              size="icon"
              title=""
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
