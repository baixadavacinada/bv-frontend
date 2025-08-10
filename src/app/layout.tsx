import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

// TODO: Alterar fonte e metadados

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Baixada Vacinada',
  description: 'Plataforma de vacinação',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, 'bg-[#E4EAEE] antialiased dark:bg-slate-900')}>
        {children}
      </body>
    </html>
  )
}
