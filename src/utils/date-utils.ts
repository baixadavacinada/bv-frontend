/**
 * Utilitários para manipulação de datas
 */

/**
 * Converte formato dd/mm/aaaa para yyyy-mm-dd
 * Exemplo: "14/11/2025" -> "2025-11-14"
 */
export function convertDDMMYYYYtoISO(dateString: string): string {
  if (!dateString || !dateString.includes('/')) {
    return dateString
  }

  const [day, month, year] = dateString.split('/')
  if (!day || !month || !year || year.length !== 4) {
    return dateString
  }

  // Validar se são números válidos
  const dayNum = parseInt(day, 10)
  const monthNum = parseInt(month, 10)
  const yearNum = parseInt(year, 10)

  if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
    return dateString
  }

  // Validar se é uma data válida
  const date = new Date(yearNum, monthNum - 1, dayNum)
  if (date.getDate() !== dayNum || date.getMonth() !== monthNum - 1) {
    return dateString // Data inválida, retorna original
  }

  return `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
}

/**
 * Converte formato yyyy-mm-dd para dd/mm/aaaa
 * Exemplo: "2025-11-14" -> "14/11/2025"
 */
export function convertISOtoDDMMYYYY(dateString: string): string {
  if (!dateString || !dateString.includes('-')) {
    return dateString
  }

  const [year, month, day] = dateString.split('-')
  if (!year || !month || !day) {
    return dateString
  }

  return `${day}/${month}/${year}`
}

/**
 * Parse seguro de data para Date object
 * Aceita formatos: dd/mm/aaaa ou yyyy-mm-dd ou ISO string
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString) {
    return null
  }

  let isoDate = dateString

  // Se estiver em dd/mm/aaaa, converte para ISO
  if (dateString.includes('/')) {
    isoDate = convertDDMMYYYYtoISO(dateString)
  }

  const date = new Date(isoDate)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Formata data para exibição em português brasileiro
 */
export function formatDateBR(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'Data não informada'
  }

  const date = parseDate(dateString)
  if (!date) {
    return 'Data inválida'
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Obtém a data atual no formato yyyy-mm-dd
 */
export function getTodayISO(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
