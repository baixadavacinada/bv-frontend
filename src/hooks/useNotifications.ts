import { useState, useCallback, useEffect } from 'react'
import { notificationJobService } from '@/services/notificationJobService'
import type { NotificationJob, NotificationJobDetail, SendTemplateRequest, AuditLog } from '@/services/notificationJobService'

interface UseNotificationJobsOptions {
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useNotificationJobs(options: UseNotificationJobsOptions = {}) {
  const { autoRefresh = false, refreshInterval = 30000 } = options

  const [jobs, setJobs] = useState<NotificationJob[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchJobs = useCallback(async (filters?: {
    status?: string
    templateId?: string
    limit?: number
    offset?: number
  }) => {
    try {
      setLoading(true)
      const result = await notificationJobService.listJobs(filters)
      setJobs(result.data || [])
      setTotal(result.total || 0)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const sendNotification = useCallback(async (request: SendTemplateRequest) => {
    try {
      setError(null)
      const result = await notificationJobService.sendTemplate(request)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send notification'
      setError(message)
      throw err
    }
  }, [])

  const cancelJob = useCallback(async (jobId: string) => {
    try {
      setError(null)
      const result = await notificationJobService.cancelJob(jobId)
      // Refresh jobs after cancellation
      await fetchJobs()
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel job'
      setError(message)
      throw err
    }
  }, [fetchJobs])

  // Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchJobs()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchJobs])

  return {
    jobs,
    loading,
    error,
    total,
    fetchJobs,
    sendNotification,
    cancelJob
  }
}

/**
 * Hook for monitoring a single job
 */
export function useNotificationJob(jobId: string) {
  const [job, setJob] = useState<NotificationJobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJob = useCallback(async () => {
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
  }, [jobId])

  useEffect(() => {
    fetchJob()
  }, [jobId, fetchJob])

  // Auto-refresh while processing
  useEffect(() => {
    if (!job || job.status !== 'processing') return

    const interval = setInterval(fetchJob, 5000)
    return () => clearInterval(interval)
  }, [job, fetchJob])

  return {
    job,
    loading,
    error,
    refetch: fetchJob
  }
}

/**
 * Hook for managing audit logs
 */
export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchLogs = useCallback(async (filters?: {
    templateId?: string
    jobId?: string
    action?: string
    limit?: number
    offset?: number
  }) => {
    try {
      setLoading(true)
      const result = await notificationJobService.getAuditLogs(filters)
      setLogs(result.data || [])
      setTotal(result.total || 0)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch audit logs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    logs,
    loading,
    error,
    total,
    fetchLogs
  }
}
