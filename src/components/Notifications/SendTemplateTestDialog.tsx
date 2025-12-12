'use client'

import { useState, useMemo, useEffect } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Send, MessageCircle, User } from 'lucide-react'
import {
  NotificationTemplate,
  sendTemplateTest,
  TemplateContext,
} from '@/services/notificationTemplateService'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SendTemplateTestDialogProps {
  template: NotificationTemplate
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  currentUserPhone?: string
  currentUserName?: string
}

export function SendTemplateTestDialog({
  template,
  isOpen,
  onClose,
  onSuccess,
  currentUserPhone = '',
  currentUserName = 'Você',
}: SendTemplateTestDialogProps) {
  useAccessibilityValidation({ enabled: true })
  const [recipientTarget, setRecipientTarget] = useState<'self' | 'other'>('self')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Extract variables from template (same as TemplateEditor)
  const extractedVariables = useMemo(() => {
    const text = `${template.subject} ${template.body}`
    const matches = text.match(/\{\{(\w+)\}\}/g) || []
    return Array.from(new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, ''))))
  }, [template.subject, template.body])

  const handleVariableChange = (variable: string, value: string) => {
    setVariables((prev) => ({ ...prev, [variable]: value }))
  }

  // Resetar quando dialog abre
  useEffect(() => {
    if (isOpen) {
      setRecipientTarget('self')
      setWhatsappNumber(currentUserPhone)
      setRecipientName(currentUserName)
      setVariables({})
      setIsLoading(false)
    }
  }, [isOpen, currentUserPhone, currentUserName])

  // Sincronizar whatsappNumber quando recipientTarget muda para 'self'
  useEffect(() => {
    if (recipientTarget === 'self') {
      setWhatsappNumber(currentUserPhone)
      setRecipientName(currentUserName)
    }
  }, [recipientTarget, currentUserPhone, currentUserName])

  const handleSendTest = async () => {
    let finalNumber = whatsappNumber
    let finalName = recipientName

    // Se for para mim mesmo, use dados do usuário atual
    if (recipientTarget === 'self') {
      if (!currentUserPhone.trim()) {
        toast.error('Seu número de WhatsApp não está cadastrado')
        return
      }
      finalNumber = currentUserPhone
      finalName = currentUserName
    } else {
      // Se for para outro, valide os dados preenchidos
      if (!whatsappNumber.trim()) {
        toast.error('Informe o número de WhatsApp do destinatário')
        return
      }
      if (!recipientName.trim()) {
        toast.error('Informe o nome do destinatário')
        return
      }
    }

    // Validar número de WhatsApp (at least 10 digits)
    const phoneRegex = /^\d{10,}$/
    const cleanedNumber = finalNumber.replace(/\D/g, '')
    if (!phoneRegex.test(cleanedNumber)) {
      toast.error('Número de WhatsApp inválido (mínimo 10 dígitos)')
      return
    }

    // Validate required variables
    const missingVariables = extractedVariables.filter((v: string) => !variables[v])
    if (missingVariables.length > 0) {
      toast.error(`Preencha as variáveis obrigatórias: ${missingVariables.join(', ')}`)
      return
    }

    try {
      setIsLoading(true)
      const context: TemplateContext = variables
      await sendTemplateTest(template.id, cleanedNumber, context, 'whatsapp')
      toast.success('Template de teste enviado com sucesso via WhatsApp!')
      onSuccess?.()
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao enviar teste'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>📬 Enviar Template de Teste</DialogTitle>
          <DialogDescription>
            Envie um teste do template &quot;{template.name}&quot; para validar antes de envios em
            massa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient Target Selection */}
          <div className="space-y-3">
            <Label>Enviar para quem?</Label>
            <div className="flex gap-3">
              <button
                onClick={() => setRecipientTarget('self')}
                className={`flex-1 rounded-lg border-2 p-3 text-left transition-colors ${
                  recipientTarget === 'self'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Para mim mesmo</div>
                    <div className="text-xs text-gray-500">{currentUserName}</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setRecipientTarget('other')}
                className={`flex-1 rounded-lg border-2 p-3 text-left transition-colors ${
                  recipientTarget === 'other'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Para outro usuário</div>
                    <div className="text-xs text-gray-500">Preença dados</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Recipient Details */}
          {recipientTarget === 'other' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="recipient-name" className="text-xs text-gray-600">
                  Nome do Destinatário
                </Label>
                <Input
                  id="recipient-name"
                  placeholder="Nome da pessoa"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="test-whatsapp" className="text-xs text-gray-600">
                  Número de WhatsApp
                </Label>
                <Input
                  id="test-whatsapp"
                  type="tel"
                  placeholder="+55 (11) 99999-9999 ou 5511999999999"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="mt-1"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Formato: com ou sem formatação. Exemplo: (11) 99999-9999 ou 5511999999999
                </p>
              </div>
            </div>
          )}

          {/* Variables */}
          {extractedVariables.length > 0 && (
            <div className="space-y-3">
              <Label>Preencha as Variáveis</Label>
              <div className="space-y-2">
                {extractedVariables.map((variable: string) => (
                  <div key={variable}>
                    <Label htmlFor={`var-${variable}`} className="text-xs text-gray-600">
                      {variable}
                    </Label>
                    <Input
                      id={`var-${variable}`}
                      placeholder={`Valor de {{${variable}}}...`}
                      value={variables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview */}
          {extractedVariables.length === 0 && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-800">
                ✓ Este template não possui variáveis dinâmicas
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleSendTest} disabled={isLoading} className="gap-2">
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <Send className="h-4 w-4" />
              Enviar Teste
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
