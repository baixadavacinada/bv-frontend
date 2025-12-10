'use client'

import { useState, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, Eye, Lock, Save, Loader } from 'lucide-react'
import { NotificationTemplate } from '@/services/notificationTemplateService'
import { createTemplate, updateTemplate, extractVariables } from '@/services/templateEditService'
import { toast } from 'sonner'

interface TemplateEditDialogProps {
  template?: NotificationTemplate
  isOpen: boolean
  onClose: () => void
  onSuccess: (template: NotificationTemplate) => void
}

const CATEGORIES = [
  { value: 'appointment', label: 'Agendamento' },
  { value: 'vaccine', label: 'Vacina' },
  { value: 'reminder', label: 'Lembrete' },
  { value: 'system', label: 'Sistema' },
  { value: 'general', label: 'Geral' },
]

const VARIABLE_INFO: Record<string, string> = {
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

export function TemplateEditDialog({
  template,
  isOpen,
  onClose,
  onSuccess,
}: TemplateEditDialogProps) {
  const isEditMode = !!template

  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    subject: template?.subject || '',
    body: template?.body || '',
    category: (template?.category || 'general') as NotificationTemplate['category'],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Extract variables from subject and body
  const usedVariables = useMemo(() => {
    const subjectVars = extractVariables(formData.subject)
    const bodyVars = extractVariables(formData.body)
    return [...new Set([...subjectVars, ...bodyVars])]
  }, [formData.subject, formData.body])

  // Renderize texto com variáveis destacadas
  const renderWithVariables = useCallback((text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g)
    return parts.map((part, idx) => {
      if (/^\{\{[^}]+\}\}$/.test(part)) {
        return (
          <span key={idx} className="rounded bg-blue-100 px-1 font-mono text-blue-900">
            {part}
          </span>
        )
      }
      return <span key={idx}>{part}</span>
    })
  }, [])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    // Validações
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

    setIsLoading(true)
    try {
      const payload = {
        ...formData,
        ...(isEditMode && { id: template.id }),
      }

      const response = isEditMode
        ? await updateTemplate(payload as any)
        : await createTemplate(payload)

      if (response.success) {
        toast.success(
          isEditMode ? 'Template atualizado com sucesso!' : 'Template criado com sucesso!',
        )
        onSuccess(formData as unknown as NotificationTemplate)
        onClose()
      } else {
        toast.error(response.error || 'Erro ao salvar template')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Template' : 'Criar Novo Template'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite o template. Variáveis entre {{chaves}} são protegidas.'
              : 'Crie um novo template de notificação. Use {{variáveis}} para dados dinâmicos.'}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs: Editar vs Preview */}
        <div className="mb-4 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setPreviewMode(false)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !previewMode
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => setPreviewMode(true)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              previewMode
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="mr-1 inline h-4 w-4" />
            Preview
          </button>
        </div>

        {!previewMode ? (
          <div className="space-y-4 py-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: Agendamento Confirmado"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Ex: Confirma que o agendamento foi realizado"
              />
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => handleChange('category', val)}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assunto */}
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto *</Label>
              <div className="relative">
                <Textarea
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Ex: Seu agendamento na {{healthUnitName}} foi confirmado"
                  rows={2}
                  className="font-mono text-sm"
                />
                <div className="absolute top-2 right-2 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                  <Lock className="mr-1 inline h-3 w-3" />
                  Variáveis protegidas
                </div>
              </div>
            </div>

            {/* Corpo */}
            <div className="space-y-2">
              <Label htmlFor="body">Corpo da Mensagem *</Label>
              <div className="relative">
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => handleChange('body', e.target.value)}
                  placeholder="Comece a escrever... Use {{variavel}} para dados dinâmicos"
                  rows={8}
                  className="font-mono text-sm"
                />
                <div className="absolute top-2 right-2 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                  <Lock className="mr-1 inline h-3 w-3" />
                  Variáveis protegidas
                </div>
              </div>
            </div>

            {/* Info: Variáveis disponíveis */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
                <AlertCircle className="h-4 w-4" />
                Variáveis Disponíveis
              </h4>
              <div className="space-y-1 text-xs text-blue-800">
                {Object.entries(VARIABLE_INFO).map(([key, description]) => (
                  <div key={key}>
                    <code className="rounded bg-white px-2 py-0.5 font-mono">
                      {'{'}
                      {'{'}
                      {key}
                      {'}'}
                      {'}'}
                    </code>
                    {' - '}
                    <span className="text-blue-700">{description}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-blue-700 italic">
                💡 Variáveis encontradas:{' '}
                {usedVariables.length > 0 ? usedVariables.join(', ') : 'nenhuma'}
              </p>
            </div>
          </div>
        ) : (
          // PREVIEW MODE
          <div className="space-y-4 py-4">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              {/* Categoria Badge */}
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    formData.category === 'appointment'
                      ? 'bg-blue-100 text-blue-800'
                      : formData.category === 'vaccine'
                        ? 'bg-green-100 text-green-800'
                        : formData.category === 'reminder'
                          ? 'bg-orange-100 text-orange-800'
                          : formData.category === 'system'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                  } `}
                >
                  {CATEGORIES.find((c) => c.value === formData.category)?.label}
                </span>
              </div>

              {/* Nome e Descrição */}
              <div>
                <h3 className="text-lg font-bold text-gray-900">{formData.name || '(Sem nome)'}</h3>
                <p className="text-sm text-gray-600">{formData.description || '(Sem descrição)'}</p>
              </div>

              {/* Assunto */}
              <div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900">Assunto:</h4>
                <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-gray-900">
                  {renderWithVariables(formData.subject || '(Vazio)')}
                </div>
              </div>

              {/* Corpo */}
              <div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900">Corpo:</h4>
                <div className="max-h-48 overflow-y-auto rounded border border-green-200 bg-green-50 p-3 font-mono text-sm whitespace-pre-wrap text-gray-900">
                  {renderWithVariables(formData.body || '(Vazio)')}
                </div>
              </div>

              {/* Variáveis detectadas */}
              {usedVariables.length > 0 && (
                <div className="rounded border border-yellow-200 bg-yellow-50 p-3">
                  <p className="mb-1 text-xs font-semibold text-yellow-900">
                    Variáveis detectadas:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {usedVariables.map((varName) => (
                      <span
                        key={varName}
                        className="inline-block rounded bg-yellow-100 px-2 py-0.5 font-mono text-xs text-yellow-800"
                      >
                        {'{'}
                        {'{'}
                        {varName}
                        {'}'}
                        {'}'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 border-t border-gray-200 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="gap-2">
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEditMode ? 'Atualizar Template' : 'Criar Template'}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
