import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { forwardRef } from 'react'

interface BvButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  title?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'transparent'
  /**
   * WCAG 2.1 - Critério 4.1.2 (Nome, Função, Valor)
   * Descrição acessível da ação do botão para leitores de tela
   * Opcional: se não fornecido, será gerado automaticamente baseado no contexto
   */
  'aria-label'?: string
}

/**
 * BvButton - Componente de Botão Acessível WCAG 2.1 AA
 *
 * Implementa todas as diretrizes de acessibilidade:
 * - Contraste mínimo 4.5:1 (WCAG 1.4.3)
 * - Navegação por teclado (WCAG 2.1.1)
 * - Foco visível (WCAG 2.4.7)
 * - Nome, função e valor acessíveis (WCAG 4.1.2)
 * - Estados comunicados adequadamente (WCAG 4.1.3)
 */
export const BvButton = forwardRef<HTMLButtonElement, BvButtonProps>(
  (
    {
      title,
      leftIcon,
      rightIcon,
      isLoading = false,
      'aria-label': ariaLabel,
      disabled,
      variant = 'ghost',
      ...props
    },
    ref,
  ) => {
    // WCAG 2.1 - Critério 3.2.2 (Na Entrada): Comportamento previsível
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Previne ação se estiver carregando ou desabilitado
      if (isLoading || disabled) {
        event.preventDefault()
        return
      }

      if (props.onClick) {
        props.onClick(event)
      }
    }

    // WCAG 2.1 - Critério 2.1.1 (Teclado): Suporte a navegação por teclado
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Enter e Space devem ativar o botão
      if (event.key === 'Enter' || event.key === ' ') {
        if (!isLoading && !disabled) {
          event.preventDefault()
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
          event.currentTarget.dispatchEvent(clickEvent)
        }
      }

      if (props.onKeyDown) {
        props.onKeyDown(event)
      }
    }

    // WCAG 2.1 - Critério 4.1.2 (Nome, Função, Valor): Determinar label acessível
    const getAccessibleLabel = (): string => {
      if (ariaLabel) return ariaLabel
      if (title) return title
      if (leftIcon && !title) return 'Botão com ícone'
      return 'Botão'
    }

    // WCAG 2.1 - Critério 4.1.3 (Mensagens de Status): Auto-gerar aria-live
    const getAutoAriaLive = (): 'polite' | 'assertive' | 'off' | undefined => {
      if (isLoading) return 'polite' // Anuncia mudanças de loading
      return undefined
    }

    // WCAG 2.1 - Auto-gerar aria-expanded (para expansão futura)
    const getAutoAriaExpanded = (): boolean | undefined => {
      // Pode ser estendido para botões dropdown no futuro
      return undefined
    }

    // WCAG 2.1 - Auto-gerar aria-controls (para controle futuro)
    const getAutoAriaControls = (): string | undefined => {
      // Pode ser estendido para botões que controlam outros elementos
      return undefined
    }

    // WCAG 2.1 - Auto-gerar aria-describedby (para descrições futuras)
    const getAutoAriaDescribedby = (): string | undefined => {
      // Pode ser estendido para botões com descrições adicionais
      return undefined
    }

    return (
      <Button
        ref={ref}
        {...props}
        // WCAG 2.1 - Estilização com foco em acessibilidade
        className={` ${!!title ? 'min-w-40' : ' '} ${props.className || ''} focus-visible:ring-primary transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2`.trim()}
        // WCAG 2.1 - Atributos de acessibilidade auto-gerados
        aria-label={getAccessibleLabel()}
        aria-live={getAutoAriaLive()}
        aria-expanded={getAutoAriaExpanded()}
        aria-controls={getAutoAriaControls()}
        aria-describedby={getAutoAriaDescribedby()}
        aria-disabled={disabled || isLoading}
        // WCAG 2.1 - Critério 2.1.1 (Teclado): Navegação por teclado
        tabIndex={disabled ? -1 : 0}
        // WCAG 2.1 - Eventos de acessibilidade
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        // WCAG 2.1 - Estados do componente
        disabled={disabled}
        data-loading={isLoading}
        data-testid="bv-button"
        variant={variant}
      >
        <div className="flex items-center justify-between gap-2">
          {isLoading ? (
            // WCAG 2.1 - Critério 1.1.1 (Conteúdo Não-textual): Alt text para loader
            <Loader2
              className="h-4 w-4 animate-spin text-center"
              data-testid="loading-spinner"
              aria-hidden="true" // Esconde do leitor de tela pois já temos aria-live
              role="img"
              aria-label="Carregando"
            />
          ) : (
            <>
              {leftIcon && (
                <span
                  className="flex-shrink-0"
                  aria-hidden="true" // Ícones são decorativos, texto principal é o title
                  role="img"
                >
                  {leftIcon}
                </span>
              )}

              {title && <span className="flex-grow text-center">{title}</span>}

              {rightIcon && (
                <span
                  className="flex-shrink-0"
                  aria-hidden="true" // Ícones são decorativos, texto principal é o title
                  role="img"
                >
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </div>
      </Button>
    )
  },
)

BvButton.displayName = 'BvButton'
