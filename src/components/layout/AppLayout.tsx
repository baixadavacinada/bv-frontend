'use client'

import { ReactNode, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { FooterBar } from './FooterBar'
import { LocationPermissionHandler } from '../common/LocationPermissionHandler'
import { cn } from '@/lib/utils'
import { useAppTranslations } from '@/hooks/use-translations'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'

interface AppLayoutProps {
  children: ReactNode
  className?: string
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const { accessibility } = useAppTranslations()
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()

  useEffect(() => {
    const timer = setTimeout(() => {
      announceToScreenReader(accessibility('pageLoaded'), 'polite')
    }, 1000)

    return () => clearTimeout(timer)
  }, [announceToScreenReader, accessibility])

  return (
    <div className="min-h-screen">
      <LocationPermissionHandler />
      <Navbar />

      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <main
          id="main-content"
          className={cn(
            'min-h-[calc(100vh-64px)] flex-1',
            'lg:ml-64',
            'overflow-x-hidden',
            'w-full px-10 py-8 lg:px-8',
            className,
          )}
          role="main"
          aria-label={accessibility('mainContent')}
          tabIndex={-1}
        >
          <h1 className="sr-only">{accessibility('mainContent')} - Baixada Vacinada</h1>

          <div className="mx-auto max-w-7xl pb-10">{children}</div>
        </main>
      </div>

      <div className="lg:hidden">
        <FooterBar />
      </div>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        {accessibility('skipToMain')}
      </a>

      <AccessibilityLoadingIndicator
        isValidating={isValidating}
        validatingMessage="Verificando acessibilidade do layout"
      />
    </div>
  )
}
