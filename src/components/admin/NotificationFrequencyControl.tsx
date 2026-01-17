'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Info } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

export type NotificationFrequency = 'instant' | 'daily' | 'weekly' | 'never'

interface FrequencyOption {
  value: NotificationFrequency
  label: string
  description: string
}

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    value: 'instant',
    label: '⚡ Instantaneamente',
    description: 'Você recebe a notificação assim que o evento ocorre, sem esperar',
  },
  {
    value: 'daily',
    label: '📅 Uma vez por dia',
    description:
      'Todas as notificações do dia são agrupadas e enviadas uma única vez às 9:00 da manhã',
  },
  {
    value: 'weekly',
    label: '📆 Uma vez por semana',
    description:
      'Todas as notificações da semana são agrupadas e enviadas uma única vez às 9:00 da manhã de segunda-feira',
  },
  {
    value: 'never',
    label: '🔇 Nunca',
    description: 'Você não receberá notificações deste tipo',
  },
]

interface NotificationFrequencyControlProps {
  frequency: NotificationFrequency
  onChange: (frequency: NotificationFrequency) => void
  label?: string
  showDescription?: boolean
}

export function NotificationFrequencyControl({
  frequency,
  onChange,
  label = 'Frequência de Envio',
  showDescription = true,
}: NotificationFrequencyControlProps) {
  useAccessibilityValidation({ enabled: true })
  const currentOption = FREQUENCY_OPTIONS.find((opt) => opt.value === frequency)

  return (
    <div className="space-y-3">
      <Label htmlFor="frequency-select" className="text-sm font-semibold">
        {label}
      </Label>

      <Select value={frequency} onValueChange={(value) => onChange(value as NotificationFrequency)}>
        <SelectTrigger id="frequency-select" className="bg-white">
          <SelectValue placeholder="Selecione a frequência..." />
        </SelectTrigger>
        <SelectContent>
          {FREQUENCY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div>
                <span className="font-medium">{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showDescription && currentOption && (
        <div className="flex gap-2 rounded border border-blue-100 bg-blue-50 p-2 text-xs">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-blue-700">{currentOption.description}</p>
        </div>
      )}
    </div>
  )
}

/**
 * Hook para gerenciar múltiplas frequências por tipo de notificação
 */
export function useNotificationFrequencies(
  initialFrequencies?: Record<string, NotificationFrequency>,
) {
  const [frequencies, setFrequencies] = useState<Record<string, NotificationFrequency>>(
    initialFrequencies || {},
  )

  const updateFrequency = (key: string, frequency: NotificationFrequency) => {
    setFrequencies((prev) => ({
      ...prev,
      [key]: frequency,
    }))
  }

  return { frequencies, updateFrequency }
}
