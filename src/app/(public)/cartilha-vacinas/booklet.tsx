'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Syringe } from 'lucide-react'
import { ageGroups } from '@/data/vaccine-booklet'
import { cn } from '@/lib/utils'

export default function VaccineBookletScreen() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [expandedPeriods, setExpandedPeriods] = useState<Set<string>>(
    new Set([ageGroups[0].periods[0]?.period || '']),
  )
  const [touchStart, setTouchStart] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const currentGroup = ageGroups[currentGroupIndex]

  const handlePrevious = () => {
    setCurrentGroupIndex((prev) => (prev === 0 ? ageGroups.length - 1 : prev - 1))
    setExpandedPeriods(new Set())
  }

  const handleNext = () => {
    setCurrentGroupIndex((prev) => (prev === ageGroups.length - 1 ? 0 : prev + 1))
    setExpandedPeriods(new Set())
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    handleSwipe(touchStart, touchEnd)
  }

  const handleSwipe = (start: number, end: number) => {
    if (!start || !end) return
    const distance = start - end
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrevious()
    }
  }

  const togglePeriod = (period: string) => {
    const newExpanded = new Set(expandedPeriods)
    if (newExpanded.has(period)) {
      newExpanded.delete(period)
    } else {
      newExpanded.add(period)
    }
    setExpandedPeriods(newExpanded)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const onTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientX
      if (!touchStart || !touchEnd) return
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > 50
      const isRightSwipe = distance < -50

      if (isLeftSwipe) {
        handleNext()
      } else if (isRightSwipe) {
        handlePrevious()
      }
    }

    carousel.addEventListener('touchstart', onTouchStart)
    carousel.addEventListener('touchend', onTouchEnd)

    return () => {
      carousel.removeEventListener('touchstart', onTouchStart)
      carousel.removeEventListener('touchend', onTouchEnd)
    }
  }, [touchStart])

  return (
    <div aria-label="Cartilha de Vacinas">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 md:text-base">
            Passe para o lado para ver todas as idades disponíveis.
          </p>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-2 md:gap-4">
        <button
          onClick={handlePrevious}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-10 md:w-10"
          aria-label="Faixa etária anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-900 md:h-6 md:w-6" />
        </button>

        <div
          ref={carouselRef}
          className="relative flex-1 overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="rounded-2xl bg-white p-4 shadow-md md:p-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className={cn(
                  'flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full md:h-24 md:w-24',
                  currentGroup.color,
                )}
              >
                <Image
                  src={currentGroup.icon}
                  alt={currentGroup.title}
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-gray-900 md:text-xl">{currentGroup.title}</h2>
                <p className="text-base font-semibold text-gray-900 md:text-lg">
                  {currentGroup.subtitle}
                </p>
                <p className="text-xs text-gray-600 md:text-sm">
                  Verifique as vacinas recomendadas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:h-10 md:w-10"
          aria-label="Próxima faixa etária"
        >
          <ChevronRight className="h-5 w-5 text-gray-900 md:h-6 md:w-6" />
        </button>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {ageGroups.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentGroupIndex(index)
              setExpandedPeriods(new Set())
            }}
            className={cn(
              'h-2 rounded-full transition-all',
              index === currentGroupIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400',
            )}
            aria-label={`Ir para faixa etária ${index + 1}`}
          />
        ))}
      </div>

      <div className="space-y-4">
        {currentGroup.periods.map((period) => (
          <div key={period.period} className="overflow-hidden rounded-lg border border-gray-200">
            <button
              onClick={() => togglePeriod(period.period)}
              className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 md:px-6 md:py-4"
            >
              <h3 className="text-sm font-semibold text-gray-900 md:text-base">{period.period}</h3>
              <ChevronRight
                className={cn(
                  'h-4 w-4 flex-shrink-0 text-gray-600 transition-transform md:h-5 md:w-5',
                  expandedPeriods.has(period.period) && 'rotate-90',
                )}
              />
            </button>

            {expandedPeriods.has(period.period) && (
              <div className="divide-y divide-gray-200 bg-white">
                {period.vaccines.map((vaccine) => (
                  <div key={vaccine.id} className="px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 md:h-8 md:w-8">
                        <Syringe className="h-3.5 w-3.5 text-blue-600 md:h-4 md:w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 md:text-base">
                          {vaccine.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-gray-600 md:mt-1 md:text-sm">
                          {vaccine.description}
                        </p>
                        <p className="mt-1 text-xs font-medium text-gray-700 md:text-sm">
                          {vaccine.dose}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 md:p-6">
        <h2 className="mb-2 text-sm font-semibold text-blue-900 md:text-base">Importante</h2>
        <p className="text-xs text-blue-800 md:text-sm">
          Este calendário segue as recomendações da Secretaria de Saúde do Estado do Rio de Janeiro.
          Consulte um profissional de saúde para orientação personalizada e sobre possíveis
          contraindicações.
        </p>
      </div>
    </div>
  )
}
