'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { X } from 'lucide-react'

interface VariableBlock {
  id: string
  type: 'variable'
  name: string
  displayName: string
}

interface TextBlock {
  id: string
  type: 'text'
  content: string
}

type Block = VariableBlock | TextBlock

interface VariableBlockInputProps {
  value: string
  onChange: (value: string) => void
  onAddVariable: (variableName: string) => void
  placeholder?: string
  label?: string
  availableVariables?: Array<{ name: string; displayName: string }>
}

/**
 * Converte string com variáveis em blocos
 */
function parseValueToBlocks(value: string): Block[] {
  const blocks: Block[] = []
  let currentText = ''
  const variableRegex = /\{\{(\w+)\}\}/g
  let lastIndex = 0
  let match

  while ((match = variableRegex.exec(value)) !== null) {
    // Adicionar texto antes da variável
    if (match.index > lastIndex) {
      currentText = value.substring(lastIndex, match.index)
      if (currentText) {
        blocks.push({
          id: `text-${blocks.length}`,
          type: 'text',
          content: currentText,
        })
      }
    }

    // Adicionar bloco de variável
    blocks.push({
      id: `var-${blocks.length}`,
      type: 'variable',
      name: match[1],
      displayName: match[1],
    })

    lastIndex = variableRegex.lastIndex
  }

  // Adicionar texto restante
  if (lastIndex < value.length) {
    const remainingText = value.substring(lastIndex)
    blocks.push({
      id: `text-${blocks.length}`,
      type: 'text',
      content: remainingText,
    })
  }

  return blocks.length > 0 ? blocks : [{ id: '1', type: 'text', content: '' }]
}

/**
 * Converte blocos em string
 */
function blocksToString(blocks: Block[]): string {
  return blocks
    .map((block) => (block.type === 'text' ? block.content : `{{${block.name}}}`))
    .join('')
}

export function VariableBlockInput({
  value,
  onChange,
  onAddVariable,
  placeholder = 'Digite aqui...',
  label,
  availableVariables = [],
}: VariableBlockInputProps) {
  useAccessibilityValidation({ enabled: true })
  const [blocks, setBlocks] = useState<Block[]>(() => parseValueToBlocks(value))
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)
  const isInitialMount = useRef(true)
  const isUserEditing = useRef(false)
  const lastSyncedValue = useRef(value)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      lastSyncedValue.current = value
      return
    }

    // Se o usuário está editando, não sincroniza
    if (isUserEditing.current) {
      return
    }

    // Só sincroniza se o valor externo realmente mudou
    if (value !== lastSyncedValue.current) {
      lastSyncedValue.current = value
      setBlocks(parseValueToBlocks(value))
      setInputValue('')
    }
  }, [value])

  // Notifica mudanças quando o USUÁRIO edita (não na sincronização)
  useEffect(() => {
    if (isInitialMount.current || !isUserEditing.current) return

    const newValue = blocksToString(blocks)
    if (newValue !== lastSyncedValue.current) {
      lastSyncedValue.current = newValue
      onChange(newValue)
    }
  }, [blocks, onChange])

  const addVariable = useCallback(
    (variableName: string, displayName: string) => {
      isUserEditing.current = true
      setBlocks((prevBlocks) => {
        const newBlocks = [...prevBlocks]

        // Se o último bloco é texto vazio, substituir. Caso contrário, adicionar novo
        if (newBlocks.length > 0 && newBlocks[newBlocks.length - 1].type === 'text') {
          const lastBlock = newBlocks[newBlocks.length - 1] as TextBlock
          if (lastBlock.content.trim() === '') {
            newBlocks.pop()
          }
        }

        // Adicionar variável
        newBlocks.push({
          id: `var-${Date.now()}`,
          type: 'variable',
          name: variableName,
          displayName,
        })

        // Adicionar bloco de texto vazio para próxima entrada
        newBlocks.push({
          id: `text-${Date.now()}`,
          type: 'text',
          content: '',
        })

        return newBlocks
      })
      setInputValue('')
      onAddVariable(variableName)
    },
    [onAddVariable],
  )

  const removeBlock = useCallback((blockId: string) => {
    isUserEditing.current = true
    setBlocks((prevBlocks) => prevBlocks.filter((b) => b.id !== blockId))
  }, [])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    isUserEditing.current = true
    const newValue = e.target.value
    setInputValue(newValue)

    // Atualizar último bloco de texto
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks]
      if (updatedBlocks.length > 0 && updatedBlocks[updatedBlocks.length - 1].type === 'text') {
        const lastBlock = updatedBlocks[updatedBlocks.length - 1] as TextBlock
        lastBlock.content = newValue
      }
      return updatedBlocks
    })
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && inputValue === '' && blocks.length > 1) {
        // Se o input está vazio e há múltiplos blocos, remove o último bloco
        e.preventDefault()
        isUserEditing.current = true
        setBlocks((prevBlocks) => {
          const newBlocks = prevBlocks.slice(0, -1)

          // Se o bloco anterior é texto, foca nele
          if (newBlocks.length > 0 && newBlocks[newBlocks.length - 1].type === 'text') {
            const lastTextBlock = newBlocks[newBlocks.length - 1] as TextBlock
            setInputValue(lastTextBlock.content)
          }

          return newBlocks
        })
      }
    },
    [blocks.length, inputValue],
  )

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      {/* Container de blocos */}
      <div
        ref={inputRef}
        className="flex min-h-10 flex-nowrap gap-2 overflow-x-auto rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
      >
        {blocks.map((block, index) => (
          <div key={block.id}>
            {block.type === 'variable' ? (
              <div className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900">
                <code>{block.displayName}</code>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  type="button"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : index === blocks.length - 1 ? (
              // Último bloco de texto é editável
              <input
                ref={textInputRef}
                type="text"
                value={inputValue}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder={blocks.length === 1 ? placeholder : ''}
                className="border-0 bg-transparent outline-none"
              />
            ) : (
              // Blocos de texto anteriores são não-editáveis
              <span className="text-gray-700">{block.content}</span>
            )}
          </div>
        ))}

        {blocks.length === 1 && blocks[0].type === 'text' && (
          <input
            ref={textInputRef}
            type="text"
            value={inputValue}
            onChange={handleTextChange}
            placeholder={placeholder}
            className="border-0 bg-transparent outline-none"
          />
        )}
      </div>

      {/* Variáveis disponíveis */}
      {availableVariables.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Variáveis disponíveis:</p>
          <div className="flex flex-wrap gap-2">
            {availableVariables.map((variable) => (
              <button
                key={variable.name}
                onClick={() => addVariable(variable.name, variable.displayName)}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                + {variable.displayName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
