'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

type OpeningHours = {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

interface HoursModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  currentHours: OpeningHours
  currentWaitTime: string
  onSave: (newHours: OpeningHours, newWaitTime: string) => void
}
const dayMap: { [key in keyof OpeningHours]: string } = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
}

export function BvHoursModal({
  isOpen,
  setIsOpen,
  currentHours,
  currentWaitTime: _currentWaitTime,
  onSave,
}: HoursModalProps) {
  useAccessibilityValidation({ enabled: true })
  const [hours, setHours] = useState(currentHours)
  const [checkedDays, setCheckedDays] = useState<{ [key: string]: boolean }>({})
  const [waitInput, setWaitInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const formatWaitTimeForInput = (timeStr: string) => {
    const minutes = parseInt(timeStr.split(' ')[0]) || 30
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0')
    const m = (minutes % 60).toString().padStart(2, '0')
    return `${h}:${m}`
  }

  useEffect(() => {
    if (isOpen) {
      setHours(currentHours)
      setWaitInput(formatWaitTimeForInput(_currentWaitTime))
      const initialChecks: { [key: string]: boolean } = {}
      ;(Object.keys(currentHours) as Array<keyof OpeningHours>).forEach((day) => {
        initialChecks[day] = currentHours[day] !== 'Fechado'
      })
      setCheckedDays(initialChecks)
    }
  }, [isOpen, currentHours, _currentWaitTime])
  const handleTimeChange = (day: keyof OpeningHours, part: 'start' | 'end', value: string) => {
    const currentDayHours = hours[day] === 'Fechado' ? '00:00 - 00:00' : hours[day]

    // Parse de forma robusta, removendo espaços extras
    const parts = currentDayHours.replace(/\s*-\s*/g, '-').split('-')
    let start = parts[0]?.trim() || '00:00'
    let end = parts[1]?.trim() || '00:00'

    if (part === 'start') {
      start = value
    } else {
      end = value
    }

    const newHoursString = `${start} - ${end}`
    setHours((prev) => ({ ...prev, [day]: newHoursString }))
  }
  const handleCheckedChange = (day: keyof OpeningHours, checked: boolean) => {
    setCheckedDays((prev) => ({ ...prev, [day]: checked }))
    if (!checked) {
      setHours((prev) => ({ ...prev, [day]: 'Fechado' }))
    } else {
      const defaultTime = day === 'saturday' ? '08:00 - 12:00' : '08:00 - 17:00'
      setHours((prev) => ({
        ...prev,
        [day]: currentHours[day] !== 'Fechado' ? currentHours[day] : defaultTime,
      }))
    }
  }
  const formatWaitTimeForSave = (timeInput: string) => {
    const [hours, minutes] = timeInput.split(':').map(Number)
    const totalMinutes = (hours || 0) * 60 + (minutes || 0)
    return `${totalMinutes} minutos`
  }
  const handleSaveClick = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (waitInput === '00:00') {
            reject(new Error('Tempo de espera inválido'))
          } else {
            resolve(true)
          }
        }, 1500)
      })
      onSave(hours, formatWaitTimeForSave(waitInput))
      // toast.success('Sucesso!', {
      //   description: 'Alterações salvas com sucesso!',
      // })
    } catch {
      toast.error('Atenção!', {
        description: 'Não foi possível salvar as alterações. Verifique sua rede e tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Horário de funcionamento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {(Object.keys(dayMap) as Array<keyof OpeningHours>).map((dayKey) => {
            const isChecked = checkedDays[dayKey] || false
            const dayHours = hours[dayKey]

            // Parse das horas de forma mais robusta
            let start = '08:00'
            let end = '17:00'

            if (dayHours && dayHours !== 'Fechado') {
              // Remove espaços extras e faz o split tanto com " - " quanto com "-"
              const parts = dayHours.replace(/\s*-\s*/g, '-').split('-')
              if (parts.length >= 2) {
                start = parts[0]?.trim() || '08:00'
                end = parts[1]?.trim() || '17:00'
              }
            }

            return (
              <div key={dayKey} className="flex items-center gap-3">
                <Checkbox
                  id={dayKey}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleCheckedChange(dayKey, !!checked)}
                  className="mt-1"
                />
                <Label htmlFor={dayKey} className="w-16">
                  {dayMap[dayKey]}
                </Label>
                <Input
                  type="time"
                  value={isChecked ? start : '08:00'}
                  disabled={!isChecked}
                  onChange={(e) => handleTimeChange(dayKey, 'start', e.target.value)}
                  className="w-full"
                />
                <span>às</span>
                <Input
                  type="time"
                  value={isChecked ? end : '17:00'}
                  disabled={!isChecked}
                  onChange={(e) => handleTimeChange(dayKey, 'end', e.target.value)}
                  className="w-full"
                />
              </div>
            )
          })}

          <Separator className="my-2" />

          <div>
            <Label htmlFor="wait-time">Tempo de espera médio para atendimento (em horas):</Label>
            <Input
              id="wait-time"
              type="time"
              value={waitInput}
              onChange={(e) => setWaitInput(e.target.value)}
              className="mt-2 w-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="my-2" type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button className="my-2" type="submit" onClick={handleSaveClick} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
