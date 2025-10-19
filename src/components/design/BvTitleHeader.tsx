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
    <div className={cn('flex items-center gap-4', className)}>
      <BvButton
        variant="ghost"
        onClick={handleBack}
        size="lg"
        leftIcon={<ArrowLeft className="text-primary size-10" />}
        title={title}
        className="hover:bg-accent focus:ring-ring rounded-md p-4 px-0 py-0 text-2xl font-bold focus:ring-2 focus:ring-offset-2 focus:outline-none"
      />

      <AccessibilityLoadingIndicator isValidating={isValidating} />
    </div>
  )
}
