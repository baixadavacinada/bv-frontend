/**
 * Serviço para gerenciar configurações de segunda dose
 */

import { apiClient } from './api'

export interface SecondDoseConfig {
  selectedVaccines: string[]
  createdBy: string
  createdAt?: string
}

/**
 * Salva a configuração de segunda dose no backend
 */
export async function saveSecondDoseConfiguration(
  config: SecondDoseConfig,
): Promise<SecondDoseConfig> {
  try {
    const response = await apiClient.post<SecondDoseConfig>('/api/public/user/second-dose-config', {
      selectedVaccines: config.selectedVaccines,
      createdBy: config.createdBy,
    })

    return response || config
  } catch (error) {
    throw error
  }
}

/**
 * Obtém a configuração de segunda dose do usuário
 */
export async function getSecondDoseConfiguration(): Promise<SecondDoseConfig | null> {
  try {
    const response = await apiClient.get<SecondDoseConfig>('/api/public/user/second-dose-config')
    return response || null
  } catch (error) {
    console.warn('Erro ao obter configuração de segunda dose:', error)
    return null
  }
}

export async function removeSecondDoseConfiguration(): Promise<void> {
  try {
    await apiClient.delete('/api/public/user/second-dose-config')
  } catch (error) {
    console.warn('Erro ao remover configuração de segunda dose:', error)
    throw error
  }
}
