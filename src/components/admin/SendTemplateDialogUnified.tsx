'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Send, Loader, ChevronRight, ChevronLeft } from 'lucide-react'
import {
  sendTemplateNotification,
  previewRecipients,
  previewTemplate,
  NotificationTemplate,
  getEligibleUsersForTest,
  EligibleUser,
} from '@/services/notificationTemplateService'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface SendTemplateDialogUnifiedProps {
  template: NotificationTemplate
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

type RecipientMode = 'single' | 'broadcast' | 'filter'
type Step = 1 | 2 | 3

interface PreviewRecipient {
  userId: string
  userName: string
  phone: string
  email?: string
}

interface FilterOptions {
  role?: 'public' | 'agent' | 'admin'
  acceptWhatsAppNotifications?: boolean
  hasPhone?: boolean
}

export function SendTemplateDialogUnified({
  template,
  isOpen,
  onClose,
  onSuccess,
}: SendTemplateDialogUnifiedProps) {
  useAccessibilityValidation({ enabled: true })

  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [previewLoading, setPreviewLoading] = useState(false)

  const [recipientTarget, setRecipientTarget] = useState<'self' | 'other' | 'broadcast'>('self')

  const [recipientMode, setRecipientMode] = useState<RecipientMode>('broadcast')
  const [singleUserId, setSingleUserId] = useState('')
  const [broadcastUserIds, setBroadcastUserIds] = useState('')
  const [filterRole, setFilterRole] = useState<'public' | 'agent' | 'admin' | ''>('public')
  const [filterWhatsApp, setFilterWhatsApp] = useState(true)
  const [filterPhone, setFilterPhone] = useState(false)

  const [contextValues, setContextValues] = useState<Record<string, string>>({})

  const [channels, setChannels] = useState<('whatsapp' | 'push')[]>(['whatsapp'])
  const [previewData, setPreviewData] = useState<{
    subject: string
    body: string
    recipients: PreviewRecipient[]
  } | null>(null)
  const [scheduledFor, setScheduledFor] = useState('')

  const extractVariables = useCallback((text: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g
    const matches = new Set<string>()
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.add(match[1])
    }
    return Array.from(matches)
  }, [])

  const variables = useMemo(() => {
    return extractVariables(`${template.subject} ${template.body}`)
  }, [extractVariables, template.subject, template.body])

  useEffect(() => {
    const newContext: Record<string, string> = {}
    variables.forEach((v) => {
      newContext[v] = ''
    })
    setContextValues(newContext)
  }, [variables])

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setLoading(false)
      setPreviewLoading(false)
      setRecipientMode('filter')
      setSingleUserId('')
      setBroadcastUserIds('')
      setFilterRole('public')
      setFilterWhatsApp(true)
      setFilterPhone(false)
      setChannels(['whatsapp'])
      setPreviewData(null)
      setScheduledFor('')
    }
  }, [isOpen, template.id])

  const handleToggleChannel = useCallback((channel: 'whatsapp' | 'push') => {
    setChannels((prev) => {
      if (prev.includes(channel)) {
        return prev.filter((c) => c !== channel)
      }
      return [...prev, channel]
    })
  }, [])

  const handleGetPreview = async () => {
    try {
      setPreviewLoading(true)

      let userIds: string[] | undefined
      let filter: FilterOptions | undefined = undefined

      if (recipientMode === 'single') {
        if (!singleUserId.trim()) {
          toast.error('Informe o ID do usuário')
          return
        }
        userIds = [singleUserId]
      } else if (recipientMode === 'broadcast') {
        if (!broadcastUserIds.trim()) {
          toast.error('Informe os IDs dos usuários (separados por vírgula)')
          return
        }
        userIds = broadcastUserIds.split(',').map((id) => id.trim())
      } else {
        const filterObj: FilterOptions = {}
        if (filterRole) filterObj.role = filterRole as 'public' | 'agent' | 'admin'
        filterObj.acceptWhatsAppNotifications = filterWhatsApp
        filterObj.hasPhone = filterPhone
        filter = filterObj
      }

      // Get recipients preview
      const recipientsData = await previewRecipients(recipientMode, userIds, filter)

      // Get rendered template
      const renderedData = await previewTemplate(template.id, contextValues)

      setPreviewData({
        subject: renderedData.rendered.subject,
        body: renderedData.rendered.body,
        recipients: recipientsData.recipients.slice(0, 10),
      })

      setStep(3)
    } catch (error) {
      toast.error('Erro ao gerar preview')
      console.error(error)
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleSend = async () => {
    try {
      setLoading(true)

      if (channels.length === 0) {
        toast.error('Selecione pelo menos um canal')
        return
      }

      // Build recipients object
      let userIds: string[] | undefined
      let filter: FilterOptions | undefined = undefined

      if (recipientMode === 'single') {
        userIds = [singleUserId]
      } else if (recipientMode === 'broadcast') {
        userIds = broadcastUserIds.split(',').map((id) => id.trim())
      } else {
        filter = {
          role: filterRole || undefined,
          acceptWhatsAppNotifications: filterWhatsApp,
          hasPhone: filterPhone,
        }
      }

      const result = await sendTemplateNotification({
        templateId: template.id,
        recipients: {
          mode: recipientMode,
          userIds,
          filter,
        },
        context: contextValues,
        channels,
        scheduledFor: scheduledFor ? new Date(scheduledFor).toISOString() : undefined,
      })

      if (result.success) {
        toast.success(`Template enviado! Job ID: ${result.data.jobId}`)
        resetForm()
        onClose()
        onSuccess?.()
      } else {
        toast.error(result.data?.message || 'Erro ao enviar template')
      }
    } catch (error) {
      console.error('Error sending template:', error)
      toast.error('Erro ao enviar template')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setRecipientMode('filter')
    setSingleUserId('')
    setBroadcastUserIds('')
    setFilterRole('public')
    setFilterWhatsApp(true)
    setFilterPhone(false)
    setContextValues({})
    setChannels(['whatsapp'])
    setPreviewData(null)
    setScheduledFor('')
  }

  const canContinue = () => {
    if (step === 1) {
      if (recipientMode === 'single') return singleUserId.trim() !== ''
      if (recipientMode === 'broadcast') return broadcastUserIds.trim() !== ''
      return true
    }
    if (step === 2) {
      return variables.every((v) => contextValues[v]?.trim() !== '')
    }
    return true
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>📤 Enviar: {template.name}</DialogTitle>
          <DialogDescription>
            Passo {step} de 3 -{' '}
            {step === 1 ? 'Destinatários' : step === 2 ? 'Personalização' : 'Preview e Envio'}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Recipients */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Info Box - Usuários Elegíveis */}
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
              <div>
                <p className="text-sm font-semibold text-blue-900">📋 Usuários Elegíveis</p>
                <p className="mt-1 text-sm text-blue-800">
                  As notificações serão enviadas para todos os usuários que possuem{' '}
                  <strong>telefone cadastrado</strong> e{' '}
                  <strong>aceitaram receber mensagens no WhatsApp</strong>.
                </p>
              </div>
            </div>

            {/* Filtro Automático */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Papel do Usuário (opcional)</Label>
                <select
                  id="role"
                  value={filterRole}
                  onChange={(e) =>
                    setFilterRole(e.target.value as 'public' | 'agent' | 'admin' | '')
                  }
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="">Qualquer papel</option>
                  <option value="public">Público</option>
                  <option value="agent">Profissional de Saúde</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Context Variables */}
        {step === 2 && (
          <div className="space-y-6">
            {variables.length === 0 ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  ℹ️ Este template não possui variáveis dinâmicas.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Preencha os valores para as variáveis do template:
                </p>
                {variables.map((variable) => (
                  <div key={variable} className="space-y-2">
                    <Label htmlFor={variable} className="font-medium">
                      {variable}
                    </Label>
                    <Input
                      id={variable}
                      placeholder={`Informe o valor de ${variable}`}
                      value={contextValues[variable] || ''}
                      onChange={(e) =>
                        setContextValues((prev) => ({
                          ...prev,
                          [variable]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Preview & Channels */}
        {step === 3 && previewData && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Preview da Mensagem</Label>
              <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Assunto</p>
                  <p className="text-sm font-medium text-gray-900">{previewData.subject}</p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Corpo</p>
                  <p className="text-sm whitespace-pre-wrap text-gray-700">{previewData.body}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Destinatários ({previewData.recipients.length})
              </Label>
              <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50">
                {previewData.recipients.map((recipient) => (
                  <div
                    key={recipient.userId}
                    className="flex items-center justify-between border-b border-gray-200 p-3 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{recipient.userName}</p>
                      <p className="text-xs text-gray-500">{recipient.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Canais de Envio</Label>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center space-x-3">
                  <Checkbox
                    checked={channels.includes('whatsapp')}
                    onCheckedChange={() => handleToggleChannel('whatsapp')}
                  />
                  <span className="text-sm font-medium">WhatsApp</span>
                </label>
                <label className="flex cursor-pointer items-center space-x-3">
                  <Checkbox
                    checked={channels.includes('push')}
                    onCheckedChange={() => handleToggleChannel('push')}
                  />
                  <span className="text-sm font-medium">Push</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledFor">Agendar Envio (opcional)</Label>
              <Input
                id="scheduledFor"
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <DialogFooter className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (step > 1) setStep((step - 1) as Step)
              else onClose()
            }}
            disabled={loading || previewLoading}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {step > 1 ? 'Voltar' : 'Cancelar'}
          </Button>

          <div className="flex items-center gap-2">
            {step === 1 && (
              <Button onClick={() => setStep(2)} disabled={!canContinue() || previewLoading}>
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {step === 2 && (
              <Button
                onClick={handleGetPreview}
                disabled={!canContinue() || previewLoading}
                variant="secondary"
              >
                {previewLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    Preview
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}

            {step === 3 && (
              <Button onClick={handleSend} disabled={loading || channels.length === 0}>
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
