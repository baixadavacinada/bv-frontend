'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <Lock className="h-20 w-20 text-indigo-600 md:h-24 md:w-24" />
        </div>

        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 md:text-8xl">404</h1>
          <p className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Página privada não encontrada
          </p>
        </div>

        <p className="mb-8 max-w-md text-gray-600">
          A página que você está procurando não existe em sua área de acesso. Verifique se você tem
          permissão para acessar este recurso.
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
            onClick={() => router.push('/gestao-ubs')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Código de erro: <span className="font-mono font-semibold">404 PRIVATE_NOT_FOUND</span>
          </p>
        </div>
      </div>
    </div>
  )
}
