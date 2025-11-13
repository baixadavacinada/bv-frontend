'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface UbsMapProps {
  latitude: number
  longitude: number
  ubsName: string
}

function MapContent({ latitude, longitude, ubsName }: UbsMapProps) {
  useAccessibilityValidation({ enabled: true })
  const [mapTimeout, setMapTimeout] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Apenas define timeout se o mapa não carregar em 10 segundos
    if (mapLoaded) {
      return
    }

    const timer = setTimeout(() => {
      setMapTimeout(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [mapLoaded])

  if (mapTimeout) {
    return null
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg bg-gray-100">
        <iframe
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa da localização de ${ubsName}`}
          aria-label={`Mapa mostrando a localização de ${ubsName}`}
          onLoad={() => setMapLoaded(true)}
        ></iframe>
      </div>
    </div>
  )
}

function MapSkeleton() {
  return (
    <div
      className="h-64 w-full animate-pulse rounded-lg bg-gray-200"
      aria-label="Carregando mapa"
    />
  )
}

export function LazyUbsMap({ latitude, longitude, ubsName }: UbsMapProps) {
  return (
    <Suspense fallback={<MapSkeleton />}>
      <MapContent latitude={latitude} longitude={longitude} ubsName={ubsName} />
    </Suspense>
  )
}
