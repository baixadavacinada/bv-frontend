'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { BvTitleHeader } from '@/components'
import { FeedbackReportsSection } from '@/components/admin/FeedbackReportsSection'
import { toast } from 'sonner'
import { listHealthUnits } from '@/services/actions/ubs-actions'
import { useAuth } from '@/hooks/use-firebase-auth'

interface HealthUnit {
  _id: string
  name: string
  neighborhood: string
  city: string
  address: string
}

export default function AvaliarUbsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [ubsList, setUbsList] = useState<HealthUnit[]>([])
  const [selectedUbs, setSelectedUbs] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isReportsOpen, setIsReportsOpen] = useState(false)

  // Carregar lista de UBS
  useEffect(() => {
    const loadHealthUnits = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await listHealthUnits()
        console.log('Dados retornados:', data)

        // apiClient já retorna desempacotado (apenas data.data)
        if (Array.isArray(data)) {
          setUbsList(data)
        } else if (data && typeof data === 'object' && 'data' in data) {
          const ubsData = (data as unknown as { data: HealthUnit[] }).data
          if (Array.isArray(ubsData)) {
            setUbsList(ubsData)
          }
        }
      } catch (err) {
        console.error('Erro ao carregar UBS:', err)
        setError('Erro ao carregar unidades de saúde')
        toast.error('Erro ao carregar unidades de saúde')
      } finally {
        setLoading(false)
      }
    }

    loadHealthUnits()
  }, [])

  // Converter nome para slug (mesma lógica do backend)
  const toSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const selectedUbsData = ubsList.find((u) => u._id === selectedUbs)

  const handleSubmit = () => {
    if (!selectedUbs) {
      toast.error('Selecione uma unidade de saúde')
      return
    }

    const ubs = ubsList.find((u) => u._id === selectedUbs)
    if (!ubs) return

    const slug = toSlug(ubs.name)
    router.push(`/ubs/avaliar/${ubs._id}/${slug}`)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-lg p-6">
      <BvTitleHeader title="Avaliar Unidade de Saúde" className="mb-8" />

      {/* Instruções */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>Como usar:</strong> Selecione uma unidade de saúde da lista abaixo e prossiga
          para o formulário de avaliação.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
            <p className="mt-2 text-gray-600">Carregando unidades de saúde...</p>
          </div>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-900">{error}</p>
            <p className="mt-1 text-sm text-red-700">
              Tente recarregar a página ou volte mais tarde.
            </p>
          </div>
        </div>
      )}

      {/* Seletor de UBS */}
      {!loading && !error && (
        <div className="space-y-4">
          <div>
            <label htmlFor="ubs-select" className="mb-2 block text-sm font-medium text-gray-700">
              Unidade de Saúde *
            </label>
            <div className="relative">
              <select
                id="ubs-select"
                value={selectedUbs}
                onChange={(e) => setSelectedUbs(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              >
                <option value="">-- Selecione uma unidade --</option>
                {ubsList.map((ubs) => (
                  <option key={ubs._id} value={ubs._id}>
                    {ubs.name} ({ubs.neighborhood}, {ubs.city})
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-3.5 right-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Informações da UBS selecionada */}
          {selectedUbsData && (
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <h3 className="font-semibold text-indigo-900">{selectedUbsData.name}</h3>
              <p className="mt-1 text-sm text-indigo-800">
                📍 {selectedUbsData.neighborhood}, {selectedUbsData.city}
              </p>
              <p className="mt-1 text-sm text-indigo-800">{selectedUbsData.address}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Voltar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedUbs}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prosseguir para Avaliação
            </button>
          </div>
        </div>
      )}

      {/* Seção de Relatórios - apenas para admin */}
      {!loading && !error && user?.role === 'admin' && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <button
            onClick={() => setIsReportsOpen(!isReportsOpen)}
            className="mb-6 flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
          >
            <div className="flex flex-1 items-center justify-between">
              <p className="text-xl font-bold">Relatórios de Feedbacks</p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-600 transition-transform ${
                isReportsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isReportsOpen && <FeedbackReportsSection />}
        </div>
      )}
    </div>
  )
}
