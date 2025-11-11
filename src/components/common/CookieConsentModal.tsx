'use client'

import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'
import { BvButton } from '@/components'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import { toast } from 'sonner'

const COOKIE_CONSENT_KEY = 'bv_cookie_consent'
const COOKIE_PREFERENCES_KEY = 'bv_cookie_preferences'

export interface CookieConsent {
  accepted: boolean
  timestamp: string
}

export interface CookiePreferences {
  analytics: boolean
  marketing: boolean
  essential: boolean
}

export interface StoredCookieData {
  consent: CookieConsent
  preferences?: CookiePreferences
}

export function CookieConsentModal() {
  useAccessibilityValidation({ enabled: true })
  const [showModal, setShowModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: true,
    marketing: true,
    essential: true,
  })

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

      if (!savedConsent) {
        setShowModal(true)
      } else if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    } catch (err) {
      console.error('Erro ao verificar consentimento de cookies:', err)
      setShowModal(true)
    }
    setIsInitialized(true)
  }, [])

  const handleAcceptAll = () => {
    try {
      const consent: CookieConsent = {
        accepted: true,
        timestamp: new Date().toISOString(),
      }
      const allPreferences: CookiePreferences = {
        analytics: true,
        marketing: true,
        essential: true,
      }

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allPreferences))

      setShowModal(false)
      setShowPreferences(false)

      toast.success('Cookies aceitos!', {
        description: 'Você aceitou todos os cookies. Obrigado!',
      })
    } catch (err) {
      console.error('Erro ao salvar consentimento de cookies:', err)
      toast.error('Erro ao salvar preferências', {
        description: 'Tente novamente em alguns momentos.',
      })
    }
  }

  const handleRejectAll = () => {
    try {
      const consent: CookieConsent = {
        accepted: false,
        timestamp: new Date().toISOString(),
      }
      const minimalPreferences: CookiePreferences = {
        analytics: false,
        marketing: false,
        essential: true, // Essential sempre ativado
      }

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(minimalPreferences))

      setShowModal(false)
      setShowPreferences(false)

      toast.success('Cookies rejeitados!', {
        description: 'Apenas cookies essenciais foram mantidos.',
      })
    } catch (err) {
      console.error('Erro ao salvar rejeição de cookies:', err)
      toast.error('Erro ao salvar preferências', {
        description: 'Tente novamente em alguns momentos.',
      })
    }
  }

  const handleSavePreferences = () => {
    try {
      const consent: CookieConsent = {
        accepted: true,
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences))

      setShowModal(false)
      setShowPreferences(false)

      const selectedCount = Object.values(preferences).filter(Boolean).length
      toast.success('Preferências salvas!', {
        description: `${selectedCount} tipo(s) de cookies habilitado(s).`,
      })
    } catch (err) {
      console.error('Erro ao salvar preferências de cookies:', err)
      toast.error('Erro ao salvar preferências', {
        description: 'Tente novamente em alguns momentos.',
      })
    }
  }

  const handleOpenPreferences = () => {
    setShowPreferences(true)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Essential não pode ser desativado
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!isInitialized) {
    return null
  }

  if (showPreferences) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl md:p-8">
          <h2 className="text-primary mb-4 text-xl font-bold">Preferências de Cookies</h2>

          <div className="mb-6 space-y-4">
            {/* Essential - Always On */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <h3 className="font-semibold text-gray-900">Cookies Essenciais</h3>
                <p className="text-xs text-gray-600">Necessários para o funcionamento do site</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.essential}
                disabled
                className="h-5 w-5 cursor-not-allowed rounded border-gray-300"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <h3 className="font-semibold text-gray-900">Cookies de Análise</h3>
                <p className="text-xs text-gray-600">Nos ajudam a entender como você usa o site</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => togglePreference('analytics')}
                className="h-5 w-5 cursor-pointer rounded border-gray-300"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <h3 className="font-semibold text-gray-900">Cookies de Marketing</h3>
                <p className="text-xs text-gray-600">Para personalizar anúncios e conteúdo</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => togglePreference('marketing')}
                className="h-5 w-5 cursor-pointer rounded border-gray-300"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <BvButton
              title="Cancelar"
              onClick={() => setShowPreferences(false)}
              className="border-primary text-primary flex-1 border bg-white hover:bg-gray-50"
            />
            <BvButton
              title="Salvar"
              onClick={handleSavePreferences}
              className="bg-primary hover:bg-primary/90 flex-1 text-white"
            />
          </div>
        </div>
      </div>
    )
  }

  if (!showModal) {
    return null
  }

  return (
    <div className="bg-primary fixed right-0 bottom-0 left-0 z-50 flex w-full justify-center px-4 py-6 shadow-lg md:right-auto md:px-8 md:py-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center md:gap-8">
        {/* Ícone + Conteúdo */}
        <div className="flex flex-col items-center gap-6 text-center md:max-w-2xl md:flex-1 md:flex-row md:items-start md:gap-8 md:text-left">
          {/* Ícone */}
          <div className="flex-shrink-0">
            <Cookie className="h-14 w-14 text-white md:h-16 md:w-16" strokeWidth={1.5} />
          </div>

          {/* Conteúdo */}
          <div className="flex-1">
            <h2 className="mb-3 text-lg font-bold text-white md:text-xl">Este site usa cookies!</h2>

            <p className="mb-4 text-sm leading-relaxed text-white">
              A gente usa cookies para melhorar sua experiência por aqui e entender melhor como o
              site está sendo usado. Tudo ocorre seguindo as normas de privacidade.
            </p>

            <p className="text-sm text-white">
              Você pode{' '}
              <span className="font-bold">aceitar todos os cookies, escolher quais permitir</span>{' '}
              ou <span className="font-bold">rejeitar todos</span>.
            </p>
          </div>
        </div>

        {/* Botões - Coluna Fixa na Direita */}
        <div className="flex w-full flex-col gap-3 md:w-56 md:flex-shrink-0">
          <BvButton
            title="Aceitar todos"
            onClick={handleAcceptAll}
            className="text-primary w-full bg-white text-sm hover:bg-gray-100 md:text-base"
          />

          <BvButton
            title="Configurar preferências"
            onClick={handleOpenPreferences}
            className="text-primary w-full bg-white text-sm hover:bg-gray-100 md:text-base"
          />

          <BvButton
            title="Rejeitar"
            onClick={handleRejectAll}
            className="text-primary w-full bg-white text-sm hover:bg-gray-100 md:text-base"
          />
        </div>
      </div>
    </div>
  )
}
