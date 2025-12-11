'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Search, Loader, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BvTitleHeader, RoleGuard } from '@/components'
import { PreviewCard } from '@/components/admin/PreviewCard'
import { TemplateTabs } from '@/components/admin/TemplateTabs'
import { TemplateEditor } from '@/components/admin/TemplateEditor'
import { SendTemplateDialogUnified } from '@/components/admin/SendTemplateDialogUnified'
import {
  getAllCustomTemplates,
  createCustomTemplate,
  updateCustomTemplate,
  deleteCustomTemplate,
  NotificationTemplate,
} from '@/services/notificationTemplateService'
import { toast } from 'sonner'

export default function GestaoTemplatesPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<NotificationTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all')
  const [showInactive, setShowInactive] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [sendingTemplate, setSendingTemplate] = useState<NotificationTemplate | null>(null)
  const [showSendDialog, setShowSendDialog] = useState(false)

  // Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true)
        const data = await getAllCustomTemplates()
        // Debug: Check for duplicates
        const ids = data.map((t) => t.id)
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
        if (duplicates.length > 0) {
          console.warn('Duplicate template IDs found:', duplicates)
        }
        console.log('Loaded templates:', data.length, data)
        setTemplates(data)
      } catch (error) {
        console.error('Erro ao carregar templates:', error)
        toast.error('Erro ao carregar templates')
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [])

  // Filter templates
  useEffect(() => {
    let filtered = templates

    // Filtrar por status (ativo/desativado)
    if (showInactive) {
      filtered = filtered.filter((t) => t.status === 'desativado')
    } else {
      filtered = filtered.filter((t) => t.status === 'ativo')
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedCategory)
    }

    // Verificar se há duplicatas
    const ids = filtered.map((t) => t.id)
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
    if (duplicates.length > 0) {
      console.warn('Duplicate template IDs found:', duplicates)
    }

    setFilteredTemplates(filtered)
  }, [templates, searchTerm, selectedCategory, showInactive])

  const handleSave = async (templateData: Omit<NotificationTemplate, 'id'>) => {
    try {
      setIsSaving(true)

      if (editingTemplate) {
        // Atualizar template existente
        await updateCustomTemplate(editingTemplate.id, templateData)
        setTemplates((prev) =>
          prev.map((t) => (t.id === editingTemplate.id ? { ...t, ...templateData } : t)),
        )
        toast.success('Template atualizado com sucesso!')
      } else {
        // Criar novo template
        const newTemplate = await createCustomTemplate(templateData)
        setTemplates((prev) => [newTemplate, ...prev])
        toast.success('Template criado com sucesso!')
      }

      setShowEditor(false)
      setEditingTemplate(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar'
      toast.error(message)
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (template: NotificationTemplate) => {
    setEditingTemplate(template)
    setShowEditor(true)
  }

  const handleSend = (template: NotificationTemplate) => {
    setSendingTemplate(template)
    setShowSendDialog(true)
  }

  const handleDelete = async (templateId: string) => {
    try {
      await deleteCustomTemplate(templateId)
      setTemplates((prev) => prev.filter((t) => t.id !== templateId))
      toast.success('Template deletado com sucesso!')
    } catch {
      toast.error('Erro ao deletar template')
    }
  }

  const handleCreateNew = () => {
    setEditingTemplate(null)
    setShowEditor(true)
  }

  return (
    <RoleGuard requireAuth={true} allowedRoles={['admin', 'agent']}>
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl pb-4">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <BvTitleHeader title="Gerenciar Templates de Notificações" className="mb-0" />
            <Button
              onClick={handleCreateNew}
              className="gap-2 whitespace-nowrap"
              disabled={loading}
            >
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
          </div>

          {/* Info Box */}
          <div className="mb-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-blue-900">Como funciona</p>
                <p className="mt-1 text-sm text-blue-800">
                  Crie templates de notificação com variáveis dinâmicas (como nome do usuário, data,
                  etc). As variáveis são preenchidas automaticamente quando a notificação é enviada.
                  Use{' '}
                  <code className="rounded bg-blue-100 px-2 py-1 font-mono text-xs">
                    {'{{nomeDaVariavel}}'}
                  </code>{' '}
                  para inserir dados dinâmicos.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Pesquisar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Toggle para mostrar templates desativados */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInactive(!showInactive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showInactive ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showInactive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <label className="text-sm font-medium text-gray-700">
                {showInactive ? 'Mostrando templates desativados' : 'Mostrar templates desativados'}
              </label>
            </div>
          </div>

          {/* Tabs e Templates */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="text-primary h-8 w-8 animate-spin" />
              <p className="mt-2 text-sm text-gray-600">Carregando templates...</p>
            </div>
          ) : templates.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 font-semibold text-gray-900">Nenhum template encontrado</p>
              <p className="mt-1 text-sm text-gray-600">
                Crie seu primeiro template clicando em &quot;Novo Template&quot;
              </p>
              <Button onClick={handleCreateNew} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Template
              </Button>
            </div>
          ) : (
            <TemplateTabs
              templates={filteredTemplates}
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => setSelectedCategory(category)}
              renderContent={(templatesInCategory) => (
                <>
                  {templatesInCategory.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
                      <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 font-semibold text-gray-900">Nenhum template encontrado</p>
                      <p className="mt-1 text-sm text-gray-600">Tente ajustar sua busca</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {templatesInCategory.map((template) => (
                        <PreviewCard
                          key={template.id}
                          template={template}
                          showActions={true}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onSend={handleSend}
                          compact
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            />
          )}
        </div>

        {/* Editor Dialog */}
        <Dialog open={showEditor} onOpenChange={setShowEditor}>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? '✏️ Editar Template' : '✨ Novo Template'}
              </DialogTitle>
              <DialogDescription>
                {editingTemplate
                  ? 'Atualize as informações do template'
                  : 'Crie um novo template de notificação com variáveis dinâmicas'}
              </DialogDescription>
            </DialogHeader>

            <TemplateEditor
              template={editingTemplate}
              onSave={handleSave}
              onClose={() => {
                setShowEditor(false)
                setEditingTemplate(null)
              }}
              isLoading={isSaving}
            />
          </DialogContent>
        </Dialog>

        {/* Send Dialog */}
        {sendingTemplate && (
          <SendTemplateDialogUnified
            template={sendingTemplate}
            isOpen={showSendDialog}
            onClose={() => {
              setShowSendDialog(false)
              setSendingTemplate(null)
            }}
            onSuccess={() => {
              toast.success('Template enviado com sucesso!')
            }}
          />
        )}
      </div>
    </RoleGuard>
  )
}
