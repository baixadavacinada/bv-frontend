import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import './globals.css'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/hooks/use-firebase-auth'

const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'Baixada Vacinada',
  description: 'Plataforma de informações sobre vacinação',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(barlow.className, 'bg-background antialiased dark:bg-slate-900')}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <div>{children}</div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
