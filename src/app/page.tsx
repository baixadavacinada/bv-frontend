'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BvButton } from '@/components'
import { loginWithGoogle } from '@/lib/auth-service'
import { useAuth } from '@/hooks/use-firebase-auth'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Page() {
  const DoctorIllustration = '/img-inicio.svg'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push('/inicio')
      router.refresh()
    }
  }, [user, loading, router])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      await loginWithGoogle()
      router.push('/inicio')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login com Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtherForms = () => {
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <p className="text-slate-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm rounded-lg border-0 bg-transparent shadow-none sm:max-w-md lg:max-w-4xl lg:bg-transparent lg:shadow-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="p-2 sm:p-6 lg:p-0">
            <CardHeader className="text-center lg:text-left">
              <CardTitle className="text-2xl font-bold text-slate-800 md:text-3xl dark:text-slate-100">
                Bem-vindo(a) à nossa plataforma de vacinação!
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center space-y-6 lg:items-start">
              <Image
                src={DoctorIllustration}
                alt="Ilustração de um profissional da saúde segurando uma seringa"
                width={200}
                height={200}
                className="mb-4 lg:hidden"
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
              <CardDescription className="text-md text-center text-slate-600 lg:text-left dark:text-slate-400">
                Aqui você pode localizar a unidade de saúde mais próxima, consultar vacinas
                disponíveis e acompanhar sua caderneta.
              </CardDescription>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center space-y-4 pt-6 lg:items-start">
              {error && (
                <div className="w-full text-center text-sm text-red-600 lg:text-left">{error}</div>
              )}

              <p className="text-sm text-slate-500 dark:text-slate-400">Como deseja acessar?</p>

              <div className="mt-3 flex w-full flex-col space-y-2 sm:flex-col sm:space-y-2 sm:space-x-0 lg:flex-col lg:space-y-3 lg:space-x-0">
                <BvButton
                  variant="default"
                  title={isLoading ? 'Entrando...' : 'Entrar com o Google'}
                  className="flex w-full items-center justify-center gap-2 text-white"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  leftIcon={
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  }
                />

                <BvButton
                  variant="outline"
                  className="w-full"
                  onClick={handleOtherForms}
                  disabled={isLoading}
                  title="Outras formas"
                />
              </div>
            </CardFooter>
          </div>

          <div className="hidden h-full items-center justify-center lg:flex">
            <Image
              src={DoctorIllustration}
              alt="Ilustração de um profissional da saúde segurando uma seringa"
              width={200}
              height={200}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
