'use client'

import React, { JSX } from 'react'
import Image from 'next/image'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import AgenteIcon from '@/assets/icons/stethoscope.svg'
import AdminIcon from '@/assets/icons/admin.svg'
import {
  AccessibilityLoadingIndicator,
  DEFAULT_A11Y_CONFIG,
  useSectionAccessibilityIds,
} from '@/utils/accessibility'
import { useAuth } from '@/mock/auth'

const ROLE_DISPLAY_NAMES: Record<string, string> = {
  MORADOR: '',
  AGENTE_SAUDE: 'Agente de saúde',
  ADMIN: 'Administrador',
}

const ROLE_ICONS: Record<string, JSX.Element> = {
  MORADOR: <></>,
  AGENTE_SAUDE: (
    <Image
      src={AgenteIcon}
      alt="Ícone de Agente de Saúde"
      className="inline h-5 w-5"
      width={20}
      height={20}
      style={{ width: 'auto', height: 'auto' }}
    />
  ),
  ADMIN: (
    <Image
      src={AdminIcon}
      alt="Ícone de Administrador"
      className="inline h-5 w-5"
      width={20}
      height={20}
      style={{ width: 'auto', height: 'auto' }}
    />
  ),
}

export function WelcomeSection() {
  const sectionRef = React.useRef<HTMLElement>(null)

  const { isAuthenticated, role, user } = useAuth()
  const userName = user?.name || 'Visitante'

  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { sectionId, headingId } = useSectionAccessibilityIds('welcome')

  return (
    <section ref={sectionRef} className="mb-8" aria-labelledby={headingId} id={sectionId}>
      <div className="">
        <h1 className="mb-2 text-2xl font-bold text-gray-800" id={headingId} tabIndex={-1}>
          {`Olá, ${userName}!`}
        </h1>

        {/* Informações do usuário */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-[18px] font-normal text-gray-800">
              {ROLE_ICONS[role]} {ROLE_DISPLAY_NAMES[role]}
            </span>
          </div>
        </div>

        {/* Elemento oculto para anunciar contexto da página */}
        <p className="sr-only">
          Página inicial do Baixada Vacinada. Você está na página principal do aplicativo de
          vacinação como {ROLE_DISPLAY_NAMES[role]}.{' '}
          {isAuthenticated ? 'Você está logado no sistema.' : 'Você está navegando como visitante.'}{' '}
          Use as ações principais abaixo para navegar pelas funcionalidades.
        </p>

        <AccessibilityLoadingIndicator
          isValidating={isValidating}
          loadingMessage="Carregando informações de boas-vindas"
          validatingMessage="Verificando acessibilidade da seção de boas-vindas"
        />
      </div>
    </section>
  )
}
