'use client'

import { useState, useEffect } from 'react'
import { notificationJobService, type NotificationJob } from '@/services/notificationJobService'

const LIMIT = 10

export function JobsList() {
  const [jobs, setJobs] = useState<NotificationJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const filters: { status?: string; limit: number; offset: number } = {
          limit: LIMIT,
          offset: page * LIMIT,
        }
        if (statusFilter) filters.status = statusFilter

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
    }
    fetchJobs()
  }, [page, statusFilter])

  if (loading) return <div className="p-4 text-gray-600">Loading jobs...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  const pages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="status-filter" className="text-sm font-medium">
          Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(0)
          }}
          className="rounded border border-gray-300 px-3 py-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-2 text-left">Template</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Recipients</th>
              <th className="px-4 py-2 text-right">Sent</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{job.templateName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs font-medium ${
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
                </td>
                <td className="px-4 py-2 text-right">{job.totalRecipients}</td>
                <td className="px-4 py-2 text-right">{job.successCount}</td>
                <td className="px-4 py-2 text-xs">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && <div className="py-8 text-center text-gray-500">No jobs found</div>}

      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-gray-600">
          Showing {page * LIMIT + 1}-{Math.min((page + 1) * LIMIT, total)} of {total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, pages) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded px-3 py-1 ${page === i ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page >= pages - 1}
            className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
