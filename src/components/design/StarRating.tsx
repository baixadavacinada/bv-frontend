'use client'

import { forwardRef } from 'react'
import { Star } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface StarRatingProps {
  value?: number | null
  onChange: (value: number) => void
  disabled?: boolean
  label?: string
  maxStars?: number
}

export const StarRating = forwardRef<HTMLDivElement, StarRatingProps>(
  ({ value, onChange, disabled = false, label, maxStars = 5 }, ref) => {
    useAccessibilityValidation({ enabled: true })

    const stars = Array.from({ length: maxStars }, (_, i) => i + 1)

    return (
      <div ref={ref} className="w-full">
        {label && <p className="mb-4 text-sm font-medium text-gray-700">{label}</p>}

        {/* Stars Display */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {stars.map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => !disabled && onChange(star)}
                disabled={disabled}
                className={`rounded-lg p-1 transition-all duration-200 ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
                aria-pressed={value === star}
              >
                <Star
                  size={32}
                  fill={value && value >= star ? 'currentColor' : '#d1d5db'}
                  stroke={value && value >= star ? 'currentColor' : '#9ca3af'}
                  strokeWidth={2}
                  className={value && value >= star ? 'text-amber-400' : 'text-gray-400'}
                />
              </button>
            ))}
          </div>
          {value !== null && value !== undefined && (
            <span className="ml-4 text-sm font-medium text-gray-600">
              {value} de {maxStars}
            </span>
          )}
        </div>
      </div>
    )
  },
)

StarRating.displayName = 'StarRating'
