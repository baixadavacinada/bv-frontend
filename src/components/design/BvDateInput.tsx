'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface BvDateInputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
  name?: string
  id?: string
}

export const BvDateInput = React.forwardRef<HTMLInputElement, BvDateInputProps>(
  (
    {
      label,
      placeholder = 'dd/mm/aaaa',
      value = '',
      onChange,
      onBlur,
      error,
      disabled = false,
      required = false,
      className,
      name,
      id,
    },
    ref,
  ) => {
    useAccessibilityValidation({ enabled: true })
    const [isFocused, setIsFocused] = useState(false)

    const formatDateInput = (inputValue: string) => {
      // Remove tudo que não é número
      const numbers = inputValue.replace(/\D/g, '')

      // Limita a 8 dígitos (ddmmaaaa)
      if (numbers.length === 0) return ''
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDateInput(e.target.value)
      onChange?.(formatted)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permite backspace e delete
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab') {
        return
      }

      // Bloqueia tudo que não é número
      if (!/\d/.test(e.key)) {
        e.preventDefault()
      }
    }

    const isEmpty = !value || value === ''

    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <Label className={cn('text-sm font-medium text-gray-700', disabled && 'text-gray-400')}>
            {label}
            {required && (
              <span className="aria-label='campo obrigatório' ml-1 text-red-500">*</span>
            )}
          </Label>
        )}

        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'block w-full rounded-lg border bg-white px-3 py-2 text-base shadow-sm',
            'transition-all duration-200',
            'focus:ring-1 focus:outline-none',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : isFocused
                ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500'
                : 'border-gray-300',
            disabled && 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50',
            isEmpty && required && !isFocused && !error && 'border-yellow-300 bg-yellow-50',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {error && (
          <div
            id={`${id}-error`}
            role="alert"
            aria-live="polite"
            className="flex items-center space-x-1 text-sm text-red-500"
          >
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {isEmpty && required && !error && !isFocused && (
          <div className="flex items-center space-x-1 text-xs text-yellow-600">
            <span aria-hidden="true">⚡</span>
            <span>Campo obrigatório</span>
          </div>
        )}
      </div>
    )
  },
)

BvDateInput.displayName = 'BvDateInput'
