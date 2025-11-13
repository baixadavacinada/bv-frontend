'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 md:text-8xl">404</h1>
          <p className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Página não encontrada
          </p>
        </div>

        <p className="mb-8 max-w-md text-gray-600">
          Desculpe, a página que você está procurando não existe ou foi removida. Verifique a URL e
          tente novamente.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
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
      </div>
    </div>
  )
}
