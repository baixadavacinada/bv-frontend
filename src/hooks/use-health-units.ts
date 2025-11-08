import { useState, useEffect } from 'react'
import { listHealthUnits } from '@/services/actions/ubs-actions'
import { HealthUnit } from '@/types/health-units'

/**
 * Hook customizado para buscar e gerenciar os dados das unidades de saúde.
 */
export const useHealthUnits = () => {
  const [data, setData] = useState<HealthUnit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const unitsData = await listHealthUnits()
        setData(unitsData)
      } catch (err: unknown) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return { data, isLoading, error }
}
