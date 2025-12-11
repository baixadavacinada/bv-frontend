'use client'

import { useState, useMemo } from 'react'
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
import { Loader2, Send } from 'lucide-react'
import {
  NotificationTemplate,
  sendTemplateTest,
  TemplateContext,
} from '@/services/notificationTemplateService'
import { toast } from 'sonner'

interface SendTemplateTestDialogProps {
  template: NotificationTemplate
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function SendTemplateTestDialog({
  template,
  isOpen,
  onClose,
  onSuccess,
}: SendTemplateTestDialogProps) {
  useAccessibilityValidation({ enabled: true })
  const [email, setEmail] = useState('')
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

  const handleSendTest = async () => {
    // Validate email
    if (!email.trim()) {
      toast.error('Informe um email para enviar o teste')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Email inválido')
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
      await sendTemplateTest(template.id, email, context)
      toast.success('Template de teste enviado com sucesso!')
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
          <DialogTitle>📧 Enviar Template de Teste</DialogTitle>
          <DialogDescription>
            Envie um teste do template &quot;{template.name}&quot; para validar antes de envios em
            massa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient */}
          <div className="space-y-3">
            <Label>Destinatário do Teste</Label>
            <div>
              <Label htmlFor="test-email" className="text-xs text-gray-600">
                Email
              </Label>
              <Input
                id="test-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

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
