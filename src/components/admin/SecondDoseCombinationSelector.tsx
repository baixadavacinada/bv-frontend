'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Pill } from 'lucide-react'
import {
  extractSecondDoseVaccines,
  groupCombinationsByVaccine,
} from '@/services/second-dose-helper'
import { Badge } from '@/components/ui/badge'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface SecondDoseCombinationSelectorProps {
  selectedCombinations: string[]
  onSelectCombination: (combinationId: string) => void
  onRemoveCombination: (combinationId: string) => void
}

export function SecondDoseCombinationSelector({
  selectedCombinations,
  onSelectCombination,
  onRemoveCombination,
}: SecondDoseCombinationSelectorProps) {
  const [expandedVaccines, setExpandedVaccines] = useState<Set<string>>(new Set())
  const combinations = useMemo(() => extractSecondDoseVaccines(), [])
  const grouped = useMemo(() => groupCombinationsByVaccine(combinations), [combinations])

  const toggleVaccineExpanded = (vaccineName: string) => {
    const newExpanded = new Set(expandedVaccines)
    if (newExpanded.has(vaccineName)) {
      newExpanded.delete(vaccineName)
    } else {
      newExpanded.add(vaccineName)
    }
    setExpandedVaccines(newExpanded)
  }

  const handleToggleCombination = (comboId: string) => {
    if (selectedCombinations.includes(comboId)) {
      onRemoveCombination(comboId)
    } else {
      onSelectCombination(comboId)
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-green-200 bg-green-50 p-4">
      <div className="flex items-start gap-2">
        <Pill className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-900">💉 Combinações de Segunda Dose</h4>
          <p className="mt-1 text-sm text-green-700">
            Selecione as combinações de vacina + período para disparar lembretes de segunda dose
          </p>
        </div>
      </div>

      {/* Vacinas selecionadas */}
      {selectedCombinations.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-green-200 pt-3">
          <p className="text-xs font-medium text-green-800">Selecionadas:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCombinations.map((comboId) => {
              const combo = combinations.find((c) => c.id === comboId)
              return combo ? (
                <Badge
                  key={comboId}
                  variant="secondary"
                  className="bg-green-200 text-green-800 hover:bg-green-300"
                >
                  {combo.vaccineName} ({combo.period})
                  <button
                    onClick={() => onRemoveCombination(comboId)}
                    className="ml-2 font-bold hover:text-red-600"
                  >
                    ×
                  </button>
                </Badge>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Lista de vacinas */}
      <div className="space-y-2 border-t border-green-200 pt-3">
        <p className="text-xs font-medium text-green-800">Disponíveis:</p>
        <div className="max-h-96 space-y-1 overflow-y-auto">
          {Object.entries(grouped).map(([vaccineName, combos]) => (
            <div key={vaccineName} className="space-y-1">
              <button
                onClick={() => toggleVaccineExpanded(vaccineName)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-green-100"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedVaccines.has(vaccineName) ? 'rotate-0' : '-rotate-90'
                  }`}
                />
                <span className="flex-1 font-medium text-green-900">{vaccineName}</span>
                <span className="text-xs text-green-600">{combos.length} período(s)</span>
              </button>

              {/* Períodos da vacina */}
              {expandedVaccines.has(vaccineName) && (
                <div className="space-y-1 border-l-2 border-green-300 pl-6">
                  {combos.map((combo) => {
                    const isSelected = selectedCombinations.includes(combo.id)
                    return (
                      <button
                        key={combo.id}
                        onClick={() => handleToggleCombination(combo.id)}
                        className={`w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-green-600 font-medium text-white'
                            : 'bg-white text-green-900 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="h-4 w-4"
                          />
                          <span>{combo.period}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {combinations.length === 0 && (
        <div className="rounded-md bg-yellow-50 p-3 text-center text-sm text-yellow-800">
          Nenhuma vacina com segunda dose encontrada na cartilha
        </div>
      )}
    </div>
  )
}
