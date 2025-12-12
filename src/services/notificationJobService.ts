/**
 * Notification Job Service
 */
import { apiClient } from '@/services/api'

export interface SendTemplateRequest {
  templateId: string
  recipients: {
    mode: 'single' | 'broadcast' | 'filter'
    userIds?: string[]
    filter?: {
      role?: 'public' | 'agent' | 'admin'
      acceptWhatsAppNotifications?: boolean
      hasPhone?: boolean
    }
  }
  context: Record<string, string | number | boolean>
  scheduledFor?: string | Date
}

export interface NotificationJob {
  id: string
  templateId: string
  templateName: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  type: 'immediate' | 'scheduled' | 'recurring'
  totalRecipients: number
  successCount: number
  failureCount: number
  pendingCount: number
  createdAt: string
  startedAt?: string
  completedAt?: string
}

export interface NotificationJobDetail extends NotificationJob {
  recipients: Array<{
    userId: string
    userName: string
    phone: string
    status: 'pending' | 'sent' | 'failed'
    sentAt?: string
    messageId?: string
    error?: string
  }>
  context: Record<string, string | number | boolean>
  errors: Array<{
    recipientId: string
    error: string
    timestamp: string
  }>
}

export interface AuditLog {
  id: string
  action: string
  templateId?: string
  templateName?: string
  jobId?: string
  recipientId?: string
  recipientName?: string
  recipientPhone?: string
  success: boolean
  messageId?: string
  performedAt: string
  channel: 'whatsapp' | 'email' | 'push' | 'sms'
}

export interface PreviewRecipient {
  userId: string
  userName: string
  phone: string
  email?: string
}

class NotificationJobService {
  private baseUrl = '/api/admin/notifications'

  async sendTemplate(request: SendTemplateRequest) {
    const response = await apiClient.post(
      `${this.baseUrl}/send-template`,
      request
    ) as unknown as { success: boolean; jobId?: string; message: string }
    return response
  }

  async listJobs(filters?: {
    status?: string
    templateId?: string
    limit?: number
    offset?: number
  }) {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.templateId) params.append('templateId', filters.templateId)
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.offset) params.append('offset', String(filters.offset))

    const response = await apiClient.get(
      `${this.baseUrl}/jobs?${params.toString()}`
    ) as unknown as { data: NotificationJob[]; total: number }
    return response
  }

  async getJobDetails(jobId: string) {
    return await apiClient.get(
      `${this.baseUrl}/jobs/${jobId}`
    ) as unknown as NotificationJobDetail
  }

  async cancelJob(jobId: string) {
    return await apiClient.post(
      `${this.baseUrl}/jobs/${jobId}/cancel`
    ) as unknown as { success: boolean; message: string }
  }

  async getJobStats() {
    return await apiClient.get(
      `${this.baseUrl}/jobs/stats`
    ) as unknown as {
      total: number
      byStatus: Record<string, number>
      successRate: number
      totalRecipients: number
      totalSent: number
      totalFailed: number
    }
  }

  async getAuditLogs(filters?: {
    templateId?: string
    jobId?: string
    action?: string
    limit?: number
    offset?: number
  }) {
    const params = new URLSearchParams()
    if (filters?.templateId) params.append('templateId', filters.templateId)
    if (filters?.jobId) params.append('jobId', filters.jobId)
    if (filters?.action) params.append('action', filters.action)
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.offset) params.append('offset', String(filters.offset))

    return await apiClient.get(
      `${this.baseUrl}/audit?${params.toString()}`
    ) as unknown as { data: AuditLog[]; total: number }
  }

  async getAuditStats() {
    return await apiClient.get(
      `${this.baseUrl}/audit/stats`
    ) as unknown as {
      totalActions: number
      successRate: number
      byAction: Record<string, number>
      byChannel: Record<string, number>
      byTemplate: Array<{ templateId: string; templateName: string; count: number }>
    }
  }

  async previewRecipients(filters?: {
    mode?: 'single' | 'broadcast' | 'filter'
    role?: 'public' | 'agent' | 'admin'
    acceptWhatsAppNotifications?: boolean
    hasPhone?: boolean
  }) {
    const params = new URLSearchParams()
    if (filters?.mode) params.append('mode', filters.mode)
    if (filters?.role) params.append('role', filters.role)
    if (filters?.acceptWhatsAppNotifications)
      params.append('acceptWhatsAppNotifications', 'true')
    if (filters?.hasPhone) params.append('hasPhone', 'true')

    return await apiClient.get(
      `${this.baseUrl}/preview-recipients?${params.toString()}`
    ) as unknown as { recipients: PreviewRecipient[]; total: number }
  }

  async getHistory(filters?: {
    templateId?: string
    limit?: number
    offset?: number
  }) {
    const params = new URLSearchParams()
    if (filters?.templateId) params.append('templateId', filters.templateId)
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.offset) params.append('offset', String(filters.offset))

    return await apiClient.get(
      `${this.baseUrl}/history?${params.toString()}`
    ) as unknown as { data: NotificationJob[]; total: number }
  }
}

export const notificationJobService = new NotificationJobService()
