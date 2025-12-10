'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader } from 'lucide-react'

interface SaveNotificationConfirmDialogProps {
  isOpen: boolean
  onConfirm: () => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function SaveNotificationConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
}: SaveNotificationConfirmDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleConfirm = async () => {
    setIsProcessing(true)
    try {
      await onConfirm()
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Configuração de Notificações</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja agendar o disparo das notificações com as configurações
            selecionadas? As notificações serão enviadas conforme a frequência escolhida.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3">
          <AlertDialogCancel disabled={isProcessing || isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isProcessing || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing || isLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Salvando...
              </div>
            ) : (
              'Confirmar e Salvar'
            )}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
