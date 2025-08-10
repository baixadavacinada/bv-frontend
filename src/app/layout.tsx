import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
    <html lang="pt" className={inter.className}>
      <body className="bg-amber-50 text-black antialiased">{children}</body>
    </html>
  )
}
