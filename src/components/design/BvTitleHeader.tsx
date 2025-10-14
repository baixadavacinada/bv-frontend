'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface PageHeaderProps {
  title: string
  className?: string
}

export function BvTitleHeader({ title, className }: PageHeaderProps) {
  useAccessibilityValidation({ enabled: true })
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <button
        onClick={handleBack}
        className="hover:bg-accent focus:ring-ring rounded-md p-4 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label="Voltar para a página anterior"
      >
        <ArrowLeft className="h-6 w-6 text-blue-600" />
      </button>

      <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
        {title}
      </h1>
    </div>
  )
}
