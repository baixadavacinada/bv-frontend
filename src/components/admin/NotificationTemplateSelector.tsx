'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { AlertCircle, Loader } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { getAllCustomTemplates, NotificationTemplate } from '@/services/notificationTemplateService'
import { PreviewCard } from './PreviewCard'
import { toast } from 'sonner'

interface NotificationTemplateSelectorProps {
  enabled: boolean
  onTemplateSelect: (templateId: string) => void
  selectedTemplateId?: string
  category?: 'appointment' | 'vaccine' | 'reminder' | 'system' | 'general'
}

export function NotificationTemplateSelector({
  enabled,
  onTemplateSelect,
  selectedTemplateId,
  category,
}: NotificationTemplateSelectorProps) {
  useAccessibilityValidation({ enabled: true })
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)

  // Load templates when component mounts
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true)
        const data = await getAllCustomTemplates()
        // Filtrar apenas templates ativos
        let filtered = data.filter((t) => t.status === 'ativo')

        // Filtrar por categoria se fornecida
        if (category) {
          filtered = filtered.filter((t) => t.category === category)
        }

        setTemplates(filtered)

        // If we have a previously selected template, set it
        if (selectedTemplateId) {
          const found = filtered.find((t) => t.id === selectedTemplateId)
          if (found) {
            setSelectedTemplate(found)
          }
        }
      } catch (error) {
        console.error('Erro ao carregar templates:', error)
        toast.error('Erro ao carregar templates de notificação')
      } finally {
        setLoading(false)
      }
    }

    if (enabled) {
      loadTemplates()
    }
  }, [enabled, selectedTemplateId, category])

  const handleTemplateChange = useCallback(
    (templateId: string) => {
      const template = templates.find((t) => t.id === templateId)
      if (template) {
        setSelectedTemplate(template)
        onTemplateSelect(templateId)
      }
    },
    [templates, onTemplateSelect],
  )

  if (!enabled) {
    return null
  }

  return (
    <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="font-semibold text-amber-900">📱 Notificações via WhatsApp</h4>
            <p className="mt-1 text-sm text-amber-800">
              As notificações ativas serão enviadas via WhatsApp. Selecione o template da mensagem
              que será disparada.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-select" className="text-sm font-semibold text-amber-900">
              Template de Notificação
            </Label>

            {loading ? (
              <div className="flex items-center gap-2 py-2 text-sm text-amber-700">
                <Loader className="h-4 w-4 animate-spin" />
                Carregando templates...
              </div>
            ) : (
              <Select value={selectedTemplate?.id || ''} onValueChange={handleTemplateChange}>
                <SelectTrigger
                  id="template-select"
                  className="border-amber-300 bg-white text-amber-900"
                >
                  <SelectValue placeholder="Selecione um modelo..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">Nenhum template disponível</div>
                  ) : (
                    templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <span className="font-medium">{template.name}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}

            {selectedTemplate && (
              <div className="space-y-3">
                <p className="text-xs text-amber-700">
                  <strong>Descrição:</strong> {selectedTemplate.description}
                </p>
                <PreviewCard template={selectedTemplate} compact={true} showActions={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
