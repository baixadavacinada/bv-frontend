'use client'

import React from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import {
  AccessibilityLoadingIndicator,
  DEFAULT_A11Y_CONFIG,
  useSectionAccessibilityIds,
} from '@/utils/accessibility'

interface WelcomeSectionProps {
  userName: string
}

export function WelcomeSection({ userName }: WelcomeSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null)

  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { sectionId, headingId } = useSectionAccessibilityIds('welcome')

  return (
    <section ref={sectionRef} className="mb-8" aria-labelledby={headingId} id={sectionId}>
      <h1 className="mb-2 text-2xl font-bold text-gray-800" id={headingId} tabIndex={-1}>
        {`Olá, ${userName}!`}
      </h1>

      {/* Elemento oculto para anunciar contexto da página */}
      <p className="sr-only">
        Página inicial do Baixada Vacinada. Você está na página principal do aplicativo de
        vacinação. Use as ações principais abaixo para navegar pelas funcionalidades.
      </p>

      <AccessibilityLoadingIndicator
        isValidating={isValidating}
        loadingMessage="Carregando informações de boas-vindas"
        validatingMessage="Verificando acessibilidade da seção de boas-vindas"
      />
    </section>
  )
}
