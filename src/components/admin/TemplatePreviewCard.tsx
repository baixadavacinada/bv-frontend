'use client'

import { useState } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Eye, Copy, MessageCircle } from 'lucide-react'
import { NotificationTemplate } from '@/services/notificationTemplateService'
import { toast } from 'sonner'

interface TemplatePreviewCardProps {
  template: NotificationTemplate
  showSendButton?: boolean
  onSend?: (template: NotificationTemplate) => void
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; icon: string; label: string }> = {
  appointment: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '📅', label: 'Agendamento' },
  vaccine: { bg: 'bg-green-100', text: 'text-green-800', icon: '💉', label: 'Vacina' },
  reminder: { bg: 'bg-orange-100', text: 'text-orange-800', icon: '🔔', label: 'Lembrete' },
  system: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '⚙️', label: 'Sistema' },
  general: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '📢', label: 'Geral' },
}

export function TemplatePreviewCard({
  template,
  showSendButton = true,
  onSend,
}: TemplatePreviewCardProps) {
  useAccessibilityValidation({ enabled: true })
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details')

  const categoryColors = CATEGORY_COLORS[template.category] || CATEGORY_COLORS.general

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado para a área de transferência!')
  }

  const renderWithVariables = (text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g)
    return parts.map((part, idx) => {
      if (/^\{\{[^}]+\}\}$/.test(part)) {
        return (
          <span
            key={idx}
            className="rounded bg-blue-100 px-1 font-mono text-xs font-semibold text-blue-900"
          >
            {part}
          </span>
        )
      }
      return <span key={idx}>{part}</span>
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-400 hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`${categoryColors.bg} ${categoryColors.text} border-0`}
              >
                {categoryColors.icon} {categoryColors.label}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <p className="truncate text-sm text-gray-600">{template.description}</p>
          </div>
          <Eye className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>
      </button>

      {/* Preview Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge className={`${categoryColors.bg} ${categoryColors.text} border-0`}>
                {categoryColors.icon} {categoryColors.label}
              </Badge>
            </div>
            <DialogTitle>{template.name}</DialogTitle>
            <DialogDescription>{template.description}</DialogDescription>
          </DialogHeader>

          {/* Tabs */}
          <div className="mb-4 flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'details'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Detalhes
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
          </div>

          {activeTab === 'details' ? (
            <div className="space-y-4">
              {/* Assunto */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">Assunto</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(template.subject)}
                    className="h-7 gap-1 px-2 text-xs"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar
                  </Button>
                </div>
                <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm break-words text-gray-900">
                  {renderWithVariables(template.subject)}
                </div>
              </div>

              {/* Corpo */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">Corpo da Mensagem</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(template.body)}
                    className="h-7 gap-1 px-2 text-xs"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar
                  </Button>
                </div>
                <div className="max-h-64 overflow-y-auto rounded border border-green-200 bg-green-50 p-3 font-mono text-sm break-words whitespace-pre-wrap text-gray-900">
                  {renderWithVariables(template.body)}
                </div>
              </div>
            </div>
          ) : (
            // WhatsApp Preview Tab
            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-green-900">Visualização WhatsApp</h4>

                <div className="space-y-2">
                  {/* Exemplo de mensagens */}
                  <div className="space-y-2 rounded-lg border border-green-100 bg-white p-3 text-sm">
                    {/* Mensagem de exemplo com variáveis substituídas */}
                    <div className="flex justify-end">
                      <div className="max-w-xs rounded-lg rounded-br-none bg-green-100 px-3 py-2 text-gray-800">
                        <p className="mb-1 text-xs font-semibold text-gray-600">Assunto:</p>
                        <p className="break-words">{renderWithVariables(template.subject)}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-xs rounded-lg rounded-br-none bg-green-100 px-3 py-2 text-gray-800">
                        <p className="break-words whitespace-pre-wrap">
                          {renderWithVariables(template.body)}
                        </p>
                        <p className="mt-2 text-xs text-gray-600">14:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Send Button */}
          {showSendButton && onSend && (
            <Button onClick={() => onSend(template)} className="mt-4 w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              Enviar Notificação
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
