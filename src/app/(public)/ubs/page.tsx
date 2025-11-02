'use client'
import React, { useState, useMemo } from 'react'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { UbsCardProps, BvUbsList, BvTitleHeader } from '@/components/index'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { mockUbsData } from '@/mock/ubs'
import { toast } from 'sonner'

type UbsListData = Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>

const initialUbsListData: UbsListData[] = mockUbsData.map((ubs) => ({
  id: ubs.id,
  slug: ubs.id,
  component: 'public',
  name: ubs.name,
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

  const [filters, setFilters] = useState({
    name: '',
    neighborhood: '',
    open24h: false,
  })

  const handleFavoriteToggle = (id: number) => {
    const ubs = ubsList.find((u) => u.id === id)
    if (!ubs) return

    const isCurrentlyFavorite = ubs.isFavorite
    const ubsName = ubs.name

    setUbsList((currentList) =>
      currentList.map((u) => (u.id === id ? { ...u, isFavorite: !u.isFavorite } : u)),
    )

    toast.success(
      !ubsList.find((u) => u.id === id)?.isFavorite
        ? `"${ubsName}" adicionada aos favoritos!`
        : `"${ubsName}" removida dos favoritos.`,
    )
  }

  const handleShare = (name: string) => {
    toast.info(`Compartilhando "${name}"...`)
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

  const filteredUbsList = useMemo(() => {
    return ubsList.filter((ubs) => {
      const nameMatch = ubs.name.toLowerCase().includes(filters.name.toLowerCase())
      const neighborhoodMatch = ubs.neighborhood
        .toLowerCase()
        .includes(filters.neighborhood.toLowerCase())

      // NOTA: O filtro "Aberto 24h" não pode ser aplicado
      // pois seus dados em `mockUbsData` não têm essa informação.
      // Se tivesse, a lógica seria:
      // const open24hMatch = !filters.open24h || ubs.isOpen24h;
      // return nameMatch && neighborhoodMatch && open24hMatch;

      return nameMatch && neighborhoodMatch
    })
  }, [ubsList, filters])

  return (
    <div>
      <BvTitleHeader title={'Unidades Básicas de Saúde'} className="mb-6" />
      <div className="mb-8">
        <CollapsibleFilter>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ubs-name">Nome da UBS</Label>
              <Input
                id="ubs-name"
                placeholder="Ex: UBS Vila Suissa"
                value={filters.name}
                onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                placeholder="Ex: Centro"
                value={filters.neighborhood}
                onChange={(e) => setFilters((prev) => ({ ...prev, neighborhood: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="open-24h"
                  checked={filters.open24h}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, open24h: !!checked }))
                  }
                />
                <Label htmlFor="open-24h">Aberto 24h</Label>
              </div>
            </div>
          </div>
        </CollapsibleFilter>
      </div>

      <BvUbsList
        ubsList={filteredUbsList}
        onFavoriteToggleRequest={handleFavoriteToggle}
        onDeleteRequest={handleDeleteRequest}
        onShareRequest={handleShare}
        path="/ubs"
        component="public"
      />
    </div>
  )
}
