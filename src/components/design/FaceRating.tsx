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
        <div className="flex justify-start gap-1 sm:gap-2 md:gap-8">
          {FACES.map((face) => (
            <button
              key={face.value}
              type="button"
              onClick={() => !disabled && onChange(face.value)}
              disabled={disabled}
              className={`flex h-12 w-12 flex-col items-center justify-center rounded-lg text-lg transition-all duration-200 sm:h-14 sm:w-14 sm:text-xl md:h-16 md:w-16 md:text-2xl ${
                value === face.value
                  ? 'scale-105 bg-blue-100 ring-2 ring-blue-500'
                  : 'scale-100 bg-gray-100 hover:bg-gray-200'
              } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              aria-label={face.label}
              aria-pressed={value === face.value}
            >
              <span>{face.emoji}</span>
            </button>
          ))}
        </div>
      </div>
    )
  },
)

FaceRating.displayName = 'FaceRating'
