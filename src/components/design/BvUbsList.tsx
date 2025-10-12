'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BvUbsCard, UbsCardProps } from '@/components/index'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface UbsListProps {
  initialData: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle'>[]
}

export function BvUbsList({ initialData }: UbsListProps) {
  useAccessibilityValidation({ enabled: true })
  const [ubsList, setUbsList] = useState(initialData)
  const router = useRouter()

  const handleMoreInfo = (id: number) => {
    router.push(`/ubs/${id}`)
  }

  const handleShare = (name: string) => {
    alert(`Compartilhando: ${name}`)
  }

  const handleFavoriteToggle = (id: number) => {
    setUbsList((currentList) =>
      currentList.map((ubs) => (ubs.id === id ? { ...ubs, isFavorite: !ubs.isFavorite } : ubs)),
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ubsList.map((ubs) => (
        <BvUbsCard
          key={ubs.id}
          name={ubs.name}
          neighborhood={ubs.neighborhood}
          distanceInKm={ubs.distanceInKm}
          isFavorite={ubs.isFavorite}
          onMoreInfo={() => handleMoreInfo(ubs.id || 0)}
          onShare={() => handleShare(ubs.name)}
          onFavoriteToggle={() => handleFavoriteToggle(ubs.id || 0)}
        />
      ))}
    </div>
  )
}
