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
import { Copy, Eye, Edit, Trash2, AlertCircle } from 'lucide-react'
import { NotificationTemplate } from '@/services/notificationTemplateService'
import { toast } from 'sonner'

const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; border: string; icon: string; label: string }
> = {
  appointment: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: '📅',
    label: 'Agendamento',
  },
  vaccine: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: '💉',
    label: 'Vacina',
  },
  reminder: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: '🔔',
    label: 'Lembrete',
  },
  system: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: '⚙️',
    label: 'Sistema',
  },
  general: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: '📢',
    label: 'Geral',
  },
}

interface PreviewCardProps {
  template: NotificationTemplate
  showActions?: boolean
  onEdit?: (template: NotificationTemplate) => void
  onDelete?: (templateId: string) => void
  onSend?: (template: NotificationTemplate) => void
  compact?: boolean
}

export function PreviewCard({
  template,
  showActions = false,
  onEdit,
  onDelete,
  onSend,
  compact = false,
}: PreviewCardProps) {
  useAccessibilityValidation({ enabled: true })
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'whatsapp'>('details')

  const colors = CATEGORY_COLORS[template.category] || CATEGORY_COLORS.general

  const renderWithHighlightedVars = (text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g)
    return parts.map((part, idx) => {
      if (/^\{\{[^}]+\}\}$/.test(part)) {
        return (
          <span
            key={idx}
            className="inline-flex items-center gap-1 rounded border border-yellow-300 bg-yellow-100 px-2 py-0.5 font-mono text-xs font-semibold text-yellow-900"
          >
            <AlertCircle className="h-3 w-3" />
            {part}
          </span>
        )
      }
      return <span key={idx}>{part}</span>
    })
  }

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpen(true)}
        className={`group cursor-pointer rounded-lg border-2 transition-all hover:shadow-md ${colors.border} ${colors.bg} p-4`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* Header com nome e categoria */}
            <div className="mb-2 flex items-start gap-2">
              <h3 className="line-clamp-2 flex-1 text-sm font-semibold text-gray-900">
                {template.name}
              </h3>
            </div>

            {/* Descrição */}
            <p className={`text-sm ${colors.text} mb-3 line-clamp-2`}>{template.description}</p>

            {/* Preview do corpo */}
            {!compact && (
              <p className="bg-opacity-50 mb-3 line-clamp-2 rounded bg-white p-2 font-mono text-xs text-gray-600">
                {template.body}
              </p>
            )}

            {/* Variáveis e badge */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {colors.icon} {colors.label}
              </Badge>
              <Badge
                variant={template.status === 'ativo' ? 'default' : 'secondary'}
                className={`text-xs ${
                  template.status === 'ativo' ? 'bg-green-600 text-white hover:bg-green-700' : ''
                }`}
              >
                {template.status === 'ativo' ? '✓ Ativo' : '✗ Desativado'}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(true)
              }}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Eye className="h-4 w-4" />
            </Button>

            {showActions && (
              <>
                {onSend && (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSend(template)
                    }}
                    className="bg-green-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-green-700"
                  >
                    📤
                  </Button>
                )}
                {onEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(template)
                    }}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}

                {onDelete && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm('Tem certeza que deseja deletar este template?')) {
                        onDelete(template.id)
                      }
                    }}
                    className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{colors.icon}</span>
              <div>
                <DialogTitle>{template.name}</DialogTitle>
                <DialogDescription>{template.description}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Tabs */}
          <div className="mt-4 flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'details'
                  ? 'border-primary text-primary border-b-2'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Detalhes
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'whatsapp'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💬 WhatsApp
            </button>
          </div>

          {/* Content */}
          <div className="mt-4 space-y-4">
            {activeTab === 'details' ? (
              <>
                {/* Assunto */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">📌 Assunto</h4>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(template.subject)
                        toast.success('Copiado!')
                      }}
                      className="h-7 gap-1 px-2 text-xs"
                    >
                      <Copy className="h-3 w-3" />
                      Copiar
                    </Button>
                  </div>
                  <div
                    className={`rounded-lg border-2 p-4 text-sm whitespace-pre-wrap ${colors.border} ${colors.bg}`}
                  >
                    {renderWithHighlightedVars(template.subject)}
                  </div>
                </div>

                {/* Corpo */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">💬 Corpo da Mensagem</h4>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(template.body)
                        toast.success('Copiado!')
                      }}
                      className="h-7 gap-1 px-2 text-xs"
                    >
                      <Copy className="h-3 w-3" />
                      Copiar
                    </Button>
                  </div>
                  <div
                    className={`max-h-64 overflow-y-auto rounded-lg border-2 p-4 font-mono text-sm whitespace-pre-wrap ${colors.border} ${colors.bg}`}
                  >
                    {renderWithHighlightedVars(template.body)}
                  </div>
                </div>
              </>
            ) : (
              // WhatsApp Preview
              <div className="space-y-4">
                <div className="mx-auto max-w-sm overflow-hidden rounded-3xl border-4 border-gray-800 bg-gray-800 shadow-2xl">
                  {/* WhatsApp Header */}
                  <div className="flex items-center justify-between bg-green-600 px-4 py-3 text-white">
                    <div>
                      <p className="text-sm font-bold">Baixada Vacinada</p>
                      <p className="text-xs opacity-75">online</p>
                    </div>
                    <div className="flex gap-3 text-lg">📞 ℹ️</div>
                  </div>

                  {/* Messages */}
                  <div className="flex min-h-80 flex-col justify-center gap-3 bg-gradient-to-br from-green-50 to-green-100 p-4">
                    {/* Subject message */}
                    <div className="flex justify-start">
                      <div className="max-w-xs rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm">
                        <p className="border-l-4 border-blue-600 pl-2 text-sm font-semibold text-blue-900">
                          {renderWithHighlightedVars(template.subject)}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">14:23</p>
                      </div>
                    </div>

                    {/* Body message */}
                    <div className="flex justify-start">
                      <div className="max-w-xs rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm">
                        <p className="text-sm whitespace-pre-wrap text-gray-800">
                          {renderWithHighlightedVars(template.body)}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">14:24 ✓</p>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-3">
                    <span>😊</span>
                    <input
                      type="text"
                      placeholder="Digite uma mensagem"
                      className="flex-1 rounded-full bg-white px-4 py-2 text-sm outline-none"
                      disabled
                    />
                    <span>🎤</span>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-xs text-blue-800">
                    <strong>💡 Nota:</strong> Os dados destacados em amarelo (variáveis entre
                    chaves) serão substituídos com informações reais do usuário no momento do envio.
                  </p>
                </div>

                {onSend && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsOpen(false)
                      onSend(template)
                    }}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    📤 Enviar Este Template
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
