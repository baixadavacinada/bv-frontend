import React from 'react'
import { X } from 'lucide-react'
import { BvButton } from '../design/BvButton'
import { cn } from '@/lib/utils'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, useSectionAccessibilityIds } from '@/utils/accessibility'

interface SelectedItem {
  value: string
  label: string
}

interface SelectedItemsListProps {
  selectedItems: string[]
  allItems: SelectedItem[]
  onRemoveItem: (value: string) => void
  title?: string
  className?: string
  showCount?: boolean
  countText?: string
}

export function SelectedItemsList({
  selectedItems,
  allItems,
  onRemoveItem,
  title = 'Itens selecionados',
  className,
  showCount = true,
}: SelectedItemsListProps) {
  const { isValidating } = useAccessibilityValidation()
  const { announceSuccess } = useLiveRegion()
  const { headingId } = useSectionAccessibilityIds('selected-items-list')

  const getItemLabel = (value: string) => {
    return allItems.find((item) => item.value === value)?.label || value
  }

  const handleRemoveItem = (value: string) => {
    const itemLabel = getItemLabel(value)
    onRemoveItem(value)
    announceSuccess(`${itemLabel} removido da lista`)
  }

  if (selectedItems.length === 0) return null

  return (
    <div className={cn('space-y-2', className)} role="region" aria-labelledby={headingId}>
      <AccessibilityLoadingIndicator
        isValidating={isValidating}
        validatingMessage="Validando acessibilidade da lista de itens selecionados"
      />

      {title && (
        <h3 id={headingId} className="block text-sm font-medium text-gray-700">
          {title} {showCount && `(${selectedItems.length})`}
        </h3>
      )}

      <ul
        className="flex flex-wrap gap-2 p-3"
        role="list"
        aria-label={`Lista com ${selectedItems.length} ${selectedItems.length === 1 ? 'item selecionado' : 'itens selecionados'}`}
      >
        {selectedItems.map((itemValue) => {
          const itemLabel = getItemLabel(itemValue)
          return (
            <li
              key={itemValue}
              className="text-primary inline-flex items-center rounded-md bg-purple-50 px-3 py-1 text-sm font-medium"
              role="listitem"
            >
              <span aria-label={`Item selecionado: ${itemLabel}`}>{itemLabel}</span>
              <BvButton
                type="button"
                onClick={() => handleRemoveItem(itemValue)}
                className="text-primary hover:text-primary ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 hover:bg-purple-200"
                variant="ghost"
                size="icon"
                leftIcon={<X className="size-3" />}
                aria-label={`Remover ${itemLabel} da lista`}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
