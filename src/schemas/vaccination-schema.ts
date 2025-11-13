import { z } from 'zod'

const optionalText = z.string().optional()
const date = z
  .string()
  .min(1, 'Data da aplicação é obrigatória')
  .refine((date) => {
    // Aceita formatos: dd/mm/aaaa ou yyyy-mm-dd
    const ddmmyyyy = /^\d{2}\/\d{2}\/\d{4}$/
    const yyyymmdd = /^\d{4}-\d{2}-\d{2}$/

    if (ddmmyyyy.test(date)) {
      const [d, m, y] = date.split('/').map(Number)
      const dt = new Date(y, m - 1, d)
      return dt.getDate() === d && dt.getMonth() === m - 1 && dt.getFullYear() === y
    }

    if (yyyymmdd.test(date)) {
      const dt = new Date(date)
      return !isNaN(dt.getTime())
    }

    return false
  }, 'Data inválida. Use dd/mm/aaaa ou yyyy-mm-dd')

export const vaccinationSchema = z
  .object({
    vaccineId: z.string().optional(),

    vaccineName: optionalText,
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

    adverseReaction: z.boolean(),
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
  .refine(
    (data) => {
      // Se selecionou "outra vacina" (customizada), vaccineName é obrigatório
      if (data.vaccineId === 'custom') {
        return data.vaccineName && data.vaccineName.trim().length >= 2
      }
      // Se selecionou uma vacina do sistema, já vem preenchida
      return true
    },
    {
      message: 'Nome da vacina deve ter pelo menos 2 caracteres',
      path: ['vaccineName'],
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
