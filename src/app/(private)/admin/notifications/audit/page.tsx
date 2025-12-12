import { AuditLogsList } from '@/components/admin/AuditLogsList'

export default function AuditLogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="mt-2 text-gray-600">
            View complete audit trail of all notification activities
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <AuditLogsList />
        </div>
      </div>
    </div>
  )
}
