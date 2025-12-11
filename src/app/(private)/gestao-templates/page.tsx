'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { Plus, Search, Loader, AlertCircle, Send } from 'lucide-react'
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
import { TemplateCard } from '@/components/admin/TemplateCard'
import { TemplateEditor } from '@/components/admin/TemplateEditor'
import { SendTemplateDialogUnified } from '@/components/admin/SendTemplateDialogUnified'
import { SendTemplateTestDialog } from '@/components/Notifications/SendTemplateTestDialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  const [testingTemplate, setTestingTemplate] = useState<NotificationTemplate | null>(null)
  const [showTestDialog, setShowTestDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('gerenciar')

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

  const handleTest = (template: NotificationTemplate) => {
    setTestingTemplate(template)
    setShowTestDialog(true)
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
          <div className="mb-6">
            <BvTitleHeader title="Central de Notificações" className="mb-2" />
            <p className="text-sm text-gray-600">
              Gerencie templates e envie notificações personalizadas
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="enviar" className="gap-2">
                <Plus className="h-4 w-4" />
                Enviar Nova
              </TabsTrigger>
              <TabsTrigger value="gerenciar" className="gap-2">
                ⚙️ Gerenciar Templates
              </TabsTrigger>
              <TabsTrigger value="historico" className="gap-2">
                📋 Histórico
              </TabsTrigger>
            </TabsList>

            {/* Tab: Enviar Nova */}
            <TabsContent value="enviar" className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Enviar Notificação com Template</h2>

                {templates.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="mb-4 text-gray-600">Nenhum template disponível</p>
                    <Button onClick={handleCreateNew} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Criar Primeiro Template
                    </Button>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>Selecione um template abaixo para enviar uma notificação</p>
                  </div>
                )}

                {/* Templates Grid for Sending */}
                {templates.length > 0 && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-400"
                        onClick={() => handleSend(template)}
                      >
                        <h3 className="mb-1 text-sm font-semibold">{template.name}</h3>
                        <p className="mb-3 text-xs text-gray-600">{template.description}</p>
                        <Button size="sm" className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                          <Send className="h-3.5 w-3.5" />
                          Enviar Agora
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab: Gerenciar Templates */}
            <TabsContent value="gerenciar" className="space-y-6">
              <div className="flex gap-4">
                <Button
                  onClick={handleCreateNew}
                  className="gap-2 bg-blue-600 whitespace-nowrap hover:bg-blue-700"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4" />
                  Novo Template
                </Button>
              </div>

              {/* Info Box */}
              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">💡 Dica</p>
                    <p className="mt-1 text-sm text-blue-800">
                      Crie templates reutilizáveis com variáveis dinâmicas. Use{' '}
                      <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                        {'{{variavel}}'}
                      </code>{' '}
                      para personalizar cada mensagem automaticamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search */}
                <div className="relative max-w-md flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar templates por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value as typeof selectedCategory)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas categorias</SelectItem>
                      <SelectItem value="vaccine">💉 Vacina</SelectItem>
                      <SelectItem value="appointment">📅 Agendamento</SelectItem>
                      <SelectItem value="reminder">🔔 Lembrete</SelectItem>
                      <SelectItem value="general">📝 Geral</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Toggle Status */}
                  <button
                    onClick={() => setShowInactive(!showInactive)}
                    className={`relative inline-flex h-9 w-16 items-center rounded-full border transition-colors ${
                      showInactive ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-gray-200'
                    }`}
                    title={showInactive ? 'Mostrando inativos' : 'Mostrando ativos'}
                  >
                    <span
                      className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-sm transition-transform ${
                        showInactive ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                    <span className="absolute left-2 text-[10px] font-medium text-white">
                      {showInactive ? '🔴' : '🟢'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Templates Grid */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader className="h-10 w-10 animate-spin text-blue-600" />
                  <p className="mt-3 text-sm text-gray-600">Carregando templates...</p>
                </div>
              ) : templates.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                  <div className="mb-4 text-6xl">📝</div>
                  <p className="text-lg font-semibold text-gray-900">Nenhum template criado</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Comece criando seu primeiro template de notificação
                  </p>
                  <Button onClick={handleCreateNew} className="mt-6">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Template
                  </Button>
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                  <div className="mb-4 text-6xl">🔍</div>
                  <p className="text-lg font-semibold text-gray-900">Nenhum template encontrado</p>
                  <p className="mt-2 text-sm text-gray-600">Tente ajustar os filtros ou busca</p>
                </div>
              ) : (
                <>
                  {/* Results count */}
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {filteredTemplates.length}{' '}
                      {filteredTemplates.length === 1
                        ? 'template encontrado'
                        : 'templates encontrados'}
                      {selectedCategory !== 'all' && ' nesta categoria'}
                    </p>
                  </div>

                  {/* Templates Grid */}
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onEdit={handleEdit}
                        onSend={handleSend}
                        onTest={handleTest}
                        onDelete={(t) => handleDelete(t.id)}
                        onToggleStatus={(t) => {
                          handleSave({
                            ...t,
                            status: t.status === 'ativo' ? 'desativado' : 'ativo',
                          })
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {/* Tab: Histórico */}
            <TabsContent value="historico" className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Histórico de Envios</h2>
                <div className="py-12 text-center">
                  <div className="mb-4 text-6xl">📊</div>
                  <p className="text-gray-600">Histórico de envios virá em breve</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Aqui você poderá visualizar todos os envios realizados
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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

        {/* Test Dialog */}
        {testingTemplate && (
          <SendTemplateTestDialog
            template={testingTemplate}
            isOpen={showTestDialog}
            onClose={() => {
              setShowTestDialog(false)
              setTestingTemplate(null)
            }}
            onSuccess={() => {
              setShowTestDialog(false)
              setTestingTemplate(null)
            }}
          />
        )}
      </div>
    </RoleGuard>
  )
}
