import React, { forwardRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '../ui/dialog'

interface BvModalProps {
  children: React.ReactNode
  open: boolean
  onClose?: () => void
  title?: string
  description?: string
  className?: string
}

export const BvModal = forwardRef<HTMLDivElement, BvModalProps>(
  ({ children, open, onClose, title, description, className }, ref) => {
    return (
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && onClose) {
            onClose()
          }
        }}
      >
        <DialogPortal>
          <DialogOverlay className="bg-black/10" />

          <DialogContent
            ref={ref}
            onInteractOutside={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            className={className}
          >
            {/* Header título e descrição */}
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">{title}</DialogTitle>

              <DialogDescription className="text-md text-gray-700">{description}</DialogDescription>
            </DialogHeader>
            {/* Conteúdo principal */}
            <div>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  },
)

BvModal.displayName = 'BvModal'
