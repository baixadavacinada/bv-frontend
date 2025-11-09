'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import BvSelect from '@/components/design/BvSelect'
import { Checkbox } from '@/components/ui/checkbox'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useUserManagement } from '@/services/user-management'
import { UserRole, ROLE_DISPLAY_NAMES } from '@/types/auth'

const userFormSchema = z.object({
  displayName: z.string().min(1, 'Nome do usuário é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  role: z.enum(['public', 'agent', 'admin']),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  cep: z.string().optional(),
  isActive: z.boolean(),
})

type UserFormData = z.infer<typeof userFormSchema>

const ROLE_OPTIONS = [
  { value: 'public', label: ROLE_DISPLAY_NAMES.public },
  { value: 'agent', label: ROLE_DISPLAY_NAMES.agent },
  { value: 'admin', label: ROLE_DISPLAY_NAMES.admin },
]

const DEFAULT_FORM_VALUES: UserFormData = {
  displayName: '',
  email: '',
  role: 'public',
  phone: '',
  cpf: '',
  address: '',
  neighborhood: '',
  cep: '',
  isActive: true,
}

export function UserFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  useAccessibilityValidation()

  const [loading, setLoading] = useState(false)
  const { canManageUsers, getUserById, createUser, updateUser } = useUserManagement()

  const userId = searchParams.get('id')
  const isEditMode = !!userId

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  /**
   * Carrega dados do usuário em modo de edição
   */
  useEffect(() => {
    const loadUserData = async () => {
      if (!isEditMode || !userId) return

      try {
        setLoading(true)
        const user = await getUserById(userId)

        reset({
          displayName: user.displayName || '',
          email: user.email,
          role: user.role,
          phone: user.profile?.personalData?.phone || '',
          cpf: user.profile?.personalData?.cpf || '',
          address: user.profile?.personalData?.address || '',
          neighborhood: user.profile?.personalData?.neighborhood || '',
          cep: user.profile?.personalData?.cep || '',
          isActive: user.isActive,
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar usuário'
        toast.error(errorMessage)
        router.push('/gestao-usuarios')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [isEditMode, userId, getUserById, reset, router])

  /**
   * Prepara dados pessoais para envio
   */
  const preparePersonalData = (data: UserFormData) => {
    const hasPersonalData = data.phone || data.cpf || data.address || data.neighborhood || data.cep

    if (!hasPersonalData) return undefined

    return {
      name: data.displayName,
      phone: data.phone || '',
      cpf: data.cpf || '',
      address: data.address || '',
      neighborhood: data.neighborhood || '',
      cep: data.cep || '',
    }
  }

  /**
   * Atualiza usuário existente
   */
  const handleUpdateUser = async (data: UserFormData) => {
    if (!userId) return

    const updateData = {
      displayName: data.displayName,
      role: data.role as UserRole,
      isActive: data.isActive,
      personalData: {
        name: data.displayName,
        phone: data.phone || undefined,
        cpf: data.cpf || undefined,
        address: data.address || undefined,
        neighborhood: data.neighborhood || undefined,
        cep: data.cep || undefined,
      },
    }

    await updateUser(userId, updateData)
    toast.success(`Usuário "${data.displayName}" atualizado com sucesso!`)
  }

  /**
   * Cria novo usuário
   */
  const handleCreateUser = async (data: UserFormData) => {
    const createData = {
      email: data.email,
      displayName: data.displayName,
      role: data.role as UserRole,
      isActive: data.isActive,
      personalData: preparePersonalData(data),
    }

    await createUser(createData)
    toast.success(`Usuário "${data.displayName}" criado com sucesso!`)
  }

  const onSubmit = async (data: UserFormData) => {
    if (!canManageUsers) {
      toast.error('Você não tem permissão para gerenciar usuários')
      return
    }

    try {
      setLoading(true)

      if (isEditMode) {
        await handleUpdateUser(data)
      } else {
        await handleCreateUser(data)
      }

      router.push('/gestao-usuarios')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao salvar usuário'
      console.error('Erro ao salvar usuário:', error)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/gestao-usuarios')
  }

  const pageTitle = isEditMode ? 'Editar usuário' : 'Adicionar usuário'
  const submitButtonText = isEditMode ? 'Salvar' : 'Adicionar'
  const isFormDisabled = isSubmitting || loading

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
        <h1 className="sr-only">{pageTitle} - Gestão de Usuários - Baixada Vacinada</h1>

        <BvTitleHeader title={pageTitle} className="mb-8" />

        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">
            Formulário de {isEditMode ? 'edição' : 'cadastro'} de usuário
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <fieldset className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <legend className="sr-only">Dados do usuário</legend>

              {/* Nome do usuário */}
              <div className="lg:col-span-2">
                <BvFormInput
                  label="Nome do usuário"
                  placeholder="Digite o nome do usuário"
                  required
                  error={errors.displayName?.message}
                  {...register('displayName')}
                />
              </div>

              {/* Email */}
              <BvFormInput
                label="Email"
                type="email"
                placeholder="Digite o email do usuário"
                required
                error={errors.email?.message}
                disabled={isEditMode}
                {...register('email')}
              />

              {/* Perfil */}
              <BvSelect
                title="Perfil"
                placeholder="Selecione o perfil"
                options={ROLE_OPTIONS}
                value={watch('role')}
                onValueChange={(value) => setValue('role', value as UserRole)}
                error={errors.role?.message}
                fullWidth
                showSelectedBadges={false}
              />

              {/* Telefone */}
              <BvFormInput
                label="Telefone"
                placeholder="(99) 99999-9999"
                error={errors.phone?.message}
                {...register('phone')}
              />

              {/* CPF */}
              <BvFormInput
                label="CPF"
                placeholder="999.999.999-99"
                error={errors.cpf?.message}
                {...register('cpf')}
              />

              {/* Endereço */}
              <BvFormInput
                label="Endereço"
                placeholder="Digite o endereço do usuário"
                error={errors.address?.message}
                {...register('address')}
              />

              {/* Bairro */}
              <BvFormInput
                label="Bairro"
                placeholder="Digite o bairro do usuário"
                error={errors.neighborhood?.message}
                {...register('neighborhood')}
              />

              {/* CEP */}
              <BvFormInput
                label="CEP"
                placeholder="99999-999"
                error={errors.cep?.message}
                {...register('cep')}
              />

              {/* Status do usuário (apenas em modo de edição) */}
              {isEditMode && (
                <div className="lg:col-span-2">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={watch('isActive')}
                      onCheckedChange={(value) => setValue('isActive', value as boolean)}
                      {...register('isActive')}
                      className="border-gray-300 bg-white"
                      aria-label="Usuário ativo"
                    />
                    <span className="text-sm font-medium text-gray-700">Usuário ativo</span>
                  </label>
                </div>
              )}
            </fieldset>

            <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:justify-end">
              <BvButton
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full lg:w-auto"
                title="Cancelar"
                disabled={isFormDisabled}
              />

              <BvButton
                type="submit"
                isLoading={isFormDisabled}
                className="w-full lg:w-auto"
                title={submitButtonText}
                disabled={isFormDisabled}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
