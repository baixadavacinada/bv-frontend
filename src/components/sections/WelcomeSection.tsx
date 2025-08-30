'use client'

import React from 'react'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'

interface WelcomeSectionProps {
  userName: string
}

export function WelcomeSection({ userName }: WelcomeSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const { announceToScreenReader } = useLiveRegion()

  // Validação de acessibilidade para a seção de boas-vindas
  useAccessibilityValidation({
    enabled: process.env.NODE_ENV === 'development',
    delay: 500,
    logLevel: 'warn',
  })

  // Anuncia a mensagem de boas-vindas para leitores de tela
  React.useEffect(() => {
    if (userName) {
      // Delay para evitar conflito com outros anúncios na inicialização
      const timeoutId = setTimeout(() => {
        announceToScreenReader(`Bem-vindo, ${userName}`, 'polite')
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [userName, announceToScreenReader])

  return (
    <section ref={sectionRef} className="mb-8" aria-labelledby="main-heading">
      <h1 className="mb-2 text-2xl font-bold text-gray-800" id="main-heading" tabIndex={-1}>
        {`Olá, ${userName}!`}
      </h1>

      {/* Elemento oculto para anunciar contexto da página */}
      <p className="sr-only">
        Você está na página inicial do aplicativo de saúde. Use as ações principais abaixo para
        navegar pelas funcionalidades.
      </p>
    </section>
  )
}
