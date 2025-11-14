import { OperatingHours } from '@/types/health-units'

/**
 * Verifica se uma UBS está aberta 24 horas por dia
 * Uma UBS é considerada 24h se todos os dias têm o mesmo horário de abertura/fechamento
 * ou se contém "24h" na descrição do horário
 */
export function isOpen24Hours(operatingHours: OperatingHours): boolean {
  if (!operatingHours) {
    return false
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  // Verificar se algum dia tem "24h" ou "24 horas"
  for (const day of days) {
    const hours = operatingHours[day as keyof OperatingHours]
    if (hours && typeof hours === 'string') {
      const normalizedHours = hours.toLowerCase().replace(/\s/g, '')
      if (
        normalizedHours.includes('24h') ||
        normalizedHours.includes('24horas') ||
        hours === '00:00 - 23:59'
      ) {
        return true
      }
    }
  }

  return false
}

/**
 * Formata horários para exibição
 */
export function formatOperatingHours(operatingHours: OperatingHours): string {
  if (!operatingHours) {
    return 'Horário não informado'
  }

  if (isOpen24Hours(operatingHours)) {
    return '24 horas'
  }

  // Pega o horário de segunda-feira como exemplo
  const mondayHours = operatingHours.monday
  if (mondayHours && mondayHours !== '-') {
    return mondayHours
  }

  return 'Horário variável'
}
