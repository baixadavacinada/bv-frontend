'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import BvSelect from '@/components/design/BvSelect'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { toast } from 'sonner'

const vaccineSchema = z.object({
  name: z.string().min(1, 'Nome da vacina é obrigatório'),
  dosage: z.string().min(1, 'Tipo de dose é obrigatório'),
  description: z.string().optional(),
  ageGroup: z.string().min(1, 'Faixa etária é obrigatória'),
  interval: z.string().optional(),
})

type VaccineFormData = z.infer<typeof vaccineSchema>

interface Vaccine extends VaccineFormData {
  id: string
}

const dosageOptions = [
  { value: 'dose-unica', label: 'Dose única' },
  { value: 'primeira-dose', label: 'Primeira dose' },
  { value: 'segunda-dose', label: 'Segunda dose' },
  { value: 'dose-reforco', label: 'Dose de reforço' },
]

const ageGroupOptions = [
  { value: 'recem-nascido', label: 'Recém-nascido (0-28 dias)' },
  { value: 'lactente', label: 'Lactente (29 dias - 2 anos)' },
  { value: 'crianca', label: 'Criança (2-12 anos)' },
  { value: 'adolescente', label: 'Adolescente (12-18 anos)' },
  { value: 'adulto', label: 'Adulto (18-60 anos)' },
  { value: 'idoso', label: 'Idoso (60+ anos)' },
  { value: 'todas-idades', label: 'Todas as idades' },
]

export function VaccineFormContent() {
  useAccessibilityValidation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const vaccineId = searchParams.get('id')
  const isEdit = !!vaccineId

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VaccineFormData>({
    resolver: zodResolver(vaccineSchema),
    defaultValues: {
      name: '',
      dosage: '',
      description: '',
      ageGroup: '',
      interval: '',
    },
  })

  useEffect(() => {
    if (isEdit && vaccineId) {
      const mockVaccine: Vaccine = {
        id: vaccineId,
        name: 'Vacina BCG',
        dosage: 'dose-unica',
        description: 'Vacina contra tuberculose',
        ageGroup: 'recem-nascido',
        interval: '',
      }

      reset(mockVaccine)
    }
  }, [isEdit, vaccineId, reset])

  const onSubmit = async (data: VaccineFormData) => {
    try {
      if (isEdit) {
        console.log('Atualizando vacina:', { id: vaccineId, ...data })
        toast.success(`Vacina "${data.name}" atualizada com sucesso!`)
      } else {
        console.log('Criando nova vacina:', data)
        toast.success(`Vacina "${data.name}" criada com sucesso!`)
      }

      router.push('/gestao-vacinas')
    } catch (error) {
      console.error('Erro ao salvar vacina:', error)
      toast.error('Ocorreu um erro ao salvar a vacina. Tente novamente.')
    }
  }

  const handleCancel = () => {
    router.push('/gestao-vacinas')
  }

  const pageTitle = isEdit ? 'Editar vacina' : 'Adicionar vacina'
  const buttonText = isEdit ? 'Salvar' : 'Adicionar'

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
        <h1 className="sr-only">{pageTitle} - Gestão de Vacinas - Baixada Vacinada</h1>

        <BvTitleHeader title={pageTitle} className="mb-8" />

        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">
            Formulário de {isEdit ? 'edição' : 'cadastro'} de vacina
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <fieldset className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <legend className="sr-only">Dados da vacina</legend>

              {/* Nome da vacina */}
              <div className="lg:col-span-2">
                <BvFormInput
                  label="Nome da vacina"
                  placeholder="Digite o nome da vacina"
                  required
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>

              {/* Tipo de dose */}
              <BvSelect
                title="Tipo de dose"
                placeholder="Selecione o tipo de dose"
                options={dosageOptions}
                value={watch('dosage')}
                onValueChange={(value) => setValue('dosage', value as string)}
                error={errors.dosage?.message}
                fullWidth
                showSelectedBadges={false}
              />

              {/* Faixa etária */}
              <BvSelect
                title="Faixa etária"
                placeholder="Selecione a faixa etária"
                options={ageGroupOptions}
                value={watch('ageGroup')}
                onValueChange={(value) => setValue('ageGroup', value as string)}
                error={errors.ageGroup?.message}
                fullWidth
                showSelectedBadges={false}
              />

              {/* Intervalo entre doses (condicional) */}
              {(watch('dosage') === 'primeira-dose' || watch('dosage') === 'dose-reforco') && (
                <div className="lg:col-span-2">
                  <BvFormInput
                    label="Intervalo para próxima dose"
                    placeholder="Ex: 30 dias, 6 meses"
                    error={errors.interval?.message}
                    {...register('interval')}
                  />
                </div>
              )}

              {/* Descrição */}
              <div className="lg:col-span-2">
                <BvFormInput
                  label="Descrição (opcional)"
                  placeholder="Digite uma descrição sobre a vacina"
                  error={errors.description?.message}
                  {...register('description')}
                />
              </div>
            </fieldset>

            {/* Botões de ação */}
            <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:justify-end">
              <BvButton
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full lg:w-auto"
                title="Cancelar"
              />

              <BvButton
                type="submit"
                isLoading={isSubmitting}
                className="w-full lg:w-auto"
                title={buttonText}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
