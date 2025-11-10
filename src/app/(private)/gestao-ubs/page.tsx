'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { BvTitleHeader, RoleGuard } from '@/components'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { BvUbsList } from '@/components/index'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox' // Verifique se este é o caminho correto
import { Button } from '@/components/ui/button'
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

import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useHealthUnits } from '@/hooks/use-health-units' // Ajuste o caminho se necessário
import { HealthUnit } from '@/types/health-units'
import { deleteHealthUnits } from '@/services/actions/ubs-actions'

type UbsListData = {
  id: number
  slug: string | undefined
  name: string
  component: 'private' | 'public'
  neighborhood: string
  distanceInKm: number
  isFavorite: boolean
  isOpen24h?: boolean
}

export default function UbsScreen() {
  const { data, isLoading, error } = useHealthUnits()
  const [ubsList, setUbsList] = useState<UbsListData[]>([])
  const [filters, setFilters] = useState({
    name: '',
    neighborhood: '',
    open24h: false,
  })

  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  })

  const router = useRouter()

  useEffect(() => {
    if (data) {
      const transformedData: UbsListData[] = data.map((unit: HealthUnit, index: number) => ({
        id: index,
        slug: unit._id || '',
        component: 'private',
        name: unit.name,
        neighborhood: unit.neighborhood,
        distanceInKm: Math.floor(Math.random() * 20) + 1,
        isFavorite: unit.isFavorite || false,
      }))

      setUbsList(transformedData)
    }
  }, [data])
  const handleFavoriteToggle = (id: number) => {
    const ubs = ubsList.find((u) => u.id === id)
    if (!ubs) return

    const isCurrentlyFavorite = ubs.isFavorite
    const ubsName = ubs.name

    setUbsList((currentList) =>
      currentList.map((u) => (u.id === id ? { ...u, isFavorite: !u.isFavorite } : u)),
    )

    toast.success(
      !isCurrentlyFavorite
        ? `"${ubsName}" adicionada aos favoritos!`
        : `"${ubsName}" removida dos favoritos.`,
    )
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }
  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setFilters((prev) => ({ ...prev, open24h: checked === true }))
  }
  const filteredUbsList = useMemo(() => {
    let list = ubsList

    if (filters.name) {
      list = list.filter((ubs) => ubs.name.toLowerCase().includes(filters.name.toLowerCase()))
    }

    if (filters.neighborhood) {
      list = list.filter((ubs) =>
        ubs.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase()),
      )
    }

    if (filters.open24h) {
      list = list.filter((ubs) => ubs.isOpen24h === true)
    }

    return list
  }, [ubsList, filters])

  const handleDeleteRequest = (id: number) => {
    setDeleteAlert({ isOpen: true, id: id })
  }

  const handleConfirmDelete = async () => {
    if (deleteAlert.id === null) return

    const ubsToDelete = ubsList.find((u) => u.id === deleteAlert.id)
    if (!ubsToDelete) {
      toast.error('UBS não encontrada.')
      setDeleteAlert({ isOpen: false, id: null })
      return
    }

    try {
      await deleteHealthUnits(ubsToDelete.slug || '')
      setUbsList((currentList) => currentList.filter((u) => u.id !== deleteAlert.id))
      toast.success(`UBS "${ubsToDelete.name}" deletada com sucesso.`)
    } catch (error) {
      toast.error(`Falha ao deletar a UBS "${ubsToDelete.name}". Tente novamente mais tarde.`)
    } finally {
      setDeleteAlert({ isOpen: false, id: null })
    }
  }

  const handleShareToClipboard = async (name: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`https://baixadavacinada.com/usb/${id}`)
      toast.info(`Compartilhando "${name}"...`)
    } catch (err) {
      console.error('Falha ao copiar o texto: ', err)
    }
  }

  const handleShare = (name: string) => {
    const u = ubsList.find((u) => u.name === name || u.slug === name)
    if (!u) {
      toast.error(`Não foi possível compartilhar "${name}". UBS não encontrada.`)
      return
    }
    void handleShareToClipboard(name, u.slug || '')
  }

  if (isLoading) {
    return (
      <>
        <BvTitleHeader title="Unidades Básicas de Saúde" className="mb-8" />
        <p>Carregando unidades...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <BvTitleHeader title="Unidades Básicas de Saúde" className="mb-8" />
        <p className="text-red-600">Erro ao carregar os dados. Tente novamente mais tarde.</p>
      </>
    )
  }

  return (
    <>
      <BvTitleHeader title="Unidades Básicas de Saúde" className="mb-8" />
      <div className="mb-8">
        <CollapsibleFilter>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ubs-name">Nome da UBS</Label>
              <Input
                id="ubs-name"
                name="name"
                placeholder="Ex: UBS Vila Suissa"
                value={filters.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                name="neighborhood"
                placeholder="Ex: Centro"
                value={filters.neighborhood}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="open-24h"
                  checked={filters.open24h}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="open-24h">Aberto 24h</Label>
              </div>
            </div>
          </div>
        </CollapsibleFilter>
      </div>
      <div className="mb-8 flex justify-end">
        <Button className="w-full" onClick={() => router.push('gestao-ubs/form-ubs/novo')}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Nova UBS
        </Button>
      </div>

      <BvUbsList
        ubsList={filteredUbsList}
        path="gestao-ubs"
        onDeleteRequest={handleDeleteRequest}
        onFavoriteToggleRequest={handleFavoriteToggle}
        onShareRequest={handleShare}
      />

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
