'use client'

import { useState } from 'react'
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
import { extractVariables } from '@/services/templateEditService'
import { toast } from 'sonner'

interface TemplatePreviewCardProps {
  template: NotificationTemplate
  showSendButton?: boolean
  onSend?: (template: NotificationTemplate) => void
}

const VARIABLE_DESCRIPTIONS: Record<string, string> = {
  userName: 'Nome do usuário',
  healthUnitName: 'Nome da UBS',
  vaccineName: 'Nome da vacina',
  date: 'Data',
  time: 'Horário',
  appointmentId: 'ID do Agendamento',
  doses: 'Total de doses',
  currentDose: 'Dose atual',
  phoneNumber: 'Número de telefone',
  message: 'Mensagem customizada',
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  appointment: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '📅' },
  vaccine: { bg: 'bg-green-100', text: 'text-green-800', icon: '💉' },
  reminder: { bg: 'bg-orange-100', text: 'text-orange-800', icon: '🔔' },
  system: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '⚙️' },
  general: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '📢' },
}

export function TemplatePreviewCard({ template, showSendButton = true, onSend }: TemplatePreviewCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details')

  const categoryColors = CATEGORY_COLORS[template.category] || CATEGORY_COLORS.general
  const variables = extractVariables(`${template.subject} ${template.body}`)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado para a área de transferência!')
  }

  const renderWithVariables = (text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g)
    return parts.map((part, idx) => {
      if (/^\{\{[^}]+\}\}$/.test(part)) {
        return (
          <span key={idx} className="rounded bg-blue-100 px-1 font-mono text-xs font-semibold text-blue-900">
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
        className="w-full text-left rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-400 hover:shadow-md transition-all"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className={`${categoryColors.bg} ${categoryColors.text} border-0`}>
                {categoryColors.icon} {template.category}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-600 truncate">{template.description}</p>
          </div>
          <Eye className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
        </div>
      </button>

      {/* Preview Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge className={`${categoryColors.bg} ${categoryColors.text} border-0`}>
                {categoryColors.icon} {template.category}
              </Badge>
            </div>
            <DialogTitle>{template.name}</DialogTitle>
            <DialogDescription>{template.description}</DialogDescription>
          </DialogHeader>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 mb-4">
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
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
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
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">Assunto</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(template.subject)}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar
                  </Button>
                </div>
                <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-gray-900 break-words">
                  {renderWithVariables(template.subject)}
                </div>
              </div>

              {/* Corpo */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">Corpo da Mensagem</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(template.body)}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar
                  </Button>
                </div>
                <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-gray-900 whitespace-pre-wrap break-words max-h-64 overflow-y-auto font-mono">
                  {renderWithVariables(template.body)}
                </div>
              </div>

              {/* Variáveis */}
              {variables.length > 0 && (
                <div className="rounded border border-yellow-200 bg-yellow-50 p-3">
                  <h4 className="text-sm font-semibold text-yellow-900 mb-2">Variáveis Utilizadas</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {variables.map((varName) => (
                      <div key={varName} className="rounded bg-white p-2 border border-yellow-200">
                        <code className="font-mono font-semibold text-yellow-900">
                          {'{'}
                          {'{'}
                          {varName}
                          {'}'}
                          {'}'}
                        </code>
                        <p className="text-gray-600 text-xs mt-1">
                          {VARIABLE_DESCRIPTIONS[varName] || 'Variável customizada'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // WhatsApp Preview Tab
            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="text-sm font-semibold text-green-900 mb-3">Visualização WhatsApp</h4>

                <div className="space-y-2">
                  {/* Exemplo de mensagens */}
                  <div className="bg-white rounded-lg p-3 border border-green-100 text-sm space-y-2">
                    {/* Mensagem de exemplo com variáveis substituídas */}
                    <div className="flex justify-end">
                      <div className="max-w-xs rounded-lg bg-green-100 px-3 py-2 text-gray-800 rounded-br-none">
                        <p className="text-xs font-semibold text-gray-600 mb-1">Assunto:</p>
                        <p className="break-words">{renderWithVariables(template.subject)}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-xs rounded-lg bg-green-100 px-3 py-2 text-gray-800 rounded-br-none">
                        <p className="break-words whitespace-pre-wrap">
                          {renderWithVariables(template.body)}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">14:30</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-2 border border-gray-200 text-xs text-gray-600">
                    <p>
                      💡 <strong>Nota:</strong> Variáveis como {{'{'}}{'{'}
                      {'userName}{'}
                      {'}'} serão substituídas pelos dados reais do usuário no envio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Send Button */}
          {showSendButton && onSend && (
            <Button onClick={() => onSend(template)} className="w-full gap-2 mt-4">
              <MessageCircle className="h-4 w-4" />
              Enviar Notificação
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
