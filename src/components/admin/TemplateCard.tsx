'use client'

import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Edit, Send, TestTube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NotificationTemplate } from '@/services/notificationTemplateService'

interface TemplateCardProps {
  template: NotificationTemplate
  onEdit: (template: NotificationTemplate) => void
  onSend: (template: NotificationTemplate) => void
  onTest?: (template: NotificationTemplate) => void
  onViewAnalytics?: (template: NotificationTemplate) => void
  onToggleStatus?: (template: NotificationTemplate) => void
  onDelete?: (template: NotificationTemplate) => void
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'vaccine':
      return '💉'
    case 'appointment':
      return '📅'
    case 'health_alert':
      return '⚠️'
    case 'reminder':
      return '🔔'
    case 'campaign':
      return '📢'
    default:
      return '📝'
  }
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    vaccine: 'Vacina',
    appointment: 'Agendamento',
    health_alert: 'Alerta de Saúde',
    reminder: 'Lembrete',
    campaign: 'Campanha',
    general: 'Geral',
  }
  return labels[category] || category
}

export function TemplateCard({ template, onEdit, onSend, onTest }: TemplateCardProps) {
  useAccessibilityValidation({ enabled: true })
  const isActive = template.status === 'ativo'

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">{getCategoryIcon(template.category)}</div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-start gap-2">
              <h3 className="flex-1 truncate text-sm font-semibold text-gray-900">
                {template.name}
              </h3>
              <Badge
                variant={isActive ? 'default' : 'secondary'}
                className={`flex-shrink-0 ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
              >
                {isActive ? '🟢 Ativo' : '🔴 Inativo'}
              </Badge>
            </div>
            <p className="line-clamp-2 text-xs text-gray-500">{template.description}</p>
          </div>
        </div>
      </div>

      {/* Body - Info */}
      <div className="space-y-3 p-4">
        {/* Category */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {getCategoryLabel(template.category)}
          </Badge>
        </div>
      </div>

      {/* Footer - Actions */}
      <div className="flex items-center justify-between gap-2 border-t border-gray-100 bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(template)}
            className="h-8 text-xs"
          >
            <Edit className="mr-1.5 h-3.5 w-3.5" />
            Editar
          </Button>

          {onTest && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onTest(template)}
              className="h-8 text-xs"
            >
              <TestTube className="mr-1.5 h-3.5 w-3.5" />
              Testar
            </Button>
          )}
        </div>

        <Button
          size="sm"
          onClick={() => onSend(template)}
          className="h-8 bg-blue-600 text-xs hover:bg-blue-700"
          disabled={!isActive}
        >
          <Send className="mr-1.5 h-3.5 w-3.5" />
          Enviar
        </Button>
      </div>
    </div>
  )
}
