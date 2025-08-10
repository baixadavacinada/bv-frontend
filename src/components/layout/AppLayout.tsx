'use client'

import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { FooterBar } from './FooterBar'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children: ReactNode
  className?: string
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <main
          className={cn('min-h-[calc(100vh-64px)] flex-1', 'lg:ml-0', 'pb-16 lg:pb-0', className)}
        >
          {children}
        </main>
      </div>

      <div className="lg:hidden">
        <FooterBar />
      </div>
    </div>
  )
}
