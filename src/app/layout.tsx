import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Baixada Vacinada',
  description: 'Plataforma de informações sobre vacinação',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-[#E4EAEE] antialiased dark:bg-slate-900')}>
        <NextIntlClientProvider messages={messages}>
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
