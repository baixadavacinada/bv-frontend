'use client'

import { useState, useCallback } from 'react'
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
import { Send, Loader } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { sendTemplateToUser, broadcastTemplate } from '@/services/notificationTemplateService'

interface SendTemplateDialogProps {
  templateId: string
  templateName: string
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

type SendMode = 'single' | 'broadcast'

export function SendTemplateDialog({
  templateId,
  templateName,
  isOpen,
  onClose,
  onSuccess,
}: SendTemplateDialogProps) {
  useAccessibilityValidation({ enabled: true })
  const [mode, setMode] = useState<SendMode>('single')
  const [userId, setUserId] = useState('')
  const [userIds, setUserIds] = useState('')
  const [channels, setChannels] = useState<string[]>(['whatsapp', 'email'])
  const [contextData, setContextData] = useState('')
  const [loading, setLoading] = useState(false)

  const handleToggleChannel = useCallback((channel: string) => {
    setChannels((prev) => {
      if (prev.includes(channel)) {
        return prev.filter((c) => c !== channel)
      }
      return [...prev, channel]
    })
  }, [])

  const handleSend = async () => {
    try {
      setLoading(true)

      // Parse context data
      let context = {}
      if (contextData.trim()) {
        try {
          context = JSON.parse(contextData)
        } catch {
          toast.error('Contexto inválido. Deve ser um JSON válido.')
          return
        }
      }

      if (channels.length === 0) {
        toast.error('Selecione pelo menos um canal de notificação')
        return
      }

      if (mode === 'single') {
        if (!userId.trim()) {
          toast.error('Informe o ID do usuário')
          return
        }

        await sendTemplateToUser(templateId, userId.trim(), context, channels)
        toast.success('Notificação enviada com sucesso!')
      } else {
        const ids = userIds
          .split('\n')
          .map((id) => id.trim())
          .filter(Boolean)

        if (ids.length === 0) {
          toast.error('Informe pelo menos um ID de usuário')
          return
        }

        if (ids.length > 1000) {
          toast.error('Máximo de 1000 usuários por vez')
          return
        }

        await broadcastTemplate(templateId, ids, context, channels)
        toast.success(`Notificação enviada para ${ids.length} usuários!`)
      }

      onSuccess?.()
      handleClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao enviar notificação'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setUserId('')
    setUserIds('')
    setContextData('')
    setChannels(['whatsapp', 'email'])
    setMode('single')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Enviar {templateName}
          </DialogTitle>
          <DialogDescription>
            Configure os dados e envie a notificação para um ou múltiplos usuários
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Modo de Envio */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Modo de Envio</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="single"
                  checked={mode === 'single'}
                  onCheckedChange={() => setMode('single')}
                />
                <Label htmlFor="single" className="cursor-pointer font-normal">
                  Um Usuário
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="broadcast"
                  checked={mode === 'broadcast'}
                  onCheckedChange={() => setMode('broadcast')}
                />
                <Label htmlFor="broadcast" className="cursor-pointer font-normal">
                  Múltiplos Usuários
                </Label>
              </div>
            </div>
          </div>

          {/* IDs do Usuário */}
          <div className="space-y-2">
            <Label
              htmlFor={mode === 'single' ? 'userId' : 'userIds'}
              className="text-sm font-semibold"
            >
              {mode === 'single' ? 'ID do Usuário' : 'IDs dos Usuários'}
            </Label>
            {mode === 'single' ? (
              <Input
                id="userId"
                placeholder="Ex: user-firebase-uid-123"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            ) : (
              <Textarea
                id="userIds"
                placeholder="Um ID por linha&#10;Ex:&#10;user-1&#10;user-2&#10;user-3"
                value={userIds}
                onChange={(e) => setUserIds(e.target.value)}
                rows={5}
              />
            )}
            <p className="text-muted-foreground text-xs">
              {mode === 'single'
                ? 'Cole o UID do Firebase do usuário'
                : 'Cole um ID por linha. Máximo 1000 usuários por vez.'}
            </p>
          </div>

          {/* Canais de Notificação */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Canais de Notificação</Label>
            <div className="space-y-2">
              {['whatsapp', 'email', 'push'].map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={channel}
                    checked={channels.includes(channel)}
                    onCheckedChange={() => handleToggleChannel(channel)}
                  />
                  <Label htmlFor={channel} className="cursor-pointer font-normal capitalize">
                    {channel}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">
              Selecione os canais pelos quais a notificação será enviada
            </p>
          </div>

          {/* Contexto (Opcional) */}
          <div className="space-y-2">
            <Label htmlFor="context" className="text-sm font-semibold">
              Contexto (Opcional - JSON)
            </Label>
            <Textarea
              id="context"
              placeholder={`{"userName": "João", "vaccineName": "COVID-19", "date": "01/12/2025"}`}
              value={contextData}
              onChange={(e) => setContextData(e.target.value)}
              rows={4}
              className="font-mono text-xs"
            />
            <p className="text-muted-foreground text-xs">
              Forneça variáveis de contexto em formato JSON para personalizar a mensagem. Se vazio,
              a mensagem será enviada conforme configurada.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            disabled={loading || channels.length === 0}
            className="gap-2"
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            {loading ? 'Enviando...' : 'Enviar Notificação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
