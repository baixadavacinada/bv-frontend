'use client'

import React, { useState } from 'react'
import { BvTitleHeader, RoleGuard } from '@/components'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { UbsCardProps, BvUbsList } from '@/components/index'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@radix-ui/react-checkbox'
import { mockUbsData } from '@/mock/ubs'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

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
import { useRouter } from 'next/navigation'

type UbsListData = Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>

const initialUbsListData: UbsListData[] = mockUbsData.map((ubs) => ({
  id: ubs.id,
  slug: ubs.id,
  name: ubs.name,
  component: 'private',
  neighborhood: ubs.neighborhood,
  distanceInKm: Math.floor(Math.random() * 20) + 1,
  isFavorite: ubs.isFavorite || false,
}))

export default function UbsScreen() {
  const [ubsList, setUbsList] = useState(initialUbsListData)
  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  })

  const router = useRouter()

  const handleFavoriteToggle = (id: number) => {
    setUbsList((currentList) =>
      currentList.map((ubs) => (ubs.id === id ? { ...ubs, isFavorite: !ubs.isFavorite } : ubs)),
    )
    toast.success(
      !ubsList.find((ubs) => ubs.id === id)?.isFavorite
        ? `"${ubsList.find((ubs) => ubs.id === id)?.name}" adicionada aos favoritos!`
        : `"${ubsList.find((ubs) => ubs.id === id)?.name}" removida dos favoritos.`,
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

  return (
    <>
      <RoleGuard
        allowedRoles={['admin', 'agent']}
        requireAuth={true}
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-slate-600">
              Acesso negado. Você não tem permissão para acessar esta página.
            </p>
          </div>
        }
      >
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

          <RoleGuard allowedRoles={['admin']}>
            <div className="mb-8 flex justify-end">
              <Button className="w-full" onClick={() => router.push('gestao-ubs/form-ubs/novo')}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Nova UBS
              </Button>
            </div>
          </RoleGuard>

          <BvUbsList
            ubsList={ubsList}
            path="gestao-ubs"
            component="private"
            onDeleteRequest={handleDeleteRequest}
            onFavoriteToggleRequest={handleFavoriteToggle}
            onShareRequest={(name: string) => toast.info(`Compartilhando "${name}"...`)}
          />
        </div>
      </RoleGuard>

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
