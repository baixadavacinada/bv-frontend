'use client'

import { useState } from 'react'
import { BvUbsCard, UbsCardProps } from '@/components/index'
import { ShareModal } from './ShareModal'

interface UbsListProps {
  initialData: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle'>[]
}

export function BvUbsList({ initialData }: UbsListProps) {
  const [ubsList, setUbsList] = useState(initialData)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const pageTitle = 'Confira esta Unidade Básica de Saúde'

  const handleMoreInfo = (name: string) => {
    alert(`Carregando mais informações para: ${name}`)
  }

  const handleShare = (name: string) => {
    setIsShareModalOpen(true)
  }

  const handleFavoriteToggle = (id: number) => {
    setUbsList((currentList) =>
      currentList.map((ubs) => (ubs.id === id ? { ...ubs, isFavorite: !ubs.isFavorite } : ubs)),
    )
  }

  return (
    <>
      <ShareModal
        url={pageUrl}
        title={pageTitle}
        isOpen={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ubsList.map((ubs) => (
          <BvUbsCard
            key={ubs.id}
            name={ubs.name}
            neighborhood={ubs.neighborhood}
            distanceInKm={ubs.distanceInKm}
            isFavorite={ubs.isFavorite}
            onMoreInfo={() => handleMoreInfo(ubs.name)}
            onShare={() => handleShare(ubs.name)}
            onFavoriteToggle={() => handleFavoriteToggle(ubs.id || 0)}
          />
        ))}
      </div>
    </>
  )
}
