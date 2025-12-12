'use client'

import { useState, useEffect } from 'react'
import { notificationJobService } from '@/services/notificationJobService'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import type { AuditLog } from '@/services/notificationJobService'

export function AuditLogsList() {
  useAccessibilityValidation({ enabled: true })

  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionFilter, setActionFilter] = useState<string>('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const pageSize = 20
  const limit = pageSize
  const offset = (page - 1) * pageSize

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true)
        const result = await notificationJobService.getAuditLogs({
          action: actionFilter || undefined,
          limit,
          offset,
        })
        setLogs(result.data || [])
        setTotal(result.total || 0)
        setError(null)
      } catch (err) {
        setError('Failed to load audit logs')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadLogs()
  }, [actionFilter, page, limit, offset])

  const totalPages = Math.ceil(total / pageSize)

  if (loading && logs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading audit logs...</div>
      </div>
    )
  }

  if (error && logs.length === 0) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    )
  }

  const getStatusColor = (action: string) => {
    if (action.includes('success') || action.includes('sent')) return 'bg-green-50 text-green-700'
    if (action.includes('failed')) return 'bg-red-50 text-red-700'
    if (action.includes('created') || action.includes('started')) return 'bg-blue-50 text-blue-700'
    return 'bg-gray-50 text-gray-700'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Filter by action:</label>
        <select
          value={actionFilter}
          onChange={(e) => {
            setActionFilter(e.target.value)
            setPage(1)
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Actions</option>
          <option value="notification_sent">Sent</option>
          <option value="notification_failed">Failed</option>
          <option value="job_created">Job Created</option>
          <option value="job_started">Job Started</option>
          <option value="job_completed">Job Completed</option>
          <option value="template_created">Template Created</option>
          <option value="template_updated">Template Updated</option>
        </select>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-lg border bg-gray-50 p-8 text-center">
          <p className="text-gray-600">No audit logs found</p>
        </div>
      ) : (
        <>
          <div className="divide-y overflow-hidden rounded-lg border">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(log.action)}`}
                    >
                      {log.action.replace(/_/g, ' ')}
                    </span>
                    <span className="font-mono text-xs text-gray-500">{log.id.slice(0, 8)}...</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(log.performedAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-1 text-sm text-gray-700">
                  {log.templateName && (
                    <p>
                      <span className="text-gray-600">Template:</span> {log.templateName}
                    </p>
                  )}
                  {log.recipientName && (
                    <p>
                      <span className="text-gray-600">Recipient:</span> {log.recipientName} (
                      {log.recipientPhone})
                    </p>
                  )}
                  {log.messageId && (
                    <p>
                      <span className="text-gray-600">Message ID:</span>{' '}
                      <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {log.messageId.slice(0, 16)}...
                      </code>
                    </p>
                  )}
                  {log.channel && (
                    <p>
                      <span className="text-gray-600">Channel:</span>{' '}
                      <span className="font-medium capitalize">{log.channel}</span>
                    </p>
                  )}
                  {!log.success && (
                    <p className="text-red-600">
                      <span className="font-medium">Failed</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {offset + 1} to {Math.min(offset + pageSize, total)} of {total} logs
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    const distance = Math.abs(p - page)
                    return distance <= 1 || p === 1 || p === totalPages
                  })
                  .map((p, i, arr) => {
                    const prev = arr[i - 1]
                    return (
                      <div key={p}>
                        {prev && prev !== p - 1 && <span className="px-2">...</span>}
                        <button
                          onClick={() => setPage(p)}
                          className={`rounded-lg px-3 py-2 transition-colors ${
                            p === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {p}
                        </button>
                      </div>
                    )
                  })}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
