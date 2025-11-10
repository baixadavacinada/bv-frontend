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
  currentWaitTime,
  onSave,
}: HoursModalProps) {
  useAccessibilityValidation({ enabled: true })
  const [hours, setHours] = useState(currentHours)
  const [waitTime, setWaitTime] = useState(currentWaitTime)
  const [checkedDays, setCheckedDays] = useState<{ [key: string]: boolean }>({})
  const [waitInput, setWaitInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setHours(currentHours)
      setWaitTime(currentWaitTime)
      setWaitInput(formatWaitTimeForInput(currentWaitTime))
      const initialChecks: { [key: string]: boolean } = {}
      ;(Object.keys(currentHours) as Array<keyof OpeningHours>).forEach((day) => {
        initialChecks[day] = currentHours[day] !== 'Fechado'
      })
      setCheckedDays(initialChecks)
    }
  }, [isOpen, currentHours, currentWaitTime])
  const handleTimeChange = (day: keyof OpeningHours, part: 'start' | 'end', value: string) => {
    const currentDayHours = hours[day] === 'Fechado' ? '00:00 - 00:00' : hours[day]
    const [start, end] = currentDayHours.split(' - ')

    let newHoursString = ''
    if (part === 'start') {
      newHoursString = `${value} - ${end}`
    } else {
      newHoursString = `${start} - ${value}`
    }
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
  const formatWaitTimeForInput = (timeStr: string) => {
    const minutes = parseInt(timeStr.split(' ')[0]) || 30
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0')
    const m = (minutes % 60).toString().padStart(2, '0')
    return `${h}:${m}`
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
    } catch (error) {
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
            const [start, end] = (hours[dayKey] === 'Fechado' ? '08:00 - 17:00' : hours[dayKey])
              .split(' - ')
              .map((t) => t.trim())

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
                  value={start}
                  disabled={!isChecked}
                  onChange={(e) => handleTimeChange(dayKey, 'start', e.target.value)}
                  className="w-full"
                />
                <span>às</span>
                <Input
                  type="time"
                  value={end}
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
