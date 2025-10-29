import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import FileUpload, { type FileUploadRef } from '@/components/common/FileUpload'

const formSchema = z.object({
  title: z.string().min(2).max(100).nonempty(),
  author: z.string().min(2).max(100).nonempty(),
  description: z.string().min(10).max(500).nonempty(),
  file: z.instanceof(File).optional(),
})

type EducationalMaterialsFormData = z.infer<typeof formSchema>

export function EducationalMaterialsFormContent() {
  useAccessibilityValidation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const fileUploadRef = useRef<FileUploadRef>(null)

  const contentId = searchParams.get('id')
  const isEdit = !!contentId

  const pageTitle = isEdit ? 'Editar conteúdo' : 'Adicionar conteúdo'
  const buttonText = isEdit ? 'Salvar' : 'Adicionar'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<EducationalMaterialsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      description: '',
    },
  })

  useEffect(() => {
    if (isEdit) {
      const fetchContentData = async () => {
        const existingData = {
          title: 'Exemplo de Título',
          author: 'Autor Exemplo',
          description: 'Descrição do conteúdo de exemplo.',
        }
        reset(existingData)
      }
      fetchContentData()
    }
  }, [isEdit, contentId, reset])

  const handleFileSelect = (file: File | null) => {
    if (file) {
      clearErrors('file')
    }
  }

  const onSubmit = async (data: EducationalMaterialsFormData) => {
    // Validar se arquivo foi selecionado
    const file = fileUploadRef.current?.getFile()

    if (!file) {
      setError('file', {
        type: 'required',
        message: 'Por favor, selecione um arquivo',
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('author', data.author)
      formData.append('description', data.description)
      formData.append('file', file)

      if (isEdit) {
        console.log(
          'TODO: Atualizando conteúdo com ID:',
          contentId,
          'com dados:',
          data,
          'e arquivo:',
          file.name,
        )
        toast.success('Conteúdo atualizado com sucesso!')
      } else {
        console.log('TODO: Criando novo conteúdo com dados:', data, 'e arquivo:', file.name)
        toast.success('Conteúdo criado com sucesso!')
      }

      router.push('/materiais-educativos')
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error)
      toast.error('Ocorreu um erro ao salvar o conteúdo. Tente novamente.')
    }
  }

  const handleCancel = () => {
    router.push('/materiais-educativos')
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
        <h1 className="sr-only">{pageTitle} - Gestão de materiais educativos - Baixada Vacinada</h1>

        <BvTitleHeader title={pageTitle} className="mb-8" />

        <p className="text-base font-normal">
          Preencha as informações abaixo e adicione o conteúdo.
        </p>

        <section aria-labelledby="form-heading" className="mt-8">
          <h2 id="form-heading" className="sr-only">
            Formulário de {isEdit ? 'edição' : 'cadastro'} de material educativo
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <BvFormInput
              label="Título"
              placeholder="Digite o título do material"
              error={errors.title?.message}
              {...register('title')}
            />

            <BvFormInput
              label="Autor"
              placeholder="Digite o nome do autor"
              error={errors.author?.message}
              {...register('author')}
            />

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-base font-semibold text-gray-900"
              >
                Descrição
              </label>
              <Textarea
                id="description"
                placeholder="Digite a descrição do material"
                {...register('description')}
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <FileUpload
              ref={fileUploadRef}
              onFileSelect={handleFileSelect}
              error={errors.file?.message}
            />

            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:justify-end">
              <BvButton type="submit" isLoading={isSubmitting} title={buttonText} />

              <BvButton
                type="button"
                variant="ghost"
                onClick={handleCancel}
                title="Cancelar"
                className="text-primary"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
