'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export interface DeleteConfirmationState {
  isOpen: boolean
  itemName: string
  itemId: string | null
  itemType: 'ubs' | 'vaccine' | 'user' | 'material' | 'custom'
}

interface UseDeleteConfirmationOptions {
  /**
   * Função que será executada após confirmação da exclusão
   */
  onConfirm: (id: string, itemType: string, itemName: string) => Promise<void>
  /**
   * Mensagem de erro customizada
   */
  errorMessage?: string
  /**
   * Mensagem de sucesso customizada
   */
  successMessage?: string
}

/**
 * Hook para gerenciar confirmação de exclusão com UX melhorada
 *
 * @example
 * ```tsx
 * const { isOpen, openDeleteDialog, closeDeleteDialog, handleDelete } = useDeleteConfirmation({
 *   onConfirm: async (id) => {
 *     await deleteHealthUnits(id)
 *   },
 * })
 *
 * return (
 *   <>
 *     <Button onClick={() => openDeleteDialog('ubs', '123', 'UBS Centro')}>
 *       Deletar
 *     </Button>
 *     <DeleteConfirmationDialog
 *       isOpen={isOpen}
 *       itemName={itemName}
 *       onConfirm={() => handleDelete(itemType, itemId, itemName)}
 *       onCancel={closeDeleteDialog}
 *     />
 *   </>
 * )
 * ```
 */
export function useDeleteConfirmation({
  onConfirm,
  errorMessage = 'Erro ao deletar item',
  successMessage = 'Item deletado com sucesso',
}: UseDeleteConfirmationOptions) {
  const [state, setState] = useState<DeleteConfirmationState>({
    isOpen: false,
    itemName: '',
    itemId: null,
    itemType: 'custom',
  })

  const [isDeleting, setIsDeleting] = useState(false)

  /**
   * Abre o diálogo de confirmação
   */
  const openDeleteDialog = useCallback(
    (itemType: DeleteConfirmationState['itemType'], itemId: string, itemName: string) => {
      setState({
        isOpen: true,
        itemName,
        itemId,
        itemType,
      })
    },
    [],
  )

  /**
   * Fecha o diálogo de confirmação
   */
  const closeDeleteDialog = useCallback(() => {
    setState({
      isOpen: false,
      itemName: '',
      itemId: null,
      itemType: 'custom',
    })
  }, [])

  /**
   * Executa a exclusão após confirmação
   */
  const handleDelete = useCallback(
    async (
      itemType: DeleteConfirmationState['itemType'],
      itemId: string | null,
      itemName: string,
    ) => {
      if (!itemId) {
        toast.error('ID do item não foi fornecido')
        return
      }

      try {
        setIsDeleting(true)
        await onConfirm(itemId, itemType, itemName)
        toast.success(successMessage)
        closeDeleteDialog()
      } catch (error) {
        console.error('Delete error:', error)
        toast.error(error instanceof Error ? error.message : errorMessage)
      } finally {
        setIsDeleting(false)
      }
    },
    [onConfirm, successMessage, errorMessage, closeDeleteDialog],
  )

  return {
    ...state,
    isDeleting,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  }
}
