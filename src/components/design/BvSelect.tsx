import React from 'react'
import { cn } from '@/lib/utils'
import { SelectedItemsList } from '../common/SelectedItemsList'
import { useLiveRegion } from '@/hooks/use-accessibility'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import { Label } from '../ui/label'

interface IBvSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface IBvSelectGroup {
  label: string
  options: IBvSelectOption[]
}

interface IBvSelect {
  id?: string
  children?: React.ReactNode
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  label?: string
  fullWidth?: boolean
  minWidth?: number | null
  maxWidth?: number
  title?: string
  subtitle?: string
  error?: string
  titleStyles?: React.CSSProperties
  containerStyles?: React.CSSProperties
  placeholder?: string
  disabled?: boolean
  className?: string
  options?: IBvSelectOption[]
  groups?: IBvSelectGroup[]
  multiple?: boolean
  maxSelectedItems?: number
  showSelectedBadges?: boolean
}

const BvSelect = ({
  children,
  value,
  onValueChange,
  label,
  fullWidth = false,
  minWidth,
  maxWidth,
  title,
  error,
  subtitle,
  titleStyles,
  containerStyles,
  placeholder,
  disabled = false,
  className,
  options = [],
  groups,
  multiple = false,
  maxSelectedItems,
  showSelectedBadges = true,
  id,
  ...props
}: IBvSelect) => {
  const { announceToScreenReader } = useLiveRegion()
  const [isOpen, setIsOpen] = React.useState(false)

  const normalizedValue = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : []
    }
    return Array.isArray(value) ? value[0] || '' : value || ''
  }, [value, multiple])

  const allOptions = React.useMemo(() => {
    return groups ? groups.flatMap((g) => g.options) : options
  }, [groups, options])

  const getOptionLabel = React.useCallback(
    (optionValue: string) => {
      return allOptions.find((opt) => opt.value === optionValue)?.label || optionValue
    },
    [allOptions],
  )

  const hasValue = multiple ? (normalizedValue as string[]).length > 0 : normalizedValue !== ''

  const isSelected = React.useCallback(
    (optionValue: string) => {
      return multiple
        ? (normalizedValue as string[]).includes(optionValue)
        : normalizedValue === optionValue
    },
    [multiple, normalizedValue],
  )

  // Toggle de seleção para modo múltiplo
  const toggleSelection = React.useCallback(
    (optionValue: string) => {
      const values = normalizedValue as string[]
      const selected = values.includes(optionValue)
      const optionLabel = getOptionLabel(optionValue)

      if (selected) {
        const newValues = values.filter((v) => v !== optionValue)
        onValueChange?.(newValues)
        announceToScreenReader(`${optionLabel} removido da seleção`)
      } else {
        if (!maxSelectedItems || values.length < maxSelectedItems) {
          const newValues = [...values, optionValue]
          onValueChange?.(newValues)
          announceToScreenReader(`${optionLabel} adicionado à seleção`)
        } else {
          announceToScreenReader(`Limite máximo de ${maxSelectedItems} itens atingido`)
        }
      }
    },
    [normalizedValue, onValueChange, getOptionLabel, maxSelectedItems, announceToScreenReader],
  )

  const removeItem = React.useCallback(
    (valueToRemove: string) => {
      const optionLabel = getOptionLabel(valueToRemove)
      if (multiple) {
        onValueChange?.((normalizedValue as string[]).filter((v) => v !== valueToRemove))
      } else {
        // Para single-select, limpar o valor
        onValueChange?.('')
      }
      announceToScreenReader(`${optionLabel} removido da seleção`)
    },
    [multiple, normalizedValue, onValueChange, getOptionLabel, announceToScreenReader],
  )

  const displayText = React.useMemo(() => {
    const defaultText = placeholder || label || 'Selecione'

    if (multiple) {
      return defaultText
    }

    return normalizedValue ? getOptionLabel(normalizedValue as string) : defaultText
  }, [multiple, normalizedValue, placeholder, label, getOptionLabel])

  const accessibleButtonText = React.useMemo(() => {
    const baseLabel = title || label || 'Campo de seleção'
    const valueText = hasValue
      ? multiple
        ? `${(normalizedValue as string[]).length} itens selecionados`
        : getOptionLabel(normalizedValue as string)
      : 'nenhum item selecionado'

    return `${baseLabel}, ${valueText}`
  }, [title, label, hasValue, multiple, normalizedValue, getOptionLabel])

  // Renderiza opção para múltipla seleção
  const renderMultipleOption = React.useCallback(
    (opt: IBvSelectOption) => {
      const isOptionSelected = isSelected(opt.value)
      const canSelect =
        !maxSelectedItems ||
        (normalizedValue as string[]).length < maxSelectedItems ||
        isOptionSelected

      return (
        <div
          key={opt.value}
          role="option"
          aria-selected={isOptionSelected}
          aria-disabled={!canSelect}
          tabIndex={canSelect ? 0 : -1}
          className={cn(
            'flex w-full items-center space-x-2 rounded px-2 py-1.5',
            canSelect
              ? 'cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              : 'cursor-not-allowed opacity-50',
            isOptionSelected && 'bg-purple-50',
          )}
          onClick={() => canSelect && toggleSelection(opt.value)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && canSelect) {
              e.preventDefault()
              toggleSelection(opt.value)
            }
          }}
        >
          <div
            className={cn(
              'flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-gray-300',
              isOptionSelected && 'border-purple-600 bg-purple-600',
            )}
            aria-hidden="true"
          >
            {isOptionSelected && (
              <svg className="size-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="flex-1">{opt.label}</span>
        </div>
      )
    },
    [isSelected, normalizedValue, maxSelectedItems, toggleSelection],
  )

  // Renderiza grupo para modo múltiplo
  const renderMultipleGroup = React.useCallback(
    (group: IBvSelectGroup, idx: number) => {
      return (
        <div key={idx} className="mb-2">
          {group.label && (
            <div className="px-3 py-1 text-base font-semibold text-gray-700">{group.label}</div>
          )}
          <div className="px-1">{group.options.map(renderMultipleOption)}</div>
        </div>
      )
    },
    [renderMultipleOption],
  )

  const titleId = id ? `${id}-label` : undefined
  const descId = id ? `${id}-desc` : undefined

  // Modo múltiplo: usa Popover customizado
  if (multiple) {
    return (
      <div
        className={cn('flex flex-col space-y-2', fullWidth && 'w-full')}
        style={{
          width: fullWidth ? '100%' : 'auto',
          minWidth: minWidth || undefined,
          maxWidth: maxWidth || undefined,
          ...containerStyles,
        }}
      >
        {title && (
          <Label
            id={titleId}
            htmlFor={id}
            className={cn('text-base font-medium text-gray-900', disabled && 'text-gray-400')}
            style={titleStyles}
          >
            {title}
          </Label>
        )}

        {subtitle && (
          <p id={descId} className="text-xs text-gray-600">
            {subtitle}
          </p>
        )}

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              id={id}
              disabled={disabled}
              aria-label={accessibleButtonText}
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={subtitle ? descId : undefined}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={cn(
                'border-input flex h-10 w-full items-center justify-between rounded-sm border bg-white px-3 py-2 text-base shadow-sm',
                'focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none',
                'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:opacity-50',
                !hasValue && 'text-muted-foreground',
                className,
              )}
            >
              <span className="truncate">{displayText}</span>
              <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="max-h-[300px] w-[var(--radix-popover-trigger-width)] overflow-hidden p-1"
            align="start"
            sideOffset={4}
            aria-label={`Lista de opções para ${title || label || 'seleção múltipla'}`}
          >
            <div
              role="listbox"
              aria-multiselectable="true"
              aria-label={`Opções de ${title || label || 'seleção'}`}
              className="max-h-[280px] overflow-x-hidden overflow-y-auto"
              tabIndex={-1}
            >
              {groups ? groups.map(renderMultipleGroup) : options.map(renderMultipleOption)}
            </div>
          </PopoverContent>
        </Popover>

        {showSelectedBadges && hasValue && (
          <SelectedItemsList
            selectedItems={normalizedValue as string[]}
            allItems={allOptions}
            onRemoveItem={removeItem}
            title="Itens selecionados"
          />
        )}

        {error && (
          <p className="text-xs font-normal text-red-500" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    )
  }

  // Modo único: usa Select do Radix UI
  return (
    <div
      className={cn('flex flex-col space-y-2', fullWidth && 'w-full')}
      style={{
        width: fullWidth ? '100%' : 'auto',
        minWidth: minWidth || undefined,
        maxWidth: maxWidth || undefined,
        ...containerStyles,
      }}
    >
      {title && (
        <Label
          id={titleId}
          htmlFor={id}
          className={cn('text-base font-medium text-gray-900', disabled && 'text-gray-400')}
          style={titleStyles}
        >
          {title}
        </Label>
      )}

      {subtitle && (
        <p id={descId} className="text-xs text-gray-600">
          {subtitle}
        </p>
      )}

      <Select
        value={normalizedValue as string}
        onValueChange={onValueChange}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger
          id={id}
          className={cn(fullWidth && 'w-full', className)}
          aria-label={accessibleButtonText}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={subtitle ? descId : undefined}
        >
          <SelectValue placeholder={placeholder || 'Selecione uma opção'}>
            <span className="text-base">{displayText}</span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="max-h-[240px] overflow-y-auto">
          {children || (
            <>
              {groups
                ? groups.map((group, idx) => (
                    <SelectGroup key={idx}>
                      {group.label && (
                        <SelectLabel className="px-3 py-1 text-base font-semibold text-gray-700">
                          {group.label}
                        </SelectLabel>
                      )}
                      {group.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))
                : options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                    </SelectItem>
                  ))}
            </>
          )}
        </SelectContent>
      </Select>

      {showSelectedBadges && hasValue && (
        <SelectedItemsList
          selectedItems={[normalizedValue as string]}
          allItems={allOptions}
          onRemoveItem={removeItem}
        />
      )}

      {error && (
        <p className="text-xs font-normal text-red-500" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}

export default BvSelect
