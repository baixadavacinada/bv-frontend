'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BvButton } from './BvButton'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityLoadingIndicator, DEFAULT_A11Y_CONFIG } from '@/utils/accessibility'

interface PageHeaderProps {
  title: string
  className?: string
}

export function BvTitleHeader({ title, className }: PageHeaderProps) {
  const { isValidating } = useAccessibilityValidation(DEFAULT_A11Y_CONFIG)
  const { announceToScreenReader } = useLiveRegion()
  const router = useRouter()

  const handleBack = () => {
    announceToScreenReader(`Voltando para a página anterior`, 'polite')
    router.back()
  }

  return (
    <div className={cn('flex items-center gap-3 md:gap-4', className)}>
      <BvButton
        variant="ghost"
        onClick={handleBack}
        leftIcon={<ArrowLeft className="text-primary size-10 md:size-12" />}
        aria-label="Voltar para página anterior"
        className="hover:bg-accent focus:ring-ring mt-1 flex-shrink-0 rounded-md p-2 focus:ring-2 focus:ring-offset-2 focus:outline-none md:p-3"
      />

      <div className="flex-1">
        <h1 className="text-xl leading-tight font-bold break-words text-gray-900 md:text-2xl">
          {title}
        </h1>
      </div>

      <AccessibilityLoadingIndicator isValidating={isValidating} />
    </div>
  )
}
