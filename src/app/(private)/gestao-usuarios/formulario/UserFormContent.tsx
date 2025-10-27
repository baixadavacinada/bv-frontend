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
import { cep, cpf, phone } from '@/schemas'

const userSchema = z.object({
  name: z.string().min(1, 'Nome do usuário é obrigatório'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine((val) => phone.safeParse(val).success, {
      message: 'Telefone inválido',
    }),
  perfil: z.string().min(1, 'Perfil é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine((val) => cpf.safeParse(val).success, {
      message: 'CPF inválido',
    }),
  address: z.string().min(1, 'Endereço é obrigatório'),
  neighborhood: z.string().optional(),
  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .refine((val) => cep.safeParse(val).success, {
      message: 'CEP inválido',
    }),
})

type UserFormData = z.infer<typeof userSchema>

interface User extends UserFormData {
  id: string
  createdAt: Date
  updatedAt: Date
}

const perfilOptions = [
  { value: 'morador', label: 'Morador' },
  { value: 'agente', label: 'Agente de saúde' },
]

export function UserFormContent() {
  useAccessibilityValidation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const userId = searchParams.get('id')
  const isEdit = !!userId

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      phone: '',
      perfil: '',
      email: '',
      cpf: '',
      address: '',
      neighborhood: '',
      cep: '',
    },
  })

  useEffect(() => {
    if (isEdit && userId) {
      const mockUser: User = {
        id: userId,
        name: 'Nome usuário',
        phone: '(11) 91234-5678',
        perfil: 'agente',
        email: 'usuario@example.com',
        cpf: '123.456.789-09',
        address: 'Rua Exemplo, 123',
        neighborhood: 'Bairro Exemplo',
        cep: '12345-678',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      reset(mockUser)
    }
  }, [isEdit, userId, reset])

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit) {
        console.log('Atualizando usuário:', { id: userId, ...data })
        toast.success(`Usuário "${data.name}" atualizado com sucesso!`)
      } else {
        console.log('Criando novo usuário:', data)
        toast.success(`Usuário "${data.name}" criado com sucesso!`)
      }

      router.push('/gestao-usuarios')
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      toast.error('Ocorreu um erro ao salvar o usuário. Tente novamente.')
    }
  }

  const handleCancel = () => {
    router.push('/gestao-usuarios')
  }

  const pageTitle = isEdit ? 'Editar usuário' : 'Adicionar usuário'
  const buttonText = isEdit ? 'Salvar' : 'Adicionar'

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
        <h1 className="sr-only">{pageTitle} - Gestão de Usuários - Baixada Vacinada</h1>

        <BvTitleHeader title={pageTitle} className="mb-8" />

        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">
            Formulário de {isEdit ? 'edição' : 'cadastro'} de usuário
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
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>

              {/* Telefone */}
              <BvFormInput
                label="Telefone"
                placeholder="(99) 99999-9999"
                required
                error={errors.phone?.message}
                {...register('phone')}
              />

              {/* Email */}
              <BvFormInput
                label="Email"
                type="email"
                placeholder="Digite o email do usuário"
                required
                error={errors.email?.message}
                {...register('email')}
              />

              {/* CPF */}
              <BvFormInput
                label="CPF"
                placeholder="999.999.999-99"
                required
                error={errors.cpf?.message}
                {...register('cpf')}
              />

              {/* Perfil */}
              <BvSelect
                title="Perfil"
                placeholder="Selecione o perfil"
                options={perfilOptions}
                value={watch('perfil')}
                onValueChange={(value) => setValue('perfil', value as string)}
                error={errors.perfil?.message}
                fullWidth
                showSelectedBadges={false}
              />

              {/* Endereço */}
              <BvFormInput
                label="Endereço"
                placeholder="Digite o endereço do usuário"
                required
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
                required
                error={errors.cep?.message}
                {...register('cep')}
              />
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
