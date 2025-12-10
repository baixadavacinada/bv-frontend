/**
 * Template Edit Service
 * Handles CRUD operations for notification templates
 * Variables in curly braces {{variableName}} are automatically protected from editing
 */

import { apiClient } from '@/services/api'

export interface CreateTemplatePayload {
  name: string
  description: string
  subject: string
  body: string
  category: 'appointment' | 'vaccine' | 'reminder' | 'system' | 'general'
}

export interface UpdateTemplatePayload extends CreateTemplatePayload {
  id: string
}

export interface TemplateEditResponse {
  success: boolean
  data?: Record<string, unknown>
  error?: string
  message?: string
}

/**
 * Create a new template
 */
export const createTemplate = async (
  payload: CreateTemplatePayload,
): Promise<TemplateEditResponse> => {
  try {
    const response = await apiClient.post<TemplateEditResponse>('/api/admin/templates', payload)
    return response || { success: false, error: 'Erro ao criar template' }
  } catch (error) {
    console.error('Error creating template:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar template',
    }
  }
}

/**
 * Update an existing template
 */
export const updateTemplate = async (
  payload: UpdateTemplatePayload,
): Promise<TemplateEditResponse> => {
  try {
    const response = await apiClient.put<TemplateEditResponse>(
      `/api/admin/templates/${payload.id}`,
      payload,
    )
    return response || { success: false, error: 'Erro ao atualizar template' }
  } catch (error) {
    console.error('Error updating template:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar template',
    }
  }
}

/**
 * Delete a template
 */
export const deleteTemplate = async (templateId: string): Promise<TemplateEditResponse> => {
  try {
    const response = await apiClient.delete<TemplateEditResponse>(
      `/api/admin/templates/${templateId}`,
    )
    return response || { success: false, error: 'Erro ao deletar template' }
  } catch (error) {
    console.error('Error deleting template:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar template',
    }
  }
}

/**
 * Extract variables from template text
 * Returns array of variable names found in {{variableName}} format
 */
export const extractVariables = (text: string): string[] => {
  const regex = /\{\{(\w+)\}\}/g
  const matches: string[] = []
  let match

  while ((match = regex.exec(text)) !== null) {
    if (!matches.includes(match[1])) {
      matches.push(match[1])
    }
  }

  return matches
}

/**
 * Highlight variables in text
 * Returns text with {{variableName}} highlighted in a different style
 */
export const getVariableRanges = (
  text: string,
): Array<{ start: number; end: number; variable: string }> => {
  const regex = /\{\{(\w+)\}\}/g
  const ranges = []
  let match

  while ((match = regex.exec(text)) !== null) {
    ranges.push({
      start: match.index,
      end: match.index + match[0].length,
      variable: match[1],
    })
  }

  return ranges
}
