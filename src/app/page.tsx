'use client'

export const dynamic = 'force-dynamic'

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
  const DoctorIllustration = '/img-inicio-mulher-turbante.svg'
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

  const handleContinueAsGuest = () => {
    router.push('/inicio')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-700"></div>
          <p className="text-slate-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 pb-20">
      <Card className="w-full max-w-sm rounded-lg border-0 bg-transparent shadow-none sm:max-w-md lg:max-w-4xl lg:bg-transparent lg:shadow-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="p-2 sm:p-6 lg:p-0">
            <CardHeader className="space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <Image
                  src="/criola-logo.png"
                  alt="Logo Criola"
                  width={60}
                  height={40}
                  className="mx-auto lg:mx-0"
                  style={{
                    width: 'auto',
                    height: 'auto',
                  }}
                />
                <CardTitle className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-slate-100">
                  Japeri Vacinada
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-slate-900 lg:text-xl">
                  Bem-vindo(a) à nossa plataforma!
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center space-y-6 pt-8 lg:items-start">
              <Image
                src={DoctorIllustration}
                alt="Imagem de uma pessoa profissional de saúde segurando uma seringa"
                width={400}
                height={400}
                className="mb-4 lg:hidden"
                priority
                style={{ width: 'auto', height: 'auto' }}
              />

              <div className="space-y-4">
                <CardDescription className="text-base text-slate-700 lg:text-base">
                  Aqui você pode localizar a unidade de saúde mais próxima, consultar vacinas
                  disponíveis e acompanhar sua caderneta.
                </CardDescription>
                <p className="text-base text-slate-800">Como deseja acessar?</p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-center justify-center space-y-6 pt-8 lg:items-start">
              {error && (
                <div className="w-full text-center text-sm text-red-600 lg:text-left">{error}</div>
              )}

              <div className="flex w-full flex-col space-y-6 sm:max-w-sm">
                <BvButton
                  variant="default"
                  className="w-full"
                  onClick={handleContinueAsGuest}
                  disabled={isLoading}
                  title="Acessar sem criar conta"
                />

                <BvButton
                  variant="default"
                  title={isLoading ? 'Criando conta...' : 'Criar com o Google'}
                  className="text-primary flex w-full items-center justify-center gap-2 bg-white shadow-sm hover:bg-gray-50"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  rightIcon={
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  }
                />

                <BvButton
                  variant="default"
                  className="text-primary w-full bg-white shadow-sm hover:bg-gray-50"
                  onClick={handleOtherForms}
                  disabled={isLoading}
                  title="Outras formas"
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                {/* <Image
                  src="/logo-prefeitura-japeri.png"
                  alt="Logo Prefeitura Municipal de Japeri"
                  width={16}
                  height={16}
                  style={{ width: 'auto', height: 'auto' }}
                /> */}
                <span>Realizado em parceria com a Prefeitura Municipal de Japeri</span>
              </div>
            </CardFooter>
          </div>

          <div className="hidden h-full w-full items-center justify-center lg:flex">
            <Image
              src={DoctorIllustration}
              alt="Imagem de uma pessoa profissional de saúde segurando uma seringa"
              width={400}
              height={400}
              priority
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '500px',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
