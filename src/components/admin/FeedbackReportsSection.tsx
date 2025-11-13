'use client'

import { useState } from 'react'
import { Download, FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generateFeedbackReport } from '@/services/actions/reports-actions'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

export function FeedbackReportsSection() {
  useAccessibilityValidation({ enabled: true })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const result = await generateFeedbackReport({})

      if (result.success && result.blob) {
        // Criar URL para download
        const url = URL.createObjectURL(result.blob)
        const link = document.createElement('a')
        link.href = url
        link.download = result.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        toast.success('Relatório de feedbacks baixado com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao gerar relatório')
      }
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      toast.error('Erro ao gerar relatório de feedbacks')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="mt-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-3">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Relatório de Feedbacks</h2>
            <p className="text-sm text-gray-600">
              Gere um relatório em Excel com todos os feedbacks coletados
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>Dica:</strong> Clique no botão abaixo para gerar um arquivo Excel com todos os
          feedbacks das unidades de saúde. O arquivo será automaticamente baixado no seu computador
          e também salvo no Google Drive da Baixada Vacinada.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600">
          <p>
            Formato: <strong>Excel (.xlsx)</strong>
          </p>
          <p>Inclui: Data, UBS, Avaliação, Rating</p>
        </div>

        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Gerar Relatório
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-xs text-gray-500">
          ℹ️ Os relatórios são salvos automaticamente no Google Drive da Baixada Vacinada para
          backup e auditoria.
        </p>
      </div>
    </section>
  )
}
