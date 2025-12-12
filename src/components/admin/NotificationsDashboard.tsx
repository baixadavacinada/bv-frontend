'use client'

import { useState, useEffect } from 'react'
import { notificationJobService } from '@/services/notificationJobService'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import Link from 'next/link'

interface JobStats {
  total: number
  byStatus: Record<string, number>
  successRate: number
  totalRecipients: number
  totalSent: number
  totalFailed: number
}

interface AuditStats {
  totalActions: number
  successRate: number
  byAction: Record<string, number>
  byChannel: Record<string, number>
  byTemplate: Array<{ templateId: string; templateName: string; count: number }>
}

export function NotificationsDashboard() {
  useAccessibilityValidation({ enabled: true })

  const [jobStats, setJobStats] = useState<JobStats | null>(null)
  const [auditStats, setAuditStats] = useState<AuditStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true)
        const [jobData, auditData] = await Promise.all([
          notificationJobService.getJobStats().catch(() => null),
          notificationJobService.getAuditStats().catch(() => null),
        ])
        setJobStats(jobData)
        setAuditStats(auditData)
        setError(null)
      } catch (err) {
        setError('Failed to load statistics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading statistics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/notifications/send"
          className="rounded-lg border-2 border-dashed border-blue-300 p-6 transition-colors hover:border-blue-500 hover:bg-blue-50"
        >
          <h3 className="mb-2 font-semibold text-gray-900">Send Notification</h3>
          <p className="text-sm text-gray-600">Send a new notification to users</p>
        </Link>
        <Link
          href="/admin/notifications/jobs"
          className="rounded-lg border-2 border-dashed border-purple-300 p-6 transition-colors hover:border-purple-500 hover:bg-purple-50"
        >
          <h3 className="mb-2 font-semibold text-gray-900">View All Jobs</h3>
          <p className="text-sm text-gray-600">See all notification jobs and their status</p>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Jobs */}
        {jobStats?.total !== undefined && (
          <div className="rounded-lg border bg-white p-6">
            <p className="mb-1 text-sm text-gray-600">Total Jobs</p>
            <p className="text-3xl font-bold text-gray-900">{jobStats.total}</p>
            <p className="mt-2 text-xs text-gray-500">All notification jobs</p>
          </div>
        )}

        {auditStats?.successRate !== undefined && (
          <div className="rounded-lg border bg-white p-6">
            <p className="mb-1 text-sm text-gray-600">Success Rate</p>
            <p className="text-3xl font-bold text-green-600">
              {auditStats.successRate.toFixed(1)}%
            </p>
            <p className="mt-2 text-xs text-gray-500">Overall delivery success</p>
          </div>
        )}

        {/* Total Sent */}
        {jobStats?.successRate !== undefined && (
          <div className="rounded-lg border bg-white p-6">
            <p className="mb-1 text-sm text-gray-600">Messages Sent</p>
            <p className="text-3xl font-bold text-blue-600">{jobStats.totalSent || 0}</p>
            <p className="mt-2 text-xs text-gray-500">Successfully delivered</p>
          </div>
        )}

        {/* Failed */}
        {jobStats?.totalFailed !== undefined && (
          <div className="rounded-lg border bg-white p-6">
            <p className="mb-1 text-sm text-gray-600">Failed Messages</p>
            <p className="text-3xl font-bold text-red-600">{jobStats.totalFailed || 0}</p>
            <p className="mt-2 text-xs text-gray-500">Failed deliveries</p>
          </div>
        )}
      </div>

      {/* Actions by Channel */}
      {auditStats?.byChannel && Object.keys(auditStats.byChannel).length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Activity by Channel</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(auditStats.byChannel as Record<string, number>).map(
              ([channel, count]) => (
                <div key={channel} className="rounded bg-gray-50 p-4">
                  <p className="text-sm text-gray-600 capitalize">{channel}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {/* Actions by Type */}
      {auditStats?.byAction && Object.keys(auditStats.byAction).length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Activity by Action</h3>
          <div className="space-y-2">
            {Object.entries(auditStats.byAction as Record<string, number>)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([action, count]) => (
                <div
                  key={action}
                  className="flex items-center justify-between border-b py-2 last:border-0"
                >
                  <p className="text-sm text-gray-600 capitalize">{action.replace(/_/g, ' ')}</p>
                  <p className="text-sm font-semibold text-gray-900">{count}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Templates Stats */}
      {auditStats?.byTemplate && auditStats.byTemplate.length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Templates</h3>
          <div className="space-y-2">
            {auditStats.byTemplate
              .sort(
                (a: (typeof auditStats.byTemplate)[0], b: (typeof auditStats.byTemplate)[0]) =>
                  b.count - a.count,
              )
              .slice(0, 5)
              .map((template) => (
                <div
                  key={template.templateId}
                  className="flex items-center justify-between border-b py-2 last:border-0"
                >
                  <p className="text-sm text-gray-600">{template.templateName}</p>
                  <p className="text-sm font-semibold text-gray-900">{template.count}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
