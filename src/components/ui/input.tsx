import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input ring-offset-background data-[placeholder]:text-muted-foreground focus:border-primary focus:ring-primary flex h-12 w-full items-center justify-between rounded-sm border bg-white px-3 py-2 text-base whitespace-nowrap shadow-sm focus:ring-1 focus:outline-none disabled:cursor-none disabled:bg-gray-50 disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
