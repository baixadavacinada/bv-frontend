'use client'

import { useState, useEffect, useCallback } from 'react'
import { BvButton, BvTitleHeader, RoleGuard } from '@/components'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { getAllTemplates, NotificationTemplate } from '@/services/notificationTemplateService'
import { TemplateList } from '@/components/admin/TemplateList'
import { TemplatePreviewDialog } from '@/components/admin/TemplatePreviewDialog'
import { SendTemplateDialog } from '@/components/admin/SendTemplateDialog'

export default function TemplateManagementPage() {
  useAccessibilityValidation()
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)

  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllTemplates()
      setTemplates(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar templates'
      console.error('Erro ao carregar templates:', err)
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTemplates()

    const handleStorageChange = () => {
      loadTemplates()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [loadTemplates])

  const handleSelectTemplate = useCallback(async (template: NotificationTemplate) => {
    setSelectedTemplate(template)
    setIsPreviewDialogOpen(true)
  }, [])

  const handleSendTemplate = useCallback(
    async (templateId: string) => {
      const template = templates.find((t) => t.id === templateId)
      if (!template) return

      setSelectedTemplate(template)
      setIsPreviewDialogOpen(false)
      setIsSendDialogOpen(true)
    },
    [templates],
  )

  const handleSendSuccess = useCallback(() => {
    setIsSendDialogOpen(false)
    setSelectedTemplate(null)
    toast.success('Notificação enviada com sucesso!')
  }, [])

  return (
    <RoleGuard allowedRoles={['admin']} requireAuth>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <BvTitleHeader title="Gerenciamento de Templates" />
          <BvButton onClick={loadTemplates} disabled={loading} className="gap-2" variant="outline">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </BvButton>
        </div>

        {/* Erro */}
        {error && (
          <div className="border-destructive/50 bg-destructive/10 flex items-start gap-3 rounded-lg border p-4">
            <AlertCircle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h3 className="text-destructive font-semibold">Erro ao carregar templates</h3>
              <p className="text-destructive/80 mt-1 text-sm">{error}</p>
              <BvButton onClick={loadTemplates} size="sm" variant="outline" className="mt-3 gap-2">
                <RefreshCw className="h-4 w-4" />
                Tentar Novamente
              </BvButton>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-muted/50 rounded-lg border p-4">
          <h3 className="mb-2 text-sm font-semibold">ℹ️ Sobre Templates</h3>
          <p className="text-muted-foreground text-sm">
            Os templates são mensagens pré-configuradas para notificações. Você pode visualizá-los,
            personalizar com dados específicos de usuários e enviar para um ou múltiplos usuários
            através de diferentes canais (WhatsApp, Email, Push).
          </p>
        </div>

        {/* Template List */}
        <TemplateList
          templates={templates}
          loading={loading}
          onSelectTemplate={handleSelectTemplate}
          onRefresh={loadTemplates}
        />

        {/* Dialogs */}
        {selectedTemplate && (
          <>
            <TemplatePreviewDialog
              template={selectedTemplate}
              isOpen={isPreviewDialogOpen}
              onClose={() => {
                setIsPreviewDialogOpen(false)
                setSelectedTemplate(null)
              }}
              onSend={handleSendTemplate}
            />

            <SendTemplateDialog
              templateId={selectedTemplate.id}
              templateName={selectedTemplate.name}
              isOpen={isSendDialogOpen}
              onClose={() => {
                setIsSendDialogOpen(false)
                setSelectedTemplate(null)
              }}
              onSuccess={handleSendSuccess}
            />
          </>
        )}
      </div>
    </RoleGuard>
  )
}
