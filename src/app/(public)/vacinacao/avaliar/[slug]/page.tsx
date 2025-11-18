'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Send, ArrowLeft } from 'lucide-react'
import { BvButton, BvTitleHeader } from '@/components'
import { toast } from 'sonner'
import { submitSurvey, listHealthUnits } from '@/services/actions/ubs-actions'
import { toSlug } from '@/utils/slug'
import { FaceRating } from '@/components/design/FaceRating'
import { NPSScale } from '@/components/design/NPSScale'
import { StarRating } from '@/components/design/StarRating'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  vaccineSuccessRating: z
    .number({
      message: 'Por favor, avalie se conseguiu tomar a vacina',
    })
    .int('Selecione uma opção válida')
    .min(1, 'Selecione pelo menos 1 estrela')
    .max(5, 'Máximo 5 estrelas'),

  waitTimeRating: z
    .number({
      message: 'Por favor, avalie o tempo de espera',
    })
    .int('Selecione uma opção válida')
    .min(1, 'Selecione pelo menos 1 estrela')
    .max(5, 'Máximo 5 estrelas'),

  respectfulServiceRating: z
    .number({
      message: 'Por favor, avalie o atendimento dos profissionais',
    })
    .int('Selecione uma opção válida')
    .min(1, 'Selecione pelo menos 1 estrela')
    .max(5, 'Máximo 5 estrelas'),

  cleanLocationRating: z
    .number({
      message: 'Por favor, avalie a limpeza e organização do local',
    })
    .int('Selecione uma opção válida')
    .min(1, 'Selecione pelo menos 1 estrela')
    .max(5, 'Máximo 5 estrelas'),

  rating: z
    .number({
      message: 'Por favor, dê uma avaliação geral da experiência',
    })
    .int('Selecione uma opção válida')
    .min(1, 'Selecione pelo menos 1 estrela')
    .max(5, 'Máximo 5 estrelas'),

  npsScore: z
    .number({
      message: 'Por favor, indique se recomenda esta unidade',
    })
    .int('Selecione uma opção válida')
    .min(0, 'Mínimo 0')
    .max(10, 'Máximo 10'),
})

// Configuração dos campos de avaliação
const EVALUATION_FIELDS = [
  {
    name: 'vaccineSuccessRating' as const,
    title: 'Você conseguiu tomar a vacina que precisava?',
    description: 'Avalie se conseguiu ser atendido e vacinado conforme esperado',
    component: FaceRating,
    required: true,
  },
  {
    name: 'waitTimeRating' as const,
    title: 'Ficou muito tempo esperando?',
    description: 'Quanto tempo você esperou até ser atendido para a vacinação',
    component: FaceRating,
    required: true,
  },
  {
    name: 'respectfulServiceRating' as const,
    title: 'Foi bem tratado pelos profissionais?',
    description: 'Os profissionais de saúde foram atenciosos e respeitosos durante a vacinação',
    component: FaceRating,
    required: true,
  },
  {
    name: 'cleanLocationRating' as const,
    title: 'O local foi limpo e organizado?',
    description: 'Sala de espera, sala de vacinação e banheiros estavam limpos',
    component: FaceRating,
    required: true,
  },
  {
    name: 'rating' as const,
    title: 'Qual sua avaliação geral da experiência de vacinação?',
    description: 'Escolha de 1 a 5 estrelas para classificar sua experiência geral',
    component: StarRating,
    required: true,
  },
  {
    name: 'npsScore' as const,
    title: 'Você recomenda essa unidade para vacinação?',
    description: 'Clique no número que melhor representa sua recomendação',
    component: NPSScale,
    required: true,
  },
] as const

interface HealthUnit {
  _id: string
  name: string
  neighborhood: string
  city: string
  address: string
}

// gerenciar o estado da UBS
function useHealthUnit(slug: string) {
  const [ubs, setUbs] = useState<HealthUnit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const loadUbs = async () => {
      try {
        setLoading(true)
        const data = await listHealthUnits()
        const ubsList = Array.isArray(data) ? data : (data as { data: HealthUnit[] })?.data || []

        const foundUbs = ubsList.find((u: HealthUnit) => toSlug(u.name) === slug)

        if (foundUbs) {
          setUbs(foundUbs)
        } else {
          toast.error('UBS não encontrada')
        }
      } catch (error) {
        console.error('Erro ao carregar UBS:', error)
        toast.error('Erro ao carregar dados da UBS')
      } finally {
        setLoading(false)
      }
    }

    loadUbs()
  }, [slug])

  return { ubs, loading }
}

// gerenciar o envio da avaliação
function useSurveySubmission(ubs: HealthUnit | null, onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitEvaluation = async (values: z.infer<typeof formSchema>) => {
    if (!ubs) {
      toast.error('UBS não encontrada')
      return
    }

    setIsSubmitting(true)
    try {
      await submitSurvey({
        healthUnitId: ubs._id,
        ...values,
        isAnonymous: true,
      })
      onSuccess()
      toast.success('Avaliação enviada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao enviar avaliação.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, submitEvaluation }
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
        <p className="mt-2 text-gray-600">Carregando dados da UBS...</p>
      </div>
    </div>
  )
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">UBS não encontrada</h2>
        <p className="mt-2 text-gray-600">A unidade de saúde solicitada não foi encontrada.</p>
        <BvButton
          onClick={onBack}
          className="mt-4"
          title="Voltar"
          leftIcon={<ArrowLeft className="mr-2 h-4 w-4" />}
        />
      </div>
    </div>
  )
}

function SuccessState({
  onNewEvaluation,
  router,
}: {
  onNewEvaluation: () => void
  router: ReturnType<typeof useRouter>
}) {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Obrigado pelo seu feedback!</h2>
          <p className="text-gray-600">
            Sua avaliação sobre a experiência de vacinação foi enviada com sucesso e nos ajudará a
            melhorar nossos serviços.
          </p>
        </div>

        <div className="space-y-3">
          <BvButton onClick={onNewEvaluation} title="Fazer nova avaliação" className="w-full" />
          <BvButton
            onClick={() => router.push('/cartilha-vacinas?tab=minhas-vacinas')}
            className="w-full bg-green-600 text-white hover:bg-green-700"
            title="Ver meus registros de vacinação"
          />
          <BvButton
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
            title="Ir para Início"
          />
        </div>
      </div>
    </div>
  )
}

export default function AvaliarVacinacaoPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [showSuccessScreen, setShowSuccessScreen] = useState(false)

  const { ubs, loading } = useHealthUnit(slug)
  const { isSubmitting, submitEvaluation } = useSurveySubmission(ubs, () => {
    setShowSuccessScreen(true)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      vaccineSuccessRating: undefined,
      waitTimeRating: undefined,
      respectfulServiceRating: undefined,
      cleanLocationRating: undefined,
      rating: undefined,
      npsScore: undefined,
    },
  })

  const validateForm = () => {
    const values = form.getValues()
    const missingFields: string[] = []

    EVALUATION_FIELDS.forEach((field) => {
      if (field.required && (values[field.name] === undefined || values[field.name] === null)) {
        missingFields.push(field.title)
      }
    })

    if (missingFields.length > 0) {
      const fieldsList = missingFields.map((field, index) => `${index + 1}. ${field}`).join('\n')
      toast.error(`Por favor, preencha todos os campos obrigatórios:\n\n${fieldsList}`, {
        duration: 5000,
      })
      return false
    }

    return true
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!validateForm()) {
      return
    }
    await submitEvaluation(values)
  }

  if (loading) return <LoadingState />
  if (!ubs) return <NotFoundState onBack={() => router.back()} />
  if (showSuccessScreen)
    return <SuccessState onNewEvaluation={() => setShowSuccessScreen(false)} router={router} />

  return (
    <>
      <BvTitleHeader title={`Avalie sua experiência de vacinação`} className="mb-6" />
      <div className="mx-auto max-w-4xl md:p-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">{ubs?.name}</h2>
          <p className="text-gray-600">
            {ubs?.address} - {ubs?.neighborhood}, {ubs?.city}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Sua opinião é importante para melhorarmos os serviços de vacinação
          </div>
        </div>

        <div className="rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-sm md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 md:space-y-10">
              {EVALUATION_FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => {
                    const Component = field.component
                    return (
                      <FormItem>
                        <FormLabel className="mb-2 block text-base font-medium text-gray-900 md:text-lg">
                          {field.title}
                          {field.required && <span className="ml-1 text-red-500">*</span>}
                        </FormLabel>
                        <p className="mb-4 text-sm text-gray-600">{field.description}</p>
                        <FormControl>
                          <Component value={formField.value} onChange={formField.onChange} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )
                  }}
                />
              ))}

              <div className="flex flex-col items-center justify-between space-y-4 pt-6 md:flex-row md:space-y-0 md:space-x-4">
                <BvButton
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                  title="Limpar Formulário"
                  className="w-full md:w-auto"
                />

                <BvButton
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  title={isSubmitting ? 'Enviando...' : 'Enviar avaliação'}
                  rightIcon={<Send className="h-4 w-4" />}
                  className="w-full md:w-auto"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
