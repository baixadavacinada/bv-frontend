'use client'

import React, { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface AddVaccineModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onAdd: (newVaccineName: string) => void
  existingVaccines: string[]
}

export function BvAddVaccineModal({
  isOpen,
  setIsOpen,
  onAdd,
  existingVaccines,
}: AddVaccineModalProps) {
  useAccessibilityValidation({ enabled: true })

  const [newVaccineName, setNewVaccineName] = useState('')
  const [lote, setLote] = useState('')
  const [selectedVaccine, setSelectedVaccine] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddClick = async () => {
    const vaccineToAdd = newVaccineName.trim() || selectedVaccine

    if (!vaccineToAdd) {
      toast.warning('Atenção!', {
        description: 'Por favor, selecione ou digite o nome da vacina.',
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (lote.trim().toUpperCase() === 'ERRO') {
            reject(new Error('Simulação de falha de rede (lote inválido)'))
          } else {
            resolve(true)
          }
        }, 1500)
      })

      onAdd(vaccineToAdd)
      toast.success('Sucesso!', {
        description: `Vacina "${vaccineToAdd}" adicionada com sucesso.`,
      })

      setNewVaccineName('')
      setLote('')
      setSelectedVaccine('')
    } catch (error) {
      console.error('Falha ao adicionar vacina:', error)
      toast.error('Atenção!', {
        description: 'Não foi possível adicionar a vacina. Verifique sua rede e tente novamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setNewVaccineName('')
          setLote('')
          setSelectedVaccine('')
          setIsLoading(false)
        }
        setIsOpen(open)
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar vacina</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="search-vaccine">Buscar vacina</Label>
            <Select value={selectedVaccine} onValueChange={setSelectedVaccine} disabled={isLoading}>
              <SelectTrigger id="search-vaccine" className="mt-2">
                <SelectValue placeholder="Selecione uma vacina existente" />
              </SelectTrigger>
              <SelectContent>
                {existingVaccines.map((vaccine) => (
                  <SelectItem key={vaccine} value={vaccine}>
                    {vaccine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-2" />
          <div>
            <Label htmlFor="new-vaccine-name">Adicionar nova vacina</Label>
            <Input
              id="new-vaccine-name"
              placeholder="Digite aqui o nome da vacina"
              value={newVaccineName}
              onChange={(e) => setNewVaccineName(e.target.value)}
              className="mt-2"
              disabled={!!selectedVaccine || isLoading}
            />
          </div>
          {/* <div>
            <Label htmlFor="vaccine-lote">
              Lote da vacina (digite &quot;erro&quot; para testar)
            </Label>
            <Input
              id="vaccine-lote"
              placeholder="Digite aqui o lote da vacina"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              className="mt-2"
              disabled={isLoading}
            />
          </div> */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="my-2"
              type="button"
              variant="outline"
              disabled={isLoading}
              title="Fechar o formulário de adição de vacina"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="my-2 bg-purple-600 hover:bg-purple-700"
            type="submit"
            onClick={handleAddClick}
            disabled={isLoading}
            title="Adicionar a vacina selecionada ou digitada"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
