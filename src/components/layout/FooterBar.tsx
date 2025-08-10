'use client'

import { footerNavigation } from '@/lib/layout-navigation'
import { useRouter } from 'next/navigation'
import { BvButton } from '@/components'

export function FooterBar() {
  const router = useRouter()

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 rounded-t-3xl bg-white px-2 py-2">
      <div className="flex justify-around">
        {footerNavigation.map((action) => (
          <BvButton
            key={`footerbar-${action.id}`}
            variant="ghost"
            size="icon"
            leftIcon={
              <action.icon
                className={`${action.id === 'configuracao' ? 'size-11 text-indigo-600' : ''}`}
              />
            }
            onClick={() => {
              // TODO: implementar tracking de cliques
              router.push(action.href)
            }}
          />
        ))}
      </div>
    </div>
  )
}
