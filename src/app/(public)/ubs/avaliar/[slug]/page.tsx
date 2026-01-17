'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { BvTitleHeader } from '@/components'
import { toast } from 'sonner'
import { submitSurvey, listHealthUnits } from '@/services/actions/ubs-actions'
import { toSlug } from '@/utils/slug'
import { FaceRating } from '@/components/design/FaceRating'
import { NPSScale } from '@/components/design/NPSScale'
import { StarRating } from '@/components/design/StarRating'

const formSchema = z
  .object({
    vaccineSuccessRating: z.number().int().min(1).max(5).optional(),
    waitTimeRating: z.number().int().min(1).max(5).optional(),
    respectfulServiceRating: z.number().int().min(1).max(5).optional(),
    cleanLocationRating: z.number().int().min(1).max(5).optional(),
    rating: z.number().int().min(1).max(5).optional(),
    npsScore: z.number().int().min(0).max(10).optional(),
  })
  .refine(
    (data) => {
      return (
        data.vaccineSuccessRating !== undefined &&
        data.waitTimeRating !== undefined &&
        data.respectfulServiceRating !== undefined &&
        data.cleanLocationRating !== undefined &&
        data.rating !== undefined &&
        data.npsScore !== undefined
      )
    },
    {
      message: 'Por favor, complete todas as avaliações',
    },
  )

interface HealthUnit {
  _id: string
  name: string
  neighborhood: string
  city: string
  address: string
}

export default function AvaliarUbsPage() {
  const params = useParams()
  const slug = params.slug as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  const [ubs, setUbs] = useState<HealthUnit | null>(null)
  const [loading, setLoading] = useState(true)

  // Buscar UBS pelo slug
  useEffect(() => {
    const loadUbs = async () => {
      try {
        setLoading(true)
        const data = await listHealthUnits()
        const ubsList = Array.isArray(data) ? data : (data as { data: HealthUnit[] })?.data || []

        // Encontrar UBS pelo slug
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

    if (slug) {
      loadUbs()
    }
  }, [slug])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vaccineSuccessRating: undefined,
      waitTimeRating: undefined,
      respectfulServiceRating: undefined,
      cleanLocationRating: undefined,
      npsScore: undefined,
      rating: undefined,
    },
    mode: 'onBlur',
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!ubs) {
      toast.error('UBS não encontrada')
      return
    }

    setIsSubmitting(true)
    const surveyData = {
      healthUnitId: ubs._id,
      vaccineSuccessRating: values.vaccineSuccessRating,
      waitTimeRating: values.waitTimeRating,
      respectfulServiceRating: values.respectfulServiceRating,
      cleanLocationRating: values.cleanLocationRating,
      npsScore: values.npsScore,
      rating: values.rating,
      isAnonymous: true,
    }
    try {
      await submitSurvey(surveyData)
      setShowSuccessScreen(true)
      form.reset()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao enviar avaliação.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
          <p className="mt-2 text-gray-600">Carregando dados da UBS...</p>
        </div>
      </div>
    )
  }

  // UBS not found
  if (!ubs) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">UBS não encontrada</h2>
          <p className="mt-2 text-gray-600">A unidade de saúde solicitada não foi encontrada.</p>
          <Button onClick={() => window.history.back()} className="mt-4">
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  // Success screen
  if (showSuccessScreen) {
    return (
      <div className="from-primary flex min-h-screen items-center justify-center bg-gradient-to-br to-indigo-100 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
              Sua avaliação foi enviada com sucesso e nos ajudará a melhorar nossos serviços.
            </p>
          </div>

          <Button
            onClick={() => setShowSuccessScreen(false)}
            className="w-full bg-[#483698] py-3 text-white hover:bg-[#3a2b7a]"
          >
            Fazer nova avaliação
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="mt-3 w-full border-gray-300 py-3 text-gray-700 hover:bg-gray-50"
          >
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg p-6">
      <BvTitleHeader title={`Avaliação: ${ubs?.name || 'Carregando...'}`} className="mb-6" />

      {/* <h2 className="mb-6 text-xl font-bold">UBS {name.replace(/-/g, ' ').replace(/ubs/g, '')}</h2> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <FormField
            control={form.control}
            name="vaccineSuccessRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-lg font-medium text-gray-900">
                  Você conseguiu fazer o que veio fazer?
                </FormLabel>
                <p className="mb-4 text-sm text-gray-600">
                  Tomar vacina, fazer consulta, exame ou ser atendido
                </p>
                <FormControl>
                  <FaceRating value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waitTimeRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-lg font-medium text-gray-900">
                  Ficou muito tempo esperando?
                </FormLabel>
                <p className="mb-4 text-sm text-gray-600">
                  Quanto tempo você esperou até ser atendido
                </p>
                <FormControl>
                  <FaceRating value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="respectfulServiceRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-lg font-medium text-gray-900">
                  Foi bem tratado pelos profissionais?
                </FormLabel>
                <p className="mb-4 text-sm text-gray-600">
                  Os profissionais foram atenciosos e respeitosos
                </p>
                <FormControl>
                  <FaceRating value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cleanLocationRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-lg font-medium text-gray-900">
                  O local foi limpo e organizado?
                </FormLabel>
                <p className="mb-4 text-sm text-gray-600">
                  Sala de espera, consultórios e banheiros limpos
                </p>
                <FormControl>
                  <FaceRating value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-lg font-medium text-gray-900">
                  Qual sua avaliação geral da UBS?
                </FormLabel>
                <p className="mb-4 text-sm text-gray-600">
                  Escolha de 1 a 5 estrelas para classificar
                </p>
                <FormControl>
                  <StarRating value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="npsScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-lg font-medium text-gray-900">
                  Você recomenda essa unidade para amigos ou parentes?
                </FormLabel>
                <p className="mb-4 text-sm text-gray-600">
                  Clique no número que melhor representa sua avaliação
                </p>
                <FormControl>
                  <NPSScale value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center justify-between space-x-4 md:flex-row">
            <Button
              type="button"
              variant="outline"
              className="my-5 h-12 border-none bg-white px-12 text-lg text-indigo-900 hover:bg-gray-100"
              onClick={() => form.reset()}
            >
              Limpar formulário
            </Button>

            <Button
              type="submit"
              className="my-5 h-12 bg-[#483698] px-8 text-lg hover:bg-[#3a2b7a]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar avaliação
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
