'use client'

import { useTheme } from 'next-themes'
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()
  return (
    <Sonner
       theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-right"
      offset={16}
      gap={8}
      visibleToasts={5}
      closeButton={true}
      expand={false}
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'text-sm font-semibold leading-5',
          description: 'text-xs opacity-90 mt-1',
          closeButton: 'absolute right-2 top-2 opacity-70 hover:opacity-100',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
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
