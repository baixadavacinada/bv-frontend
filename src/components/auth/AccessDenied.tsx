'use client'

import React from 'react'
import { ShieldAlert, Home, LogIn } from 'lucide-react'
import { BvButton } from '../design/BvButton'
import { useRouter } from 'next/navigation'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { useSectionAccessibilityIds, AccessibilityAnnouncement } from '@/utils/accessibility'

export default function AccessDenied() {
  useAccessibilityValidation()
  const { announceToScreenReader, announceError } = useLiveRegion()
  const { sectionId, headingId, contentId } = useSectionAccessibilityIds('access-denied')

  const router = useRouter()

  const handleGoHome = () => {
    try {
      announceToScreenReader('Navegando para a página inicial', 'polite')
      router.push('/inicio')
    } catch (error) {
      announceError('Erro ao navegar para a página inicial')
      console.error('Erro na navegação:', error)
    }
  }

  const handleSwitchAccount = () => {
    try {
      announceToScreenReader('Redirecionando para a página de login', 'polite')
      router.push('/login')
    } catch (error) {
      announceError('Erro ao navegar para a página de login')
      console.error('Erro na navegação:', error)
    }
  }

  return (
    <div
      className="flex items-center justify-center p-4"
      aria-labelledby={headingId}
      aria-describedby={contentId}
    >
      <section id={sectionId} className="w-full max-w-md" aria-labelledby={headingId}>
        <div
          className="mb-6 flex justify-center"
          role="img"
          aria-label="Ícone de alerta indicando acesso negado"
        >
          <div className="rounded-full bg-red-100 p-6 shadow-lg">
            <ShieldAlert className="h-16 w-16 text-red-600" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <article className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <header>
            <h1 id={headingId} className="mb-3 text-3xl font-bold text-gray-900">
              Acesso Negado
            </h1>
          </header>

          <div id={contentId} className="mb-8">
            <p className="mb-2 text-gray-600">Você não tem permissão para acessar esta página.</p>

            <p className="text-sm text-gray-500">
              Por favor, tente acessar com uma conta autorizada ou entre em contato com o
              administrador do sistema.
            </p>
          </div>

          <div className="my-6 border-t border-gray-200" role="separator" aria-hidden="true"></div>

          <nav aria-label="Opções de navegação disponíveis">
            <div className="space-y-3">
              <BvButton
                title="Voltar para o início"
                leftIcon={<Home aria-hidden="true" />}
                onClick={handleGoHome}
                className="w-full"
                aria-describedby="home-button-description"
              />
              <div id="home-button-description" className="sr-only">
                Navegar de volta para a página inicial do aplicativo
              </div>

              <BvButton
                title="Entrar com outra conta"
                variant="outline"
                leftIcon={<LogIn aria-hidden="true" />}
                onClick={handleSwitchAccount}
                className="w-full"
                aria-describedby="login-button-description"
              />
              <div id="login-button-description" className="sr-only">
                Fazer logout da conta atual e entrar com credenciais diferentes
              </div>
            </div>
          </nav>
        </article>
      </section>

      {/* Anúncio para leitores de tela sobre o estado da página */}
      <AccessibilityAnnouncement
        message="Página de acesso negado carregada. Você não tem permissão para acessar o conteúdo solicitado."
        priority="assertive"
      />
    </div>
  )
}
