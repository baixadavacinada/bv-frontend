'use client'

import React, { useState } from 'react'
import { BvTitleHeader } from '@/components'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { UbsCardProps, BvUbsList } from '@/components/index'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@radix-ui/react-checkbox'
import { mockUbsData } from '@/mock/ubs'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
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

type UbsListData = Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>

const initialUbsListData: UbsListData[] = mockUbsData.map((ubs) => ({
  id: ubs.id,
  slug: ubs.id,
  name: ubs.name,
  neighborhood: ubs.neighborhood,
  distanceInKm: Math.floor(Math.random() * 20) + 1,
  isFavorite: ubs.isFavorite || false,
}))

export default function UbsScreen() {
  const [ubsList, setUbsList] = useState(initialUbsListData)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newUbsName, setNewUbsName] = useState('')
  const [newUbsNeighborhood, setNewUbsNeighborhood] = useState('')
  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  })

  const handleFavoriteToggle = (id: number) => {
    setUbsList((currentList) =>
      currentList.map((ubs) => (ubs.id === id ? { ...ubs, isFavorite: !ubs.isFavorite } : ubs)),
    )
  }

  const handleDeleteRequest = (id: number) => {
    setDeleteAlert({ isOpen: true, id: id })
  }

  const handleConfirmDelete = () => {
    if (deleteAlert.id === null) return
    const ubsToRemove = ubsList.find((ubs) => ubs.id === deleteAlert.id)
    setUbsList((currentList) => currentList.filter((ubs) => ubs.id !== deleteAlert.id))
    toast.error(`UBS "${ubsToRemove?.name}" foi removida.`)
    setDeleteAlert({ isOpen: false, id: null })
  }

  const handleCreateSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!newUbsName || !newUbsNeighborhood) {
      toast.warning('Preencha o nome e o bairro da UBS.')
      return
    }
    const newId = Math.max(...ubsList.map((ubs) => ubs?.id), 0) + 1
    const newUbs: UbsListData = {
      id: newId,
      slug: newId,
      name: newUbsName,
      neighborhood: newUbsNeighborhood,
      distanceInKm: 0,
      isFavorite: false,
    }
    setUbsList((currentList) => [newUbs, ...currentList])
    toast.success(`UBS "${newUbsName}" foi criada com sucesso!`)
    setNewUbsName('')
    setNewUbsNeighborhood('')
    setIsCreateModalOpen(false)
  }
  return (
    <>
      <div>
        <BvTitleHeader title="Unidades Básicas de Saúde" className="mb-8" />
        <div className="mb-8">
          <CollapsibleFilter>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ubs-name">Nome da UBS</Label>
                <Input id="ubs-name" placeholder="Ex: UBS Vila Suissa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" placeholder="Ex: Centro" />
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox id="open-24h" />
                  <Label htmlFor="open-24h">Aberto 24h</Label>
                </div>
              </div>
            </div>
          </CollapsibleFilter>
        </div>

        <div className="mb-8 flex justify-end">
          <Button className="w-full" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Nova UBS
          </Button>
        </div>

        <BvUbsList
          data={ubsList}
          onDeleteRequest={handleDeleteRequest}
          onFavoriteToggleRequest={handleFavoriteToggle}
        />
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova UBS</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newUbsName}
                  onChange={(e) => setNewUbsName(e.target.value)}
                  className="col-span-3"
                  placeholder="Ex: UBS Jardim Esperança"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="neighborhood" className="text-right">
                  Bairro
                </Label>
                <Input
                  id="neighborhood"
                  value={newUbsNeighborhood}
                  onChange={(e) => setNewUbsNeighborhood(e.target.value)}
                  className="col-span-3"
                  placeholder="Ex: Vila Oliveira"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar UBS</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteAlert.isOpen}
        onOpenChange={(isOpen) => setDeleteAlert({ ...deleteAlert, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso removerá permanentemente a UBS &quot;
              {ubsList.find((ubs) => ubs.id === deleteAlert.id)?.name}&quot; da lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAlert({ isOpen: false, id: null })}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
