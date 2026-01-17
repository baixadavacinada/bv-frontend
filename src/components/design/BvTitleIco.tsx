'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface PageHeaderProps {
  ico?: string
  title: string
  className?: string
}

export function BvTitleIco({ ico, title, className }: PageHeaderProps) {
  useAccessibilityValidation({ enabled: true })

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {ico && (
        <Image src={ico} alt="" aria-hidden="true" width={104} height={104} className="h-12 w-12" />
      )}

      <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
        {title}
      </h1>
    </div>
  )
}
