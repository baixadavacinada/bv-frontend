'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import BvSelect from '@/components/design/BvSelect'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useVaccineManagement } from '@/services/vaccine-management'
import { toast } from 'sonner'

const vaccineSchema = z.object({
  name: z.string().min(1, 'Nome da vacina é obrigatório'),
  manufacturer: z.string().min(1, 'Fabricante é obrigatório'),
  ageGroup: z.string().min(1, 'Faixa etária é obrigatória'),
  doses: z.array(z.string()).min(1, 'Pelo menos uma dose é obrigatória'),
  batchNumber: z.string().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
})

type VaccineFormData = z.infer<typeof vaccineSchema>

const dosageOptions = [
  { value: 'dose única', label: 'Dose única' },
  { value: '1ª dose', label: '1ª dose' },
  { value: '2ª dose', label: '2ª dose' },
  { value: '3ª dose', label: '3ª dose' },
  { value: 'reforço', label: 'Reforço' },
]

const ageGroupOptions = [
  // Recém-nascidos
  { value: '0-28', label: 'Recém-nascido (0-28)' },
  { value: '0-28 dias', label: 'Recém-nascido (0-28 dias)' },

  // Lactentes
  { value: '2-7 meses', label: 'Lactente inicial (2-7 meses)' },
  { value: '2-24 meses', label: 'Lactente (2-24 meses)' },

  // Crianças
  { value: '2-59 meses', label: 'Criança pequena (2-59 meses)' },
  { value: '2-72 meses', label: 'Criança (2-72 meses)' },
  { value: '3-144 meses', label: 'Criança/Adolescente (3-144 meses)' },
  { value: '15-24 meses', label: 'Criança (15-24 meses)' },
  { value: '15-72 meses', label: 'Criança (15-72 meses)' },

  // Adolescentes
  { value: '108-192 meses', label: 'Adolescente (9-16 anos)' },
  { value: '144-600 meses', label: 'Adolescente/Adulto (12-50 anos)' },

  // Adultos específicos
  { value: '216-600 meses', label: 'Adulto (18-50 anos)' },
  { value: '216-720 meses', label: 'Adulto (18-60 anos)' },
  { value: '216-1200 meses', label: 'Adulto (18-100 anos)' },

  // Faixas amplas
  { value: '6-1200 meses', label: 'Criança/Adulto (6 meses-100 anos)' },
  { value: '9-1440 meses', label: 'Criança/Adulto (9 meses-120 anos)' },
  { value: '12-708 meses', label: 'Criança/Adulto (12-708 meses)' },
  { value: '144-1200 meses', label: 'Adolescente/Adulto/Idoso (12-100 anos)' },
  { value: '0-1200 meses', label: 'Todas as idades (0-100 anos)' },
]

export function VaccineFormContent() {
  useAccessibilityValidation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const vaccineId = searchParams.get('id')
  const isEdit = !!vaccineId

  const { createVaccine, updateVaccine, getVaccineById, canManageVaccines } = useVaccineManagement()

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
      manufacturer: '',
      ageGroup: '',
      doses: [],
      batchNumber: '',
      description: '',
    },
  })

  const loadVaccine = useCallback(async () => {
    try {
      setLoading(true)
      const vaccine = await getVaccineById(vaccineId!)
      console.log('Dados da vacina carregada:', vaccine)
      reset({
        name: vaccine.name,
        manufacturer: vaccine.manufacturer || '',
        ageGroup: vaccine.ageGroup || '',
        doses: vaccine.doses || [],
        batchNumber: vaccine.batchNumber || '',
        description: vaccine.description || '',
      })
    } catch (error) {
      console.error('Erro ao carregar vacina:', error)
      toast.error('Erro ao carregar dados da vacina')
    } finally {
      setLoading(false)
    }
  }, [getVaccineById, vaccineId, reset])

  useEffect(() => {
    if (isEdit && vaccineId) {
      loadVaccine()
    }
  }, [isEdit, vaccineId, loadVaccine])

  const onSubmit = async (data: VaccineFormData) => {
    if (!canManageVaccines) {
      toast.error('Você não tem permissão para realizar esta ação')
      return
    }

    try {
      const vaccineData = {
        name: data.name.trim(),
        manufacturer: data.manufacturer.trim(),
        ageGroup: data.ageGroup,
        doses: data.doses,
        description: data.description?.trim() || '',
        lote: data.batchNumber?.trim() || '',
      }

      console.log('Dados do formulário sendo enviados:', JSON.stringify(vaccineData, null, 2))

      if (isEdit) {
        await updateVaccine(vaccineId!, vaccineData)
        toast.success(`Vacina "${data.name}" atualizada com sucesso!`, {
          description: 'Redirecionando para a lista de vacinas...',
        })

        // Dispara evento para atualizar a listagem
        window.dispatchEvent(new CustomEvent('refreshVaccines'))
      } else {
        await createVaccine(vaccineData)
        toast.success(`Vacina "${data.name}" criada com sucesso!`, {
          description: 'Redirecionando para a lista de vacinas...',
        })

        window.dispatchEvent(new CustomEvent('refreshVaccines'))
      }

      // Aguarda um pouco antes de redirecionar para o usuário ver o toast
      setTimeout(() => {
        router.push('/gestao-vacinas')
      }, 1000)
    } catch (error) {
      console.error('Erro ao salvar vacina:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Ocorreu um erro ao salvar a vacina'
      toast.error('Erro ao salvar', {
        description: errorMessage,
      })
    }
  }

  const handleCancel = () => {
    router.push('/gestao-vacinas')
  }

  const pageTitle = isEdit ? 'Editar vacina' : 'Adicionar vacina'
  const buttonText = isEdit ? 'Salvar' : 'Adicionar'

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-center text-lg">Carregando...</p>
      </div>
    )
  }

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
                title="Dose"
                placeholder="Selecione as doses"
                options={dosageOptions}
                value={watch('doses')}
                onValueChange={(value) => setValue('doses', Array.isArray(value) ? value : [value])}
                error={errors.doses?.message}
                fullWidth
                multiple
                showSelectedBadges
              />

              {/* Faixa etária recomendada */}
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

              {/* Fabricante */}
              <BvFormInput
                label="Fabricante"
                placeholder="Digite o nome do fabricante"
                error={errors.manufacturer?.message}
                {...register('manufacturer')}
              />

              {/* Lote da vacina */}
              <BvFormInput
                label="Lote da vacina"
                placeholder="Digite o número do lote"
                error={errors.batchNumber?.message}
                {...register('batchNumber')}
              />

              {/* Descrição */}
              <div className="lg:col-span-2">
                <BvFormInput
                  label="Descrição"
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
