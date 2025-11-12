'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { useCEPLookup } from '@/hooks/use-cep-lookup'
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
import { CreateHealthUnits, HealthUnit } from '@/types/health-units'
import { createHealtUnits, updateHealthUnits } from '@/services/actions/ubs-actions'

const DEFAULT_LAT = '-22.643'
const DEFAULT_LON = '-43.655'

const formSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  telefone: z
    .string()
    .max(15, 'Telefone deve ter no máximo 15 caracteres')
    .regex(/^[\d\s\-\(\)]*$/, 'Telefone deve conter apenas números e caracteres especiais'),
  cep: z
    .string()
    .length(8, 'CEP deve ter 8 dígitos')
    .regex(/^\d{5}-?\d{3}$/, 'Formato inválido de CEP'),
  logradouro: z.string().min(2, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatória'),
  latitude: z.string(),
  longitude: z.string(),
})

type UbsFormValues = z.infer<typeof formSchema>

const defaultValues = {
  nome: '',
  telefone: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: 'Rio de Janeiro',
  estado: 'RJ',
  latitude: DEFAULT_LAT,
  longitude: DEFAULT_LON,
}

interface UbsFormProps {
  initialData?: HealthUnit
  slug: string
}

export function UbsForm({ initialData, slug }: UbsFormProps) {
  const router = useRouter()
  useAccessibilityValidation({ enabled: true })
  const { lookupCEP, isLoading: cepLoading, error: cepError } = useCEPLookup()
  const [logradouroPreenchido, setLogradouroPreenchido] = useState(!!initialData?.address)

  const formData = initialData
    ? {
        nome: String(initialData.name || ''),
        cep: String(initialData.zipCode || ''),
        telefone: String(initialData.phone),
        logradouro: String(initialData.address || ''),
        numero: String(initialData.number || 'S/N'),
        bairro: String(initialData.neighborhood || ''),
        cidade: String(initialData.city || 'Rio de Janeiro'),
        estado: String(initialData.state || 'RJ'),
        latitude: String(initialData.geolocation.lat) || DEFAULT_LAT,
        longitude: String(initialData.geolocation.lng) || DEFAULT_LON,
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
    const data: CreateHealthUnits = {
      name: values.nome,
      address: values.logradouro,
      neighborhood: values.bairro,
      city: values.cidade,
      state: values.estado,
      zipCode: values.cep,
      phone: values.telefone,
      geolocation: {
        lat: values.latitude,
        lng: values.longitude,
      },
      operatingHours: {},
      availableVaccines: [],
      isActive: true,
    }
    try {
      if (initialData) {
        await updateHealthUnits(slug, data)
        toast.success('Unidade de saúde atualizada com sucesso!')
      } else {
        await createHealtUnits(data)
        toast.success('Unidade de saúde criada com sucesso!')
      }
      router.back()
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
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="(11) 99999-9999"
                        {...field}
                        maxLength={15}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 11) {
                            field.onChange(e)
                          } else {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span className="mt-1 block text-xs text-gray-500">
                        {field.value?.length || 0}/15 caracteres
                      </span>
                    </div>
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
                    <div>
                      <Input
                        placeholder="00000-000"
                        {...field}
                        maxLength={9}
                        disabled={cepLoading}
                        onChange={async (e) => {
                          const value = e.target.value
                          field.onChange(value)

                          if (value.replace(/\D/g, '').length === 8) {
                            const address = await lookupCEP(value)
                            if (address) {
                              form.setValue('logradouro', address.logradouro)
                              form.setValue('bairro', address.bairro)
                              form.setValue('cidade', address.localidade)
                              form.setValue('estado', address.uf)
                              setLogradouroPreenchido(true)
                              toast.success('Endereço carregado com sucesso!')
                            }
                          }
                        }}
                      />
                      {cepError && (
                        <span className="mt-1 block text-xs text-red-500">{cepError}</span>
                      )}
                      {cepLoading && (
                        <span className="mt-1 block text-xs text-blue-500">Buscando CEP...</span>
                      )}
                      <span className="mt-1 block text-xs text-gray-500">
                        {field.value?.length || 0}/9 caracteres
                      </span>
                    </div>
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
                  <FormLabel>
                    Logradouro
                    {logradouroPreenchido && (
                      <span className="text-xs text-gray-500"> (travado após preenchimento)</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua, Avenida, etc."
                      {...field}
                      disabled={logradouroPreenchido}
                      onChange={(e) => {
                        field.onChange(e)
                        if (e.target.value.length > 2) {
                          setLogradouroPreenchido(true)
                        }
                      }}
                      title={logradouroPreenchido ? 'Campo travado. Edite apenas o número.' : ''}
                    />
                  </FormControl>
                  {logradouroPreenchido && (
                    <p className="mt-1 text-xs text-blue-600">
                      ✓ Preenchido automaticamente. Edite apenas o número abaixo.
                    </p>
                  )}
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
            <div className="grid grid-cols-2 gap-4">
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
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
