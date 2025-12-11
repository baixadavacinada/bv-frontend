'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { BvButton, BvTitleHeader } from '@/components'
import { FeedbackReportsSection } from '@/components/admin/FeedbackReportsSection'
import { toast } from 'sonner'
import { listHealthUnits } from '@/services/actions/ubs-actions'
import { useAuth } from '@/hooks/use-firebase-auth'
import { toSlug } from '@/utils/slug'
import BvSelect from '@/components/design/BvSelect'

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

  const selectedUbsData = ubsList.find((u) => u._id === selectedUbs)

  const handleSubmit = () => {
    if (!selectedUbs) {
      toast.error('Selecione uma unidade de saúde')
      return
    }

    const ubs = ubsList.find((u) => u._id === selectedUbs)
    if (!ubs) return

    const slug = toSlug(ubs.name)
    router.push(`/ubs/avaliar/${slug}`)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 pb-4 lg:mx-0 lg:ml-0 lg:max-w-2xl">
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
            <BvSelect
              id="ubs-select"
              title="Unidade de Saúde"
              options={ubsList.map((ubs) => ({
                label: `${ubs.name} (${ubs.neighborhood}, ${ubs.city})`,
                value: ubs._id,
              }))}
              value={selectedUbs}
              onValueChange={(value) => setSelectedUbs(value as string)}
              placeholder="-- Selecione uma unidade --"
              fullWidth
            />
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
          <div className="flex w-full gap-3 pt-4">
            <BvButton
              onClick={() => router.back()}
              title="Voltar"
              className="flex-1"
              variant="outline"
            />

            <BvButton
              onClick={handleSubmit}
              disabled={!selectedUbs}
              title="Prosseguir para Avaliação"
              className="flex-1"
            />
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
