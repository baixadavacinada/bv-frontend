import * as z from 'zod'
import { commonSchemas } from '.'
import type { UserRole } from '@/types/auth'

// Schema base unificado que funciona para todas as roles
const createPersonalDataSchema = (isResident: boolean) => {
  return z.object({
    name: isResident ? z.string().optional().or(z.literal('')) : commonSchemas.name,
    phone: isResident ? z.string().optional().or(z.literal('')) : commonSchemas.phone,
    email: isResident ? z.string().optional().or(z.literal('')) : commonSchemas.email,
    cpf: isResident ? z.string().optional().or(z.literal('')) : commonSchemas.cpf,
    acceptWhatsAppNotifications: z.boolean().optional(),
    notifications: z.object({
      secondDose: z.boolean(),
      appointment: z.boolean(),
      newVaccines: z.boolean(),
    }),
    supportMessage: commonSchemas.optionalComment,
  })
}

// Schema padrão
export const personalDataSchema = createPersonalDataSchema(false)

// Obter o schema baseado na role
export const getPersonalDataSchema = (userRole: UserRole) => {
  return createPersonalDataSchema(userRole === 'public')
}

export type PersonalDataFormData = z.infer<typeof personalDataSchema>
