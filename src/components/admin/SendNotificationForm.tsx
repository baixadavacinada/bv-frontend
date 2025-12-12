'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notificationJobService, type SendTemplateRequest } from '@/services/notificationJobService'
import type { NotificationTemplate } from '@/services/notificationTemplateService'

export function SendNotificationForm() {
  const router = useRouter()
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [previewCount, setPreviewCount] = useState<number | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState<SendTemplateRequest>({
    templateId: '',
    recipients: {
      mode: 'broadcast',
      filter: {},
    },
    context: {},
  })

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true)
        const { getAllCustomTemplates } = await import('@/services/notificationTemplateService')
        const result = await getAllCustomTemplates()
        setTemplates(result)
      } catch (err) {
        setError('Failed to load templates')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadTemplates()
  }, [])

  const handleModeChange = (mode: 'single' | 'broadcast' | 'filter') => {
    setFormData((prev) => ({
      ...prev,
      recipients: {
        ...prev.recipients,
        mode,
        userIds: undefined,
        filter: mode === 'filter' ? {} : undefined,
      },
    }))
  }

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      recipients: {
        ...prev.recipients,
        filter: {
          ...prev.recipients.filter,
          [key]: value,
        },
      },
    }))
  }

  const handlePreviewRecipients = async () => {
    try {
      setLoading(true)
      const result = await notificationJobService.previewRecipients(formData.recipients)
      setPreviewCount(result.total)
      setShowPreview(true)
    } catch (err) {
      setError('Failed to preview recipients')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.templateId) {
      setError('Please select a template')
      return
    }

    try {
      setSending(true)
      setError(null)
      const result = (await notificationJobService.sendTemplate(formData)) as unknown as {
        success: boolean
        jobId?: string
      }
      if (result.jobId) {
        setSuccess(true)
        setTimeout(() => {
          router.push(`/admin/notifications/jobs/${result.jobId}`)
        }, 1500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send notification')
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  if (loading && !templates.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading templates...</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Send Notification</h1>

      {error && (
        <div className="mb-4 rounded bg-red-50 p-4 text-red-700" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded bg-green-50 p-4 text-green-700" role="alert">
          Notification sent! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="template" className="mb-2 block text-sm font-medium">
            Template
          </label>
          <select
            id="template"
            value={formData.templateId}
            onChange={(e) => setFormData((prev) => ({ ...prev, templateId: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={sending}
            required
          >
            <option value="">Select a template</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Recipient Mode</label>
          <div className="space-y-2">
            {(['single', 'broadcast', 'filter'] as const).map((mode) => (
              <label key={mode} className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value={mode}
                  checked={formData.recipients.mode === mode}
                  onChange={() => handleModeChange(mode)}
                  disabled={sending}
                  className="mr-2"
                />
                <span className="text-sm capitalize">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {formData.recipients.mode === 'filter' && (
          <div className="space-y-3 rounded bg-gray-50 p-4">
            <div>
              <label htmlFor="role" className="mb-1 block text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                value={formData.recipients.filter?.role || ''}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={sending}
              >
                <option value="">Any</option>
                <option value="public">Public</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.recipients.filter?.acceptWhatsAppNotifications || false}
                onChange={(e) =>
                  handleFilterChange('acceptWhatsAppNotifications', e.target.checked)
                }
                disabled={sending}
                className="mr-2"
              />
              <span className="text-sm">Accept WhatsApp</span>
            </label>
          </div>
        )}

        <button
          type="button"
          onClick={handlePreviewRecipients}
          disabled={sending || loading}
          className="w-full rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
        >
          Preview Recipients
        </button>

        {showPreview && previewCount !== null && (
          <div className="rounded bg-blue-50 p-4 text-blue-700">
            Recipients: <strong>{previewCount}</strong>
          </div>
        )}

        <button
          type="submit"
          disabled={sending || !formData.templateId}
          className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
