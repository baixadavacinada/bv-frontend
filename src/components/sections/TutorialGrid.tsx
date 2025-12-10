'use client'

import { FileText } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Tutorial {
  id: string
  title: string
  description: string
  href: string
  duration: string
  level?: 'iniciante' | 'intermediário' | 'avançado'
}

interface TutorialGridProps {
  tutorials: Tutorial[]
  roleLabel: string
  roleDescription?: string
  icon?: React.ReactNode
  horizontal?: boolean
}

export function TutorialGrid({
  tutorials,
  roleLabel,
  roleDescription,
  icon,
  horizontal = false,
}: TutorialGridProps) {
  if (horizontal) {
    return (
      <div className="mb-12">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            {icon}
            <h3 className="text-xl font-bold text-gray-900">{roleLabel}</h3>
          </div>
          {roleDescription && <p className="text-sm text-gray-600">{roleDescription}</p>}
        </div>

        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 -mx-6 overflow-x-auto px-6">
          <div className="flex min-w-min gap-4 pb-4">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.id}
                href={tutorial.href}
                className="group hover:border-primary block w-72 flex-shrink-0 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-md"
              >
                <div className="mb-3 flex items-start gap-3">
                  <FileText
                    size={20}
                    className="text-primary mt-1 flex-shrink-0 transition-transform group-hover:scale-110"
                  />
                  <h4 className="group-hover:text-primary line-clamp-2 font-semibold text-gray-900 transition-colors">
                    {tutorial.title}
                  </h4>
                </div>

                <p className="mb-4 line-clamp-2 text-sm text-gray-600">{tutorial.description}</p>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-gray-500">⏱ {tutorial.duration}</span>
                  {tutorial.level && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        tutorial.level === 'iniciante' && 'bg-success/10 text-success',
                        tutorial.level === 'intermediário' && 'bg-warning/10 text-warning',
                        tutorial.level === 'avançado' && 'bg-alert/10 text-alert',
                      )}
                    >
                      {tutorial.level}
                    </span>
                  )}
                </div>

                <div className="text-primary mt-4 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
                  Ler
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Grid vertical (padrão)
  return (
    <div className="mb-12">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-bold text-gray-900">{roleLabel}</h3>
        </div>
        {roleDescription && <p className="text-sm text-gray-600">{roleDescription}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Link
            key={tutorial.id}
            href={tutorial.href}
            className="group hover:border-primary block rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-3 flex items-start gap-3">
              <FileText
                size={20}
                className="text-primary mt-1 flex-shrink-0 transition-transform group-hover:scale-110"
              />
              <h4 className="group-hover:text-primary line-clamp-2 font-semibold text-gray-900 transition-colors">
                {tutorial.title}
              </h4>
            </div>

            <p className="mb-4 line-clamp-2 text-sm text-gray-600">{tutorial.description}</p>

            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-gray-500">⏱ {tutorial.duration}</span>
              {tutorial.level && (
                <span
                  className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium',
                    tutorial.level === 'iniciante' && 'bg-success/10 text-success',
                    tutorial.level === 'intermediário' && 'bg-warning/10 text-warning',
                    tutorial.level === 'avançado' && 'bg-alert/10 text-alert',
                  )}
                >
                  {tutorial.level}
                </span>
              )}
            </div>

            <div className="text-primary mt-4 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
              Ler
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
