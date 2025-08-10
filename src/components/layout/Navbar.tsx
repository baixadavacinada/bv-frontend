'use client'
import { useRouter } from 'next/navigation'

import { navbarActions } from '@/lib/layout-navigation'
import { BvButton } from '@/components'

export function Navbar() {
  const router = useRouter()
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between bg-indigo-600 px-4 text-white">
      <div className="flex items-center gap-4">
        {/* TODO: Alterar logo */}
        <div className="text-lg font-semibold">Baixada Vacinada</div>
      </div>

      <div className="flex items-center gap-1">
        {navbarActions.map((action) => (
          <BvButton
            key={`navbar-${action.id}`}
            variant="ghost"
            size="icon"
            leftIcon={<action.icon className="size-6" />}
            onClick={() => {
              // TODO: implementar tracking de cliques
              router.push(action.href)
            }}
          />
        ))}
      </div>
    </nav>
  )
}
