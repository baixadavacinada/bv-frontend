import { useId, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MaskedInput } from '@/components/ui/masked-input'
import { useLiveRegion } from '@/hooks/use-accessibility'

// Componente de Input
export const BvFormInput = ({
  label,
  error,
  mask,
  onChange,
  onBlur,
  value,
  className,
  required,
  disabled,
  placeholder,
  description,
  ...props
}: {
  label: string
  error?: string
  mask?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  value?: string
  className?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  description?: string
} & Omit<React.ComponentProps<typeof Input>, 'onChange' | 'onBlur' | 'value' | 'className'>) => {
  const inputId = useId()
  const errorId = useId()
  const descriptionId = useId()
  const { announceError, announceToScreenReader } = useLiveRegion()

  // Anuncia erros para leitores de tela quando aparecem
  useEffect(() => {
    if (error) {
      announceError(`Campo ${label}: ${error}`)
    }
  }, [error, label, announceError])

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Valida campo obrigatório ao sair do foco
    if (required && !event.target.value.trim()) {
      announceToScreenReader(`Campo obrigatório: ${label} não foi preenchido`, 'assertive')
    }

    onBlur?.(event)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Anuncia correção do erro se o usuário começar a digitar
    if (error && event.target.value.trim()) {
      announceToScreenReader(`${label} corrigido`, 'polite')
    }

    onChange?.(event)
  }

  // Constrói aria-describedby dinamicamente
  const getAriaDescribedBy = () => {
    const descriptors = []
    if (description) descriptors.push(descriptionId)
    if (error) descriptors.push(errorId)
    return descriptors.length > 0 ? descriptors.join(' ') : undefined
  }

  // Props comuns para ambos os tipos de input
  const commonInputProps = {
    id: inputId,
    'aria-invalid': !!error,
    'aria-required': required,
    'aria-describedby': getAriaDescribedBy(),
    value: value,
    onChange: handleChange,
    onBlur: handleBlur,
    disabled: disabled,
    placeholder: placeholder,
    className: cn(
      'h-12 text-base',
      error && 'border-red-500 focus-visible:ring-red-500/20',
      className,
    ),
    ...props,
  }

  return (
    <div className="space-y-2">
      {/* Label com indicador visual de obrigatório */}
      <label htmlFor={inputId} className="block text-base font-semibold text-gray-900">
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-label="campo obrigatório">
            *
          </span>
        )}
      </label>

      {/* Descrição adicional se fornecida */}
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}

      {/* Input com ou sem máscara */}
      {mask ? <MaskedInput mask={mask} {...commonInputProps} /> : <Input {...commonInputProps} />}

      {/* Mensagem de erro */}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center space-x-1 text-sm text-red-500"
        >
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Texto de ajuda invisível para leitores de tela */}
      <span className="sr-only">
        {required && 'Campo obrigatório. '}
        {disabled && 'Campo desabilitado. '}
        {mask && `Formato esperado: ${mask}. `}
      </span>
    </div>
  )
}
