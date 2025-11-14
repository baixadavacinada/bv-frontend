'use client'
import { useState, useEffect } from 'react'
import { getVaccines } from '@/services/actions/ubs-actions'
import { ApiVaccineData } from '@/types/vaccines'

/** * Hook customizado para buscar e gerenciar a lista de vacinas.
 */
export const useVaccinesList = () => {
  const [data, setData] = useState<ApiVaccineData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const vaccinesData = await getVaccines()
        setData(vaccinesData as ApiVaccineData[])
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error('Unknown error'))
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return { data, isLoading, error }
}
