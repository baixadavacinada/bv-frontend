'use client'

import { useRouter } from 'next/navigation'
import { BvUbsCard, UbsCardProps } from '@/components/index'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { toast } from 'sonner'

interface UbsListProps {
  data: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>[]
  onDeleteRequest: (id: number) => void
  onFavoriteToggleRequest: (id: number) => void
}

export function BvUbsList({ data, onDeleteRequest, onFavoriteToggleRequest }: UbsListProps) {
  useAccessibilityValidation({ enabled: true })
  const router = useRouter()

  const handleMoreInfo = (id: number) => {
    router.push(`/ubs/${id}`)
  }

  const handleShare = (name: string) => {
    toast.info(`Compartilhando "${name}"...`)

  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((ubs) => (
        <BvUbsCard
          key={ubs.id}
          id={ubs.id}
          name={ubs.name}
          slug={ubs.slug}
          neighborhood={ubs.neighborhood}
          distanceInKm={ubs.distanceInKm}
          isFavorite={ubs.isFavorite}
          onMoreInfo={() => handleMoreInfo(ubs.id || 0)}
          onShare={() => handleShare(ubs.name)}
          onFavoriteToggle={() => onFavoriteToggleRequest(ubs.id || 0)}
          onDelete={() => onDeleteRequest(ubs.id || 0)}
        />
      ))}
    </div>
  )
}
