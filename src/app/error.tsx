'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error('Erro da aplicação:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <AlertCircle className="h-24 w-24 text-red-600 md:h-32 md:w-32" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Algo deu errado!</h1>
        <p className="mb-2 text-lg text-gray-700">Desculpe, ocorreu um erro inesperado.</p>
        <p className="mb-8 max-w-md text-gray-600">
          Estamos trabalhando para corrigir este problema. Tente novamente ou volte à página
          inicial.
        </p>

        {error.message && (
          <div className="mb-8 rounded-lg bg-red-100 p-4 text-left">
            <p className="text-sm font-semibold text-red-700">Detalhes do erro:</p>
            <p className="mt-2 font-mono text-xs text-red-600">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-600">
                Identificador: <span className="font-mono">{error.digest}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()} variant="outline" className="flex items-center gap-2">
            Tentar novamente
          </Button>

          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <Button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Ir para Home
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  )
}
