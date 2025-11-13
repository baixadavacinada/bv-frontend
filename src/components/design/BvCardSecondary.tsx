'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { Heart, Share2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-firebase-auth'
import { toggleFavoriteEducationalMaterial } from '@/services/actions/educational-materials-actions'
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
  id?: string
  onClick: () => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

interface CardTextContentProps {
  title: string
  description: string
}

// Componente para renderizar o footer do card com botões de like e share
const CardFooter: React.FC<{ id?: string; title: string }> = ({ id, title }) => {
  const cardId = id || title.replace(/\s+/g, '-').toLowerCase()
  const [isLiked, setIsLiked] = useState(false)
  const { user } = useAuth()

  // Carrega o estado inicial do like
  useEffect(() => {
    const likedMaterials = localStorage.getItem('liked_materials')
    const likedList = likedMaterials ? JSON.parse(likedMaterials) : []
    setIsLiked(likedList.includes(cardId))
  }, [cardId])

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      const newState = !isLiked

      // Se o usuário estiver autenticado, atualiza no backend
      if (user?.uid) {
        await toggleFavoriteEducationalMaterial(user.uid, cardId)
      }

      // Atualiza estado local
      setIsLiked(newState)

      // Atualiza localStorage
      const likedMaterials = localStorage.getItem('liked_materials')
      let likedList = likedMaterials ? JSON.parse(likedMaterials) : []

      if (newState) {
        if (!likedList.includes(cardId)) {
          likedList.push(cardId)
        }
      } else {
        likedList = likedList.filter((id: string) => id !== cardId)
      }

      localStorage.setItem('liked_materials', JSON.stringify(likedList))
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error)
      // Reverte em caso de erro se havia tentativa de salvar no backend
      if (user?.uid) {
        setIsLiked(!isLiked)
      }
    }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    const shareText = `Confira este material educativo: ${title}`
    const shareUrl = window.location.href

    if (navigator.share) {
      navigator.share({
        title: 'Baixada Vacinada',
        text: shareText,
        url: shareUrl,
      })
    } else {
      // Fallback: copiar para clipboard
      const text = `${shareText} ${shareUrl}`
      navigator.clipboard.writeText(text).catch((err) => {
        console.error('Erro ao copiar para clipboard:', err)
      })
    }
  }

  return (
    <div className="mt-auto flex justify-end gap-1 border-t pt-3">
      <button
        onClick={handleLike}
        aria-label={isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        className="flex items-center justify-center rounded px-2 py-1 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Heart
          className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          aria-hidden="true"
        />
      </button>
      <button
        onClick={handleShare}
        aria-label="Compartilhar este material"
        className="flex items-center justify-center rounded px-2 py-1 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Share2 className="h-4 w-4 text-gray-500" aria-hidden="true" />
      </button>
    </div>
  )
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
      id,
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
        className="flex h-64 w-64 flex-shrink-0 cursor-pointer flex-col transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
          <CardFooter id={id} title={title} />
        </CardContent>
      </Card>
    )
  },
)

BvCardSecondary.displayName = 'BvCardSecondary'
