import { JobsList } from '@/components/admin/JobsList'
import { NotificationsDashboard } from '@/components/admin/NotificationsDashboard'

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">Manage notification jobs and track delivery status</p>
        </div>

        {/* Dashboard */}
        <div className="mb-8">
          <NotificationsDashboard />
        </div>

        {/* Recent Jobs */}
        <div className="rounded-lg bg-white p-8 shadow">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
            <p className="mt-1 text-sm text-gray-600">Latest notification jobs</p>
          </div>
          <JobsList />
        </div>
      </div>
    </div>
  )
}
