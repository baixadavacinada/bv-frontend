'use client'

import React, { useId, useEffect, useMemo } from 'react'
import { BvCardSecondary } from '@/components/design/BvCardSecondary'
import { EducationalMaterial } from '@/types/cards'
import { useAppTranslations } from '@/hooks/use-translations'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { handleSmartDownload } from '@/utils/deviceDetection'
import { useFavoriteMaterials } from '@/contexts/FavoriteMaterialsContext'

interface EducationalMaterialsSectionProps {
  materials: EducationalMaterial[]
  loading?: boolean
}

export const EducationalMaterialsSection: React.FC<EducationalMaterialsSectionProps> = ({
  materials,
  loading = false,
}) => {
  const { educationalMaterials, accessibility } = useAppTranslations()
  const { announceToScreenReader } = useLiveRegion()
  const { favoriteMaterials } = useFavoriteMaterials()
  const sectionId = useId()

  useAccessibilityValidation()

  // Ordenar materiais com favoritos primeiro
  const sortedMaterials = useMemo(() => {
    return [...materials].sort((a, b) => {
      const aIsFavorite = favoriteMaterials.has(a.id)
      const bIsFavorite = favoriteMaterials.has(b.id)

      // Se ambos são favoritos ou ambos não são, manter ordem original
      if (aIsFavorite === bIsFavorite) return 0

      // Colocar favoritos primeiro
      return aIsFavorite ? -1 : 1
    })
  }, [materials, favoriteMaterials])

  const handleMaterialInteraction = (material: EducationalMaterial) => {
    announceToScreenReader(
      accessibility('educationalMaterials.materialOpened', { title: material.title }),
    )

    if (material.downloadUrl) {
      handleSmartDownload(material.downloadUrl, `${material.title}.pdf`)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, material: EducationalMaterial) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleMaterialInteraction(material)
    }
  }

  useEffect(() => {
    if (loading) return

    try {
      const message =
        sortedMaterials.length === 0
          ? educationalMaterials('emptyState')
          : educationalMaterials('materialsLoaded', { count: sortedMaterials.length })

      announceToScreenReader(message)
    } catch (error) {
      console.warn('Translation error:', error)

      announceToScreenReader(
        sortedMaterials.length === 0
          ? 'Nenhum material disponível'
          : `${sortedMaterials.length} materiais carregados`,
      )
    }
  }, [loading, sortedMaterials.length, announceToScreenReader, educationalMaterials])

  const renderSkeletonLoader = () =>
    Array.from({ length: 3 }, (_, index) => (
      <div key={index} role="listitem">
        <BvCardSecondary
          title=""
          description=""
          image=""
          onClick={() => {}}
          loading={true}
          aria-hidden="true"
        />
      </div>
    ))

  const renderMaterialCard = (material: EducationalMaterial) => (
    <div key={material.id} role="listitem">
      <BvCardSecondary
        id={material.id}
        title={material.title}
        description={material.description}
        image={material.image}
        link={material.downloadUrl}
        onClick={() => handleMaterialInteraction(material)}
        onKeyDown={(event) => handleKeyDown(event, material)}
        aria-label={educationalMaterials('openMaterial', { title: material.title })}
        tabIndex={0}
      />
    </div>
  )

  const renderEmptyState = () => (
    <div
      className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400"
      role="status"
      aria-live="polite"
    >
      {educationalMaterials('emptyState')}
    </div>
  )

  const renderContent = () => {
    if (loading) return renderSkeletonLoader()
    if (sortedMaterials.length === 0) return renderEmptyState()
    return sortedMaterials.map(renderMaterialCard)
  }

  const sectionTitle = educationalMaterials('title')

  if (loading) {
    return (
      <section aria-labelledby="materials-heading" role="region" className="mb-8">
        <h2 id="materials-heading" className="mb-4 text-2xl font-bold">
          {sectionTitle}
        </h2>
        <div aria-live="polite" className="sr-only">
          {educationalMaterials('loadingMaterials')}
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex gap-4 pb-4" role="list" aria-label="Carregando materiais educativos">
            {renderContent()}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-8" aria-labelledby={sectionId} role="region">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={sectionId} className="text-2xl font-bold dark:text-gray-100">
          {sectionTitle}
        </h2>
      </div>

      {sortedMaterials.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="relative">
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 overflow-x-auto">
            <div
              className="flex w-max min-w-full gap-4 pb-4"
              role="list"
              aria-label={sectionTitle}
              aria-busy={loading}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
