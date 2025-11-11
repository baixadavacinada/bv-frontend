'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label' // <-- IMPORTAÇÃO CORRIGIDA
import { X } from 'lucide-react'
import { CreateHealthUnits, HealthUnit } from '@/types/health-units'
import { createHealtUnits, updateHealthUnits } from '@/services/actions/ubs-actions'
import convertHoursToFormData from '@/utils/convertNameHours'

const DEFAULT_LAT = '-22.643'
const DEFAULT_LON = '-43.655'

const operatingHourSchema = z.object({
  isOpen: z.boolean(),
  start: z.string(),
  end: z.string(),
})

const formSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  telefone: z.string(),
  cep: z
    .string()
    .min(9, 'CEP deve ter 9 dígitos (00000-000)')
    .max(9, 'CEP deve ter 9 dígitos (00000-000)'),
  logradouro: z.string().min(2, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatória'),
  latitude: z.string(),
  longitude: z.string(),

  operatingHours: z.object({
    segunda: operatingHourSchema,
    terca: operatingHourSchema,
    quarta: operatingHourSchema,
    quinta: operatingHourSchema,
    sexta: operatingHourSchema,
    sabado: operatingHourSchema,
    domingo: operatingHourSchema,
  }),
  tempoEsperaMedio: z.string().regex(/^\d{2}:\d{2}$/, 'Formato inválido. Use HH:MM (ex: 00:30)'),

  availableVaccines: z.array(z.string()),
})

export type UbsFormValues = z.infer<typeof formSchema>

const step1Fields: (keyof UbsFormValues)[] = [
  'nome',
  'telefone',
  'cep',
  'logradouro',
  'numero',
  'bairro',
  'cidade',
  'estado',
  'latitude',
  'longitude',
]

const step2Fields: (keyof UbsFormValues)[] = ['operatingHours', 'tempoEsperaMedio']

const daysOfWeek = [
  { key: 'segunda', label: 'Segunda' },
  { key: 'terca', label: 'Terça' },
  { key: 'quarta', label: 'Quarta' },
  { key: 'quinta', label: 'Quinta' },
  { key: 'sexta', label: 'Sexta' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' },
] as const

const defaultOperatingHours = {
  segunda: { isOpen: true, start: '08:00', end: '17:00' },
  terca: { isOpen: true, start: '08:00', end: '17:00' },
  quarta: { isOpen: true, start: '08:00', end: '17:00' },
  quinta: { isOpen: true, start: '08:00', end: '17:00' },
  sexta: { isOpen: true, start: '08:00', end: '17:00' },
  sabado: { isOpen: true, start: '08:00', end: '17:00' },
  domingo: { isOpen: false, start: '', end: '' },
}

const defaultValues: UbsFormValues = {
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
  operatingHours: defaultOperatingHours,
  tempoEsperaMedio: '00:30',
  availableVaccines: [],
}

interface UbsFormProps {
  initialData?: HealthUnit
  slug: string
}

export function UbsForm({ initialData, slug }: UbsFormProps) {
  const router = useRouter()
  useAccessibilityValidation({ enabled: true })

  const [step, setStep] = useState(1)
  const [vaccineInput, setVaccineInput] = useState('')
  console.log('Initial Data:', initialData)
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
        operatingHours: convertHoursToFormData(initialData.operatingHours, defaultOperatingHours),
        tempoEsperaMedio: initialData.averageWaitTime || '00:30',
        availableVaccines: initialData.availableVaccines || [],
      }
    : defaultValues

  const form = useForm<UbsFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: formData as UbsFormValues,
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
    return `https://maps.google.com/maps?q=${query}&hl=pt-BR&z=15&output=embed`
  }, [fullAddress, lat, lon])

  // --- 4. Função onSubmit ---
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
      operatingHours: {
        monday: `${values.operatingHours.segunda.start}-${values.operatingHours.segunda.end}`,
        tuesday: `${values.operatingHours.terca.start}-${values.operatingHours.terca.end}`,
        wednesday: `${values.operatingHours.quarta.start}-${values.operatingHours.quarta.end}`,
        thursday: `${values.operatingHours.quinta.start}-${values.operatingHours.quinta.end}`,
        friday: `${values.operatingHours.sexta.start}-${values.operatingHours.sexta.end}`,
        saturday: `${values.operatingHours.sabado.start}-${values.operatingHours.sabado.end}`,
        sunday: `${values.operatingHours.domingo.start}-${values.operatingHours.domingo.end}`,
      },
      availableVaccines: values.availableVaccines,
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

  // --- 5. Funções de Navegação e Lógica dos Passos ---
  const { isSubmitting, isDirty, isValid } = form.formState
  const selectedVaccines = form.watch('availableVaccines')

  // Função para avançar, validando campos do passo atual
  const handleNextStep = async (fields: (keyof UbsFormValues)[]) => {
    const isValid = await form.trigger(fields)
    if (isValid) {
      setStep((prev) => prev + 1)
    }
  }

  // Funções para gerenciar vacinas (Passo 3)
  const handleAddVaccine = () => {
    const trimmedInput = vaccineInput.trim()
    if (trimmedInput && !selectedVaccines.includes(trimmedInput)) {
      form.setValue('availableVaccines', [...selectedVaccines, trimmedInput], {
        shouldValidate: true,
      })
      setVaccineInput('')
    }
  }

  const handleRemoveVaccine = (vaccineToRemove: string) => {
    form.setValue(
      'availableVaccines',
      selectedVaccines.filter((v) => v !== vaccineToRemove),
      { shouldValidate: true },
    )
  }

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
        {/* PASSO 1: DADOS           */}

        {step === 1 && (
          <div className="space-y-8">
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
                        <Input placeholder="Digite aqui o Telefone da UBS" {...field} />
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
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="transparent"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={() => handleNextStep(step1Fields)}
                className="w-full sm:w-auto"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}

        {/* PASSO 2: HORÁRIOS           */}

        {step === 2 && (
          <div className="mx-auto max-w-lg space-y-8">
            <h2 className="text-xl font-semibold">Horário de funcionamento</h2>
            <div className="space-y-4">
              {daysOfWeek.map((day) => {
                const operatingHours = form.watch('operatingHours')
                const isOpen = operatingHours?.[day.key]?.isOpen

                return (
                  <div key={day.key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <FormField
                      control={form.control}
                      name={`operatingHours.${day.key}.isOpen` as const}
                      render={({ field }) => (
                        <FormItem className="col-span-3 flex flex-row items-center gap-4 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked)
                                if (!checked) {
                                  form.setValue(`operatingHours.${day.key}.start`, '')
                                  form.setValue(`operatingHours.${day.key}.end`, '')
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="flex-1 text-base font-normal">
                            {day.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`operatingHours.${day.key}.start` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="08:00" {...field} disabled={!isOpen} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="text-center">às</span>
                    <FormField
                      control={form.control}
                      name={`operatingHours.${day.key}.end` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="17:00" {...field} disabled={!isOpen} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )
              })}
            </div>

            <hr />

            <FormField
              control={form.control}
              name="tempoEsperaMedio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de espera médio para atendimento</FormLabel>
                  <FormControl>
                    <Input placeholder="00:30" {...field} className="max-w-xs" />
                  </FormControl>
                  <FormDescription>Use o formato HH:MM.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="transparent"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={() => handleNextStep(step2Fields)}
                className="w-full sm:w-auto"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
        {/* PASSO 3: VACINAS (CORRIGIDO)   */}
        {step === 3 && (
          <div className="mx-auto max-w-lg space-y-8">
            <h2 className="text-xl font-semibold">Adicionar vacinas disponíveis</h2>
            <div className="space-y-2">
              <Label htmlFor="nova-vacina">Adicionar nova vacina</Label>
              <div className="flex gap-2">
                <Input
                  id="nova-vacina"
                  placeholder="Digite aqui o nome da vacina"
                  value={vaccineInput}
                  onChange={(e) => setVaccineInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddVaccine()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddVaccine}>
                  Adicionar
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name="availableVaccines"
              render={() => (
                <FormItem>
                  <FormLabel>Vacinas selecionadas</FormLabel>
                  {selectedVaccines.length > 0 ? (
                    <div className="flex flex-wrap gap-2 rounded-md border p-4">
                      {selectedVaccines.map((vaccine) => (
                        <Badge key={vaccine} variant="secondary">
                          {vaccine}
                          <button
                            type="button"
                            className="ring-offset-background focus:ring-ring ml-2 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                            onClick={() => handleRemoveVaccine(vaccine)}
                          >
                            <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-[100px] items-center justify-center rounded-md border border-dashed">
                      <p className="text-muted-foreground text-sm">Nenhuma vacina selecionada.</p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse justify-end gap-4 sm:flex-row">
              <Button
                type="button"
                variant="transparent"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
              >
                Voltar
              </Button>

              <Button type="submit" className="w-full sm:w-auto">
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}
