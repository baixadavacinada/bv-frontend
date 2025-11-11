import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
// @ts-expect-error - CSS import
import './globals.css'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/hooks/use-firebase-auth'
import { LocationProvider } from '@/contexts/LocationContext'
import { CookieConsentModal } from '@/components'
import { ToasterWithAuth } from '@/components/common/ToasterWithAuth'

const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'Baixada Vacinada',
  description: 'Plataforma de informações sobre vacinação',
  other: {
    'Content-Language': 'pt-BR',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(barlow.className, 'bg-background antialiased dark:bg-slate-900')}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <LocationProvider>
              <CookieConsentModal />
              <div>{children}</div>
            </LocationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
        <ToasterWithAuth />
      </body>
    </html>
  )
}
