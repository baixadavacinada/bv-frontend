import React from 'react'

interface AccessibilityAnnouncementProps {
  message: string
  priority?: 'polite' | 'assertive'
  className?: string
}

interface LoadingIndicatorProps {
  isLoading?: boolean
  isValidating?: boolean
  loadingMessage?: string
  validatingMessage?: string
  className?: string
}

/**
 * Componente para anúncios acessíveis apenas para leitores de tela
 * Útil para comunicar mudanças de estado ou ações realizadas
 */
export const AccessibilityAnnouncement: React.FC<AccessibilityAnnouncementProps> = ({
  message,
  priority = 'polite',
  className = '',
}) => (
  <span className={`sr-only ${className}`} aria-live={priority} aria-atomic="true">
    {message}
  </span>
)

/**
 * Componente para indicadores de estado de loading/validação
 * Combina indicadores visuais para leitores de tela
 */
export const AccessibilityLoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading = false,
  isValidating = false,
  loadingMessage = 'Carregando conteúdo',
  validatingMessage = 'Validando acessibilidade do componente',
  className = '',
}) => (
  <>
    {isValidating && (
      <AccessibilityAnnouncement
        message={validatingMessage}
        priority="polite"
        className={className}
      />
    )}

    {isLoading && (
      <AccessibilityAnnouncement message={loadingMessage} priority="polite" className={className} />
    )}
  </>
)

/**
 * Hook para gerar IDs únicos consistentes para elementos de card
 * Evita problemas de hidratação mantendo IDs estáveis
 */
export const useCardAccessibilityIds = (title: string) => {
  // Use useId do React que é seguro para SSR
  const baseId = React.useId()

  return React.useMemo(() => {
    const cleanTitle = title.replace(/\s+/g, '-').toLowerCase()
    return {
      titleId: `card-title-${cleanTitle}-${baseId}`,
      descId: `card-desc-${cleanTitle}-${baseId}`,
      cardId: `card-${cleanTitle}-${baseId}`,
    }
  }, [title, baseId])
}

/**
 * Hook para gerar IDs estáveis para seções
 * Específico para componentes como sections
 */
export const useSectionAccessibilityIds = (sectionName: string) => {
  const baseId = React.useId()

  return React.useMemo(
    () => ({
      sectionId: `${sectionName}-section-${baseId}`,
      headingId: `${sectionName}-heading-${baseId}`,
      contentId: `${sectionName}-content-${baseId}`,
    }),
    [sectionName, baseId],
  )
}

/**
 * Hook para handlers de teclado padronizados
 * Centraliza a lógica de navegação por teclado
 */
export const useCardKeyboardHandlers = (
  onClick: () => void,
  title: string,
  announceToScreenReader?: (message: string, priority?: 'polite' | 'assertive') => void,
  announceError?: (message: string) => void,
) => {
  return React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()

        try {
          onClick()
          announceToScreenReader?.(`Abrindo ${title}`, 'polite')
        } catch (error) {
          console.error('Erro ao executar onClick:', error)
          announceError?.('Erro ao abrir o conteúdo')
        }
      }
    },
    [onClick, title, announceToScreenReader, announceError],
  )
}

/**
 * Função para gerar aria-label padrão para cards
 * Mantém consistência na descrição dos cards
 */
export const generateCardAriaLabel = (
  title: string,
  description: string,
  customLabel?: string,
): string => {
  return customLabel || `${title}. ${description}. Clique para abrir.`
}

/**
 * Props comuns para acessibilidade de cards
 * Interface para padronizar props de acessibilidade
 */
export interface CardAccessibilityProps {
  'aria-label'?: string
  tabIndex?: number
  loading?: boolean
}

/**
 * Configuração padrão para validação de acessibilidade
 */
export const DEFAULT_A11Y_CONFIG = {
  enabled: process.env.NODE_ENV === 'development',
  delay: 500,
  logLevel: 'info' as const, // Mudado para 'info' para reduzir warnings desnecessários
}
