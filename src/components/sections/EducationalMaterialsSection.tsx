'use client'

import React, { useId, useEffect } from 'react'
import { BvCardSecondary } from '@/components/design/BvCardSecondary'
import { EducationalMaterial } from '@/types/cards'
import { useAppTranslations } from '@/hooks/use-translations'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { handleSmartDownload } from '@/utils/deviceDetection'

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
  const sectionId = useId()

  useAccessibilityValidation()

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
        materials.length === 0
          ? educationalMaterials('emptyState')
          : educationalMaterials('materialsLoaded', { count: materials.length })

      announceToScreenReader(message)
    } catch (error) {
      console.warn('Translation error:', error)

      announceToScreenReader(
        materials.length === 0
          ? 'Nenhum material disponível'
          : `${materials.length} materiais carregados`,
      )
    }
  }, [loading, materials.length, announceToScreenReader, educationalMaterials])

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
        title={material.title}
        description={material.description}
        image={material.image}
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
    if (materials.length === 0) return renderEmptyState()
    return materials.map(renderMaterialCard)
  }

  const sectionTitle = educationalMaterials('title')

  if (loading) {
    return (
      <section aria-labelledby="materials-heading" role="region">
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
      <h2 id={sectionId} className="mb-4 text-2xl font-bold dark:text-gray-100">
        {sectionTitle}
      </h2>

      {materials.length === 0 ? (
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
