'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
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

const DEFAULT_LAT = -22.643
const DEFAULT_LON = -43.655

const formSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  cep: z.string().length(9, 'CEP deve ter 9 dígitos (00000-000)'),
  logradouro: z.string().min(2, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  latitude: z.number(),
  longitude: z.number(),
})

type UbsFormValues = z.infer<typeof formSchema>

const defaultValues = {
  nome: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: 'Rio de Janeiro',
  latitude: DEFAULT_LAT,
  longitude: DEFAULT_LON,
}

interface UbsFormProps {
  initialData?: UbsFormValues
}

export function UbsForm({ initialData }: UbsFormProps) {
  const router = useRouter()
  useAccessibilityValidation({ enabled: true })

  const formData = initialData
    ? {
        nome: String(initialData.nome || ''),
        cep: String(initialData.cep || ''),
        logradouro: String(initialData.logradouro || ''),
        numero: String(initialData.numero || ''),
        bairro: String(initialData.bairro || ''),
        cidade: String(initialData.cidade || 'Rio de Janeiro'),
        latitude: Number(initialData.latitude) || DEFAULT_LAT,
        longitude: Number(initialData.longitude) || DEFAULT_LON,
      }
    : defaultValues

  const form = useForm<UbsFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: formData,
  })

  const [lat, lon] = form.watch(['latitude', 'longitude'])

  const [logradouro, numero, bairro, cidade] = form.watch([
    'logradouro',
    'numero',
    'bairro',
    'cidade',
  ])

  const fullAddress = useMemo(() => {
    if (logradouro && numero && bairro && cidade) {
      return `${logradouro}, ${numero}, ${bairro}, ${cidade}`
    }
    return null
  }, [logradouro, numero, bairro, cidade])

  const mapSrc = useMemo(() => {
    const query = fullAddress ? encodeURIComponent(fullAddress) : `${lat},${lon}`

    return `https://maps.google.com/maps?q=$${query}&hl=pt-BR&z=15&output=embed`
  }, [fullAddress, lat, lon])

  async function onSubmit(values: UbsFormValues) {
    try {
      console.log('Enviando dados:', values)

      if (values.nome.toLowerCase() === 'ubs repetida') {
        form.setError('nome', {
          type: 'server',
          message: 'Uma UBS com este nome já existe.',
        })
        return
      }

      toast.success(initialData ? 'UBS atualizada com sucesso!' : 'UBS cadastrada com sucesso!')
      router.push('/gestao-ubs')
      router.refresh()
      form.reset(values)
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Ocorreu um erro inesperado ao salvar.')
    }
  }

  const { isSubmitting, isDirty, isValid } = form.formState
  const handleCancel = () => {
    if (!isDirty) {
      router.back()
      return
    }
    if (window.confirm('Você tem alterações não salvas. Deseja realmente cancelar?')) {
      form.reset()
      router.back()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui o nome da UBS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logradouro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, Avenida, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="S/N" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="aspect-video h-full w-full overflow-hidden rounded-md border">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc}
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <Button
            type="button"
            variant="transparent"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting || !isValid || (!isDirty && !!initialData)}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
