import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  count?: number
  containerClassName?: string
  itemClassName?: string
  height?: string
  width?: string
  variant?: 'line' | 'card' | 'avatar' | 'custom'
  ariaLabel?: string
}

export function SkeletonLoader({
  count = 3,
  containerClassName = 'space-y-4',
  itemClassName,
  height = 'h-20',
  width = 'w-full',
  variant = 'line',
  ariaLabel = 'Carregando conteúdo',
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    const baseClasses = 'animate-pulse rounded-md bg-gray-300 dark:bg-gray-700'

    switch (variant) {
      case 'card':
        return Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn('space-y-3 rounded-lg border border-gray-200 p-4', itemClassName)}
          >
            <div className={cn(baseClasses, 'h-32 w-full')} />
            <div className={cn(baseClasses, 'h-4 w-3/4')} />
            <div className={cn(baseClasses, 'h-3 w-1/2')} />
          </div>
        ))

      case 'avatar':
        return Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn('flex items-center gap-4', itemClassName)}>
            <div className={cn(baseClasses, 'h-12 w-12 rounded-full')} />
            <div className="flex-1 space-y-2">
              <div className={cn(baseClasses, 'h-4 w-3/4')} />
              <div className={cn(baseClasses, 'h-3 w-1/2')} />
            </div>
          </div>
        ))

      case 'custom':
        return Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn(baseClasses, height, width, itemClassName)} />
        ))

      case 'line':
      default:
        return Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn(baseClasses, height, width, itemClassName)} />
        ))
    }
  }

  return (
    <div className={containerClassName} role="status" aria-busy="true" aria-label={ariaLabel}>
      {renderSkeleton()}
    </div>
  )
}
