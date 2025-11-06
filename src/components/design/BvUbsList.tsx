'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BvUbsCard, UbsCardProps } from '@/components/index'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { toast } from 'sonner'

interface UbsListProps {
  ubsList: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>[]
  path: string
  component: 'private' | 'public'
  onDeleteRequest: (id: number) => void
  onFavoriteToggleRequest: (id: number) => void
  onShareRequest: (name: string) => void
}

export function BvUbsList({
  ubsList,
  path,
  component,
  onShareRequest,
  onFavoriteToggleRequest,
  onDeleteRequest,
}: UbsListProps) {
  useAccessibilityValidation({ enabled: true })
  const router = useRouter()

  const handleMoreInfo = (slug: number, path: string) => {
    router.push(`${path}/${slug}`)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ubsList.map((ubs) => (
        <BvUbsCard
          key={ubs.id}
          name={ubs.name}
          component={component}
          slug={ubs.slug}
          neighborhood={ubs.neighborhood}
          distanceInKm={ubs.distanceInKm}
          isFavorite={ubs.isFavorite}
          onMoreInfo={() => handleMoreInfo(ubs.id || 0, path)}
          onShare={() => onShareRequest(ubs.name)}
          onFavoriteToggle={() => onFavoriteToggleRequest(ubs.id || 0)}
          handleEditUbs={() => router.push(`gestao-ubs/form-ubs/${ubs.slug}`)}
          onDelete={onDeleteRequest ? () => onDeleteRequest(ubs.id || 0) : undefined}
        />
      ))}
    </div>
  )
}
