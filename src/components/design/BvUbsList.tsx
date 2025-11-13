'use client'
import { useRouter } from 'next/navigation'
import { BvUbsCard, UbsCardProps } from '@/components/index'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface UbsListProps {
  ubsList: Omit<UbsCardProps, 'onMoreInfo' | 'onDelete'>[]
  path: string
  onDeleteRequest?: (id: number) => void
  onFavoriteToggleRequest?: (id: number) => void
  onShareRequest?: (name: string) => void
}

export function BvUbsList({
  ubsList,
  path,
  onDeleteRequest,
  onFavoriteToggleRequest,
  onShareRequest,
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
          slug={ubs.slug}
          component={ubs.component}
          neighborhood={ubs.neighborhood}
          distanceInKm={ubs.distanceInKm}
          isFavorite={ubs.isFavorite}
          onMoreInfo={() => handleMoreInfo(ubs.slug || '', path)}
          onDelete={() => onDeleteRequest?.(ubs.id || 0)}
          onEdit={() => router.push(`gestao-ubs/form-ubs/[slug]/${ubs.slug}`)}
          onFavoriteToggle={() => onFavoriteToggleRequest?.(ubs.id || 0)}
          onShare={() => onShareRequest?.(ubs.name)}
        />
      ))}
    </div>
  )
}
