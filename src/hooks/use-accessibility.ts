import { useEffect, useRef, useCallback, useMemo } from 'react'

interface A11yConfig {
  enabled?: boolean
  delay?: number
  logLevel?: 'error' | 'warn' | 'info' | 'silent'
}

interface A11yCheckResult {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: Element
}

type LogResultFunction = (result: A11yCheckResult) => void

// Configuração padrão
const DEFAULT_CONFIG: Required<A11yConfig> = {
  enabled: process.env.NODE_ENV === 'development',
  delay: 1000,
  logLevel: 'warn',
}

/**
 * Executa validações básicas de acessibilidade
 */
const performBasicA11yChecks = (logResult: LogResultFunction) => {
  const checks = [
    () => checkImagesWithoutAlt(logResult),
    () => checkImagePerformance(logResult),
    () => checkButtonsWithoutLabels(logResult),
    () => checkHeadingHierarchy(logResult),
    () => checkFormLabels(logResult),
    () => checkFocusableElements(logResult),
    () => checkLandmarks(logResult),
    () => checkAriaRoles(logResult),
  ]

  checks.forEach((check) => {
    try {
      check()
    } catch (error) {
      logResult({
        type: 'error',
        message: `Basic a11y check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
  })
}

/**
 * Hook principal para validação de acessibilidade
 * Executa axe-core em desenvolvimento e fallback para validações básicas
 */
export const useAccessibilityValidation = (config: A11yConfig = {}) => {
  const hasRun = useRef(false)
  const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config])

  const logResult = useCallback(
    (result: A11yCheckResult) => {
      if (finalConfig.logLevel === 'silent') return

      const icon = result.type === 'error' ? '❌' : result.type === 'warning' ? '⚠️' : 'ℹ️'
      const logMethod =
        result.type === 'error'
          ? console.error
          : result.type === 'warning'
            ? console.warn
            : console.info

      logMethod(`${icon} A11y ${result.type}: ${result.message}`, result.element || '')
    },
    [finalConfig.logLevel],
  )

  useEffect(() => {
    if (!finalConfig.enabled || hasRun.current || typeof window === 'undefined') {
      // Se não está habilitado, marque como completado
      if (!finalConfig.enabled && !hasRun.current) {
        hasRun.current = true
      }
      return
    }

    const validateAccessibility = async () => {
      try {
        // Tentar usar @axe-core/react se disponível
        const axeReact = await import('@axe-core/react')
        if (axeReact.default) {
          const React = await import('react')
          const ReactDOM = await import('react-dom')
          await axeReact.default(React.default, ReactDOM, finalConfig.delay)
          logResult({ type: 'info', message: 'Axe accessibility validation completed' })
        }
      } catch {
        logResult({
          type: 'warning',
          message: 'Axe not available, running basic a11y checks instead',
        })
        performBasicA11yChecks(logResult)
      } finally {
        hasRun.current = true
      }
    }

    const timeoutId = setTimeout(validateAccessibility, finalConfig.delay)
    return () => {
      clearTimeout(timeoutId)
      // Marque como executado ao desmontar para evitar infinite loading
      hasRun.current = true
    }
  }, [finalConfig, logResult])

  return {
    isValidating: !hasRun.current && finalConfig.enabled,
    reset: () => {
      hasRun.current = false
    },
  }
}

/**
 * Validações específicas de acessibilidade
 */
const checkImagesWithoutAlt = (logResult: LogResultFunction) => {
  const images = document.querySelectorAll('img:not([alt])')
  if (images.length > 0) {
    logResult({
      type: 'warning',
      message: `Found ${images.length} images without alt text`,
      element: images[0],
    })
  }
}

const checkImagePerformance = (logResult: LogResultFunction) => {
  // Verifica imagens que deveriam ter priority
  const aboveFoldImages = document.querySelectorAll('img')
  aboveFoldImages.forEach((img) => {
    const rect = img.getBoundingClientRect()
    const isAboveFold = rect.top < window.innerHeight && rect.left < window.innerWidth

    if (isAboveFold && img.getAttribute('loading') === 'lazy') {
      logResult({
        type: 'info',
        message: 'Image above the fold should consider using priority prop',
        element: img,
      })
    }
  })

  // Verifica imagens placeholder sendo usadas como LCP
  const placeholderImages = document.querySelectorAll('img[src*="placeholder"]')
  if (placeholderImages.length > 0) {
    logResult({
      type: 'info',
      message: 'Placeholder images detected - consider using real content for better LCP',
      element: placeholderImages[0],
    })
  }
}

const checkButtonsWithoutLabels = (logResult: LogResultFunction) => {
  const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])')
  const problematicButtons = Array.from(buttons).filter((btn) => {
    const button = btn as HTMLButtonElement
    return !button.textContent?.trim() && !button.querySelector('[aria-label]')
  })

  if (problematicButtons.length > 0) {
    logResult({
      type: 'warning',
      message: `Found ${problematicButtons.length} buttons without accessible labels`,
      element: problematicButtons[0],
    })
  }
}

const checkHeadingHierarchy = (logResult: LogResultFunction) => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0
  let hasH1 = false

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.substring(1))

    if (level === 1) hasH1 = true

    if (index > 0 && level > previousLevel + 1) {
      logResult({
        type: 'warning',
        message: `Heading hierarchy skip detected: ${heading.tagName} after h${previousLevel}`,
        element: heading,
      })
    }

    previousLevel = level
  })

  if (!hasH1) {
    logResult({
      type: 'warning',
      message: 'No H1 heading found on page',
    })
  }
}

const checkFormLabels = (logResult: LogResultFunction) => {
  const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea')

  inputs.forEach((input) => {
    const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    const hasLabel =
      (element.labels && element.labels.length > 0) ||
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby')

    if (!hasLabel) {
      logResult({
        type: 'warning',
        message: 'Form control without label',
        element: element,
      })
    }
  })
}

const checkFocusableElements = (logResult: LogResultFunction) => {
  const focusableElements = document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )

  focusableElements.forEach((element) => {
    const focusableEl = element as HTMLElement
    const tabIndex = focusableEl.tabIndex

    if (tabIndex < 0 && element.getAttribute('tabindex') !== '-1') {
      logResult({
        type: 'warning',
        message: 'Element with negative tabindex (not -1)',
        element: element,
      })
    }
  })
}

/**
 * Novas validações para corrigir os problemas identificados nos logs
 */
const checkLandmarks = (logResult: LogResultFunction) => {
  // Verifica aside dentro de outros landmarks
  const nestedAsides = document.querySelectorAll(
    'main aside, article aside, section aside, nav aside, header aside, footer aside',
  )
  if (nestedAsides.length > 0) {
    logResult({
      type: 'warning',
      message: 'Aside should not be contained in another landmark',
      element: nestedAsides[0],
    })
  }

  // Verifica landmarks sem identificação única (incluindo elementos semânticos)
  const allLandmarks = document.querySelectorAll(
    'main, nav, aside, section[role], header, footer, [role="banner"], [role="main"], [role="navigation"], [role="complementary"], [role="contentinfo"]',
  )
  const landmarksByType: { [key: string]: Element[] } = {}

  allLandmarks.forEach((landmark) => {
    // Determina o tipo do landmark (seja por tag ou role)
    const role = landmark.getAttribute('role') || landmark.tagName.toLowerCase()
    const landmarkType =
      role === 'banner'
        ? 'header'
        : role === 'main'
          ? 'main'
          : role === 'navigation'
            ? 'nav'
            : role === 'complementary'
              ? 'aside'
              : role === 'contentinfo'
                ? 'footer'
                : role

    if (!landmarksByType[landmarkType]) landmarksByType[landmarkType] = []
    landmarksByType[landmarkType].push(landmark)
  })

  // Verifica se há múltiplos landmarks do mesmo tipo
  Object.entries(landmarksByType).forEach(([type, elements]) => {
    if (elements.length > 1) {
      // Verifica quantos NÃO têm labels únicos
      const elementsWithoutUniqueLabels = elements.filter((el) => {
        const hasAriaLabel = el.getAttribute('aria-label')
        const hasAriaLabelledby = el.getAttribute('aria-labelledby')
        const hasHeading = el.querySelector('h1, h2, h3, h4, h5, h6')

        // Se não tem nenhuma forma de identificação única
        if (!hasAriaLabel && !hasAriaLabelledby && !hasHeading) {
          return true
        }

        // Se tem aria-label, verifica se é único
        if (hasAriaLabel) {
          const duplicateLabels = elements.filter(
            (otherEl) => otherEl !== el && otherEl.getAttribute('aria-label') === hasAriaLabel,
          )
          return duplicateLabels.length > 0
        }

        return false
      })

      if (elementsWithoutUniqueLabels.length > 0) {
        logResult({
          type: 'warning',
          message: `Found ${elements.length} ${type} landmarks, ${elementsWithoutUniqueLabels.length} without unique labels. Each landmark should have a unique aria-label or aria-labelledby.`,
          element: elementsWithoutUniqueLabels[0],
        })
      }
    }
  })
}

const checkAriaRoles = (logResult: LogResultFunction) => {
  // Verifica roles ARIA inadequados
  const elementsWithRoles = document.querySelectorAll('[role]')

  elementsWithRoles.forEach((element) => {
    const role = element.getAttribute('role')
    const tagName = element.tagName.toLowerCase()

    // Alguns exemplos de roles inadequados comuns
    const invalidCombinations = [
      { tag: 'button', role: 'link' },
      { tag: 'a', role: 'button' },
      { tag: 'div', role: 'heading' }, // melhor usar h1-h6
      { tag: 'span', role: 'button' }, // melhor usar button
    ]

    const isInvalid = invalidCombinations.some(
      (combo) => combo.tag === tagName && combo.role === role,
    )

    if (isInvalid) {
      logResult({
        type: 'warning',
        message: `ARIA role "${role}" may not be appropriate for ${tagName} element`,
        element: element,
      })
    }
  })
}

/**
 * Hook para anunciar mudanças dinâmicas para leitores de tela
 * Cria live regions temporárias para comunicar mudanças de estado
 */
export const useLiveRegion = () => {
  const announceToScreenReader = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite', duration = 1000) => {
      if (!message.trim()) return

      // Remove anúncios anteriores para evitar acúmulo
      const existingRegions = document.querySelectorAll('[data-live-region="temporary"]')
      existingRegions.forEach((region) => region.remove())

      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.setAttribute('data-live-region', 'temporary')
      liveRegion.className = 'sr-only absolute -left-[10000px] w-px h-px overflow-hidden'
      liveRegion.textContent = message

      document.body.appendChild(liveRegion)

      // Remove após o tempo especificado
      setTimeout(() => {
        if (document.body.contains(liveRegion)) {
          document.body.removeChild(liveRegion)
        }
      }, duration)
    },
    [],
  )

  const announceError = useCallback(
    (message: string) => {
      announceToScreenReader(`Erro: ${message}`, 'assertive')
    },
    [announceToScreenReader],
  )

  const announceSuccess = useCallback(
    (message: string) => {
      announceToScreenReader(`Sucesso: ${message}`, 'polite')
    },
    [announceToScreenReader],
  )

  return {
    announceToScreenReader,
    announceError,
    announceSuccess,
  }
}

/**
 * Hook para gerenciar foco em modais, menus e outros componentes que precisam de focus trap
 * Previne que o foco saia do componente e fornece navegação por teclado
 */
export const useFocusTrap = () => {
  const trapFocus = useCallback(
    (
      container: HTMLElement,
      options: {
        initialFocus?: HTMLElement | null
        restoreFocus?: HTMLElement | null
        escapeDeactivates?: boolean
      } = {},
    ) => {
      const { initialFocus, restoreFocus, escapeDeactivates = true } = options

      const getFocusableElements = () => {
        return container.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details summary',
        ) as NodeListOf<HTMLElement>
      }

      const focusableElements = getFocusableElements()
      const firstElement = focusableElements[0]

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        // Atualiza elementos focáveis dinamicamente
        const currentFocusableElements = getFocusableElements()
        const currentFirst = currentFocusableElements[0]
        const currentLast = currentFocusableElements[currentFocusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === currentFirst) {
            currentLast?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === currentLast) {
            currentFirst?.focus()
            e.preventDefault()
          }
        }
      }

      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && escapeDeactivates) {
          container.dispatchEvent(
            new CustomEvent('focustrap:escape', {
              detail: { originalEvent: e },
            }),
          )
        }
      }

      // Configura listeners
      container.addEventListener('keydown', handleTabKey)
      container.addEventListener('keydown', handleEscapeKey)

      // Foca elemento inicial
      const elementToFocus = initialFocus || firstElement
      elementToFocus?.focus()

      // Função de cleanup
      const cleanup = () => {
        container.removeEventListener('keydown', handleTabKey)
        container.removeEventListener('keydown', handleEscapeKey)

        // Restaura foco se especificado
        if (restoreFocus) {
          restoreFocus.focus()
        }
      }

      return cleanup
    },
    [],
  )

  return { trapFocus }
}

/**
 * Hook utilitário para gerenciamento de foco em skip links
 */
export const useSkipLink = () => {
  const skipToContent = useCallback((targetId: string) => {
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return { skipToContent }
}

/**
 * Hook para detectar problemas de performance relacionados a acessibilidade
 */
export const usePerformanceA11y = () => {
  const checkLCP = useCallback(() => {
    // Detecta imagens placeholder que podem estar sendo usadas como LCP
    const images = document.querySelectorAll('img')
    const issues: string[] = []

    images.forEach((img) => {
      const src = img.getAttribute('src')
      const rect = img.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.left < window.innerWidth

      if (src?.includes('placeholder') && isVisible) {
        issues.push(`Placeholder image detected in viewport: ${src}`)
      }

      if (
        isVisible &&
        img.getAttribute('loading') === 'lazy' &&
        !img.hasAttribute('data-priority')
      ) {
        issues.push(`Above-fold image should consider priority: ${src}`)
      }
    })

    return issues
  }, [])

  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[src*="placeholder"]')
    images.forEach((img) => {
      const nextImage = img.parentElement?.querySelector('img:not([src*="placeholder"])')
      if (nextImage) {
        // Se houver uma imagem real, pode sugerir trocar
        console.info('Consider replacing placeholder with real content for better LCP')
      }
    })
  }, [])

  return { checkLCP, optimizeImages }
}

/**
 * Hook para validação de contraste de cores (básico)
 */
export const useColorContrast = () => {
  const checkContrast = useCallback((textColor: string, backgroundColor: string) => {
    const getRelativeLuminance = (color: string) => {
      // Converte cor para RGB e calcula luminância
      // Implementação simplificada
      const rgb = color.match(/\d+/g)
      if (!rgb || rgb.length < 3) return 0

      const [r, g, b] = rgb.map((c) => {
        const val = parseInt(c) / 255
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
      })

      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    const l1 = getRelativeLuminance(textColor)
    const l2 = getRelativeLuminance(backgroundColor)
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

    return {
      ratio,
      wcagAA: ratio >= 4.5,
      wcagAAA: ratio >= 7,
      wcagAALarge: ratio >= 3, // Para texto grande (18pt+ ou 14pt+ negrito)
    }
  }, [])

  return { checkContrast }
}
