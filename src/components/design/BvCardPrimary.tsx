'use client'

import React from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import {
  AccessibilityLoadingIndicator,
  useCardAccessibilityIds,
  useCardKeyboardHandlers,
  generateCardAriaLabel,
  DEFAULT_A11Y_CONFIG,
  type CardAccessibilityProps,
} from '@/utils/accessibility'

type CardVariant = 'default' | 'stacked' | 'image-first'

interface CardPrimaryProps extends CardAccessibilityProps {
  title: string
  description: string
  icon?: string | StaticImageData
  onClick: () => void
  variant?: CardVariant
  loading?: boolean
  'aria-label'?: string
  tabIndex?: number
}

interface CardIconProps {
  icon: string | StaticImageData
  title: string
  className?: string
}

interface CardTextProps {
  title: string
  description?: string
  className?: string
}

interface LayoutProps {
  title: string
  description: string
  icon?: string | StaticImageData
}

// Componente para renderizar o ícone
const CardIcon: React.FC<CardIconProps> = ({ icon, title, className = '' }) => (
  <Image
    src={icon}
    alt={`Ícone de ${title}`}
    width={60}
    height={60}
    className={`text-gray-600 ${className}`}
  />
)

// Componente para renderizar título e descrição
const CardText: React.FC<CardTextProps> = ({ title, description, className = '' }) => (
  <div className={className}>
    <CardTitle className="mb-2 text-xl font-semibold">{title}</CardTitle>
    <CardDescription className="text-base font-normal text-black">{description}</CardDescription>
  </div>
)

// Layouts específicos para cada variante
const layouts = {
  default: ({ title, description, icon }: LayoutProps) => (
    <div className="flex flex-col items-start">
      <CardText title={title} />
      <div className="flex w-full items-center justify-between gap-2">
        <CardDescription className="text-base font-normal text-black">
          {description}
        </CardDescription>
        {icon && <CardIcon icon={icon} title={title} className="ml-auto" />}
      </div>
    </div>
  ),

  stacked: ({ title, description, icon }: LayoutProps) => (
    <>
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:text-center">
        <CardTitle className="mb-4 text-xl font-semibold">{title}</CardTitle>
        {icon && (
          <div className="mb-4">
            <CardIcon icon={icon} title={title} />
          </div>
        )}
        <CardDescription className="text-base font-normal text-black">
          {description}
        </CardDescription>
      </div>

      {/* Mobile fallback */}
      <div className="lg:hidden">{layouts.default({ title, description, icon })}</div>
    </>
  ),

  'image-first': ({ title, description, icon }: LayoutProps) => (
    <div className="flex items-start gap-4">
      {icon && (
        <div className="flex-shrink-0">
          <CardIcon icon={icon} title={title} />
        </div>
      )}
      <CardText title={title} description={description} className="flex flex-col" />
    </div>
  ),
}

export const BvCardPrimary: React.FC<CardPrimaryProps> = ({
  title,
  description,
  icon,
  onClick,
  variant = 'default',
  loading = false,
  'aria-label': ariaLabel,
  tabIndex = 0,
}) => {
  const { announceToScreenReader, announceError } = useLiveRegion()

  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { titleId, descId } = useCardAccessibilityIds(title)

  const handleKeyDown = useCardKeyboardHandlers(
    onClick,
    title,
    announceToScreenReader,
    announceError,
  )

  const Layout = layouts[variant]
  const defaultAriaLabel = generateCardAriaLabel(title, description, ariaLabel)

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={onClick}
      role="button"
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      aria-label={defaultAriaLabel}
      aria-describedby={`${titleId} ${descId}`}
      aria-busy={loading}
    >
      <CardHeader>
        <Layout title={title} description={description} icon={icon} />

        <AccessibilityLoadingIndicator
          isLoading={loading}
          isValidating={isValidating}
          loadingMessage="Carregando conteúdo"
        />
      </CardHeader>
    </Card>
  )
}
