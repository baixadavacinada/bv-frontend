'use client'

import { useEffect, useState } from 'react'
import { useLocationContext } from '@/contexts/LocationContext'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

export function LocationPermissionModal() {
  useAccessibilityValidation({ enabled: true })

  const { isLocationModalOpen, hideLocationModal, setUserCoords } = useLocationContext()
  const { requestGeolocation, isLoading, error } = useGeolocation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(isLocationModalOpen)
  }, [isLocationModalOpen])

  const handleRequestLocation = async () => {
    const coords = await requestGeolocation()
    if (coords) {
      setUserCoords({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
      hideLocationModal()
    }
  }

  const handleSkip = () => {
    hideLocationModal()
  }

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && hideLocationModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-3">
              <MapPin className="text-primary h-6 w-6" aria-hidden="true" />
            </div>
            <DialogTitle>Compartilhe sua localização</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-left">
            Para mostrar as unidades de saúde mais próximas de você, precisamos da sua localização.
            Você pode alterar essa permissão a qualquer momento nas configurações do navegador.
          </DialogDescription>
        </DialogHeader>

        {error && <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>}

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleRequestLocation}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 flex-1"
          >
            {isLoading ? 'Obtendo localização...' : 'Permitir'}
          </Button>
          <Button onClick={handleSkip} variant="outline" className="flex-1" disabled={isLoading}>
            Agora não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
