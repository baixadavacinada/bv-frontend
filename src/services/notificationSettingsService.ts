/**
 * Notification Settings Service
 * Handles saving and fetching user notification preferences
 */

import { apiClient } from '@/services/api'

export interface NotificationSetting {
  enabled: boolean
  templateId?: string
  frequency: 'instant' | 'daily' | 'weekly' | 'never'
}

export interface SaveNotificationSettingsPayload {
  notifications: Record<string, boolean>
  templateSettings: Record<string, NotificationSetting>
}

export interface SaveNotificationSettingsResponse {
  success: boolean
  message: string
  data?: {
    notifications: Record<string, boolean>
    templateSettings: Record<string, NotificationSetting>
  }
}

export interface GetNotificationSettingsResponse {
  success: boolean
  data?: {
    notifications: Record<string, boolean>
    templateSettings: Record<string, NotificationSetting>
  }
}

/**
 * Fetch user notification settings
 */
export const getNotificationSettings = async (): Promise<GetNotificationSettingsResponse> => {
  try {
    const response = await apiClient.get<GetNotificationSettingsResponse>(
      '/api/notifications/settings',
    )
    return response || { success: false }
  } catch (error) {
    console.error('Error fetching notification settings:', error)
    return { success: false }
  }
}

/**
 * Save user notification settings
 */
export const saveNotificationSettings = async (
  payload: SaveNotificationSettingsPayload,
): Promise<SaveNotificationSettingsResponse> => {
  try {
    const response = await apiClient.post<SaveNotificationSettingsResponse>(
      '/api/notifications/settings',
      payload,
    )
    return response || { success: false, message: 'Erro ao salvar' }
  } catch (error) {
    console.error('Error saving notification settings:', error)
    throw error
  }
}
