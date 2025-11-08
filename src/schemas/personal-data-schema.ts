import * as z from 'zod'
import { commonSchemas } from '.'

const createPersonalDataSchema = () => {
  return z.object({
    name: z.string().optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    email: z.string().optional().or(z.literal('')),
    cpf: z.string().optional().or(z.literal('')),
    notifications: z.object({
      secondDose: z.boolean(),
      appointment: z.boolean(),
      newVaccines: z.boolean(),
    }),
    supportMessage: commonSchemas.optionalComment,
  })
}

export const personalDataSchema = createPersonalDataSchema()

export const getPersonalDataSchema = () => {
  return createPersonalDataSchema()
}

export type PersonalDataFormData = z.infer<typeof personalDataSchema>
