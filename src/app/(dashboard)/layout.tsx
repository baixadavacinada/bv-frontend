import { AppLayout } from '@/components'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <main>{children}</main>
    </AppLayout>
  )
}
