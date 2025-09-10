'use client'

import * as React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleFilterProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function CollapsibleFilter({
  title = 'Filtro',
  children,
  className,
}: CollapsibleFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('w-full space-y-2', className)}
    >
      <div className="flex justify-end space-x-4">
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
            {title}
            <ChevronDown
              className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')}
            />
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down space-y-4 pt-4">
        <div className="rounded-md border p-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
