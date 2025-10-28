import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input ring-offset-background data-[placeholder]:text-muted-foreground focus:border-primary focus:ring-primary disabled:border-disabledBorder disabled:text-disabled flex h-10 w-full items-center justify-between rounded-sm border bg-white px-3 py-2 text-sm whitespace-nowrap shadow-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
