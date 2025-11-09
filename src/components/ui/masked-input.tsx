import React from 'react'
import { Input } from './input'
import { IMaskInput } from 'react-imask'
import { cn } from '@/lib/utils'

/**
 * Componente de Input com máscara que herda os estilos do shadcn
 */

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  {
    mask: string
    value?: string
    onAccept?: (value: string) => void
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    className?: string
  } & Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value' | 'className'>
>(({ mask, value, onAccept, onChange, onBlur, className, ...props }, forwardedRef) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle(forwardedRef, () => inputRef.current!)

  const handleAccept = (value: string) => {
    if (onAccept) {
      onAccept(value)
    }

    if (onChange && inputRef.current) {
      const syntheticEvent = {
        target: {
          ...inputRef.current,
          value: value,
          name: inputRef.current.name || '',
        },
        currentTarget: inputRef.current,
        type: 'change',
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 2,
        isTrusted: true,
        preventDefault: () => {},
        stopPropagation: () => {},
        nativeEvent: {} as Event,
        persist: () => {},
        timeStamp: Date.now(),
      } as React.ChangeEvent<HTMLInputElement>

      onChange(syntheticEvent)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event)
    }
  }

  return (
    <IMaskInput
      mask={mask}
      value={value || ''}
      onAccept={handleAccept}
      onBlur={handleBlur}
      inputRef={inputRef}
      unmask={false}
      lazy={false}
      {...props}
      className={cn(
        'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-sm border bg-white px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    />
  )
})

MaskedInput.displayName = 'MaskedInput'

export { MaskedInput }
