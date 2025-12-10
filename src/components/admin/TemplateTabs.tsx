'use client'

import { NotificationTemplate } from '@/services/notificationTemplateService'
import { Badge } from '@/components/ui/badge'

interface TemplateTabsProps {
  templates: NotificationTemplate[]
  selectedCategory: string | 'all'
  onSelectCategory: (category: string | 'all') => void
  renderContent: (templates: NotificationTemplate[]) => React.ReactNode
}

const CATEGORY_INFO: Record<string, { label: string; color: string; icon: string }> = {
  appointment: { label: 'Agendamento', color: 'bg-blue-50', icon: '📅' },
  vaccine: { label: 'Vacina', color: 'bg-green-50', icon: '💉' },
  reminder: { label: 'Lembrete', color: 'bg-orange-50', icon: '🔔' },
  system: { label: 'Sistema', color: 'bg-purple-50', icon: '⚙️' },
  general: { label: 'Geral', color: 'bg-gray-50', icon: '📢' },
}

export function TemplateTabs({
  templates,
  selectedCategory,
  onSelectCategory,
  renderContent,
}: TemplateTabsProps) {
  const categories = ['all', ...Array.from(new Set(templates.map((t) => t.category))).sort()]

  const getTemplateCountByCategory = (category: string | 'all'): number => {
    if (category === 'all') return templates.length
    return templates.filter((t) => t.category === category).length
  }

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory)

  return (
    <div className="w-full space-y-6">
      {/* Abas */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gray-100 text-gray-900'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>📋 Todos</span>
          <Badge variant="outline" className="ml-1">
            {getTemplateCountByCategory('all')}
          </Badge>
        </button>

        {categories
          .filter((cat) => cat !== 'all')
          .map((category) => {
            const info = CATEGORY_INFO[category] || {
              label: category,
              color: 'bg-gray-50',
              icon: '📄',
            }
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>
                  {info.icon} {info.label}
                </span>
                <Badge variant="outline" className="ml-1">
                  {getTemplateCountByCategory(category)}
                </Badge>
              </button>
            )
          })}
      </div>

      {/* Conteúdo */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedCategory === 'all'
              ? 'Todos os Templates'
              : CATEGORY_INFO[selectedCategory]?.label || selectedCategory}
          </h3>
          <p className="text-sm text-gray-600">
            {getTemplateCountByCategory(selectedCategory)} template(s)
          </p>
        </div>
        {renderContent(filteredTemplates)}
      </div>
    </div>
  )
}
