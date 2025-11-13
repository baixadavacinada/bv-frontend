import { z } from 'zod'

const requiredText = z.string().min(1, 'Este campo é obrigatório').trim()
const optionalText = z.string().optional()
const date = z
  .string()
  .min(1, 'Este campo é obrigatório')
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida')
  .refine((date) => {
    const [d, m, y] = date.split('/').map(Number)
    const dt = new Date(y, m - 1, d)
    return dt.getDate() === d && dt.getMonth() === m - 1 && dt.getFullYear() === y
  }, 'Data inválida')

export const vaccinationSchema = z
  .object({
    vaccineId: z.string().optional(),

    vaccineName: requiredText.min(2, 'Nome da vacina deve ter pelo menos 2 caracteres'),
    manufacturer: optionalText,

    batchNumber: optionalText.refine(
      (val) => !val || val.length <= 50,
      'Número do lote deve ter no máximo 50 caracteres',
    ),

    applicationDate: date,
    applicationTime: z.string().optional(),
    dose: z.enum(['1ª dose', '2ª dose', '3ª dose', 'dose única', 'reforço'], {
      message: 'Selecione uma dose válida',
    }),

    healthUnitId: z.string().optional(),
    healthUnitName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),

    customLocation: optionalText,
    customCity: optionalText,
    customState: z.string().optional(),

    appliedBy: optionalText,

    notes: optionalText.refine(
      (val) => !val || val.length <= 500,
      'Observações devem ter no máximo 500 caracteres',
    ),

    adverseReaction: z.boolean().default(false),
    reactionDescription: optionalText.refine(
      (val) => !val || val.length <= 500,
      'Descrição da reação deve ter no máximo 500 caracteres',
    ),

    nextDoseDate: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      return data.healthUnitId || data.customLocation
    },
    {
      message: 'Informe o local da vacinação (UBS ou local personalizado)',
      path: ['healthUnitId'],
    },
  )

export type VaccinationFormData = z.infer<typeof vaccinationSchema>

export const doseTypes = [
  { value: '1ª dose', label: '1ª dose' },
  { value: '2ª dose', label: '2ª dose' },
  { value: '3ª dose', label: '3ª dose' },
  { value: 'dose única', label: 'Dose única' },
  { value: 'reforço', label: 'Reforço' },
] as const

export interface VaccineFromDB {
  _id: string
  id: string
  name: string
  manufacturer: string
  doses: string[]
  ageGroup: string
  description?: string
  batchNumber?: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface HealthUnitFromDB {
  _id: string
  id: string
  name: string
  address: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  phone?: string
}

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
] as const
