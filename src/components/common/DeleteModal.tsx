import { BvButton } from '../design/BvButton'
import { BvModal } from '../design/BvModal'

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
}) {
  return (
    <BvModal open={isOpen} onClose={onClose} title="Confirmar exclusão" className="h-auto">
      <div className="space-y-6 p-4">
        <p className="p-4 text-base font-normal">
          Tem certeza que deseja excluir {itemName}? Esta ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-4">
          <BvButton variant="outline" title="Cancelar" onClick={onClose} />
          <BvButton
            title="Excluir"
            variant="destructive"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          />
        </div>
      </div>
    </BvModal>
  )
}
