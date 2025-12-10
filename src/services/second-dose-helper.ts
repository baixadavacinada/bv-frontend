/**
 * Helper para gerenciar vacinas e combinações de segunda dose
 */

import { ageGroups } from '@/data/vaccine-booklet'

export interface SecondDoseCombination {
  id: string
  vaccineName: string
  period: string
  description?: string
}

/**
 * Extrai todas as vacinas que possuem segunda dose da cartilha
 */
export function extractSecondDoseVaccines(): SecondDoseCombination[] {
  const combinations: SecondDoseCombination[] = []
  const seen = new Set<string>()

  ageGroups.forEach((ageGroup) => {
    ageGroup.periods.forEach((periodObj) => {
      periodObj.vaccines.forEach((vaccine) => {
        // Verifica se é segunda dose pela descrição
        if (
          vaccine.dose &&
          (vaccine.dose.includes('2ª dose') ||
            vaccine.dose.includes('dose: 2') ||
            vaccine.dose.includes('doses'))
        ) {
          const key = `${vaccine.name}-${periodObj.period}`

          // Evita duplicatas
          if (!seen.has(key)) {
            seen.add(key)
            combinations.push({
              id: `${vaccine.id}-${periodObj.period}`,
              vaccineName: vaccine.name,
              period: periodObj.period,
              description: vaccine.description,
            })
          }
        }
      })
    })
  })

  // Ordena por nome da vacina
  return combinations.sort((a, b) => a.vaccineName.localeCompare(b.vaccineName))
}

/**
 * Agrupa combinações por vacina
 */
export function groupCombinationsByVaccine(
  combinations: SecondDoseCombination[],
): Record<string, SecondDoseCombination[]> {
  return combinations.reduce(
    (acc, combo) => {
      if (!acc[combo.vaccineName]) {
        acc[combo.vaccineName] = []
      }
      acc[combo.vaccineName].push(combo)
      return acc
    },
    {} as Record<string, SecondDoseCombination[]>,
  )
}

/**
 * Formata combinação para exibição
 */
export function formatCombination(combo: SecondDoseCombination): string {
  return `${combo.vaccineName} (${combo.period})`
}

/**
 * Extrai nome da vacina a partir de uma combinação ID
 */
export function extractVaccineNameFromCombo(comboId: string): string {
  // Remove o sufixo do período
  const parts = comboId.split('-')
  return parts.slice(0, -1).join('-')
}
