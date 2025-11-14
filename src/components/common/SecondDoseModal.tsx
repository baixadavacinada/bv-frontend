import React, { useState, useEffect } from 'react'
import { BvModal } from '../design/BvModal'
import { BvButton } from '../design/BvButton'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useAuth } from '@/hooks/use-firebase-auth'
import { vaccinationService } from '@/services/vaccination-service'
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface Vaccine {
  id?: string
  _id?: string
  name: string
  manufacturer?: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelectVaccines?: (vaccines: string[], createdBy?: string) => void
}

const SecondDoseModal: React.FC<Props> = ({ isOpen, onClose, onSelectVaccines }) => {
  useAccessibilityValidation()
  const { user } = useAuth()

  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([])
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadVaccines()
    }
  }, [isOpen])

  const loadVaccines = async () => {
    try {
      setLoading(true)
      vaccinationService.clearVaccinesCache()
      const availableVaccines = await vaccinationService.getAvailableVaccines()
      console.log('Vacinas carregadas no modal:', availableVaccines)

      // Garantir que é um array
      if (Array.isArray(availableVaccines)) {
        setVaccines(availableVaccines)
      } else {
        console.error('availableVaccines não é um array:', availableVaccines)
        setVaccines([])
      }
    } catch (error) {
      console.error('Erro ao carregar vacinas:', error)
      toast.error('Erro ao carregar vacinas')
      setVaccines([])
    } finally {
      setLoading(false)
    }
  }

  const toggleVaccineSelection = (vaccineName: string) => {
    setSelectedVaccines((prev) => {
      if (prev.includes(vaccineName)) {
        return prev.filter((v) => v !== vaccineName)
      } else {
        return [...prev, vaccineName]
      }
    })
  }

  const removeVaccine = (vaccineName: string) => {
    setSelectedVaccines((prev) => prev.filter((v) => v !== vaccineName))
  }

  const handleCloseModal = () => {
    setSelectedVaccines([])
    onClose()
  }

  const handleAddVaccines = () => {
    if (onSelectVaccines) {
      const createdBy = user?.email || user?.uid || 'unknown-user'
      onSelectVaccines(selectedVaccines, createdBy)
    }
    handleCloseModal()
  }

  return (
    <BvModal
      open={isOpen}
      onClose={handleCloseModal}
      title="Selecionar vacina com 2ª dose"
      description="Vacinas que possuem segunda dose de aplicação."
    >
      <div className="flex flex-col gap-6">
        {/* Vacinas selecionadas */}
        {selectedVaccines.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Vacinas selecionadas:</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {selectedVaccines.map((vaccine) => (
                <div
                  key={vaccine}
                  className="flex items-center justify-between rounded-md px-3 py-2 font-medium text-black shadow-sm"
                  style={{ backgroundColor: '#50C36E' }}
                >
                  <span className="truncate">{vaccine}</span>
                  <button
                    onClick={() => removeVaccine(vaccine)}
                    className="ml-2 flex items-center justify-center rounded text-black hover:opacity-80 focus:outline-none"
                    aria-label={`Remover ${vaccine}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vacinas disponíveis */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Vacinas disponíveis:</p>
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-500">Carregando vacinas...</p>
            </div>
          ) : vaccines.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {vaccines.map((vaccine) => {
                const vaccineLabel = vaccine.name
                const isSelected = selectedVaccines.includes(vaccineLabel)

                return (
                  <button
                    key={vaccine._id || vaccine.id}
                    onClick={() => toggleVaccineSelection(vaccineLabel)}
                    className={`transition-all ${
                      isSelected ? 'ring-2 ring-offset-2' : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: isSelected ? '#50C36E' : '#E8F5E9',
                      color: isSelected ? 'black' : '#333',
                      borderRadius: '0.375rem',
                    }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2 font-medium">
                      <span className="truncate text-sm">{vaccineLabel}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-yellow-50 p-4 text-center text-sm text-yellow-800">
              Nenhuma vacina disponível
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col justify-end gap-6 md:flex-row md:gap-4">
          <BvButton variant="outline" title="Cancelar" onClick={handleCloseModal} />

          <BvButton
            title="Adicionar"
            onClick={handleAddVaccines}
            disabled={selectedVaccines.length === 0}
          />
        </div>
      </div>
    </BvModal>
  )
}

export default SecondDoseModal
