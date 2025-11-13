'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { UbsCardProps, BvUbsList, BvTitleHeader } from '@/components/index'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { useHealthUnits } from '@/hooks/use-health-units'
import { useLocationContext } from '@/contexts/LocationContext'
import { sortByDistance } from '@/utils/geolocation'
import { HealthUnit } from '@/types/health-units'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'

type UbsListData = Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>

export default function UbsScreen() {
  const [ubsList, setUbsList] = useState<UbsListData[]>([])
  const { data, isLoading, error } = useHealthUnits()
  const { userCoords } = useLocationContext()
  const [filters, setFilters] = useState({
    name: '',
    neighborhood: '',
    open24h: false,
    filterByProximity: false,
  })

  useEffect(() => {
    if (data) {
      let transformedData: UbsListData[] = data.map((unit: HealthUnit, index: number) => ({
        id: index,
        slug: unit._id,
        component: 'public' as const,
        name: unit.name,
        neighborhood: unit.neighborhood,
        distanceInKm: 0,
        isFavorite: unit.isFavorite || false,
      }))

      // Se temos coordenadas do usuário, calcular distância
      if (userCoords && userCoords.latitude && userCoords.longitude) {
        const unitsWithGeo = data.map((unit: HealthUnit) => ({
          ...unit,
          latitude: unit.geolocation?.lat || 0,
          longitude: unit.geolocation?.lng || 0,
        }))

        const sortedData = sortByDistance(unitsWithGeo, userCoords, {
          lat: 'latitude',
          lng: 'longitude',
        })

        transformedData = sortedData.map((unit, index) => ({
          id: index,
          slug: unit._id,
          component: 'public' as const,
          name: unit.name,
          neighborhood: unit.neighborhood,
          distanceInKm: unit.distance || 0,
          isFavorite: unit.isFavorite || false,
        }))
      }

      setUbsList(transformedData)
    }
  }, [data, userCoords]) // const handleFavoriteToggle = (id: number) => {
  //   const ubs = ubsList.find((u) => u.id === id)
  //   if (!ubs) return

  //   const isCurrentlyFavorite = ubs.isFavorite
  //   const ubsName = ubs.name

  //   setUbsList((currentList) =>
  //     currentList.map((u) => (u.id === id ? { ...u, isFavorite: !u.isFavorite } : u)),
  //   )

  //   toast.success(
  //     !isCurrentlyFavorite
  //       ? `"${ubsName}" adicionada aos favoritos!`
  //       : `"${ubsName}" removida dos favoritos.`,
  //   )
  // }

  const handleShare = async (name: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`https://https://baixadavacinada.com/usb/${id}`)
      toast.info(`Compartilhando "${name}"...`)
    } catch (err) {
      console.error('Falha ao copiar o texto: ', err)
    }
  }

  const handleProximityFilterChange = (checked: boolean | 'indeterminate') => {
    setFilters((prev) => ({ ...prev, filterByProximity: checked === true }))
  }

  const filteredUbsList = useMemo(() => {
    let list = ubsList

    list = list.filter((ubs) => {
      const nameMatch = ubs.name.toLowerCase().includes(filters.name.toLowerCase())
      const neighborhoodMatch = ubs.neighborhood
        .toLowerCase()
        .includes(filters.neighborhood.toLowerCase())

      return nameMatch && neighborhoodMatch
    })

    // Filtrar por proximidade se ativado
    if (filters.filterByProximity && userCoords) {
      list = list.filter((ubs) => ubs.distanceInKm > 0 && ubs.distanceInKm <= 50) // 50km de raio
    }

    return list
  }, [ubsList, filters, userCoords])

  if (isLoading) {
    return (
      <SkeletonLoader count={5} variant="card" ariaLabel="Carregando unidades básicas de saúde" />
    )
  }

  if (error) {
    return (
      <div>Erro ao carregar dados: {error instanceof Error ? error.message : String(error)}</div>
    )
  }

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
            <div className="flex flex-col gap-2">
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
              {userCoords && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="proximity-filter"
                    checked={filters.filterByProximity}
                    onCheckedChange={handleProximityFilterChange}
                  />
                  <Label htmlFor="proximity-filter" className="text-sm">
                    Mostrar próximas (50km)
                  </Label>
                </div>
              )}
            </div>
          </div>
        </CollapsibleFilter>
      </div>

      <BvUbsList ubsList={filteredUbsList} path="/ubs" onShareRequest={handleShare} />
    </div>
  )
}
