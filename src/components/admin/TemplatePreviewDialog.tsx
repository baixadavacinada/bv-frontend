'use client'

import { useCallback, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Copy, Eye, Send } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { NotificationTemplate } from '@/services/notificationTemplateService'

interface TemplatePreviewDialogProps {
  template: NotificationTemplate | null
  isOpen: boolean
  onClose: () => void
  onSend: (templateId: string) => void
  isLoading?: boolean
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    appointment: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    vaccine: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    reminder: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    system: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }
  return colors[category] || colors.general
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    appointment: 'Agendamento',
    vaccine: 'Vacina',
    reminder: 'Lembrete',
    system: 'Sistema',
    general: 'Geral',
  }
  return labels[category] || category
}

export function TemplatePreviewDialog({
  template,
  isOpen,
  onClose,
  onSend,
  isLoading = false,
}: TemplatePreviewDialogProps) {
  useAccessibilityValidation({ enabled: true })
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }, [])

  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview - {template.name}
          </DialogTitle>
          <DialogDescription className="mt-2 flex items-center gap-2">
            <Badge className={getCategoryColor(template.category)}>
              {getCategoryLabel(template.category)}
            </Badge>
            <span className="text-muted-foreground text-xs">{template.id}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Descrição */}
          <div>
            <h4 className="text-muted-foreground mb-1 text-sm font-semibold">Descrição</h4>
            <p className="text-foreground text-sm">{template.description}</p>
          </div>

          {/* Assunto */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground flex items-center justify-between text-sm font-semibold">
              Assunto
              <button
                onClick={() => handleCopy(template.subject, 'subject')}
                className="hover:bg-muted rounded p-1 transition-colors"
                title="Copiar"
              >
                <Copy className={`h-4 w-4 ${copiedField === 'subject' ? 'text-green-600' : ''}`} />
              </button>
            </h4>
            <div className="bg-muted rounded-md border p-3">
              <p className="text-foreground font-mono text-sm break-words">{template.subject}</p>
            </div>
          </div>

          {/* Corpo da Mensagem */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground flex items-center justify-between text-sm font-semibold">
              Corpo da Mensagem
              <button
                onClick={() => handleCopy(template.body, 'body')}
                className="hover:bg-muted rounded p-1 transition-colors"
                title="Copiar"
              >
                <Copy className={`h-4 w-4 ${copiedField === 'body' ? 'text-green-600' : ''}`} />
              </button>
            </h4>
            <div className="bg-muted max-h-48 overflow-y-auto rounded-md border p-3">
              <p className="text-foreground text-sm break-words whitespace-pre-wrap">
                {template.body}
              </p>
            </div>
          </div>

          {/* Variáveis */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">Variáveis Disponíveis</h4>
            <p className="text-muted-foreground mb-2 text-xs">
              Estas variáveis serão substituídas dinamicamente
            </p>
            <div className="bg-muted/50 space-y-1 rounded-md border p-3 text-xs">
              <p>
                <span className="bg-muted rounded px-2 py-1 font-mono">{'{{userName}}'}</span> -
                Nome do usuário
              </p>
              <p>
                <span className="bg-muted rounded px-2 py-1 font-mono">{'{{healthUnitName}}'}</span>{' '}
                - Nome da UBS
              </p>
              <p>
                <span className="bg-muted rounded px-2 py-1 font-mono">{'{{vaccineName}}'}</span> -
                Nome da vacina
              </p>
              <p>
                <span className="bg-muted rounded px-2 py-1 font-mono">{'{{date}}'}</span> - Data
              </p>
              <p>
                <span className="bg-muted rounded px-2 py-1 font-mono">{'{{time}}'}</span> - Horário
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={() => onSend(template.id)} disabled={isLoading} className="gap-2">
            <Send className="h-4 w-4" />
            Enviar Notificação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
