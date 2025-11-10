import { z } from 'zod'

/**
 * Mensagens de erro
 */
const msg = {
  required: 'Este campo é obrigatório',
  email: 'E-mail inválido',
  phone: 'Telefone inválido',
  cpf: 'CPF inválido',
  cep: 'CEP inválido',
  date: 'Data inválida',
  time: 'Hora inválida',
  min: (n: number) => `Mínimo de ${n} caracteres`,
  max: (n: number) => `Máximo de ${n} caracteres`,
}

/**
 * Padrões de validação
 */
const patterns = {
  phone: /^\(\d{2}\) \d{5}-\d{4}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cep: /^\d{5}-\d{3}$/,
  date: /^\d{2}\/\d{2}\/\d{4}$/,
  time: /^\d{2}:\d{2}$/,
}

const validateCPF = (cpf: string) => {
  const nums = cpf.replace(/\D/g, '')
  if (nums.length !== 11 || /^(\d)\1{10}$/.test(nums)) return false

  const calc = (digits: string, pos: number) => {
    const sum = digits.split('').reduce((acc, num, i) => acc + parseInt(num) * (pos - i), 0)
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const d1 = calc(nums.slice(0, 9), 10)
  const d2 = calc(nums.slice(0, 9) + d1, 11)
  return nums === nums.slice(0, 9) + d1 + d2
}

const validateDate = (date: string) => {
  if (!patterns.date.test(date)) return false
  const [d, m, y] = date.split('/').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.getDate() === d && dt.getMonth() === m - 1 && dt.getFullYear() === y
}

const validateTime = (time: string) => {
  if (!patterns.time.test(time)) return false
  const [h, m] = time.split(':').map(Number)
  return h >= 0 && h <= 23 && m >= 0 && m <= 59
}

// Texto obrigatório
export const requiredText = z.string().min(1, msg.required).trim()

// Texto opcional
export const optionalText = z.string().optional()

// Texto com limites (obrigatório por padrão)
export const text = (min = 1, max = 500, optional = false) => {
  const schema = z.string().min(min, msg.min(min)).max(max, msg.max(max)).trim()
  return optional ? schema.optional() : schema.min(1, msg.required)
}

// Email
export const email = z.string().min(1, msg.required).email(msg.email).trim().toLowerCase()
export const optionalEmail = z.string().email(msg.email).optional().or(z.literal(''))

// Telefone
export const phone = z.string().min(1, msg.required).regex(patterns.phone, msg.phone)
export const optionalPhone = z.string().optional().or(z.literal(''))

// CPF
export const cpf = z
  .string()
  .min(1, msg.required)
  .regex(patterns.cpf, msg.cpf)
  .refine(validateCPF, msg.cpf)

export const optionalCPF = z.string().optional().or(z.literal(''))

// Nome completo (nome + sobrenome)
export const fullName = z
  .string()
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .refine((name) => {
    const words = name.trim().split(/\s+/)
    return words.length >= 2
  }, 'Por favor, insira nome e sobrenome')
  .refine((name) => {
    const words = name.trim().split(/\s+/)
    return words.every((word) => word.length >= 2)
  }, 'Nome e sobrenome devem ter pelo menos 2 caracteres cada')

// Senha segura
export const strongPassword = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .refine(
    (password) => /[A-Z]/.test(password),
    'A senha deve conter pelo menos uma letra maiúscula',
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'A senha deve conter pelo menos uma letra minúscula',
  )
  .refine((password) => /\d/.test(password), 'A senha deve conter pelo menos um número')
  .refine(
    (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    'A senha deve conter pelo menos um caractere especial',
  )

// Senha simples (para compatibilidade)
export const password = z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')

// CEP
export const cep = z.string().min(1, msg.required).regex(patterns.cep, msg.cep)
export const optionalCEP = z.string().optional().or(z.literal(''))

// Data
export const date = z
  .string()
  .min(1, msg.required)
  .regex(patterns.date, msg.date)
  .refine(validateDate, msg.date)

export const optionalDate = z
  .string()
  .regex(patterns.date, msg.date)
  .refine(validateDate, msg.date)
  .optional()
  .or(z.literal(''))

// Hora
export const time = z
  .string()
  .min(1, msg.required)
  .regex(patterns.time, msg.time)
  .refine(validateTime, msg.time)

export const optionalTime = z
  .string()
  .regex(patterns.time, msg.time)
  .refine(validateTime, msg.time)
  .optional()
  .or(z.literal(''))

// Boolean
export const checkbox = z.boolean().default(false)

/**
 * Schemas pré-definidos para uso comum
 */
export const commonSchemas = {
  // Textos básicos
  name: text(3, 100),
  fullName,
  title: text(5, 150),
  description: text(10, 1000),
  shortText: text(1, 100),
  longText: text(10, 2000),

  // Opcionais
  optionalComment: text(0, 500, true),
  optionalNote: text(0, 200, true),

  // Dados pessoais
  email,
  phone,
  optionalPhone,
  cpf,
  optionalCPF,

  // Segurança
  password,
  strongPassword,

  // Localização
  cep,
  optionalCEP,

  // Data e hora
  date,
  time,

  // Configurações
  check: checkbox,
  acceptTerms: z.boolean().refine((val) => val === true, 'Você deve aceitar os termos'),
}

/**
 * Schema para Feedback/Avaliação de UBS
 */
export const feedbackSchema = z.object({
  healthUnitId: z.string().min(1, 'ID da UBS é obrigatório'),
  rating: z.number().min(1, 'Selecione pelo menos 1 estrela').max(5, 'Máximo 5 estrelas'),
  vaccineSuccess: z.string().min(1, 'Campo obrigatório'),
  waitTime: z.string().min(1, 'Campo obrigatório'),
  respectfulService: z.string().min(1, 'Campo obrigatório'),
  cleanLocation: z.string().min(1, 'Campo obrigatório'),
  recommendation: z.string().min(1, 'Campo obrigatório'),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>
