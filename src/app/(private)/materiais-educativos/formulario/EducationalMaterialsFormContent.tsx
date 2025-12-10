import { BvButton, BvTitleHeader } from '@/components'
import { BvFormInput } from '@/components/design/BvFormInput'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { useGoogleDrivePicker } from '@/hooks/use-google-drive-picker'
import { FileUp, X } from 'lucide-react'

const formSchema = z.object({
  title: z.string().min(2).max(100).nonempty(),
  author: z.string().min(2).max(100).nonempty(),
  description: z.string().min(10).max(500).nonempty(),
  driveFile: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .optional(),
})

type EducationalMaterialsFormData = z.infer<typeof formSchema>

export function EducationalMaterialsFormContent() {
  useAccessibilityValidation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedFile, setSelectedFile] = useState<{
    id: string
    name: string
    url: string
  } | null>(null)

  const contentId = searchParams.get('id')
  const isEdit = !!contentId

  const pageTitle = isEdit ? 'Editar conteúdo' : 'Adicionar conteúdo'
  const buttonText = isEdit ? 'Salvar' : 'Adicionar'

  // Google Drive Picker
  const { openPicker } = useGoogleDrivePicker({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    folderId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID,
  })

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

  const handleOpenPicker = () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
      toast.error('Google API Key não configurada')
      return
    }

    openPicker(
      (file) => {
        setSelectedFile({
          id: file.id,
          name: file.name,
          url: file.webViewLink,
        })
        clearErrors('driveFile')
        toast.success(`Arquivo "${file.name}" selecionado`)
      },
      (error) => {
        toast.error(`Erro ao selecionar arquivo: ${error}`)
      },
    )
  }

  const onSubmit = async (data: EducationalMaterialsFormData) => {
    // Validar se arquivo foi selecionado
    if (!selectedFile) {
      setError('driveFile', {
        type: 'required',
        message: 'Por favor, selecione um arquivo do Google Drive',
      })
      return
    }

    try {
      if (isEdit) {
        toast.success('Conteúdo atualizado com sucesso!')
      } else {
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

            <div>
              <label className="mb-2 block text-base font-semibold text-gray-900">
                Arquivo do Google Drive
              </label>
              <div className="space-y-3">
                {selectedFile && (
                  <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-3">
                    <div className="text-sm text-green-800">
                      <p className="font-medium">Arquivo selecionado:</p>
                      <p className="break-all">{selectedFile.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}

                <BvButton
                  type="button"
                  title={selectedFile ? 'Alterar Arquivo' : 'Selecionar Arquivo do Google Drive'}
                  onClick={() => handleOpenPicker()}
                  leftIcon={<FileUp className="size-4" />}
                  className="w-full"
                />

                {errors.driveFile && (
                  <p className="text-sm text-red-500">{errors.driveFile.message}</p>
                )}
              </div>
            </div>

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
