import { UbsFormValues } from '@/components/design/BvUbsFrom'
import { HealthUnit } from '@/types/health-units'

// Mapeia as chaves do banco (inglês) para as chaves do form (português)
const dayMap: { [key: string]: string } = {
  monday: 'segunda',
  tuesday: 'terca',
  wednesday: 'quarta',
  thursday: 'quinta',
  friday: 'sexta',
  saturday: 'sabado',
  sunday: 'domingo',
}

// Função que converte o objeto de horários
export default function convertHoursToFormData(
  apiHours: HealthUnit['operatingHours'],
  defaultHours: UbsFormValues['operatingHours'],
) {
  if (!apiHours) return defaultHours // Retorna o padrão se não houver dados

  // Começa com uma cópia do objeto padrão (garante que todos os dias existam)
  const formHours = JSON.parse(JSON.stringify(defaultHours))

  // Itera sobre as chaves do objeto da API (monday, tuesday, etc.)
  for (const [apiDay, timeString] of Object.entries(apiHours)) {
    const formDay = dayMap[apiDay] // Converte 'monday' para 'segunda'

    if (formDay && timeString && timeString !== '-') {
      // Se for um horário válido (ex: "08:00-17:00")
      const [start, end] = timeString.split('-')
      formHours[formDay] = {
        isOpen: true,
        start: start || '',
        end: end || '',
      }
    } else if (formDay) {
      // Se for "-" ou nulo, marca como fechado
      formHours[formDay] = {
        isOpen: false,
        start: '',
        end: '',
      }
    }
  }

  return formHours
}
