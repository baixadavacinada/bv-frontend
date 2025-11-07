'use client'

import { useState } from 'react'
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
import { submitSurvey } from '@/app/(public)/ubs/actions' // Importando a server action
import { BvTitleHeader } from '@/components'

// Schema de validação
const formSchema = z.object({
  vaccineSuccess: z.string().min(1, 'Campo obrigatório'),
  waitTime: z.string().min(1, 'Campo obrigatório'),
  respectfulService: z.string().min(1, 'Campo obrigatório'),
  cleanLocation: z.string().min(1, 'Campo obrigatório'),
  recommendation: z.string().min(1, 'Campo obrigatório'),
  rating: z.number().min(1, 'Selecione pelo menos 1 estrela').max(5),
})

export default function OrderDetailsPage() {
  const params = useParams()
  const name = params.name as string

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vaccineSuccess: '',
      waitTime: '',
      respectfulService: '',
      cleanLocation: '',
      recommendation: '',
      rating: 4, // Valor inicial conforme imagem (4 estrelas amarelas)
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Chama a Server Action
      const result = await submitSurvey(values)
      if (result.success) {
        alert('Sucesso! ' + result.message)
        form.reset()
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao enviar avaliação.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg p-6">
      <BvTitleHeader title={'Avaliação da UBS'} className="mb-6" />

      <h2 className="mb-6 text-xl font-bold">UBS {name.replace(/-/g, ' ').replace(/ubs/g, '')}</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Grid de 2 colunas para os inputs */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="vaccineSuccess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal text-black">
                    Você conseguiu tomar a vacina no dia que procurou o posto de saúde?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Exemplo" className="h-12 border-none bg-white" {...field} />
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
                    Quanto tempo você esperou para ser atendido?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Exemplo" className="h-12 border-none bg-white" {...field} />
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
                    <Input placeholder="Exemplo" className="h-12 border-none bg-white" {...field} />
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
                    <Input placeholder="Exemplo" className="h-12 border-none bg-white" {...field} />
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
                    <Input placeholder="Exemplo" className="h-12 border-none bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seção de Rating de Estrelas */}
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
                          // Define o valor do formulário ao clicar
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

          {/* Botões de Ação em desktop e mobile */}
          <div className="flex flex-col items-center justify-between space-x-4 md:flex-row">
            <Button
              type="button"
              variant="outline"
              className="my-5 h-12 border-none bg-white px-12 text-lg text-indigo-900 hover:bg-gray-100"
              onClick={() => form.reset()}
            >
              Cancelar
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
