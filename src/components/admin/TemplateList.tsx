'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, RefreshCw, AlertCircle } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { NotificationTemplate } from '@/services/notificationTemplateService'

interface TemplateListProps {
  templates: NotificationTemplate[]
  loading?: boolean
  onSelectTemplate: (template: NotificationTemplate) => void
  onRefresh?: () => void
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    appointment: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    vaccine: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    reminder: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    system: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }
  return colors[category] || colors.general
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    appointment: 'Agendamento',
    vaccine: 'Vacina',
    reminder: 'Lembrete',
    system: 'Sistema',
    general: 'Geral',
  }
  return labels[category] || category
}

export function TemplateList({
  templates,
  loading = false,
  onSelectTemplate,
  onRefresh,
}: TemplateListProps) {
  useAccessibilityValidation({ enabled: true })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all')

  const categories = useMemo(() => {
    const unique = new Set(templates.map((t) => t.category))
    return Array.from(unique).sort()
  }, [templates])

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [templates, searchTerm, selectedCategory])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-muted h-10 animate-pulse rounded-md" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted h-24 animate-pulse rounded-md" />
          ))}
        </div>
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="text-foreground mb-2 text-lg font-semibold">Nenhum template disponível</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Não foi possível carregar os templates de notificação
        </p>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar Novamente
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Pesquisar modelos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Botões de Categoria */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
          className="text-xs"
        >
          Todos ({templates.length})
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs"
          >
            {getCategoryLabel(category)} ({templates.filter((t) => t.category === category).length})
          </Button>
        ))}
      </div>

      {/* Lista de Templates */}
      <div className="space-y-3">
        {filteredTemplates.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            Nenhum template encontrado com esses filtros
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="hover:bg-muted/50 group cursor-pointer rounded-lg border p-4 transition-colors"
                onClick={() => onSelectTemplate(template)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="text-foreground truncate font-semibold">{template.name}</h3>
                      <Badge className={getCategoryColor(template.category)} variant="secondary">
                        {getCategoryLabel(template.category)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
                      {template.description}
                    </p>
                    <p className="text-muted-foreground font-mono text-xs">ID: {template.id}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectTemplate(template)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumo */}
      <div className="text-muted-foreground text-xs">
        Mostrando {filteredTemplates.length} de {templates.length} templates
      </div>
    </div>
  )
}
