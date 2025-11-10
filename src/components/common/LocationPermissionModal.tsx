'use client'

import React, { useState } from 'react'
import { BvModal } from '../design/BvModal'
import { BvButton } from '@/components'
import { MapPin } from 'lucide-react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

export interface LocationPermissionModalProps {
  isOpen: boolean
  onClose: () => void
  onPermit: (coords?: { latitude: number; longitude: number }) => void
  loading?: boolean
}

export function LocationPermissionModal({
  isOpen,
  onClose,
  onPermit,
  loading = false,
}: LocationPermissionModalProps) {
  useAccessibilityValidation({ enabled: true })

  const [isRequesting, setIsRequesting] = useState(false)

  const handlePermit = async () => {
    if (!navigator.geolocation) {
      console.error('Geolocation não é suportado neste navegador')
      return
    }

    setIsRequesting(true)

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onPermit({ latitude, longitude })
          setIsRequesting(false)
          onClose()
        },
        (error) => {
          console.error('❌ Modal - Erro ao obter localização:', error)
          onPermit()
          setIsRequesting(false)
          onClose()
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    } catch (error) {
      console.error('❌ Modal - Erro ao solicitar geolocalização:', error)
      setIsRequesting(false)
    }
  }

  return (
    <BvModal
      open={isOpen}
      onClose={onClose}
      hideCloseButton={true}
      className="w-full max-w-[358px] gap-0 overflow-hidden rounded-[6px] border-none p-0"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-300 bg-white px-6 py-5">
        <MapPin className="h-6 w-6 flex-shrink-0 text-black" strokeWidth={2.5} />
        <h2 className="text-lg font-bold text-gray-900">Permitir acesso à sua localização?</h2>
      </div>

      {/* Content */}
      <div className="space-y-6 bg-gray-100 px-6 py-6">
        <p className="text-foreground text-base leading-relaxed font-normal">
          Usamos sua localização para mostrar as Unidades Básicas de Saúde próximas a você. Isso
          ajuda a melhorar sua experiência.
        </p>

        <div className="flex flex-col gap-3">
          <BvButton
            title="Permitir"
            onClick={handlePermit}
            isLoading={isRequesting || loading}
            disabled={isRequesting || loading}
            className="w-full"
          />

          <BvButton
            title="Negar"
            onClick={onClose}
            disabled={isRequesting || loading}
            className="w-full border-0 bg-gray-300 text-purple-800 shadow-xs hover:bg-gray-400"
          />
        </div>
      </div>
    </BvModal>
  )
}
