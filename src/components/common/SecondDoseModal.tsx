import React, { useState } from 'react'
import { BvModal } from '../design/BvModal'
import BvSelect from '../design/BvSelect'
import { BvButton } from '../design/BvButton'
import { SearchBar } from './SearchBar'
import { SelectedItemsList } from './SelectedItemsList'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

const vaccineGroups = [
  {
    label: 'Vacinas COVID-19',
    options: [
      { value: 'pfizer', label: 'Pfizer-BioNTech' },
      { value: 'moderna', label: 'Moderna' },
      { value: 'astrazeneca', label: 'AstraZeneca' },
      { value: 'janssen', label: 'Janssen' },
    ],
  },
  {
    label: 'Outras Vacinas',
    options: [
      { value: 'hepatite-b', label: 'Hepatite B' },
      { value: 'febre-amarela', label: 'Febre Amarela' },
      { value: 'tetanica', label: 'Tétanica' },
    ],
  },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

const SecondDoseModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useAccessibilityValidation()

  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([])

  const allVaccines = vaccineGroups.flatMap((group) => group.options)

  const handleVaccineChange = (value: string | string[]) => {
    const vaccinesArray = Array.isArray(value) ? value : [value]
    setSelectedVaccines(vaccinesArray)
  }

  const handleSearchBarSelect = (value: string) => {
    if (value) {
      setSelectedVaccines((prev) => {
        if (!prev.includes(value)) {
          return [...prev, value]
        }
        return prev
      })
    }
  }

  const removeVaccine = (vaccineValue: string) => {
    setSelectedVaccines((prev) => prev.filter((v) => v !== vaccineValue))
  }

  const handleCloseModal = () => {
    setSelectedVaccines([])
    onClose()
  }

  return (
    <BvModal
      open={isOpen}
      onClose={handleCloseModal}
      title="Selecionar vacina com 2ª dose"
      description="Vacinas que possuem segunda dose de aplicação."
    >
      <div className="flex flex-col gap-4">
        {/* SearchBar para buscar e adicionar vacinas */}
        <div>
          <h3 id="search-section-heading" className="mb-2 block text-sm font-medium text-gray-700">
            Buscar vacina
          </h3>
          <SearchBar
            placeholder="Buscar vacina por nome"
            items={allVaccines}
            onSelect={handleSearchBarSelect}
            emptyMessage="Nenhuma vacina encontrada"
            showCheckIcon
            selectedItems={selectedVaccines}
            showSelectedItems={false}
            onRemoveSelectedItem={removeVaccine}
          />
        </div>

        {/* Select alternativo (opcional) */}
        <div>
          <h3
            id="category-section-heading"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Ou selecione por categoria
          </h3>
          <BvSelect
            id="second-dose-vaccine"
            fullWidth
            multiple
            value={selectedVaccines}
            placeholder="Selecione por categoria"
            onValueChange={handleVaccineChange}
            groups={vaccineGroups}
            showSelectedBadges={false}
            label="Vacinas por categoria"
          />
        </div>

        {/* Lista unificada de vacinas selecionadas */}
        <div>
          <SelectedItemsList
            selectedItems={selectedVaccines}
            allItems={allVaccines}
            onRemoveItem={removeVaccine}
            title="Vacinas selecionadas"
          />
        </div>

        <div className="mt-4 flex flex-col justify-end gap-6 md:flex-row md:gap-4">
          <BvButton variant="outline" title="Cancelar" onClick={handleCloseModal} />

          <BvButton
            title="Adicionar"
            onClick={() => {
              console.log('Vacinas selecionadas:', selectedVaccines)
              // TODO: adicionar lógica para salvar as vacinas
              onClose()
            }}
            disabled={selectedVaccines.length === 0}
          />
        </div>
      </div>
    </BvModal>
  )
}

export default SecondDoseModal
