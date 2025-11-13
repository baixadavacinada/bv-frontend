import React from 'react'
import dynamic from 'next/dynamic'
import { LocationPermissionModal } from '../LocationPermissionModal'
import { GeolocationCoords } from '@/hooks/use-geolocation'

export interface LazyLocationPermissionModalProps {
  isOpen: boolean
  onPermissionGranted: (coords?: GeolocationCoords) => void
}

function LoadingFallback() {
  return null
}

const DynamicLocationPermissionModal = dynamic(() => Promise.resolve(LocationPermissionModal), {
  loading: () => <LoadingFallback />,
})

export function LazyLocationPermissionModal(props: LazyLocationPermissionModalProps) {
  if (!props.isOpen) {
    return null
  }

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <DynamicLocationPermissionModal
        isOpen={props.isOpen}
        onClose={() => {}}
        onPermit={props.onPermissionGranted}
        loading={false}
      />
    </React.Suspense>
  )
}
