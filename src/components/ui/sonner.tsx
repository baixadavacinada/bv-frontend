'use client'

import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      offset={16}
      gap={8}
      visibleToasts={5}
      closeButton={true}
      expand={false}
      toastOptions={{
        classNames: {
          toast: 'group border shadow-lg',
          title: 'text-sm font-semibold leading-5',
          description: 'text-xs opacity-90 mt-1',
          closeButton: 'absolute right-2 top-2 opacity-70 hover:opacity-100',

          success: 'bg-[var(--success)] text-[var(--success-foreground)] border-[var(--success)]',
          error:
            'bg-[var(--destructive)] text-[var(--destructive-foreground)] border-[var(--destructive)]',
          warning: 'bg-[var(--warning)] text-[var(--warning-foreground)] border-[var(--warning)]',
          info: 'bg-[var(--info)] text-[var(--info-foreground)] border-[var(--info)]',
          default: 'bg-card text-card-foreground border-border',
        },
      }}
      icons={{
        success: <CircleCheckIcon className="h-5 w-5 flex-shrink-0" />,
        error: <OctagonXIcon className="h-5 w-5 flex-shrink-0" />,
        warning: <TriangleAlertIcon className="h-5 w-5 flex-shrink-0" />,
        info: <InfoIcon className="h-5 w-5 flex-shrink-0" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
