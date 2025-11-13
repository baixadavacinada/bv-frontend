'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-firebase-auth'
import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import BvSelect from '@/components/design/BvSelect'
import { toast } from 'sonner'
import { Plus, X, CheckCircle, AlertCircle } from 'lucide-react'
import { vaccinationService } from '@/services/vaccination-service'
import { apiClient } from '@/services/api'
import type { VaccineFromDB, HealthUnitFromDB } from '@/schemas/vaccination-schema'

interface RegisteredVaccine {
  vaccineId: string
  vaccineName: string
  manufacturer?: string
  dose?: string
  batchNumber?: string
  applicationDate?: string
  healthUnitName?: string
  city?: string
  state?: string
  addedAt: string
}

export default function VaccineRegistrationContent() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [vaccines, setVaccines] = useState<VaccineFromDB[]>([])
  const [healthUnits, setHealthUnits] = useState<HealthUnitFromDB[]>([])
  const [registeredVaccines, setRegisteredVaccines] = useState<RegisteredVaccine[]>([])
  const [loading, setLoading] = useState(false)

  // Form states
  const [selectedVaccine, setSelectedVaccine] = useState('')
  const [customVaccineName, setCustomVaccineName] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [dose, setDose] = useState('')
  const [batchNumber, setBatchNumber] = useState('')
  const [applicationDate, setApplicationDate] = useState('')
  const [selectedHealthUnit, setSelectedHealthUnit] = useState('')
  const [customLocation, setCustomLocation] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  useEffect(() => {
    if (user) {
      loadVaccinesAndHealthUnits()
      loadRegisteredVaccines()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const loadVaccinesAndHealthUnits = async () => {
    try {
      const [vaccinesData, healthUnitsData] = await Promise.all([
        vaccinationService.getAvailableVaccines(),
        vaccinationService.getAvailableHealthUnits(),
      ])
      setVaccines(vaccinesData)
      setHealthUnits(healthUnitsData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const loadRegisteredVaccines = async () => {
    try {
      if (!user) return

      const response = await apiClient.get<RegisteredVaccine[]>(`/api/public/user/vaccines`)
      if (response && Array.isArray(response)) {
        setRegisteredVaccines(response)
      }
    } catch (error) {
      console.error('Erro ao carregar vacinas registradas:', error)
      // Fallback para localStorage
      try {
        const key = `user_vaccines_${user?.uid}`
        const stored = localStorage.getItem(key)
        if (stored) {
          setRegisteredVaccines(JSON.parse(stored))
        }
      } catch (e) {
        console.error('Erro ao carregar do localStorage:', e)
      }
    }
  }

  const handleAddVaccine = async () => {
    if (!user) {
      toast.error('Por favor, faça login para adicionar vacinas')
      return
    }

    const vaccineId = selectedVaccine || Date.now().toString()
    const vaccineName = selectedVaccine
      ? vaccines.find((v) => v._id === selectedVaccine)?.name || selectedVaccine
      : customVaccineName

    if (!vaccineName.trim()) {
      toast.error('Selecione ou digite o nome da vacina')
      return
    }

    if (!dose) {
      toast.error('Selecione a dose')
      return
    }

    // Validar local de vacinação
    if (customLocation !== '' && customLocation !== 'Other') {
      if (!state.trim()) {
        toast.error('Selecione um estado para o local personalizado')
        return
      }
    }

    setLoading(true)
    try {
      const healthUnitName = selectedHealthUnit
        ? healthUnits.find((u) => u._id === selectedHealthUnit)?.name
        : customLocation && customLocation !== 'Other'
          ? customLocation.trim()
          : undefined

      const vaccineData = {
        vaccineId,
        vaccineName: vaccineName.trim(),
        manufacturer: manufacturer.trim() || undefined,
        dose: dose.trim(),
        batchNumber: batchNumber.trim() || undefined,
        applicationDate: applicationDate.trim() || undefined,
        healthUnitName,
        city: selectedHealthUnit
          ? healthUnits.find((u) => u._id === selectedHealthUnit)?.city
          : city.trim() || undefined,
        state: selectedHealthUnit
          ? healthUnits.find((u) => u._id === selectedHealthUnit)?.state
          : state.trim() || undefined,
      }

      // Tentar enviar para backend
      try {
        await apiClient.post('/api/public/user/vaccines', vaccineData)
      } catch (backendError) {
        console.warn('Erro ao salvar no backend:', backendError)
        // Continua com localStorage como fallback
      }

      const newVaccine: RegisteredVaccine = {
        ...vaccineData,
        addedAt: new Date().toISOString(),
      }

      const updated = [...registeredVaccines, newVaccine]
      setRegisteredVaccines(updated)

      // Salvar também no localStorage como backup
      try {
        const key = `user_vaccines_${user.uid}`
        localStorage.setItem(key, JSON.stringify(updated))
      } catch (e) {
        console.warn('Erro ao salvar no localStorage:', e)
      }

      toast.success('Vacina cadastrada com sucesso! ✓', {
        description: `${vaccineName} foi adicionada à sua cartilha.`,
      })

      // Reset form
      setSelectedVaccine('')
      setCustomVaccineName('')
      setManufacturer('')
      setDose('')
      setBatchNumber('')
      setApplicationDate('')
      setSelectedHealthUnit('')
      setCustomLocation('')
      setCity('')
      setState('')
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao adicionar vacina:', error)
      toast.error('Erro ao adicionar vacina. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveVaccine = async (vaccineId: string) => {
    try {
      // Tentar remover do backend
      try {
        await apiClient.delete(`/api/public/user/vaccines/${vaccineId}`)
      } catch (backendError) {
        console.warn('Erro ao remover do backend:', backendError)
        // Continua com localStorage como fallback
      }

      const updated = registeredVaccines.filter((v) => v.vaccineId !== vaccineId)
      setRegisteredVaccines(updated)

      // Atualizar localStorage também
      try {
        const key = `user_vaccines_${user?.uid}`
        localStorage.setItem(key, JSON.stringify(updated))
      } catch (e) {
        console.warn('Erro ao atualizar localStorage:', e)
      }

      toast.success('Vacina removida')
    } catch (error) {
      console.error('Erro ao remover vacina:', error)
      toast.error('Erro ao remover vacina')
    }
  }

  const doseOptions = [
    { value: '1ª dose', label: '1ª dose' },
    { value: '2ª dose', label: '2ª dose' },
    { value: '3ª dose', label: '3ª dose' },
    { value: 'dose única', label: 'Dose única' },
    { value: 'reforço', label: 'Reforço' },
  ]

  const vaccineOptions = vaccines.map((v) => ({
    value: v._id || v.id,
    label: `${v.name} - ${v.manufacturer}`,
  }))

  const healthUnitOptions = healthUnits.map((u) => ({
    value: u._id || u.id,
    label: `${u.name} - ${u.city}`,
  }))

  if (!user) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
          <p className="text-yellow-800">Por favor, faça login para acessar esta seção</p>
        </div>
      </div>
    )
  }

  return (
    <div aria-label="Cadastro de vacinas na cartilha">
      <div className="mb-8">
        <BvTitleHeader title="Minhas Vacinas" className="mb-2" />
        <p className="text-gray-600">Registre e acompanhe as vacinas que você recebeu</p>
      </div>

      {/* Botão para abrir formulário */}
      {!showForm && (
        <div className="mb-6">
          <BvButton onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Vacina
          </BvButton>
        </div>
      )}

      {/* Formulário de cadastro */}
      {showForm && (
        <div className="mb-8 rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-purple-900">Adicionar Nova Vacina</h3>

          <div className="space-y-4">
            {/* Seleção de vacina */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Vacina *</label>
                <BvSelect
                  options={[
                    { value: '', label: 'Selecione uma vacina...' },
                    ...vaccineOptions,
                    { value: 'custom', label: 'Outra vacina (digitar manualmente)' },
                  ]}
                  value={selectedVaccine}
                  onValueChange={(value: string | string[]) => {
                    const v = Array.isArray(value) ? value[0] : value
                    setSelectedVaccine(v === 'custom' ? '' : v)
                  }}
                />
              </div>

              {!selectedVaccine && (
                <BvFormInput
                  label="Nome da Vacina *"
                  placeholder="Ex: COVID-19, Influenza..."
                  value={customVaccineName}
                  onChange={(e) => setCustomVaccineName(e.target.value)}
                />
              )}
            </div>

            {/* Fabricante e Lote */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <BvFormInput
                label="Fabricante"
                placeholder="Ex: Pfizer, AstraZeneca..."
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
              <BvFormInput
                label="Lote da Vacina"
                placeholder="Ex: ABC123..."
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>

            {/* Data e Dose */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <BvFormInput
                label="Data da Aplicação"
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Dose *</label>
                <BvSelect
                  options={doseOptions}
                  value={dose}
                  onValueChange={(value: string | string[]) => {
                    setDose(Array.isArray(value) ? value[0] : value)
                  }}
                />
              </div>
            </div>

            {/* Local da vacinação */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Local da Vacinação
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={selectedHealthUnit !== ''}
                    onChange={() => {
                      setSelectedHealthUnit('')
                      setCustomLocation('')
                    }}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">UBS</span>
                </label>
                {selectedHealthUnit !== '' && (
                  <BvSelect
                    options={[{ value: '', label: 'Selecione uma UBS...' }, ...healthUnitOptions]}
                    value={selectedHealthUnit}
                    onValueChange={(value: string | string[]) => {
                      setSelectedHealthUnit(Array.isArray(value) ? value[0] : value)
                    }}
                  />
                )}
              </div>

              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={customLocation !== ''}
                    onChange={() => {
                      setSelectedHealthUnit('')
                      setCustomLocation('Other')
                    }}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">Local Personalizado</span>
                </label>
                {customLocation !== '' && (
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <BvFormInput
                      label="Local"
                      placeholder="Ex: Clínica Particular..."
                      value={customLocation === 'Other' ? '' : customLocation}
                      onChange={(e) => setCustomLocation(e.target.value || 'Other')}
                    />
                    <BvFormInput
                      label="Cidade"
                      placeholder="Ex: Rio de Janeiro"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Estado *
                      </label>
                      <BvSelect
                        options={[
                          { value: '', label: 'Selecione uma opção' },
                          { value: 'AC', label: 'Acre' },
                          { value: 'AL', label: 'Alagoas' },
                          { value: 'AP', label: 'Amapá' },
                          { value: 'AM', label: 'Amazonas' },
                          { value: 'BA', label: 'Bahia' },
                          { value: 'CE', label: 'Ceará' },
                          { value: 'DF', label: 'Distrito Federal' },
                          { value: 'ES', label: 'Espírito Santo' },
                          { value: 'GO', label: 'Goiás' },
                          { value: 'MA', label: 'Maranhão' },
                          { value: 'MT', label: 'Mato Grosso' },
                          { value: 'MS', label: 'Mato Grosso do Sul' },
                          { value: 'MG', label: 'Minas Gerais' },
                          { value: 'PA', label: 'Pará' },
                          { value: 'PB', label: 'Paraíba' },
                          { value: 'PR', label: 'Paraná' },
                          { value: 'PE', label: 'Pernambuco' },
                          { value: 'PI', label: 'Piauí' },
                          { value: 'RJ', label: 'Rio de Janeiro' },
                          { value: 'RN', label: 'Rio Grande do Norte' },
                          { value: 'RS', label: 'Rio Grande do Sul' },
                          { value: 'RO', label: 'Rondônia' },
                          { value: 'RR', label: 'Roraima' },
                          { value: 'SC', label: 'Santa Catarina' },
                          { value: 'SP', label: 'São Paulo' },
                          { value: 'SE', label: 'Sergipe' },
                          { value: 'TO', label: 'Tocantins' },
                        ]}
                        value={state}
                        onValueChange={(value: string | string[]) => {
                          setState(Array.isArray(value) ? value[0] : value)
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3 pt-4">
              <BvButton
                onClick={handleAddVaccine}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Salvando...' : 'Confirmar Cadastro'}
              </BvButton>
              <BvButton
                onClick={() => setShowForm(false)}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </BvButton>
            </div>
          </div>
        </div>
      )}

      {/* Lista de vacinas registradas */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Vacinas Registradas ({registeredVaccines.length})
        </h3>

        {registeredVaccines.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-gray-400" />
            <p className="text-gray-600">Nenhuma vacina registrada ainda</p>
            <p className="text-sm text-gray-500">
              Clique em &quot;Adicionar Vacina&quot; para começar
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {registeredVaccines.map((vaccine) => (
              <div
                key={vaccine.vaccineId}
                className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-4"
              >
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{vaccine.vaccineName}</h3>
                      <p className="text-sm text-gray-600">
                        {vaccine.dose && <span>{vaccine.dose}</span>}
                        {vaccine.manufacturer && <span> • {vaccine.manufacturer}</span>}
                      </p>
                      <p className="pt-1 text-xs text-gray-500">
                        Adicionada em {new Date(vaccine.addedAt).toLocaleDateString('pt-BR')}
                      </p>
                      {vaccine.applicationDate && (
                        <p className="text-xs text-gray-500">
                          Aplicada em{' '}
                          {new Date(vaccine.applicationDate).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      {vaccine.healthUnitName && (
                        <p className="text-xs text-gray-500">
                          Local: {vaccine.healthUnitName}
                          {vaccine.city && <span> - {vaccine.city}</span>}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveVaccine(vaccine.vaccineId)}
                      className="flex-shrink-0 rounded text-gray-600 transition-colors hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                      aria-label={`Remover ${vaccine.vaccineName}`}
                      title="Remover esta vacina"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Informações adicionais */}
      <div className="mt-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
        <h4 className="mb-2 font-semibold text-blue-900">ℹ️ Dica</h4>
        <p className="text-sm text-blue-800">
          Manter seu registro de vacinas atualizado é importante para acompanhar sua imunização.
          Você pode adicionar todas as vacinas que já recebeu.
        </p>
      </div>
    </div>
  )
}
