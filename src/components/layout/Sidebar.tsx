'use client'

import { sidebarNavigation } from '@/lib/layout-navigation'
import { BvButton } from '../design/BvButton'
import { useRouter } from 'next/navigation'

export function Sidebar() {
  const router = useRouter()

  return (
    <aside className="h-[calc(100vh-64px)] w-64 rounded-r-3xl border-r border-gray-200 bg-white p-4">
      <div className="flex h-full flex-col">
        {/* Menu items */}
        <nav className="flex-1 space-y-5">
          {sidebarNavigation.map((action) => (
            <BvButton
              key={`sidebar-${action.id}`}
              title={action.label}
              variant="ghost"
              className="w-full justify-start gap-8 text-gray-700 hover:bg-gray-100"
              leftIcon={<action.icon className="size-6" />}
              onClick={() => {
                // TODO: implementar tracking de cliques
                router.push(action.href)
              }}
            />
          ))}
        </nav>

        {/* Logout button */}
        <div className="border-t border-gray-200 pt-4">
          <BvButton
            title="Sair"
            onClick={() => {
              // TODO: implementar tracking do logout
              router.push('/')
            }}
          />
        </div>
      </div>
    </aside>
  )
}
