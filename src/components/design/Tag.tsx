import React from 'react'
import { cn } from '@/lib/utils'
import { Syringe } from 'lucide-react'

type TagProps = {
  label: string
  icon?: React.ReactNode
  className?: string
}

const Tag: React.FC<TagProps> = ({ label, icon = <Syringe size={16} />, className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 font-medium text-black shadow-sm',
        className,
      )}
      style={{ backgroundColor: '#50C36E' }}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

export default Tag
