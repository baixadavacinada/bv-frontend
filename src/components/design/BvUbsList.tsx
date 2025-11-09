'use client'
import { useRouter } from 'next/navigation'
import { BvUbsCard, UbsCardProps } from '@/components/index'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface UbsListProps {
  ubsList: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle' | 'onDelete'>[]
  path: string
  onDeleteRequest?: (id: number) => void
  onFavoriteToggleRequest?: (id: number) => void
  onShareRequest?: (name: string) => void
}

export function BvUbsList({
  ubsList,
  path,
  onShareRequest,
  onFavoriteToggleRequest,
}: UbsListProps) {
  useAccessibilityValidation({ enabled: true })
  const router = useRouter()

  const handleMoreInfo = (slug: string, path: string) => {
    router.push(`${path}/${slug}`)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ubsList.map((ubs) => (
        <BvUbsCard
          key={ubs.id}
          name={ubs.name}
          component={ubs.component}
          neighborhood={ubs.neighborhood}
          distanceInKm={ubs.distanceInKm}
          isFavorite={ubs.isFavorite}
          onMoreInfo={() => handleMoreInfo(ubs.slug || '', path)}
          onShare={() => onShareRequest(ubs.name)}
          onFavoriteToggle={() => onFavoriteToggleRequest(ubs.id || 0)}
        />
      ))}
    </div>
  )
}
