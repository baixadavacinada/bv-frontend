'use client'
import { useState, useEffect } from 'react'
import { getVaccines } from '@/services/actions/ubs-actions'

/** * Hook customizado para buscar e gerenciar a lista de vacinas.
 */
export const useVaccinesList = () => {
  const [data, setData] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const vaccinesData = await getVaccines()
        setData(vaccinesData as string[])
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
