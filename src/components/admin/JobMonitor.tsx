'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  notificationJobService,
  type NotificationJobDetail,
} from '@/services/notificationJobService'

interface JobMonitorProps {
  jobId: string
}

export function JobMonitor({ jobId }: JobMonitorProps) {
  const router = useRouter()
  const [job, setJob] = useState<NotificationJobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchJob = async () => {
      try {
        setLoading(true)
        const result = await notificationJobService.getJobDetails(jobId)
        setJob(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()

    // Auto-refresh every 5 seconds while processing
    if (job?.status === 'processing') {
      interval = setInterval(fetchJob, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [jobId, job?.status])

  if (loading) return <div className="p-8 text-center text-gray-600">Loading job details...</div>
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!job) return <div className="p-8 text-center text-gray-600">Job not found</div>

  const successRate =
    job.totalRecipients > 0 ? Math.round((job.successCount / job.totalRecipients) * 100) : 0

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Details</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
      </div>

      {/* Status Section */}
      <div className="rounded-lg border bg-white p-6">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Template</p>
            <p className="font-medium">{job.templateName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span
              className={`inline-block rounded px-3 py-1 text-sm font-medium ${
                job.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : job.status === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : job.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Progress</p>
            <p className="text-sm text-gray-600">
              {job.successCount}/{job.totalRecipients}
            </p>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${Math.min(100, (job.successCount / job.totalRecipients) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">Total Recipients</p>
          <p className="text-2xl font-bold">{job.totalRecipients}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">Success Rate</p>
          <p className="text-2xl font-bold">{successRate}%</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">Sent</p>
          <p className="text-2xl font-bold text-green-600">{job.successCount}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">Failed</p>
          <p className="text-2xl font-bold text-red-600">{job.failureCount}</p>
        </div>
      </div>

      {/* Timeline */}
      {(job.createdAt || job.startedAt || job.completedAt) && (
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 font-medium">Timeline</h2>
          <div className="space-y-2 text-sm">
            {job.createdAt && (
              <p>
                <span className="text-gray-600">Created:</span>{' '}
                {new Date(job.createdAt).toLocaleString()}
              </p>
            )}
            {job.startedAt && (
              <p>
                <span className="text-gray-600">Started:</span>{' '}
                {new Date(job.startedAt).toLocaleString()}
              </p>
            )}
            {job.completedAt && (
              <p>
                <span className="text-gray-600">Completed:</span>{' '}
                {new Date(job.completedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Recipients */}
      {job.recipients && job.recipients.length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 font-medium">Recipients ({job.recipients.length})</h2>
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {job.recipients.map((recipient, i) => (
              <div key={i} className="rounded border p-3">
                <div
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        recipient.status === 'sent'
                          ? 'bg-green-600'
                          : recipient.status === 'failed'
                            ? 'bg-red-600'
                            : 'bg-gray-400'
                      }`}
                    />
                    <p className="text-sm font-medium">{recipient.userName}</p>
                    <p className="text-xs text-gray-600">{recipient.phone}</p>
                  </div>
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      recipient.status === 'sent'
                        ? 'bg-green-100 text-green-800'
                        : recipient.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {recipient.status}
                  </span>
                </div>
                {expanded === i && (
                  <div className="mt-2 space-y-1 border-t pt-2 text-xs text-gray-600">
                    {recipient.sentAt && <p>Sent: {new Date(recipient.sentAt).toLocaleString()}</p>}
                    {recipient.messageId && <p>Message ID: {recipient.messageId}</p>}
                    {recipient.error && <p className="text-red-600">Error: {recipient.error}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {job.status === 'processing' && (
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await notificationJobService.cancelJob(jobId)
                setJob((prev) => (prev ? { ...prev, status: 'cancelled' } : null))
              } catch {
                alert('Failed to cancel job')
              }
            }}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Cancel Job
          </button>
        </div>
      )}
    </div>
  )
}
