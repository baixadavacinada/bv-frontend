import React, { useState } from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { Edit } from 'lucide-react'
import { BvButton } from '../design/BvButton'
import { SearchBar } from './SearchBar'

interface TableHeader {
  left: string
  right: string
}

interface SearchConfig<T> {
  enabled: boolean
  placeholder?: string
  searchKeys: (keyof T)[]
  emptyMessage?: string
}

interface ItemField {
  key: string
  value: string
  showIcon?: boolean
}

interface ManagementTableProps<T> {
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  tableHeader?: TableHeader
  searchConfig?: SearchConfig<T>
  className?: string
  getItemFields?: (item: T) => ItemField[]
  isDeleteDisabled?: (item: T) => boolean
}

// Reusable ManagementTable Component
export function ManagementTable<T extends { id: string }>({
  data,
  onEdit,
  onDelete,
  tableHeader = { left: 'Item | Informações', right: 'Ações' },
  searchConfig,
  className = '',
  getItemFields,
  isDeleteDisabled,
}: ManagementTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const getFilteredData = () => {
    if (!searchConfig?.enabled) return data

    if (selectedItemId) {
      return data.filter((item) => item.id === selectedItemId)
    }

    if (!searchTerm.trim()) {
      return data
    }

    return data.filter((item) => {
      return searchConfig.searchKeys.some((key) => {
        const value = item[key]
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }

  const filteredData = getFilteredData()

  const searchBarItems = searchConfig?.enabled
    ? data.map((item) => ({
        value: item.id,
        label: searchConfig.searchKeys.map((key) => String(item[key])).join(' - '),
      }))
    : []

  const handleSearchSelect = (value: string) => {
    setSearchTerm('')
    setSelectedItemId(value)
  }

  // Função para renderizar o conteúdo padrão da coluna
  const renderStandardColumn = (item: T) => {
    if (getItemFields) {
      const fields = getItemFields(item)
      return (
        <div className="flex flex-col items-start gap-3">
          {fields.map((field, index) => (
            <div key={field.key} className={`${index === 0 ? 'mb-1' : ''} flex items-center gap-2`}>
              {field.showIcon && index === 0 && <Edit className="h-4 w-4" />}
              <span className="text-base font-medium">{field.value}</span>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <div>
      {searchConfig?.enabled && (
        <div className="mb-10">
          <SearchBar
            placeholder={searchConfig.placeholder || 'Buscar'}
            items={searchBarItems}
            onSelect={handleSearchSelect}
            emptyMessage={searchConfig.emptyMessage || 'Nenhum resultado encontrado'}
            showCheckIcon={false}
            showSelectedItems={false}
          />
        </div>
      )}

      {/* Table Header */}
      <div
        className={`mt-6 mb-3 flex items-center justify-between gap-4 rounded-md bg-[#D4D4D4] p-6 font-medium ${className}`}
      >
        <div className={`text-lg font-medium`}>{tableHeader.left}</div>
        <div className={`text-lg font-medium`}>{tableHeader.right}</div>
      </div>

      {/* Table Body */}
      <div className="space-y-3">
        {filteredData.length === 0 ? (
          <div className="rounded-sm bg-white p-6 text-center text-gray-500 shadow-sm">
            {searchConfig?.enabled && (searchTerm.trim() || selectedItemId)
              ? 'Nenhum resultado encontrado para a busca.'
              : 'Nenhum item para exibir.'}
          </div>
        ) : (
          filteredData.map((item) => {
            const deleteDisabled = isDeleteDisabled ? isDeleteDisabled(item) : false

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-sm bg-white p-6 shadow-sm"
              >
                {/* Content com estilização padrão */}
                <div className="flex-1">{renderStandardColumn(item)}</div>

                {/* Actions */}
                <div className={`flex items-center justify-end gap-2`}>
                  {onEdit && (
                    <BvButton
                      onClick={() => onEdit(item)}
                      leftIcon={<BsPencilSquare className="size-5" />}
                      aria-label="Editar"
                      variant="ghost"
                      size="icon"
                      className="inline-flex h-10 w-10 items-center justify-center"
                    />
                  )}
                  {onDelete && (
                    <BvButton
                      onClick={() => onDelete(item)}
                      aria-label={
                        deleteDisabled ? 'Não é possível excluir usuário inativo' : 'Deletar'
                      }
                      variant="ghost"
                      size="icon"
                      leftIcon={<BsTrash className="size-5" />}
                      className="inline-flex h-10 w-10 items-center justify-center"
                      disabled={deleteDisabled}
                    />
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Resumo dos resultados se busca estiver habilitada */}
      {searchConfig?.enabled && (searchTerm.trim() || selectedItemId) && (
        <div className="mt-4 text-sm text-gray-600">
          {filteredData.length} de {data.length} itens encontrados
        </div>
      )}

      {searchConfig?.enabled && (searchTerm.trim() || selectedItemId) && (
        <div className="mt-4">
          <BvButton
            onClick={() => {
              setSearchTerm('')
              setSelectedItemId(null)
            }}
            title="Limpar busca"
            variant="outline"
          />
        </div>
      )}
    </div>
  )
}
