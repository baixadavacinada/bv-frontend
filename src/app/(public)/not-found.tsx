'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 md:text-8xl">404</h1>
          <p className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Página não encontrada
          </p>
        </div>

        <p className="mb-8 max-w-md text-gray-600">
          Desculpe, a página pública que você está procurando não existe. Verifique a URL e tente
          novamente.
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
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Home className="h-4 w-4" />
            Ir para Home
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Código de erro: <span className="font-mono font-semibold">404 PUBLIC_NOT_FOUND</span>
          </p>
        </div>
      </div>
    </div>
  )
}
