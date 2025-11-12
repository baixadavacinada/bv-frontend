'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AlertTriangle } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  itemName: string
  itemType?: 'ubs' | 'vaccine' | 'user' | 'material' | 'custom'
  isDeleting?: boolean
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  description?: string
  actionLabel?: string
}

export function DeleteConfirmationDialog({
  isOpen,
  itemName,
  itemType = 'custom',
  isDeleting = false,
  onConfirm,
  onCancel,
  description,
  actionLabel = 'Deletar',
}: DeleteConfirmationDialogProps) {
  useAccessibilityValidation({ enabled: true })
  const getTypeLabel = () => {
    const labels = {
      ubs: 'Unidade Básica de Saúde',
      vaccine: 'Vacina',
      user: 'Usuário',
      material: 'Material Educativo',
      custom: 'Item',
    }
    return labels[itemType]
  }

  const defaultDescription =
    description ||
    `Tem certeza que deseja deletar ${getTypeLabel().toLowerCase()} "${itemName}"? Esta ação não pode ser desfeita.`

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="mt-4">{defaultDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isDeleting}
            aria-label={`Cancelar exclusão de ${itemName}`}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
            aria-label={`Confirmar exclusão de ${itemName}`}
          >
            {isDeleting ? 'Deletando...' : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
