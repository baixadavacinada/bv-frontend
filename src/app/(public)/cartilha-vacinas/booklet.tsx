'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Syringe } from 'lucide-react'
import { BvTitleHeader } from '@/components'
import { ageGroups } from '@/data/vaccine-booklet'
import { cn } from '@/lib/utils'

export default function VaccineBookletScreen() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [expandedPeriods, setExpandedPeriods] = useState<Set<string>>(
    new Set([ageGroups[0].periods[0]?.period || '']),
  )

  const currentGroup = ageGroups[currentGroupIndex]

  const handlePrevious = () => {
    setCurrentGroupIndex((prev) => (prev === 0 ? ageGroups.length - 1 : prev - 1))
    setExpandedPeriods(new Set())
  }

  const handleNext = () => {
    setCurrentGroupIndex((prev) => (prev === ageGroups.length - 1 ? 0 : prev + 1))
    setExpandedPeriods(new Set())
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

  return (
    <div aria-label="Cartilha de Vacinas">
      <div className="mb-8">
        <BvTitleHeader title="Cartilha de Vacinas" className="mb-2" />
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Passe para o lado para ver todas as idades disponíveis.
          </p>{' '}
        </div>
      </div>

      {/* Carrossel de faixas etárias */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg md:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        <div className="relative flex-1">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              {/* Avatar com SVG */}
              <div
                className={cn(
                  'flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full',
                  currentGroup.color,
                )}
              >
                <Image
                  src={currentGroup.icon}
                  alt={currentGroup.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{currentGroup.title}</h2>
                <p className="text-lg font-semibold text-gray-900">{currentGroup.subtitle}</p>
                <p className="text-sm text-gray-600">
                  Verifique as vacinas recomendadas para cada faixa de idade.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg md:flex"
          aria-label="Próximo"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Indicadores de progresso */}
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

      {/* Lista de períodos e vacinas */}
      <div className="space-y-4">
        {currentGroup.periods.map((period) => (
          <div key={period.period} className="overflow-hidden rounded-lg border border-gray-200">
            {/* Header do período */}
            <button
              onClick={() => togglePeriod(period.period)}
              className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 text-left transition-colors hover:bg-gray-100"
            >
              <h3 className="font-semibold text-gray-900">{period.period}</h3>
              <ChevronRight
                className={cn(
                  'h-5 w-5 text-gray-600 transition-transform',
                  expandedPeriods.has(period.period) && 'rotate-90',
                )}
              />
            </button>

            {/* Vacinas */}
            {expandedPeriods.has(period.period) && (
              <div className="divide-y divide-gray-200 bg-white">
                {period.vaccines.map((vaccine) => (
                  <div key={vaccine.id} className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Syringe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{vaccine.name}</h4>
                        <p className="mt-1 text-sm text-gray-600">{vaccine.description}</p>
                        <p className="mt-2 text-sm font-medium text-gray-700">{vaccine.dose}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Informação importante */}
      <div className="mt-12 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
        <h3 className="mb-2 font-semibold text-blue-900">ℹ️ Importante</h3>
        <p className="text-sm text-blue-800">
          Este calendário segue as recomendações da Secretaria de Saúde do Estado do Rio de Janeiro.
          Consulte um profissional de saúde para orientação personalizada e sobre possíveis
          contraindicações.
        </p>
      </div>
    </div>
  )
}
