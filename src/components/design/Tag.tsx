import React from 'react'
import { cn } from '@/lib/utils'
import { Syringe, X } from 'lucide-react'

type TagProps = {
  label: string
  icon?: React.ReactNode
  className?: string
  onRemove?: () => void
  compact?: boolean
}

const Tag: React.FC<TagProps> = ({
  label,
  icon = <Syringe size={16} />,
  className,
  onRemove,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-md font-medium text-black shadow-sm',
        compact ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm',
        className,
      )}
      style={{ backgroundColor: '#50C36E' }}
    >
      {icon}
      <span className="truncate">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex items-center justify-center rounded p-0.5 transition-opacity hover:opacity-80 focus:ring-2 focus:ring-green-700 focus:ring-offset-1 focus:outline-none"
          aria-label={`Remover ${label}`}
          title={`Remover ${label}`}
          type="button"
        >
          <X size={14} className="flex-shrink-0 text-black" />
        </button>
      )}
    </div>
  )
}

export default Tag
