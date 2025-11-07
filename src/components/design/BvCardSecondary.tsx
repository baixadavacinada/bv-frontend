'use client'

import React, { forwardRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import {
  AccessibilityLoadingIndicator,
  useCardAccessibilityIds,
  useCardKeyboardHandlers,
  generateCardAriaLabel,
  DEFAULT_A11Y_CONFIG,
  type CardAccessibilityProps,
} from '@/utils/accessibility'

interface CardSecondaryProps extends CardAccessibilityProps {
  title: string
  description: string
  image: string
  onClick: () => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

interface CardTextContentProps {
  title: string
  description: string
}

// Componente para renderizar a imagem do card
// Comentado - imagens desabilitadas para manter cards com tamanho uniforme
/* 
const CardImage: React.FC<CardImageProps> = ({ image, title, className = '' }) => {
  const isPlaceholder = image.includes('placeholder')
  const titleId = `card-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <figure className={`mt-3 overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={image}
        alt={`Imagem ilustrativa para ${title}`}
        width={212}
        height={120}
        priority={isPlaceholder}
        loading={isPlaceholder ? undefined : 'lazy'}
        aria-describedby={titleId}
        style={{
          width: '100%',
          minHeight: '120px',
          objectFit: 'cover',
        }}
      />
    </figure>
  )
}
*/

// Componente para renderizar o conteúdo textual
const CardTextContent: React.FC<CardTextContentProps> = ({ title, description }) => {
  const titleId = `card-title-${title.replace(/\s+/g, '-').toLowerCase()}`
  const descId = `card-desc-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <>
      <h3 className="mb-2 text-xl font-semibold dark:text-gray-100" id={titleId}>
        {title}
      </h3>
      <p className="line-clamp-4 text-base text-black dark:text-gray-400" id={descId}>
        {description}
      </p>
    </>
  )
}

// Componente para estado de loading
const LoadingCard = forwardRef<HTMLDivElement>((props, ref) => (
  <Card
    ref={ref}
    className="h-64 w-64 shrink-0 cursor-pointer transition-shadow hover:shadow-md"
    aria-hidden="true"
    aria-label="Carregando conteúdo do card"
    {...props}
  >
    <CardContent className="flex h-full flex-col p-4">
      <Skeleton className="mb-3 h-32 w-full rounded" aria-hidden="true" />
      <Skeleton className="mb-2 h-4 w-3/4" aria-hidden="true" />
      <Skeleton className="h-3 w-full" aria-hidden="true" />
      <Skeleton className="h-3 w-2/3" aria-hidden="true" />
    </CardContent>
  </Card>
))

LoadingCard.displayName = 'LoadingCard'

export const BvCardSecondary = forwardRef<HTMLDivElement, CardSecondaryProps>(
  (
    {
      title,
      description,
      onClick,
      onKeyDown,
      loading = false,
      'aria-label': ariaLabel,
      tabIndex = 0,
      ...props
    },
    ref,
  ) => {
    const { announceToScreenReader, announceError } = useLiveRegion()

    const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
    const { descId } = useCardAccessibilityIds(title)

    const handleKeyDown = useCardKeyboardHandlers(
      onClick,
      title,
      announceToScreenReader,
      announceError,
    )

    if (loading) {
      return <LoadingCard ref={ref} {...props} />
    }

    const defaultAriaLabel = generateCardAriaLabel(title, description, ariaLabel)

    return (
      <Card
        ref={ref}
        className="h-64 w-64 flex-shrink-0 cursor-pointer transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={onClick}
        onKeyDown={(event) => {
          handleKeyDown(event)
          onKeyDown?.(event)
        }}
        tabIndex={tabIndex}
        role="button"
        aria-label={defaultAriaLabel}
        aria-describedby={descId}
        {...props}
      >
        <CardContent className="flex h-full flex-col gap-2 p-4">
          <CardTextContent title={title} description={description} />
          {/* Imagem do card comentada - mantém cards com tamanho uniforme */}
          {/* {image && <CardImage image={image} title={title} />} */}

          <AccessibilityLoadingIndicator isValidating={isValidating} />
        </CardContent>
      </Card>
    )
  },
)

BvCardSecondary.displayName = 'BvCardSecondary'
