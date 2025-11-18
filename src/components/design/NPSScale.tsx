'use client'

import { forwardRef } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface NPSScaleProps {
  value?: number | null
  onChange: (value: number) => void
  disabled?: boolean
  label?: string
}

const NPS_OPTIONS = Array.from({ length: 11 }, (_, i) => i)

const getNPSColor = (value: number): string => {
  if (value <= 6) return 'bg-red-100 text-red-700 ring-red-500'
  if (value <= 8) return 'bg-yellow-100 text-yellow-700 ring-yellow-500'
  return 'bg-green-100 text-green-700 ring-green-500'
}

const getNPSLabel = (value: number): string => {
  if (value === 0) return 'Nunca recomendaria'
  if (value <= 3) return 'Muito ruim - Não recomendo'
  if (value <= 5) return 'Ruim - Precisa melhorar'
  if (value === 6) return 'Regular - Pode melhorar'
  if (value <= 8) return 'Bom - Recomendo'
  if (value === 9) return 'Muito bom - Recomendo!'
  return 'Excelente - Recomendo muito!'
}

export const NPSScale = forwardRef<HTMLDivElement, NPSScaleProps>(
  ({ value, onChange, disabled = false, label }, ref) => {
    useAccessibilityValidation({ enabled: true })

    return (
      <div ref={ref} className="w-full">
        {label && <p className="mb-4 text-sm font-medium text-gray-700">{label}</p>}

        {/* NPS Scale Grid */}
        <div className="grid grid-cols-11 gap-1 md:gap-2">
          {NPS_OPTIONS.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => !disabled && onChange(num)}
              disabled={disabled}
              className={`rounded-lg px-1 py-2 text-sm font-bold transition-all duration-200 md:px-2 md:py-3 ${
                value === num
                  ? `${getNPSColor(num)} scale-110 ring-2`
                  : `${getNPSColor(num)} scale-100 ring-1 ring-gray-300 hover:scale-105`
              } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              aria-label={`Nota ${num}`}
              aria-pressed={value === num}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Score Display */}
        {value !== null && value !== undefined && value > 0 && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{value}</div>
            </div>
            <div className={`text-sm font-semibold ${getNPSColor(value).split(' ')[1]}`}>
              {getNPSLabel(value)}
            </div>
          </div>
        )}
      </div>
    )
  },
)

NPSScale.displayName = 'NPSScale'
