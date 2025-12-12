import { JobMonitor } from '@/components/admin/JobMonitor'
import Link from 'next/link'

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Details</h1>
            <p className="mt-2 text-gray-600">
              Monitor notification job progress and delivery status
            </p>
          </div>
          <Link
            href="/admin/notifications"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Jobs
          </Link>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <JobMonitor jobId={id} />
        </div>
      </div>
    </div>
  )
}
