'use client'

import { forwardRef } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface FaceRatingProps {
  value?: number
  onChange: (value: number) => void
  disabled?: boolean
  label?: string
}

const FACES = [
  { value: 1, emoji: '😞', label: 'Muito insatisfeito' },
  { value: 2, emoji: '😕', label: 'Insatisfeito' },
  { value: 3, emoji: '😐', label: 'Neutro' },
  { value: 4, emoji: '🙂', label: 'Satisfeito' },
  { value: 5, emoji: '😄', label: 'Muito satisfeito' },
]

export const FaceRating = forwardRef<HTMLDivElement, FaceRatingProps>(
  ({ value = 0, onChange, disabled = false, label }, ref) => {
    useAccessibilityValidation({ enabled: true })

    return (
      <div ref={ref} className="w-full">
        {label && <p className="mb-3 text-sm font-medium text-gray-700">{label}</p>}
        <div className="flex justify-around gap-3">
          {FACES.map((face) => (
            <button
              key={face.value}
              type="button"
              onClick={() => !disabled && onChange(face.value)}
              disabled={disabled}
              className={`flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg transition-all duration-200 ${
                value === face.value
                  ? 'scale-105 bg-blue-100 ring-2 ring-blue-500'
                  : 'scale-100 bg-gray-100 hover:bg-gray-200'
              } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              aria-label={face.label}
              aria-pressed={value === face.value}
            >
              <span className="text-2xl">{face.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    )
  },
)

FaceRating.displayName = 'FaceRating'
