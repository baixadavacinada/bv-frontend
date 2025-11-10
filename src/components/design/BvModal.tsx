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
  hideCloseButton?: boolean
}

export const BvModal = forwardRef<HTMLDivElement, BvModalProps>(
  ({ children, open, onClose, title, description, className, hideCloseButton }, ref) => {
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
            hideCloseButton={hideCloseButton}
            onInteractOutside={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            className={className}
          >
            {/* Header título e descrição - renderizar apenas se title ou description forem passados */}
            {(title || description) && (
              <DialogHeader>
                {title && <DialogTitle className="text-lg font-bold">{title}</DialogTitle>}

                {description && (
                  <DialogDescription className="text-md text-gray-700">
                    {description}
                  </DialogDescription>
                )}
              </DialogHeader>
            )}
            {/* Conteúdo principal */}
            <div>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  },
)

BvModal.displayName = 'BvModal'
