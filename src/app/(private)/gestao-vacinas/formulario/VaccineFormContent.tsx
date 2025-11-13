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
  doses: z.string().min(1, 'Doses são obrigatórias'),
  batchNumber: z.string().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
})

type VaccineFormData = z.infer<typeof vaccineSchema>

const dosageOptions = [
  { value: '1ª dose', label: '1ª dose' },
  { value: '2ª dose', label: '2ª dose' },
  { value: '3ª dose', label: '3ª dose' },
  { value: 'Reforço', label: 'Reforço' },
]

const ageGroupOptions = [
  { value: '0-28', label: 'Recém-nascido (0-28 dias)' },
  { value: '29-24', label: 'Lactente (29 dias - 2 anos)' },
  { value: '2-12', label: 'Criança (2-12 anos)' },
  { value: '12-18', label: 'Adolescente (12-18 anos)' },
  { value: '18-60', label: 'Adulto (18-60 anos)' },
  { value: '60+', label: 'Idoso (60+ anos)' },
  { value: 'Todas as idades', label: 'Todas as idades' },
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
      doses: '',
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
        doses: vaccine.doses?.join(', ') || '',
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
        doses: data.doses
          .split(',')
          .map((item: string) => item.trim())
          .filter(Boolean),
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
                placeholder="Selecione a dose"
                options={dosageOptions}
                value={watch('doses')}
                onValueChange={(value) => setValue('doses', value as string)}
                error={errors.doses?.message}
                fullWidth
                showSelectedBadges={false}
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
