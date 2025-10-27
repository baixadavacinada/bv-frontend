import { AppLayout } from '@/components'
import { Toaster } from 'sonner'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      {children} <Toaster richColors position="top-right" />
    </AppLayout>
  )
}
