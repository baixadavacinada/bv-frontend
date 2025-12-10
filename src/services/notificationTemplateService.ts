/**
 * Notification Template Service
 * Client-side service for interacting with template API endpoints
 */

import { apiClient } from '@/services/api'

export interface NotificationTemplate {
  id: string
  name: string
  description: string
  subject: string
  body: string
  category: 'appointment' | 'vaccine' | 'reminder' | 'system' | 'general'
  status?: 'ativo' | 'desativado'
}

export interface TemplateContext {
  [key: string]: string | number | boolean | Date | undefined
}

export interface PreviewResult {
  templateId: string
  rendered: {
    subject: string
    body: string
  }
}

export interface SendResult {
  success: boolean
  data: {
    success: boolean
    messageId?: string
    message?: string
  }
  error?: string
}

export interface BroadcastResult {
  success: boolean
  data: {
    success: boolean
    total: number
    successful: number
    failed: number
    results: BroadcastResultItem[]
  }
  error?: string
}

export interface BroadcastResultItem {
  success: boolean
  message?: string
  messageId?: string
}

/**
 * Fetch all available templates (both default and custom)
 */
export const getAllTemplates = async (): Promise<NotificationTemplate[]> => {
  try {
    // Fetch both default and custom templates
    const [defaultResponse, customResponse] = await Promise.all([
      apiClient.get<{ templates: NotificationTemplate[] }>('/api/admin/templates'),
      apiClient.get<{ templates: NotificationTemplate[] }>('/api/admin/custom-templates').catch(
        () => ({ templates: [] }),
      ),
    ])

    const defaultTemplates = defaultResponse?.templates || []
    const customTemplates = customResponse?.templates || []

    // Combine and return
    return [...defaultTemplates, ...customTemplates]
  } catch (error) {
    console.error('Error fetching templates:', error)
    throw error
  }
}

/**
 * Fetch templates by category
 */
export const getTemplatesByCategory = async (category: string): Promise<NotificationTemplate[]> => {
  try {
    const response = await apiClient.get<{ templates: NotificationTemplate[] }>(
      `/api/admin/templates/category/${category}`,
    )
    return response?.templates || []
  } catch (error) {
    console.error('Error fetching templates by category:', error)
    throw error
  }
}

/**
 * Fetch specific template details
 */
export const getTemplate = async (templateId: string): Promise<NotificationTemplate> => {
  try {
    const response = await apiClient.get<{ template: NotificationTemplate }>(
      `/api/admin/templates/${templateId}`,
    )
    return response.template
  } catch (error) {
    console.error('Error fetching template:', error)
    throw error
  }
}

/**
 * Preview template with given context
 */
export const previewTemplate = async (
  templateId: string,
  context: TemplateContext,
): Promise<PreviewResult> => {
  try {
    const response = await apiClient.post<PreviewResult>(
      `/api/admin/templates/${templateId}/preview`,
      { context },
    )
    return response
  } catch (error) {
    console.error('Error previewing template:', error)
    throw error
  }
}

/**
 * Send template notification to single user
 */
export const sendTemplateToUser = async (
  templateId: string,
  userId: string,
  context: TemplateContext,
  channels: string[] = ['whatsapp', 'email'],
): Promise<SendResult> => {
  try {
    const response = await apiClient.post<SendResult>(`/api/admin/templates/${templateId}/send`, {
      userId,
      context,
      channels,
    })
    return response
  } catch (error) {
    console.error('Error sending template:', error)
    throw error
  }
}

/**
 * Broadcast template notification to multiple users
 */
export const broadcastTemplate = async (
  templateId: string,
  userIds: string[],
  context: TemplateContext,
  channels: string[] = ['whatsapp', 'email'],
): Promise<BroadcastResult> => {
  try {
    const response = await apiClient.post<BroadcastResult>(
      `/api/admin/templates/${templateId}/broadcast`,
      {
        userIds,
        context,
        channels,
      },
    )
    return response
  } catch (error) {
    console.error('Error broadcasting template:', error)
    throw error
  }
}

// ==================== CUSTOM TEMPLATES ====================

/**
 * Create a new custom template
 */
export const createCustomTemplate = async (
  templateData: Omit<NotificationTemplate, 'id'>,
): Promise<NotificationTemplate> => {
  try {
    const response = await apiClient.post<{ template: NotificationTemplate }>(
      '/api/admin/custom-templates',
      templateData,
    )
    return response.template
  } catch (error) {
    console.error('Error creating custom template:', error)
    throw error
  }
}

/**
 * Update an existing custom template
 */
export const updateCustomTemplate = async (
  templateId: string,
  templateData: Partial<Omit<NotificationTemplate, 'id'>>,
): Promise<NotificationTemplate> => {
  try {
    const response = await apiClient.put<{ template: NotificationTemplate }>(
      `/api/admin/custom-templates/${templateId}`,
      templateData,
    )
    return response.template
  } catch (error) {
    console.error('Error updating custom template:', error)
    throw error
  }
}

/**
 * Delete a custom template
 */
export const deleteCustomTemplate = async (templateId: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/admin/custom-templates/${templateId}`)
  } catch (error) {
    console.error('Error deleting custom template:', error)
    throw error
  }
}

/**
 * Get all custom templates
 */
export const getAllCustomTemplates = async (): Promise<NotificationTemplate[]> => {
  try {
    const response = await apiClient.get<{ templates: NotificationTemplate[] }>(
      '/api/admin/custom-templates',
    )
    return response?.templates || []
  } catch (error) {
    console.error('Error fetching custom templates:', error)
    throw error
  }
}

/**
 * Get a specific custom template
 */
export const getCustomTemplate = async (templateId: string): Promise<NotificationTemplate> => {
  try {
    const response = await apiClient.get<{ template: NotificationTemplate }>(
      `/api/admin/custom-templates/${templateId}`,
    )
    return response.template
  } catch (error) {
    console.error('Error fetching custom template:', error)
    throw error
  }
}
