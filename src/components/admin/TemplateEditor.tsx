'use client'

import { useState, useEffect, useMemo } from 'react'
import { AlertCircle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { NotificationTemplate } from '@/services/notificationTemplateService'
import { toast } from 'sonner'

const VARIABLE_MAPPINGS: Record<
  string,
  { displayName: string; description: string; icon: string }
> = {
  userName: { displayName: 'Nome do Usuário', description: 'Nome completo da pessoa', icon: '👤' },
  healthUnitName: { displayName: 'Unidade de Saúde', description: 'Nome da UBS', icon: '🏥' },
  vaccineName: {
    displayName: 'Nome da Vacina',
    description: 'Ex: Pfizer, Astrazeneca',
    icon: '💉',
  },
  date: { displayName: 'Data', description: 'Formato DD/MM/YYYY', icon: '📅' },
  time: { displayName: 'Horário', description: 'Formato HH:MM', icon: '⏰' },
  appointmentId: { displayName: 'ID do Agendamento', description: 'Número único', icon: '🆔' },
  doses: { displayName: 'Total de Doses', description: 'Quantas doses necessárias', icon: '💉' },
  currentDose: {
    displayName: 'Dose Atual',
    description: 'Qual dose está sendo aplicada',
    icon: '#️⃣',
  },
  phoneNumber: { displayName: 'Telefone', description: 'Contato do usuário', icon: '📱' },
}

const CATEGORIES = [
  { value: 'appointment', label: 'Agendamento', icon: '📅' },
  { value: 'vaccine', label: 'Vacina', icon: '💉' },
  { value: 'reminder', label: 'Lembrete', icon: '🔔' },
  { value: 'system', label: 'Sistema', icon: '⚙️' },
  { value: 'general', label: 'Geral', icon: '📢' },
]

interface TemplateEditorProps {
  template?: NotificationTemplate | null
  onSave: (template: Omit<NotificationTemplate, 'id'>) => Promise<void>
  onClose: () => void
  isLoading?: boolean
}

export function TemplateEditor({
  template,
  onSave,
  onClose,
  isLoading = false,
}: TemplateEditorProps) {
  useAccessibilityValidation({ enabled: true })
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    body: '',
    category: 'general' as 'appointment' | 'vaccine' | 'reminder' | 'system' | 'general',
  })

  const [showVariableGuide, setShowVariableGuide] = useState(false)

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        subject: template.subject,
        body: template.body,
        category: template.category,
      })
    }
  }, [template?.id])

  // Extract and track available variables
  const extractedVars = useMemo(() => {
    const text = `${formData.subject} ${formData.body}`
    const matches = text.match(/\{\{(\w+)\}\}/g) || []
    return Array.from(new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, ''))))
  }, [formData.subject, formData.body])

  const insertVariable = (varName: string, field: 'subject' | 'body') => {
    const variable = `{{${varName}}}`
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] + variable,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Nome do template é obrigatório')
      return
    }

    if (!formData.description.trim()) {
      toast.error('Descrição é obrigatória')
      return
    }

    if (!formData.subject.trim()) {
      toast.error('Assunto é obrigatório')
      return
    }

    if (!formData.body.trim()) {
      toast.error('Corpo da mensagem é obrigatório')
      return
    }

    try {
      await onSave({
        name: formData.name,
        description: formData.description,
        subject: formData.subject,
        body: formData.body,
        category: formData.category,
      })
      toast.success('Template salvo com sucesso!')
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar template'
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-semibold">
            Nome do Template *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Lembrete de Segunda Dose"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-semibold">
            Descrição *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva o propósito deste template..."
            className="mt-1"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-sm font-semibold">
            Categoria *
          </Label>
          <Select
            value={formData.category}
            onValueChange={(val: string) =>
              setFormData((prev) => ({
                ...prev,
                category: val as 'appointment' | 'vaccine' | 'reminder' | 'system' | 'general',
              }))
            }
          >
            <SelectTrigger id="category" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assunto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="subject" className="text-sm font-semibold">
            Assunto da Mensagem *
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowVariableGuide(true)}
            className="text-primary hover:bg-primary/10 text-xs"
          >
            <Zap className="mr-1 h-3 w-3" />
            Adicionar Variável
          </Button>
        </div>
        <Textarea
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
          placeholder="Ex: Seu agendamento foi confirmado. Use {{variavel}} para dados dinâmicos."
          rows={2}
          className="font-mono text-sm"
        />
        <p className="text-xs text-gray-500">
          Use {'{{'} variavel {'}}'} para inserir dados dinâmicos. Clique em &quot;Adicionar
          Variável&quot; para ver a lista.
        </p>
      </div>

      {/* Corpo da Mensagem */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="body" className="text-sm font-semibold">
            Corpo da Mensagem *
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowVariableGuide(true)}
            className="text-primary hover:bg-primary/10 text-xs"
          >
            <Zap className="mr-1 h-3 w-3" />
            Adicionar Variável
          </Button>
        </div>

        <Textarea
          id="body"
          value={formData.body}
          onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
          placeholder="Escreva a mensagem completa... Use {{variavel}} para dados dinâmicos."
          rows={6}
          className="font-mono text-sm"
        />
        <p className="text-xs text-gray-500">
          Use {'{{'} variavel {'}}'} para inserir dados dinâmicos. Clique em &quot;Adicionar
          Variável&quot; para ver a lista.
        </p>
      </div>

      {/* Variáveis Utilizadas */}
      {extractedVars.length > 0 && (
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900">Variáveis Detectadas</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {extractedVars.map((varName) => {
                  const varInfo = VARIABLE_MAPPINGS[varName]
                  return (
                    <div
                      key={varName}
                      className="rounded border border-blue-200 bg-white px-3 py-1 text-xs"
                    >
                      <code className="font-mono font-semibold text-blue-700">
                        {'{'}
                        {'{'}
                        {varName}
                        {'}'}
                        {'}'}
                      </code>
                      {varInfo && (
                        <p className="mt-0.5 text-xs text-gray-600">{varInfo.displayName}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? 'Salvando...' : ' Salvar Template'}
        </Button>
      </div>

      {/* Variable Guide Dialog */}
      <Dialog open={showVariableGuide} onOpenChange={setShowVariableGuide}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Guia de Variáveis
            </DialogTitle>
            <DialogDescription>Clique para inserir variáveis na sua mensagem</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
              <p className="text-sm text-green-800">
                <strong>💡 Como funciona:</strong> As variáveis são substituídas automaticamente
                quando a mensagem é enviada. Por exemplo, {'{'}
                {'{'} userName {'}'}
                {'}'} se torna &quot;João&quot; quando enviado para João.
              </p>
            </div>

            <div className="space-y-3">
              {Object.entries(VARIABLE_MAPPINGS).map(
                ([key, { displayName, description, icon }]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {icon} {displayName}
                      </p>
                      <p className="text-xs text-gray-600">{description}</p>
                      <code className="mt-1 inline-block rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700">
                        {'{'}
                        {'{'}
                        {key}
                        {'}'}
                        {'}'}
                      </code>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          insertVariable(key, 'subject')
                          toast.success('Variável inserida no assunto')
                        }}
                      >
                        Assunto
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          insertVariable(key, 'body')
                          toast.success('Variável inserida no corpo')
                        }}
                      >
                        Corpo
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
}
