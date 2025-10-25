'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { SelectedItemsList } from './SelectedItemsList'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'

interface SearchBarItem {
  value: string
  label: string
}

interface SearchBarProps {
  items: SearchBarItem[]
  placeholder?: string
  emptyMessage?: string
  onSelect?: (value: string) => void
  className?: string
  showCheckIcon?: boolean
  selectedItems?: string[]
  showSelectedItems?: boolean
  selectedItemsTitle?: string
  onRemoveSelectedItem?: (value: string) => void
  maxHeight?: string
}

export function SearchBar({
  items,
  placeholder = 'Pesquisar...',
  emptyMessage = 'Nenhum resultado encontrado.',
  onSelect,
  className,
  showCheckIcon = true,
  selectedItems = [],
  showSelectedItems = false,
  selectedItemsTitle = 'Itens selecionados',
  onRemoveSelectedItem,
  maxHeight = '240px',
}: SearchBarProps) {
  useAccessibilityValidation()

  const { announceToScreenReader } = useLiveRegion()

  const [searchValue, setSearchValue] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)

  const filteredItems = React.useMemo(() => {
    if (!searchValue) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.value.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [items, searchValue])

  const handleSelect = (currentValue: string) => {
    const selectedItem = items.find((item) => item.value === currentValue)
    setSearchValue('')
    setIsOpen(false)
    onSelect?.(currentValue)

    if (selectedItem) {
      announceToScreenReader(`${selectedItem.label} selecionado`)
    }
  }

  const handleInputChange = (value: string) => {
    setSearchValue(value)
    if (!isOpen && value.length > 0) {
      setIsOpen(true)
      const resultCount = filteredItems.length
      announceToScreenReader(
        `${resultCount} resultado${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''}`,
      )
    }
  }

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 150)
  }

  const isItemSelected = (itemValue: string) => {
    return selectedItems.includes(itemValue)
  }

  const handleRemoveItem = (value: string) => {
    const removedItem = items.find((item) => item.value === value)
    onRemoveSelectedItem?.(value)

    if (removedItem) {
      announceToScreenReader(`${removedItem.label} removido`)
    }
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="relative">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            value={searchValue}
            onValueChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            aria-label={placeholder}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            role="combobox"
          />
          {isOpen && (
            <CommandList
              className="absolute top-full z-50 w-full rounded-md border border-amber-50 bg-white shadow-md"
              style={{ maxHeight }}
              role="listbox"
              aria-label="Resultados da busca"
            >
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {filteredItems.length > 0 && (
                <CommandGroup>
                  {filteredItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => handleSelect(item.value)}
                      className={cn(
                        'cursor-pointer',
                        isItemSelected(item.value) && 'text-primary gap-0.5 bg-purple-50',
                      )}
                      role="option"
                      aria-selected={isItemSelected(item.value)}
                    >
                      {item.label}
                      {showCheckIcon && isItemSelected(item.value) && (
                        <Check className="text-primary ml-auto h-4 w-4" aria-hidden="true" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          )}
        </Command>
      </div>

      {showSelectedItems && (
        <SelectedItemsList
          selectedItems={selectedItems}
          allItems={items}
          onRemoveItem={handleRemoveItem}
          title={selectedItemsTitle}
        />
      )}
    </div>
  )
}
