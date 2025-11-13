'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import BvSelect from '@/components/design/BvSelect'
import {
  VaccinationFormData,
  vaccinationSchema,
  doseTypes,
  brazilianStates,
  VaccineFromDB,
  HealthUnitFromDB,
} from '@/schemas/vaccination-schema'
import { vaccinationService } from '@/services/vaccination-service'
import { FaSyringe, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export default function VaccinationRegisterForm() {
  const [loading, setLoading] = useState(false)
  const [vaccines, setVaccines] = useState<VaccineFromDB[]>([])
  const [healthUnits, setHealthUnits] = useState<HealthUnitFromDB[]>([])
  const [showCustomLocation, setShowCustomLocation] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineFromDB | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VaccinationFormData>({
    resolver: zodResolver(vaccinationSchema),
    defaultValues: {
      adverseReaction: false,
    },
  })

  const watchHealthUnitId = watch('healthUnitId')
  const watchVaccineId = watch('vaccineId')
  const watchAdverseReaction = watch('adverseReaction')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vaccinesData, healthUnitsData] = await Promise.all([
          vaccinationService.getAvailableVaccines(),
          vaccinationService.getAvailableHealthUnits(),
        ])

        setVaccines(vaccinesData)
        setHealthUnits(healthUnitsData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        toast.error('Erro ao carregar dados das vacinas e UBS')
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (watchVaccineId) {
      const vaccine = vaccines.find((v) => v.id === watchVaccineId || v._id === watchVaccineId)
      if (vaccine) {
        setSelectedVaccine(vaccine)
        setValue('vaccineName', vaccine.name)
        setValue('manufacturer', vaccine.manufacturer || '')
      }
    }
  }, [watchVaccineId, vaccines, setValue])

  useEffect(() => {
    if (watchHealthUnitId) {
      const healthUnit = healthUnits.find(
        (h) => h.id === watchHealthUnitId || h._id === watchHealthUnitId,
      )
      if (healthUnit) {
        setValue('healthUnitName', healthUnit.name)
        setValue('city', healthUnit.city)
        setValue('state', healthUnit.state)
        setShowCustomLocation(false)
      }
    } else if (showCustomLocation) {
      setValue('healthUnitName', '')
      setValue('city', '')
      setValue('state', '')
    }
  }, [watchHealthUnitId, healthUnits, setValue, showCustomLocation])

  const onSubmit = async (data: VaccinationFormData) => {
    try {
      setLoading(true)

      if (!data.healthUnitId && !data.customLocation) {
        toast.error('Informe o local da vacinação')
        return
      }

      vaccinationService.saveVaccinationRecord(data)

      toast.success('Registro de vacinação salvo com sucesso!')
      reset()
      setSelectedVaccine(null)
      setShowCustomLocation(false)
    } catch (error) {
      console.error('Erro ao salvar registro:', error)
      toast.error('Erro ao salvar registro de vacinação')
    } finally {
      setLoading(false)
    }
  }

  const vaccineOptions = vaccines.map((vaccine) => ({
    value: vaccine.id || vaccine._id,
    label: `${vaccine.name} - ${vaccine.manufacturer}`,
  }))

  const healthUnitOptions = healthUnits.map((unit) => ({
    value: unit.id || unit._id,
    label: `${unit.name} - ${unit.city}`,
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <BvTitleHeader
            title="Registro de Vacinação"
            subtitle="Registre suas vacinas na carteira de vacinação digital"
            className="mb-4"
          />
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaSyringe className="text-blue-600" />
                <span>Mantenha seu registro atualizado</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                <span>UBS ou local personalizado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados da Vacina */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <FaSyringe className="text-xl text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Dados da Vacina</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Vacina *</label>
                  <BvSelect
                    options={[
                      ...vaccineOptions,
                      { value: 'custom', label: 'Outra vacina (digitar manualmente)' },
                    ]}
                    value={watchVaccineId || 'custom'}
                    onValueChange={(value: string) => {
                      if (value === 'custom') {
                        setValue('vaccineId', undefined)
                        setValue('vaccineName', '')
                        setValue('manufacturer', '')
                        setSelectedVaccine(null)
                      } else {
                        setValue('vaccineId', value)
                      }
                    }}
                    error={errors.vaccineId?.message}
                  />
                </div>

                <BvFormInput
                  label="Nome da Vacina"
                  placeholder="Ex: COVID-19, Influenza..."
                  required
                  {...register('vaccineName')}
                  error={errors.vaccineName?.message}
                />

                <BvFormInput
                  label="Fabricante"
                  placeholder="Ex: Pfizer, AstraZeneca..."
                  {...register('manufacturer')}
                  error={errors.manufacturer?.message}
                />

                <BvFormInput
                  label="Lote da Vacina"
                  placeholder="Ex: ABC123..."
                  {...register('batchNumber')}
                  error={errors.batchNumber?.message}
                />
              </div>

              {selectedVaccine && (
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-900">
                    Informações da Vacina Selecionada
                  </h4>
                  <div className="text-sm text-blue-700">
                    <p>
                      <strong>Nome:</strong> {selectedVaccine.name}
                    </p>
                    <p>
                      <strong>Fabricante:</strong> {selectedVaccine.manufacturer}
                    </p>
                    <p>
                      <strong>Faixa Etária:</strong> {selectedVaccine.ageGroup}
                    </p>
                    {selectedVaccine.description && (
                      <p>
                        <strong>Descrição:</strong> {selectedVaccine.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dados da Aplicação */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <FaCalendarAlt className="text-xl text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Dados da Aplicação</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <BvFormInput
                  label="Data da Aplicação"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  required
                  {...register('applicationDate')}
                  error={errors.applicationDate?.message}
                />

                <BvFormInput
                  label="Horário da Aplicação"
                  type="time"
                  {...register('applicationTime')}
                  error={errors.applicationTime?.message}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Dose *</label>
                  <BvSelect
                    options={[...doseTypes]}
                    {...register('dose')}
                    error={errors.dose?.message}
                  />
                </div>
              </div>
            </div>

            {/* Local da Aplicação */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <MdLocationOn className="text-xl text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Local da Aplicação</h3>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomLocation(false)
                      setValue('healthUnitId', '')
                      setValue('customLocation', '')
                    }}
                    className={`flex-1 rounded-lg border-2 p-4 text-left transition-colors ${
                      !showCustomLocation
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">UBS Cadastrada</div>
                    <div className="text-sm text-gray-600">Selecionar uma UBS do sistema</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomLocation(true)
                      setValue('healthUnitId', '')
                      setValue('healthUnitName', '')
                      setValue('city', '')
                      setValue('state', '')
                    }}
                    className={`flex-1 rounded-lg border-2 p-4 text-left transition-colors ${
                      showCustomLocation
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">Local Personalizado</div>
                    <div className="text-sm text-gray-600">Informar manualmente</div>
                  </button>
                </div>

                {!showCustomLocation ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">UBS *</label>
                      <BvSelect
                        options={healthUnitOptions}
                        {...register('healthUnitId')}
                        error={errors.healthUnitId?.message}
                      />
                    </div>

                    <BvFormInput
                      label="Nome da UBS"
                      readOnly
                      {...register('healthUnitName')}
                      error={errors.healthUnitName?.message}
                    />

                    <BvFormInput
                      label="Cidade"
                      readOnly
                      {...register('city')}
                      error={errors.city?.message}
                    />

                    <BvFormInput
                      label="Estado"
                      readOnly
                      {...register('state')}
                      error={errors.state?.message}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <BvFormInput
                        label="Local da Vacinação *"
                        placeholder="Ex: Clínica Particular, Hospital..."
                        {...register('customLocation')}
                        error={errors.customLocation?.message}
                      />
                    </div>

                    <BvFormInput
                      label="Cidade *"
                      placeholder="Ex: Rio de Janeiro"
                      {...register('customCity')}
                      error={errors.customCity?.message}
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Estado *
                      </label>
                      <BvSelect
                        options={[...brazilianStates]}
                        {...register('customState')}
                        error={errors.customState?.message}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <FaUser className="text-xl text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Informações Adicionais</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <BvFormInput
                  label="Profissional que Aplicou"
                  placeholder="Nome do profissional"
                  {...register('appliedBy')}
                  error={errors.appliedBy?.message}
                />

                <BvFormInput
                  label="Data da Próxima Dose"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  {...register('nextDoseDate')}
                  error={errors.nextDoseDate?.message}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Observações</label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Observações sobre a vacinação..."
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                )}
              </div>
            </div>

            {/* Reações Adversas */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('adverseReaction')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Teve reação adversa?
                  </span>
                </label>
              </div>

              {watchAdverseReaction && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Descrição da Reação
                  </label>
                  <textarea
                    {...register('reactionDescription')}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
                    placeholder="Descreva a reação adversa observada..."
                  />
                  {errors.reactionDescription && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.reactionDescription.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <BvButton
                type="submit"
                disabled={isSubmitting || loading}
                isLoading={isSubmitting || loading}
                className="flex-1"
              >
                {isSubmitting || loading ? 'Salvando...' : 'Salvar Registro'}
              </BvButton>

              <button
                type="button"
                onClick={() => {
                  reset()
                  setSelectedVaccine(null)
                  setShowCustomLocation(false)
                }}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Limpar Formulário
              </button>
            </div>
          </form>
        </div>

        {/* Informações Importantes */}
        <div className="mt-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-900">ℹ️ Importante</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Mantenha sempre seus registros de vacinação atualizados</li>
            <li>• Guarde o comprovante físico da vacinação</li>
            <li>• Em caso de reações adversas, procure atendimento médico</li>
            <li>• Este registro é salvo localmente em seu dispositivo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
