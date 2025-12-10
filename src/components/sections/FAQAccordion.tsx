'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="w-full space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-sm"
        >
          <button
            onClick={() => toggleExpanded(item.id)}
            className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
            aria-expanded={expandedId === item.id}
            aria-controls={`faq-answer-${item.id}`}
          >
            <div className="flex-1 text-left">
              <h3 className="text-base font-semibold text-gray-900">{item.question}</h3>
            </div>
            <ChevronDown
              size={20}
              className={cn(
                'text-primary ml-4 flex-shrink-0 transition-transform duration-200',
                expandedId === item.id && 'rotate-180 transform',
              )}
              aria-hidden="true"
            />
          </button>

          {expandedId === item.id && (
            <div
              id={`faq-answer-${item.id}`}
              className="border-t border-gray-200 bg-gray-50 px-6 py-4"
            >
              <p className="text-sm leading-relaxed text-gray-700">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
