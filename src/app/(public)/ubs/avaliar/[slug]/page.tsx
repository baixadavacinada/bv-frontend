'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Send, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BvTitleHeader } from '@/components'
import { toast } from 'sonner'
import { submitSurvey, listHealthUnits } from '@/services/actions/ubs-actions'
import { toSlug } from '@/utils/slug'

const formSchema = z.object({
  vaccineSuccess: z.string().min(1, 'Campo obrigatório'),
  waitTime: z.string().min(1, 'Campo obrigatório'),
  respectfulService: z.string().min(1, 'Campo obrigatório'),
  cleanLocation: z.string().min(1, 'Campo obrigatório'),
  recommendation: z.string().min(1, 'Campo obrigatório'),
  rating: z.number().min(1, 'Selecione pelo menos 1 estrela').max(5),
})

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
      vaccineSuccess: '',
      waitTime: '',
      respectfulService: '',
      cleanLocation: '',
      recommendation: '',
      rating: 4,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!ubs) {
      toast.error('UBS não encontrada')
      return
    }

    setIsSubmitting(true)
    const surveyData = {
      healthUnitId: ubs._id,
      comment: `Vacina obtida: ${values.vaccineSuccess} | Tempo de espera: ${values.waitTime} | Atendimento respeitoso: ${values.respectfulService} | Local limpo: ${values.cleanLocation} | Recomendação: ${values.recommendation}`,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="vaccineSuccess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal text-black">
                    Você conseguiu tomar a vacina no dia que procurou a Unidade de Saúde?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sim, consegui tomar a vacina"
                      className="h-12 border-none bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waitTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal text-black">
                    Quanto tempo você esperou para ser atendido na Unidade de Saúde?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 30 minutos"
                      className="h-12 border-none bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="respectfulService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal text-black">
                    O atendimento foi respeitoso e acolhedor?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sim, os profissionais foram muito atencioso"
                      className="h-12 border-none bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cleanLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal text-black">
                    O local estava limpo e organizado?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sim, o local estava bem limpo e organizado"
                      className="h-12 border-none bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recommendation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal text-black">
                    Você recomenda essa Unidade Básica de Saúde para amigos ou parentes?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sim, recomendo"
                      className="h-12 border-none bg-white"
                      {...field}
                    />
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
                  <FormLabel className="text-base font-normal text-black">
                    Qual sua avaliação geral da UBS?
                  </FormLabel>
                  <div className="pt-2">
                    <p className="mb-2 text-sm">Escolha de 1 a 5 estrelas para classificar</p>
                    <div className="flex justify-center gap-1 md:justify-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          className="transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= field.value
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-400 text-gray-500'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center justify-between space-x-4 md:flex-row">
            <Button
              type="button"
              variant="outline"
              className="my-5 h-12 border-none bg-white px-12 text-lg text-indigo-900 hover:bg-gray-100"
              onClick={() => form.reset()}
            >
              Apagar
            </Button>

            <Button
              type="submit"
              className="my-5 h-12 bg-[#483698] px-8 text-lg hover:bg-[#3a2b7a]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
